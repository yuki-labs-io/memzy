import { NextResponse } from "next/server";
import { Handler, IMiddleware } from "./Types";
import { DomainError } from "@/context/domain/errors/LLMErrors";

export const withErrorHandling: IMiddleware = (handler: Handler) => {
  return async (req, ctx) => {
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
