import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { SaveLLMConfigInput } from "../dtos/LLMConfig.dto";
import { PROVIDER_MODELS } from "@/context/domain/entities/LLMConfig.entity";
import { ModelNotSupportedError } from "@/context/domain/errors/LLMErrors";
import { resolveProvider } from "@/context/infrastructure/adapters/ProviderRegistry";
import { EncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { llmConfigRepository } from "@/context/infrastructure/repositories/PrismaLLMConfigRepository";

export async function saveLLMConfigHandler(req: NextRequest, ctx: RequestContext) {
  const body: SaveLLMConfigInput = await req.json();
  const { provider, model, apiKey } = body;
  const { userId } = ctx;

  if (!provider || !model || !apiKey) {
    return NextResponse.json(
      { error: "Provider, model, and API key are required" },
      { status: 400 }
    );
  }

  const supportedModels = PROVIDER_MODELS[provider];
  if (!supportedModels || !supportedModels.includes(model)) {
    throw new ModelNotSupportedError(model, provider);
  }

  const adapter = resolveProvider(provider);
  await adapter.testConnection(apiKey, model);

  const encryptionService = new EncryptionService();
  const encrypted = encryptionService.encrypt(apiKey);

  await llmConfigRepository.upsertUserLLMSettings({
    userId,
    provider,
    model,
    apiKeyEnc: encrypted,
  });

  return NextResponse.json({
    status: "ok",
    provider,
    model,
  });
}
