import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/WithAuth";
import { withLogging } from "@/lib/api/WithLogging";
import { withErrorHandling } from "@/lib/api/WithErrorHandling";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { SaveLLMConfigHandler } from "@/context/application/handlers/SaveLLMConfig.handler";
import { GetLLMConfigHandler } from "@/context/application/handlers/GetLLMConfig.handler";

export async function POST(req: NextRequest) {
  const handler = container.resolve<SaveLLMConfigHandler>(DI_TYPES.SaveLLMConfigHandler);
  return withAuth(
    withLogging(
      withErrorHandling((req, ctx) => handler.handle(req, ctx))
    )
  )(req, {} as any);
}

export async function GET(req: NextRequest) {
  const handler = container.resolve<GetLLMConfigHandler>(DI_TYPES.GetLLMConfigHandler);
  return withAuth(
    withLogging(
      withErrorHandling((req, ctx) => handler.handle(req, ctx))
    )
  )(req, {} as any);
}
