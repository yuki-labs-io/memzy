"use server";

import { auth } from "@/lib/auth/auth";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import {
  LLMProvider,
  LLMModel,
  PROVIDER_MODELS,
  MODEL_DISPLAY_NAMES,
} from "@/context/domain/entities/LLMConfig.entity";
import {
  InvalidAPIKeyError,
  ModelNotSupportedError,
  ProviderUnavailableError,
  RateLimitError,
} from "@/context/domain/errors/LLMErrors";

export interface LLMConfigState {
  configured: boolean;
  provider?: LLMProvider;
  model?: LLMModel;
  apiKeyMasked?: string;
  updatedAt?: string;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

async function getAuthenticatedUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.email || null;
}

export async function getLLMConfig(): Promise<ActionResult<LLMConfigState>> {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const repository = container.resolve<ILLMConfigRepository>(
      DI_TYPES.ILLMConfigRepository
    );
    const encryptionService = container.resolve<IEncryptionService>(
      DI_TYPES.IEncryptionService
    );

    const settings = await repository.getUserLLMSettings(userId);

    if (!settings) {
      return {
        success: true,
        data: { configured: false },
      };
    }

    const decryptedKey = encryptionService.decrypt(settings.apiKeyEnc);
    const maskedKey = encryptionService.maskApiKey(decryptedKey);

    return {
      success: true,
      data: {
        configured: true,
        provider: settings.provider,
        model: settings.model,
        apiKeyMasked: maskedKey,
        updatedAt: settings.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    console.error("Error fetching LLM config:", error);
    return { success: false, error: "Failed to fetch configuration" };
  }
}

export async function saveLLMConfig(
  provider: LLMProvider,
  model: LLMModel,
  apiKey: string
): Promise<ActionResult> {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    if (!provider || !model || !apiKey) {
      return { success: false, error: "Provider, model, and API key are required" };
    }

    const supportedModels = PROVIDER_MODELS[provider];
    if (!supportedModels || !supportedModels.includes(model)) {
      return {
        success: false,
        error: `Model ${MODEL_DISPLAY_NAMES[model] || model} is not supported for ${provider}`,
      };
    }

    const registry = container.resolve<ILLMProviderRegistry>(
      DI_TYPES.ILLMProviderRegistry
    );
    const encryptionService = container.resolve<IEncryptionService>(
      DI_TYPES.IEncryptionService
    );
    const repository = container.resolve<ILLMConfigRepository>(
      DI_TYPES.ILLMConfigRepository
    );

    const adapter = registry.resolve(provider);
    await adapter.testConnection(apiKey, model);

    const encrypted = encryptionService.encrypt(apiKey);

    await repository.upsertUserLLMSettings({
      userId,
      provider,
      model,
      apiKeyEnc: encrypted,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof InvalidAPIKeyError) {
      return { success: false, error: error.message };
    }
    if (error instanceof RateLimitError) {
      return { success: false, error: error.message };
    }
    if (error instanceof ProviderUnavailableError) {
      return { success: false, error: error.message };
    }
    if (error instanceof ModelNotSupportedError) {
      return { success: false, error: error.message };
    }
    console.error("Error saving LLM config:", error);
    return { success: false, error: "Failed to save configuration" };
  }
}

export async function testLLMConnection(
  provider: LLMProvider,
  model: LLMModel,
  apiKey: string
): Promise<ActionResult> {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    if (!provider || !model || !apiKey) {
      return { success: false, error: "Provider, model, and API key are required" };
    }

    const supportedModels = PROVIDER_MODELS[provider];
    if (!supportedModels || !supportedModels.includes(model)) {
      return {
        success: false,
        error: `Model ${MODEL_DISPLAY_NAMES[model] || model} is not supported for ${provider}`,
      };
    }

    const registry = container.resolve<ILLMProviderRegistry>(
      DI_TYPES.ILLMProviderRegistry
    );

    const adapter = registry.resolve(provider);
    await adapter.testConnection(apiKey, model);

    return { success: true };
  } catch (error) {
    if (error instanceof InvalidAPIKeyError) {
      return { success: false, error: error.message };
    }
    if (error instanceof RateLimitError) {
      return { success: false, error: error.message };
    }
    if (error instanceof ProviderUnavailableError) {
      return { success: false, error: error.message };
    }
    console.error("Error testing LLM connection:", error);
    return { success: false, error: "Connection test failed" };
  }
}

export async function deleteLLMConfig(): Promise<ActionResult> {
  try {
    const userId = await getAuthenticatedUserId();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const repository = container.resolve<ILLMConfigRepository>(
      DI_TYPES.ILLMConfigRepository
    );

    await repository.deleteUserLLMSettings(userId);

    return { success: true };
  } catch (error) {
    console.error("Error deleting LLM config:", error);
    return { success: false, error: "Failed to delete configuration" };
  }
}

export async function getProviderModels(): Promise<
  ActionResult<{
    providers: { value: LLMProvider; label: string }[];
    models: Record<LLMProvider, { value: LLMModel; label: string }[]>;
  }>
> {
  const providers: { value: LLMProvider; label: string }[] = [
    { value: "openai", label: "OpenAI" },
    { value: "anthropic", label: "Anthropic" },
  ];

  const models: Record<LLMProvider, { value: LLMModel; label: string }[]> = {
    openai: PROVIDER_MODELS.openai.map((m) => ({
      value: m,
      label: MODEL_DISPLAY_NAMES[m],
    })),
    anthropic: PROVIDER_MODELS.anthropic.map((m) => ({
      value: m,
      label: MODEL_DISPLAY_NAMES[m],
    })),
  };

  return { success: true, data: { providers, models } };
}
