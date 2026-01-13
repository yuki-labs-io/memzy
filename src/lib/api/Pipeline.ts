import { NextRequest, NextResponse } from "next/server";
import { Handler, RequestContext } from "./Types";

export type PipelineMiddleware = (
  handler: Handler
) => (req: NextRequest, ctx: RequestContext) => Promise<NextResponse>;

type NextRouteHandler = (
  request: NextRequest,
  context: { params: Promise<Record<string, string>> }
) => Promise<NextResponse>;

export function pipeline(...middlewares: PipelineMiddleware[]): NextRouteHandler {
  return async (req: NextRequest, _context: { params: Promise<Record<string, string>> }) => {
    const ctx: RequestContext = { userId: "" };

    const [lastMiddleware, ...restMiddlewares] = middlewares.reverse();

    const baseHandler = lastMiddleware(async () => NextResponse.json({ error: "Not implemented" }, { status: 500 }));

    const composedHandler = restMiddlewares.reduce<Handler>(
      (acc, middleware) => middleware(acc),
      baseHandler
    );

    return composedHandler(req, ctx);
  };
}

export function createHandler(handler: Handler): PipelineMiddleware {
  return () => handler;
}
