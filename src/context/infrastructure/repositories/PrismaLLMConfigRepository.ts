import { LLMConfiguration } from "@/context/domain/entities/LLMConfig.entity";
import { LLMConfigRepository } from "./LLMConfigRepository.interface";
import { prisma } from "@/lib/prisma/Client";

export class PrismaLLMConfigRepository implements LLMConfigRepository {
  async upsertUserLLMSettings(
    config: Omit<LLMConfiguration, "createdAt" | "updatedAt">
  ): Promise<void> {
    await prisma.lLMConfiguration.upsert({
      where: {
        userId: config.userId,
      },
      create: {
        userId: config.userId,
        provider: config.provider,
        model: config.model,
        apiKeyEnc: config.apiKeyEnc,
      },
      update: {
        provider: config.provider,
        model: config.model,
        apiKeyEnc: config.apiKeyEnc,
        updatedAt: new Date(),
      },
    });
  }

  async getUserLLMSettings(userId: string): Promise<LLMConfiguration | null> {
    const config = await prisma.lLMConfiguration.findUnique({
      where: {
        userId,
      },
    });

    if (!config) {
      return null;
    }

    return {
      userId: config.userId,
      provider: config.provider as any,
      model: config.model as any,
      apiKeyEnc: config.apiKeyEnc,
      createdAt: config.createdAt,
      updatedAt: config.updatedAt,
    };
  }

  async deleteUserLLMSettings(userId: string): Promise<void> {
    await prisma.lLMConfiguration.delete({
      where: {
        userId,
      },
    });
  }
}

export const llmConfigRepository = new PrismaLLMConfigRepository();
