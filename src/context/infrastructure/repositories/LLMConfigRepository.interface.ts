import { ILLMConfiguration } from "@/context/domain/entities/LLMConfig.entity";

export interface ILLMConfigRepository {
  upsertUserLLMSettings(config: Omit<ILLMConfiguration, "createdAt" | "updatedAt">): Promise<void>;
  getUserLLMSettings(userId: string): Promise<ILLMConfiguration | null>;
  deleteUserLLMSettings(userId: string): Promise<void>;
}
