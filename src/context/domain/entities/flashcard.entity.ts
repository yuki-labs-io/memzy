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
export type FocusType = "definitions" | "qa" | "dates" | "vocabulary";

export interface FlashcardGenerationOptions {
  language?: string;
  cardCount?: number;
  difficulty?: Difficulty;
  style?: CardStyle;
  focusTypes?: FocusType[];
}

export const DEFAULT_OPTIONS: Required<FlashcardGenerationOptions> = {
  language: "en",
  cardCount: 10,
  difficulty: "basic",
  style: "qa",
  focusTypes: ["definitions", "qa"],
};

export const CARD_COUNT_MIN = 5;
export const CARD_COUNT_MAX = 50;
export const CONTENT_MIN_CHARS = 100;
export const CONTENT_MAX_CHARS = 50000;
