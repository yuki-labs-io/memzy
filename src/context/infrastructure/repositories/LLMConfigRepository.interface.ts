import { LLMConfiguration } from "@/context/domain/entities/LLMConfig.entity";

export interface LLMConfigRepository {
  upsertUserLLMSettings(config: Omit<LLMConfiguration, "createdAt" | "updatedAt">): Promise<void>;
  getUserLLMSettings(userId: string): Promise<LLMConfiguration | null>;
  deleteUserLLMSettings(userId: string): Promise<void>;
}
