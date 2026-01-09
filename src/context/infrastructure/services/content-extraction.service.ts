export interface ContentExtractionService {
  extractTextFromFile(file: File): Promise<string>;
  extractTextFromImage(file: File): Promise<string>;
}

export class ContentExtractor implements ContentExtractionService {
  async extractTextFromFile(file: File): Promise<string> {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();

    if (fileType === "text/plain" || fileName.endsWith(".txt")) {
      return this.extractFromTextFile(file);
    }

    if (fileType === "application/pdf" || fileName.endsWith(".pdf")) {
      throw new Error(
        "PDF extraction not yet implemented. Please use text files or copy-paste the content."
      );
    }

    if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileName.endsWith(".docx")
    ) {
      throw new Error(
        "DOCX extraction not yet implemented. Please use text files or copy-paste the content."
      );
    }

    throw new Error(`Unsupported file type: ${fileType || "unknown"}`);
  }

  async extractTextFromImage(file: File): Promise<string> {
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    
    if (!validImageTypes.includes(file.type)) {
      throw new Error(
        `Unsupported image type: ${file.type}. Supported types: JPG, PNG`
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      throw new Error("Image file size exceeds 10MB limit");
    }

    const base64 = await this.fileToBase64(file);
    
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is required for image text extraction");
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Extract all text content from this image. Return only the text content, preserving the structure and formatting as much as possible. If there is no text in the image, respond with 'NO_TEXT_FOUND'.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64,
                  },
                },
              ],
            },
          ],
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI Vision API error: ${error.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const extractedText = data.choices[0]?.message?.content || "";

      if (extractedText === "NO_TEXT_FOUND" || extractedText.trim().length < 10) {
        throw new Error(
          "Could not extract sufficient text from the image. Please ensure the image contains clear, readable text."
        );
      }

      return extractedText;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to extract text from image");
    }
  }

  private async extractFromTextFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text || text.trim().length === 0) {
          reject(new Error("File is empty or contains no readable text"));
          return;
        }
        resolve(text);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };

      reader.readAsText(file);
    });
  }

  private async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      
      reader.onerror = () => {
        reject(new Error("Failed to convert file to base64"));
      };
      
      reader.readAsDataURL(file);
    });
  }
}
