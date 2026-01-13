import { LLMModel, LLMProvider } from "@/context/domain/entities/LLMConfig.entity";
import {
  FlashcardGenerationOptions,
  FlashcardGenerationResult,
} from "@/context/domain/entities/flashcard.entity";

export interface ILLMAdapter {
  testConnection(apiKey: string, model: LLMModel): Promise<void>;
  generateFlashCards(
    apiKey: string,
    model: LLMModel,
    content: string,
    options?: FlashcardGenerationOptions
  ): Promise<FlashcardGenerationResult>;
  extractTextFromImage(
    apiKey: string,
    model: LLMModel,
    imageBase64: string
  ): Promise<string>;
}

export interface ILLMProviderRegistry {
  register(provider: LLMProvider, adapter: ILLMAdapter): void;
  resolve(provider: LLMProvider): ILLMAdapter;
}
