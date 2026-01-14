import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { GenerateFlashcardsInput } from "../dtos/flashcard-generation.dto";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { LLMNotConfiguredError } from "@/context/domain/errors/LLMErrors";
import { ILLMProviderRegistry } from "@/context/infrastructure/adapters/LLMAdapter.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";
import { 
  CARD_COUNT_MIN, 
  CARD_COUNT_MAX, 
  CONTENT_MIN_CHARS, 
  CONTENT_MAX_CHARS 
} from "@/context/domain/entities/Flashcard.entity";

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

    const contentLength = body.contentText.trim().length;

    if (contentLength < CONTENT_MIN_CHARS) {
      return NextResponse.json(
        { error: `Content is too short. Please provide at least ${CONTENT_MIN_CHARS} characters.` },
        { status: 400 }
      );
    }

    if (contentLength > CONTENT_MAX_CHARS) {
      return NextResponse.json(
        { error: `Content is too long. Please limit your content to ${CONTENT_MAX_CHARS} characters or less.` },
        { status: 400 }
      );
    }

    if (body.options?.cardCount) {
      if (body.options.cardCount < CARD_COUNT_MIN || body.options.cardCount > CARD_COUNT_MAX) {
        return NextResponse.json(
          { error: `Card count must be between ${CARD_COUNT_MIN} and ${CARD_COUNT_MAX}` },
          { status: 400 }
        );
      }
    }

    if (body.options?.focusTypes && body.options.focusTypes.length === 0) {
      return NextResponse.json(
        { error: "At least one focus type must be selected" },
        { status: 400 }
      );
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
