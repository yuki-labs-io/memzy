import { pipeline, createHandler } from "@/lib/api/Pipeline";
import { withAuth, withLogging, withErrorHandler } from "@/lib/api/middlewares";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { TestConnectionHandler } from "@/context/application/handlers/TestConnection.handler";

export const POST = pipeline(
  withErrorHandler(),
  withAuth(),
  withLogging({ resource: "llm-config-test" }),
  createHandler((req, ctx) => {
    const handler = container.resolve<TestConnectionHandler>(DI_TYPES.TestConnectionHandler);
    return handler.handle(req, ctx);
  })
);
