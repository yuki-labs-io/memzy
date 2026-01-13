import { pipeline, createHandler } from "@/lib/api/Pipeline";
import { withAuth, withLogging, withErrorHandler } from "@/lib/api/middlewares";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { SaveLLMConfigHandler } from "@/context/application/handlers/SaveLLMConfig.handler";
import { GetLLMConfigHandler } from "@/context/application/handlers/GetLLMConfig.handler";

export const POST = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "llm-config" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<SaveLLMConfigHandler>(DI_TYPES.SaveLLMConfigHandler);
    return handler.handle(req, ctx);
  })
);

export const GET = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "llm-config" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<GetLLMConfigHandler>(DI_TYPES.GetLLMConfigHandler);
    return handler.handle(req, ctx);
  })
);
