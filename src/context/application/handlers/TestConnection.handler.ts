import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { ITestConnectionInput } from "../dtos/LLMConfig.dto";
import { PROVIDER_MODELS } from "@/context/domain/entities/LLMConfig.entity";
import { ModelNotSupportedError } from "@/context/domain/errors/LLMErrors";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";

export class TestConnectionHandler {
  constructor(private readonly llmProviderRegistry: ILLMProviderRegistry) {}

  async handle(req: NextRequest, ctx: RequestContext): Promise<NextResponse> {
    const body: ITestConnectionInput = await req.json();
    const { provider, model, apiKey } = body;

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

    return NextResponse.json({
      status: "success",
      message: "Connection test successful",
    });
  }
}
