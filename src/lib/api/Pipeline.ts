import { NextRequest, NextResponse } from "next/server";
import { Handler, RequestContext } from "./Types";

export type PipelineMiddleware = (
  handler: Handler
) => (req: NextRequest, ctx: RequestContext) => Promise<NextResponse>;

export function pipeline(...middlewares: PipelineMiddleware[]): Handler {
  return (req: NextRequest, ctx: RequestContext) => {
    const [handler, ...middlewaresList] = middlewares.reverse();
    
    const composedHandler = middlewaresList.reduce(
      (acc, middleware) => middleware(acc),
      handler as Handler
    );
    
    return composedHandler(req, ctx);
  };
}

export function createHandler(handler: Handler): PipelineMiddleware {
  return () => handler;
}
