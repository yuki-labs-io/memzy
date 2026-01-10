import {
  FlashcardGenerationResult,
  FlashcardGenerationOptions,
  DEFAULT_OPTIONS,
} from "@/context/domain/entities/flashcard.entity";

export interface LLMService {
  generateFlashcards(
    content: string,
    options?: FlashcardGenerationOptions
  ): Promise<FlashcardGenerationResult>;
}

export class OpenAIFlashcardService implements LLMService {
  private apiKey: string;
  private model: string = "gpt-4o-mini";

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || "";
    if (!this.apiKey) {
      throw new Error("OpenAI API key is required");
    }
  }

  async generateFlashcards(
    content: string,
    options?: FlashcardGenerationOptions
  ): Promise<FlashcardGenerationResult> {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    const prompt = this.buildPrompt(content, opts);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
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

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
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
          model: this.model,
          generatedAt: new Date().toISOString(),
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to generate flashcards: ${error.message}`);
      }
      throw new Error("Failed to generate flashcards: Unknown error");
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
