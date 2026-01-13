import { LLMProvider, LLMModel } from "@/context/domain/entities/LLMConfig.entity";

export interface ISaveLLMConfigInput {
  provider: LLMProvider;
  model: LLMModel;
  apiKey: string;
}

export interface ISaveLLMConfigOutput {
  status: string;
  provider: LLMProvider;
  model: LLMModel;
}

export interface IGetLLMConfigOutput {
  provider: LLMProvider;
  model: LLMModel;
  apiKeyMasked: string;
  configured: boolean;
}

export interface ITestConnectionInput {
  provider: LLMProvider;
  model: LLMModel;
  apiKey: string;
}

export interface ITestConnectionOutput {
  status: string;
  message: string;
}
