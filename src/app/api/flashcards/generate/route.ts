import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/WithAuth";
import { withLogging } from "@/lib/api/WithLogging";
import { withErrorHandling } from "@/lib/api/WithErrorHandling";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { GenerateFlashcardsHandler } from "@/context/application/handlers/GenerateFlashcards.handler";

export async function POST(req: NextRequest) {
  const handler = container.resolve<GenerateFlashcardsHandler>(DI_TYPES.GenerateFlashcardsHandler);
  return withAuth(
    withLogging(
      withErrorHandling((req, ctx) => handler.handle(req, ctx))
    )
  )(req, {} as any);
}
