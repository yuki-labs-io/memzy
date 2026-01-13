import { LLMAdapter } from "./LLMAdapter.interface";
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

export class AnthropicAdapter implements LLMAdapter {
  private readonly baseUrl = "https://api.anthropic.com/v1";

  async testConnection(apiKey: string, model: LLMModel): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.mapModelToAnthropicId(model),
          max_tokens: 10,
          messages: [{ role: "user", content: "Hi" }],
        }),
      });

      if (response.status === 401) {
        throw new InvalidAPIKeyError("Invalid Anthropic API key");
      }

      if (response.status === 403) {
        throw new InvalidAPIKeyError(
          "API key lacks necessary permissions. Please check your Anthropic account."
        );
      }

      if (response.status === 429) {
        throw new RateLimitError("Anthropic rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        throw new ProviderUnavailableError(
          "anthropic",
          `Anthropic API error: ${response.statusText}`
        );
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
        "anthropic",
        "Unable to connect to Anthropic. Please check your internet connection and try again."
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
      const response = await fetch(`${this.baseUrl}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.mapModelToAnthropicId(model),
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });

      if (response.status === 401) {
        throw new InvalidAPIKeyError("Invalid Anthropic API key");
      }

      if (response.status === 429) {
        throw new RateLimitError("Anthropic rate limit exceeded. Please try again later.");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new ProviderUnavailableError(
          "anthropic",
          `Anthropic API error: ${error.error?.message || response.statusText}`
        );
      }

      const data = await response.json();
      const content_text = data.content?.[0]?.text;

      if (!content_text) {
        throw new Error("No content received from Anthropic");
      }

      let parsedResult: any;
      try {
        const jsonMatch = content_text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          throw new Error("No JSON found in response");
        }
        parsedResult = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        throw new Error("Failed to parse Anthropic response as valid JSON");
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

  private mapModelToAnthropicId(model: LLMModel): string {
    const modelMap: Record<string, string> = {
      "claude-3.5-sonnet": "claude-3-5-sonnet-20241022",
      "claude-3-opus": "claude-3-opus-20240229",
    };
    return modelMap[model] || model;
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
