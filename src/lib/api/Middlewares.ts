import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { Handler, RequestContext } from "./Types";
import { DomainError } from "@/context/domain/errors/LLMErrors";

export function withAuth(): (handler: Handler) => Handler {
  return (handler: Handler) => {
    return async (req: NextRequest, ctx: RequestContext) => {
      const session = await auth();

      if (!session?.user?.email) {
        return NextResponse.json(
          { error: "Unauthorized. Please sign in to use this feature." },
          { status: 401 }
        );
      }

      ctx.userId = session.user.email;

      return handler(req, ctx);
    };
  };
}

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

export function withErrorHandler(): (handler: Handler) => Handler {
  return (handler: Handler) => {
    return async (req: NextRequest, ctx: RequestContext) => {
      try {
        return await handler(req, ctx);
      } catch (error) {
        console.error("[API Error]", error);

        if (error instanceof DomainError) {
          const statusMap: Record<string, number> = {
            INVALID_KEY: 401,
            MODEL_NOT_SUPPORTED: 400,
            PROVIDER_UNAVAILABLE: 503,
            RATE_LIMIT: 429,
            LLM_NOT_CONFIGURED: 400,
            INVALID_PROVIDER: 400,
          };

          return NextResponse.json(
            {
              error: error.message,
              code: error.code,
            },
            { status: statusMap[error.code] || 500 }
          );
        }

        if (error instanceof Error) {
          if (
            error.message.includes("Content is too short") ||
            error.message.includes("Content is too long") ||
            error.message.includes("Content text is required") ||
            error.message.includes("Card count must be")
          ) {
            return NextResponse.json({ error: error.message }, { status: 400 });
          }

          return NextResponse.json(
            { error: error.message },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { error: "An unexpected error occurred" },
          { status: 500 }
        );
      }
    };
  };
}

export function withJsonBody(): (handler: Handler) => Handler {
  return (handler: Handler) => {
    return async (req: NextRequest, ctx: RequestContext) => {
      try {
        const body = await req.json();
        ctx.body = body;
        return handler(req, ctx);
      } catch (error) {
        return NextResponse.json(
          { error: "Invalid JSON body" },
          { status: 400 }
        );
      }
    };
  };
}
