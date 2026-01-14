import {
  SourceType,
  FlashcardGenerationOptions,
} from "@/context/domain/entities/Flashcard.entity";

export interface GenerateFlashcardsInput {
  sourceType: SourceType;
  contentText: string;
  options?: FlashcardGenerationOptions;
}

export interface GenerateFlashcardsOutput {
  cards: Array<{
    id: string;
    front: string;
    back: string;
    tags: string[];
    sourceQuote?: string;
  }>;
  meta: {
    language: string;
    cardCount: number;
    model: string;
    generatedAt: string;
  };
}
