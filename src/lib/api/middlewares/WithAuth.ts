import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { Handler, RequestContext } from "../Types";

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
