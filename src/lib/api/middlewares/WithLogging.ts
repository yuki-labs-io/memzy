import { NextRequest } from "next/server";
import { Handler, RequestContext } from "../Types";

export function withLogging(options?: { resource?: string }): (handler: Handler) => Handler {
  return (handler: Handler) => {
    return async (req: NextRequest, ctx: RequestContext) => {
      const startTime = Date.now();
      const route = req.nextUrl.pathname;
      const resource = options?.resource || "unknown";

      try {
        console.log(`[API] ${req.method} ${route} - Started`, {
          userId: ctx.userId || "anonymous",
          resource,
          timestamp: new Date().toISOString(),
        });

        const response = await handler(req, ctx);
        const duration = Date.now() - startTime;

        console.log(`[API] ${req.method} ${route} - Success`, {
          userId: ctx.userId || "anonymous",
          resource,
          status: response.status,
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });

        return response;
      } catch (error) {
        const duration = Date.now() - startTime;

        console.error(`[API] ${req.method} ${route} - Error`, {
          userId: ctx.userId || "anonymous",
          resource,
          error: error instanceof Error ? error.message : "Unknown error",
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
        });

        throw error;
      }
    };
  };
}
