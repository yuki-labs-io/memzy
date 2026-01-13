import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { llmConfigRepository } from "@/context/infrastructure/repositories/PrismaLLMConfigRepository";
import { EncryptionService } from "@/context/infrastructure/services/EncryptionService";

export async function getLLMConfigHandler(req: NextRequest, ctx: RequestContext) {
  const { userId } = ctx;

  const settings = await llmConfigRepository.getUserLLMSettings(userId);

  if (!settings) {
    return NextResponse.json({
      configured: false,
    });
  }

  const encryptionService = new EncryptionService();
  const decryptedKey = encryptionService.decrypt(settings.apiKeyEnc);
  const maskedKey = encryptionService.maskApiKey(decryptedKey);

  return NextResponse.json({
    configured: true,
    provider: settings.provider,
    model: settings.model,
    apiKeyMasked: maskedKey,
  });
}
