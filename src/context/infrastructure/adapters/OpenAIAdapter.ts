import { ILLMAdapter } from "./LLMAdapter.interface";
import { LLMModel } from "@/context/domain/entities/LLMConfig.entity";
import {
  FlashcardGenerationOptions,
  FlashcardGenerationResult,
  DEFAULT_OPTIONS,
} from "@/context/domain/entities/flashcard.entity";
import {
  InvalidAPIKeyError,
  ProviderUnavailableError,
  RateLimitError,
} from "@/context/domain/errors/LLMErrors";

export class OpenAIAdapter implements ILLMAdapter {
  private readonly baseUrl = "https://api.openai.com/v1";

  async testConnection(apiKey: string, model: LLMModel): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (response.status === 401) {
        throw new InvalidAPIKeyError("Invalid OpenAI API key");
      }

      if (response.status === 403) {
        throw new InvalidAPIKeyError(
          "API key lacks necessary permissions. Please check your OpenAI account."
        );
      }

      if (response.status === 429) {
        throw new RateLimitError("OpenAI rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        throw new ProviderUnavailableError("openai", `OpenAI API error: ${response.statusText}`);
      }
    } catch (error) {
      if (
        error instanceof InvalidAPIKeyError ||
        error instanceof RateLimitError ||
        error instanceof ProviderUnavailableError
      ) {
        throw error;
      }
      throw new ProviderUnavailableError(
        "openai",
        "Unable to connect to OpenAI. Please check your internet connection and try again."
      );
    }
  }

  async generateFlashCards(
    apiKey: string,
    model: LLMModel,
    content: string,
    options?: FlashcardGenerationOptions
  ): Promise<FlashcardGenerationResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const prompt = this.buildPrompt(content, opts);

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content:
                "You are an educational content expert specialized in creating high-quality flashcards for learning.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      if (response.status === 401) {
        throw new InvalidAPIKeyError("Invalid OpenAI API key");
      }

      if (response.status === 429) {
        throw new RateLimitError("OpenAI rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new ProviderUnavailableError(
          "openai",
          `OpenAI API error: ${error.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const content_text = data.choices[0]?.message?.content;

      if (!content_text) {
        throw new Error("No content received from OpenAI");
      }

      let parsedResult: any;
      try {
        parsedResult = JSON.parse(content_text);
      } catch (parseError) {
        throw new Error("Failed to parse OpenAI response as valid JSON");
      }

      if (!parsedResult.cards || !Array.isArray(parsedResult.cards)) {
        throw new Error("Invalid response format: missing or invalid cards array");
      }

      return {
        cards: parsedResult.cards.map((card: any, index: number) => ({
          id: card.id || `fc_${String(index + 1).padStart(3, "0")}`,
          front: card.front || card.question || "",
          back: card.back || card.answer || "",
          tags: card.tags || [],
          sourceQuote: card.sourceQuote,
        })),
        meta: {
          language: opts.language,
          cardCount: parsedResult.cards.length,
          model,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (
        error instanceof InvalidAPIKeyError ||
        error instanceof RateLimitError ||
        error instanceof ProviderUnavailableError
      ) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to generate flashcards: ${error.message}`);
      }
      throw new Error("Failed to generate flashcards: Unknown error");
    }
  }

  async extractTextFromImage(
    apiKey: string,
    model: LLMModel,
    imageBase64: string
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
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
                    url: imageBase64,
                  },
                },
              ],
            },
          ],
          max_tokens: 4096,
        }),
      });

      if (response.status === 401) {
        throw new InvalidAPIKeyError("Invalid OpenAI API key");
      }

      if (response.status === 429) {
        throw new RateLimitError("OpenAI rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new ProviderUnavailableError(
          "openai",
          `OpenAI Vision API error: ${error.error?.message || response.statusText}`
        );
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
      if (
        error instanceof InvalidAPIKeyError ||
        error instanceof RateLimitError ||
        error instanceof ProviderUnavailableError
      ) {
        throw error;
      }
      if (error instanceof Error) {
        throw new Error(`Failed to extract text from image: ${error.message}`);
      }
      throw new Error("Failed to extract text from image: Unknown error");
    }
  }

  private buildPrompt(content: string, options: Required<FlashcardGenerationOptions>): string {
    const styleInstructions =
      options.style === "qa"
        ? "Each flashcard should have a clear question on the front and a complete answer on the back."
        : "Each flashcard should have a concept or term on the front and its definition or explanation on the back.";

    const difficultyInstructions = {
      basic: "Focus on fundamental concepts and core ideas that are essential for beginners.",
      intermediate:
        "Include more detailed concepts and relationships between ideas for learners with some background.",
      advanced:
        "Create cards that test deep understanding, edge cases, and complex relationships for advanced learners.",
    };

    return `Analyze the following content and generate ${options.cardCount} flashcards in ${options.language} to help students learn the key concepts.

Instructions:
- Identify the most important concepts, facts, and relationships in the content
- Create exactly ${options.cardCount} flashcards (or fewer if content doesn't support that many)
- ${styleInstructions}
- Difficulty level: ${options.difficulty} - ${difficultyInstructions[options.difficulty]}
- Each answer should be concise but complete
- Focus on understanding, not just memorization
- Include relevant tags for categorization
- Optionally include a brief source quote that the card is based on
- Format your response as a JSON object with the following structure:

{
  "cards": [
    {
      "id": "fc_001",
      "front": "Question or concept here",
      "back": "Answer or explanation here",
      "tags": ["tag1", "tag2"],
      "sourceQuote": "Optional brief quote from source"
    }
  ]
}

Content to analyze:
${content}

Remember to respond ONLY with valid JSON, no additional text.`;
  }
}
