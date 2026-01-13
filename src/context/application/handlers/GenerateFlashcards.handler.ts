import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { GenerateFlashcardsInput } from "../dtos/flashcard-generation.dto";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { LLMNotConfiguredError } from "@/context/domain/errors/LLMErrors";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";

export class GenerateFlashcardsHandler {
  constructor(
    private readonly llmConfigRepository: ILLMConfigRepository,
    private readonly llmProviderRegistry: ILLMProviderRegistry,
    private readonly encryptionService: IEncryptionService
  ) {}

  async handle(req: NextRequest, ctx: RequestContext): Promise<NextResponse> {
    const { userId } = ctx;
    const body: GenerateFlashcardsInput = await req.json();

    if (!body.contentText || body.contentText.trim().length === 0) {
      return NextResponse.json(
        { error: "Content text is required and cannot be empty" },
        { status: 400 }
      );
    }

    const wordCount = body.contentText.trim().split(/\s+/).filter(Boolean).length;

    if (wordCount < 20) {
      return NextResponse.json(
        { error: "Content is too short. Please provide at least 20 words for flashcard generation." },
        { status: 400 }
      );
    }

    if (wordCount > 5000) {
      return NextResponse.json(
        { error: "Content is too long. Please limit your content to 5000 words or less." },
        { status: 400 }
      );
    }

    if (body.options?.cardCount) {
      if (body.options.cardCount < 5 || body.options.cardCount > 30) {
        return NextResponse.json(
          { error: "Card count must be between 5 and 30" },
          { status: 400 }
        );
      }
    }

    const settings = await this.llmConfigRepository.getUserLLMSettings(userId);
    if (!settings) {
      throw new LLMNotConfiguredError();
    }

    const adapter = this.llmProviderRegistry.resolve(settings.provider);
    const apiKey = this.encryptionService.decrypt(settings.apiKeyEnc);

    const result = await adapter.generateFlashCards(
      apiKey,
      settings.model,
      body.contentText,
      body.options
    );

    return NextResponse.json({
      cards: result.cards,
      meta: result.meta,
    });
  }
}
