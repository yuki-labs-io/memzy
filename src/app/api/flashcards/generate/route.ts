import { pipeline, createHandler } from "@/lib/api/Pipeline";
import { withAuth, withLogging, withErrorHandler } from "@/lib/api/Middlewares";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { GenerateFlashcardsHandler } from "@/context/application/handlers/GenerateFlashcards.handler";

export const POST = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "flashcards-generate" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<GenerateFlashcardsHandler>(DI_TYPES.GenerateFlashcardsHandler);
    return handler.handle(req, ctx);
  })
);
