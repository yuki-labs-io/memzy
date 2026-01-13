export const DI_TYPES = {
  // Infrastructure
  IEncryptionService: "IEncryptionService",
  ILLMConfigRepository: "ILLMConfigRepository",
  ILLMProviderRegistry: "ILLMProviderRegistry",
  
  // Adapters
  IOpenAIAdapter: "IOpenAIAdapter",
  IAnthropicAdapter: "IAnthropicAdapter",
  
  // Handlers
  SaveLLMConfigHandler: "SaveLLMConfigHandler",
  GetLLMConfigHandler: "GetLLMConfigHandler",
  TestConnectionHandler: "TestConnectionHandler",
  GenerateFlashcardsHandler: "GenerateFlashcardsHandler",
} as const;
