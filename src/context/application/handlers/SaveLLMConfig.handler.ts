import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { ISaveLLMConfigInput } from "../dtos/LLMConfig.dto";
import { PROVIDER_MODELS } from "@/context/domain/entities/LLMConfig.entity";
import { ModelNotSupportedError } from "@/context/domain/errors/LLMErrors";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";

export class SaveLLMConfigHandler {
  constructor(
    private readonly llmProviderRegistry: ILLMProviderRegistry,
    private readonly encryptionService: IEncryptionService,
    private readonly llmConfigRepository: ILLMConfigRepository
  ) {}

  async handle(req: NextRequest, ctx: RequestContext): Promise<NextResponse> {
    const body: ISaveLLMConfigInput = await req.json();
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

    const adapter = this.llmProviderRegistry.resolve(provider);
    await adapter.testConnection(apiKey, model);

    const encrypted = this.encryptionService.encrypt(apiKey);

    await this.llmConfigRepository.upsertUserLLMSettings({
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
}
