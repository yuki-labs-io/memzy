export type LLMProvider = "openai" | "anthropic";

export type OpenAIModel = "gpt-4o" | "gpt-4.1" | "gpt-4o-mini";
export type AnthropicModel = "claude-3.5-sonnet" | "claude-3-opus";

export type LLMModel = OpenAIModel | AnthropicModel;

export interface ILLMConfiguration {
  userId: string;
  provider: LLMProvider;
  model: LLMModel;
  apiKeyEnc: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILLMConfigurationInput {
  provider: LLMProvider;
  model: LLMModel;
  apiKey: string;
}

export const PROVIDER_MODELS: Record<LLMProvider, LLMModel[]> = {
  openai: ["gpt-4o", "gpt-4.1", "gpt-4o-mini"],
  anthropic: ["claude-3.5-sonnet", "claude-3-opus"],
};

export const MODEL_DISPLAY_NAMES: Record<LLMModel, string> = {
  "gpt-4o": "GPT-4o",
  "gpt-4.1": "GPT-4.1",
  "gpt-4o-mini": "GPT-4o Mini",
  "claude-3.5-sonnet": "Claude 3.5 Sonnet",
  "claude-3-opus": "Claude 3 Opus",
};
