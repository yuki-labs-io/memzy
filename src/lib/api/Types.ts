import { NextRequest, NextResponse } from "next/server";

export type RequestContext = {
  userId: string;
  [key: string]: any;
};

export type Handler<T = any> = (
  req: NextRequest,
  ctx: RequestContext
) => Promise<NextResponse<T>>;

export type Middleware = (handler: Handler) => Handler;
