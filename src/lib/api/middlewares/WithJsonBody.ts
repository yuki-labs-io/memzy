import { NextRequest, NextResponse } from "next/server";
import { Handler, RequestContext } from "../Types";

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
