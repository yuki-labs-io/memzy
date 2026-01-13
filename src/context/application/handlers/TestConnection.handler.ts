import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { TestConnectionInput } from "../dtos/LLMConfig.dto";
import { PROVIDER_MODELS } from "@/context/domain/entities/LLMConfig.entity";
import { ModelNotSupportedError } from "@/context/domain/errors/LLMErrors";
import { resolveProvider } from "@/context/infrastructure/adapters/ProviderRegistry";

export async function testConnectionHandler(req: NextRequest, ctx: RequestContext) {
  const body: TestConnectionInput = await req.json();
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

  const adapter = resolveProvider(provider);
  await adapter.testConnection(apiKey, model);

  return NextResponse.json({
    status: "success",
    message: "Connection test successful",
  });
}
