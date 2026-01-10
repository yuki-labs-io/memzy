export interface Flashcard {
  id: string;
  front: string;
  back: string;
  tags: string[];
  sourceQuote?: string;
}

export interface FlashcardGenerationMeta {
  language: string;
  cardCount: number;
  model: string;
  generatedAt: string;
}

export interface FlashcardGenerationResult {
  cards: Flashcard[];
  meta: FlashcardGenerationMeta;
}

export type SourceType = "text" | "file" | "image";
export type Difficulty = "basic" | "intermediate" | "advanced";
export type CardStyle = "qa" | "concept";

export interface FlashcardGenerationOptions {
  language?: string;
  cardCount?: number;
  difficulty?: Difficulty;
  style?: CardStyle;
}

export const DEFAULT_OPTIONS: Required<FlashcardGenerationOptions> = {
  language: "pt-BR",
  cardCount: 12,
  difficulty: "basic",
  style: "qa",
};
