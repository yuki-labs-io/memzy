import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { ILLMConfigRepository } from "@/context/infrastructure/repositories/LLMConfigRepository.interface";
import { IEncryptionService } from "@/context/infrastructure/services/EncryptionService";

export class GetLLMConfigHandler {
  constructor(
    private readonly llmConfigRepository: ILLMConfigRepository,
    private readonly encryptionService: IEncryptionService
  ) {}

  async handle(req: NextRequest, ctx: RequestContext): Promise<NextResponse> {
    const { userId } = ctx;

    const settings = await this.llmConfigRepository.getUserLLMSettings(userId);

    if (!settings) {
      return NextResponse.json({
        configured: false,
      });
    }

    const decryptedKey = this.encryptionService.decrypt(settings.apiKeyEnc);
    const maskedKey = this.encryptionService.maskApiKey(decryptedKey);

    return NextResponse.json({
      configured: true,
      provider: settings.provider,
      model: settings.model,
      apiKeyMasked: maskedKey,
    });
  }
}
