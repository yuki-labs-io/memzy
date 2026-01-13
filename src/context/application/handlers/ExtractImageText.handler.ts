import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { LLMProvider, LLMModel } from "@/context/domain/entities/LLMConfig.entity";

export class ExtractImageTextHandler {
  constructor(
    private readonly llmConfigRepository: ILLMConfigRepository,
    private readonly llmProviderRegistry: ILLMProviderRegistry,
    private readonly encryptionService: IEncryptionService
  ) {}

  async handle(req: NextRequest, ctx: RequestContext): Promise<NextResponse> {
    const { userId } = ctx;

    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    const config = await this.llmConfigRepository.getUserLLMSettings(userId);

    if (!config) {
      return NextResponse.json(
        {
          error: "LLM provider not configured. Please configure in Settings → AI.",
          code: "LLM_NOT_CONFIGURED",
        },
        { status: 428 }
      );
    }

    const apiKey = this.encryptionService.decrypt(config.apiKeyEnc);
    const adapter = this.llmProviderRegistry.resolve(config.provider as LLMProvider);

    try {
      const extractedText = await adapter.extractTextFromImage(
        apiKey,
        config.model as LLMModel,
        image
      );

      return NextResponse.json({ text: extractedText });
    } catch (error) {
      console.error("Image text extraction error:", error);

      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: "An unexpected error occurred during text extraction" },
        { status: 500 }
      );
    }
  }
}
