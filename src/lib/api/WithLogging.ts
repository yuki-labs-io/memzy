import { NextRequest, NextResponse } from "next/server";
import { Handler, IMiddleware } from "./Types";

export const withLogging: IMiddleware = (handler: Handler) => {
  return async (req, ctx) => {
    const startTime = Date.now();
    const route = req.nextUrl.pathname;

    try {
      console.log(`[API] ${req.method} ${route} - Started`, {
        userId: ctx.userId || "anonymous",
        timestamp: new Date().toISOString(),
      });

      const response = await handler(req, ctx);
      const duration = Date.now() - startTime;

      console.log(`[API] ${req.method} ${route} - Success`, {
        userId: ctx.userId || "anonymous",
        status: response.status,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      return response;
    } catch (error) {
      const duration = Date.now() - startTime;

      console.error(`[API] ${req.method} ${route} - Error`, {
        userId: ctx.userId || "anonymous",
        error: error instanceof Error ? error.message : "Unknown error",
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });

      throw error;
    }
  };
};
