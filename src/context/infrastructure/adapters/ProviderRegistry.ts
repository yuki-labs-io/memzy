import { LLMAdapter, LLMProviderRegistry } from "./LLMAdapter.interface";
import { LLMProvider } from "@/context/domain/entities/LLMConfig.entity";
import { InvalidProviderError } from "@/context/domain/errors/LLMErrors";
import { OpenAIAdapter } from "./OpenAIAdapter";
import { AnthropicAdapter } from "./AnthropicAdapter";

class ProviderRegistry implements LLMProviderRegistry {
  private providers: Map<LLMProvider, LLMAdapter> = new Map();

  register(provider: LLMProvider, adapter: LLMAdapter): void {
    this.providers.set(provider, adapter);
  }

  resolve(provider: LLMProvider): LLMAdapter {
    const adapter = this.providers.get(provider);
    if (!adapter) {
      throw new InvalidProviderError(provider);
    }
    return adapter;
  }
}

const registry = new ProviderRegistry();
registry.register("openai", new OpenAIAdapter());
registry.register("anthropic", new AnthropicAdapter());

export const llmProviderRegistry = registry;
export function resolveProvider(provider: LLMProvider): LLMAdapter {
  return llmProviderRegistry.resolve(provider);
}
