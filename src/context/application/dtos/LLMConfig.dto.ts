import { LLMProvider, LLMModel } from "@/context/domain/entities/LLMConfig.entity";

export interface SaveLLMConfigInput {
  provider: LLMProvider;
  model: LLMModel;
  apiKey: string;
}

export interface SaveLLMConfigOutput {
  status: string;
  provider: LLMProvider;
  model: LLMModel;
}

export interface GetLLMConfigOutput {
  provider: LLMProvider;
  model: LLMModel;
  apiKeyMasked: string;
  configured: boolean;
}

export interface TestConnectionInput {
  provider: LLMProvider;
  model: LLMModel;
  apiKey: string;
}

export interface TestConnectionOutput {
  status: string;
  message: string;
}
