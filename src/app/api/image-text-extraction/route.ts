import { pipeline, createHandler } from "@/lib/api/Pipeline";
import { withAuth, withLogging, withErrorHandler } from "@/lib/api/middlewares";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { ExtractImageTextHandler } from "@/context/application/handlers/ExtractImageText.handler";

export const POST = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "image-text-extraction" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<ExtractImageTextHandler>(DI_TYPES.ExtractImageTextHandler);
    return handler.handle(req, ctx);
  })
);
