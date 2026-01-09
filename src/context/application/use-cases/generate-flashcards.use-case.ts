import {
  GenerateFlashcardsInput,
  GenerateFlashcardsOutput,
} from "@/context/application/dtos/flashcard-generation.dto";
import { LLMService } from "@/context/infrastructure/services/openai-flashcard.service";

export class GenerateFlashcardsUseCase {
  constructor(private llmService: LLMService) {}

  async execute(input: GenerateFlashcardsInput): Promise<GenerateFlashcardsOutput> {
    this.validateInput(input);

    const result = await this.llmService.generateFlashcards(
      input.contentText,
      input.options
    );

    return {
      cards: result.cards,
      meta: result.meta,
    };
  }

  private validateInput(input: GenerateFlashcardsInput): void {
    if (!input.contentText || input.contentText.trim().length === 0) {
      throw new Error("Content text is required and cannot be empty");
    }

    const wordCount = input.contentText.trim().split(/\s+/).length;

    if (wordCount < 20) {
      throw new Error(
        "Content is too short. Please provide at least 20 words for flashcard generation."
      );
    }

    if (wordCount > 5000) {
      throw new Error(
        "Content is too long. Please limit your content to 5000 words or less."
      );
    }

    if (input.options?.cardCount) {
      if (input.options.cardCount < 5 || input.options.cardCount > 30) {
        throw new Error("Card count must be between 5 and 30");
      }
    }
  }
}
