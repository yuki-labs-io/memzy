import { LLMModel, LLMProvider } from "@/context/domain/entities/LLMConfig.entity";
import {
  FlashcardGenerationOptions,
  FlashcardGenerationResult,
} from "@/context/domain/entities/flashcard.entity";

export interface LLMAdapter {
  testConnection(apiKey: string, model: LLMModel): Promise<void>;
  generateFlashCards(
    apiKey: string,
    model: LLMModel,
    content: string,
    options?: FlashcardGenerationOptions
  ): Promise<FlashcardGenerationResult>;
}

export interface LLMProviderRegistry {
  register(provider: LLMProvider, adapter: LLMAdapter): void;
  resolve(provider: LLMProvider): LLMAdapter;
}
