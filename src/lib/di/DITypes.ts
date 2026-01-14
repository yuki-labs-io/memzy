export const DI_TYPES = {
  // Infrastructure
  IEncryptionService: "IEncryptionService",
  ILLMConfigRepository: "ILLMConfigRepository",
  ILLMProviderRegistry: "ILLMProviderRegistry",
  IDeckRepository: "IDeckRepository",
  
  // Adapters
  IOpenAIAdapter: "IOpenAIAdapter",
  IAnthropicAdapter: "IAnthropicAdapter",
  
  // Handlers
  SaveLLMConfigHandler: "SaveLLMConfigHandler",
  GetLLMConfigHandler: "GetLLMConfigHandler",
  TestConnectionHandler: "TestConnectionHandler",
  GenerateFlashcardsHandler: "GenerateFlashcardsHandler",
  ExtractImageTextHandler: "ExtractImageTextHandler",
  CreateDeckHandler: "CreateDeckHandler",
  GetUserDecksHandler: "GetUserDecksHandler",
} as const;
