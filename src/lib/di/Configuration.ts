import { container } from "./Container";
import { DI_TYPES } from "./DITypes";

// Infrastructure Services
import { EncryptionService, IEncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { PrismaLLMConfigRepository } from "@/context/infrastructure/repositories/PrismaLLMConfigRepository";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { DeckRepository } from "@/context/infrastructure/repositories/DeckRepository";
import { IDeckRepository } from "@/context/infrastructure/repositories/DeckRepository.interface";
import { UserRepository } from "@/context/infrastructure/repositories/UserRepository";
import { IUserRepository } from "@/context/infrastructure/repositories/UserRepository.interface";
import { prisma } from "@/lib/prisma/Client";

// Adapters
import { OpenAIAdapter } from "@/context/infrastructure/adapters/OpenAIAdapter";
import { AnthropicAdapter } from "@/context/infrastructure/adapters/AnthropicAdapter";
import { ILLMAdapter, ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import { LLMProvider } from "@/context/domain/entities/LLMConfig.entity";
import { InvalidProviderError } from "@/context/domain/errors/LLMErrors";

// Handlers
import { SaveLLMConfigHandler } from "@/context/application/handlers/SaveLLMConfig.handler";
import { GetLLMConfigHandler } from "@/context/application/handlers/GetLLMConfig.handler";
import { TestConnectionHandler } from "@/context/application/handlers/TestConnection.handler";
import { GenerateFlashcardsHandler } from "@/context/application/handlers/GenerateFlashcards.handler";
import { ExtractImageTextHandler } from "@/context/application/handlers/ExtractImageText.handler";
import { CreateDeckHandler } from "@/context/application/handlers/CreateDeck.handler";
import { GetUserDecksHandler } from "@/context/application/handlers/GetUserDecks.handler";

// Provider Registry Implementation
class ProviderRegistry implements ILLMProviderRegistry {
  private providers: Map<LLMProvider, ILLMAdapter> = new Map();

  register(provider: LLMProvider, adapter: ILLMAdapter): void {
    this.providers.set(provider, adapter);
  }

  resolve(provider: LLMProvider): ILLMAdapter {
    const adapter = this.providers.get(provider);
    if (!adapter) {
      throw new InvalidProviderError(provider);
    }
    return adapter;
  }
}

// Register Infrastructure Services as Singletons
container.registerSingleton<IEncryptionService>(
  DI_TYPES.IEncryptionService,
  () => new EncryptionService()
);

container.registerSingleton<ILLMConfigRepository>(
  DI_TYPES.ILLMConfigRepository,
  () => new PrismaLLMConfigRepository()
);

container.register<IDeckRepository>(
  DI_TYPES.IDeckRepository,
  () => new DeckRepository(prisma)
);

container.registerSingleton<IUserRepository>(
  DI_TYPES.IUserRepository,
  () => new UserRepository(prisma)
);

// Register Adapters as Singletons
container.registerSingleton<ILLMAdapter>(
  DI_TYPES.IOpenAIAdapter,
  () => new OpenAIAdapter()
);

container.registerSingleton<ILLMAdapter>(
  DI_TYPES.IAnthropicAdapter,
  () => new AnthropicAdapter()
);

// Register Provider Registry as Singleton
container.registerSingleton<ILLMProviderRegistry>(
  DI_TYPES.ILLMProviderRegistry,
  () => {
    const registry = new ProviderRegistry();
    registry.register("openai", container.resolve<ILLMAdapter>(DI_TYPES.IOpenAIAdapter));
    registry.register("anthropic", container.resolve<ILLMAdapter>(DI_TYPES.IAnthropicAdapter));
    return registry;
  }
);

// Register Handlers
container.register<SaveLLMConfigHandler>(
  DI_TYPES.SaveLLMConfigHandler,
  () => new SaveLLMConfigHandler(
    container.resolve<ILLMProviderRegistry>(DI_TYPES.ILLMProviderRegistry),
    container.resolve<IEncryptionService>(DI_TYPES.IEncryptionService),
    container.resolve<ILLMConfigRepository>(DI_TYPES.ILLMConfigRepository)
  )
);

container.register<GetLLMConfigHandler>(
  DI_TYPES.GetLLMConfigHandler,
  () => new GetLLMConfigHandler(
    container.resolve<ILLMConfigRepository>(DI_TYPES.ILLMConfigRepository),
    container.resolve<IEncryptionService>(DI_TYPES.IEncryptionService)
  )
);

container.register<TestConnectionHandler>(
  DI_TYPES.TestConnectionHandler,
  () => new TestConnectionHandler(
    container.resolve<ILLMProviderRegistry>(DI_TYPES.ILLMProviderRegistry)
  )
);

container.register<GenerateFlashcardsHandler>(
  DI_TYPES.GenerateFlashcardsHandler,
  () => new GenerateFlashcardsHandler(
    container.resolve<ILLMConfigRepository>(DI_TYPES.ILLMConfigRepository),
    container.resolve<ILLMProviderRegistry>(DI_TYPES.ILLMProviderRegistry),
    container.resolve<IEncryptionService>(DI_TYPES.IEncryptionService)
  )
);

container.register<ExtractImageTextHandler>(
  DI_TYPES.ExtractImageTextHandler,
  () => new ExtractImageTextHandler(
    container.resolve<ILLMConfigRepository>(DI_TYPES.ILLMConfigRepository),
    container.resolve<ILLMProviderRegistry>(DI_TYPES.ILLMProviderRegistry),
    container.resolve<IEncryptionService>(DI_TYPES.IEncryptionService)
  )
);

container.register<CreateDeckHandler>(
  DI_TYPES.CreateDeckHandler,
  () => new CreateDeckHandler(
    container.resolve<IDeckRepository>(DI_TYPES.IDeckRepository)
  )
);

container.register<GetUserDecksHandler>(
  DI_TYPES.GetUserDecksHandler,
  () => new GetUserDecksHandler(
    container.resolve<IDeckRepository>(DI_TYPES.IDeckRepository)
  )
);

export { container };
