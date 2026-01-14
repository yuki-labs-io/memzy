import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth/auth";
import { Handler, RequestContext } from "../Types";
import { container } from "@/lib/di/Configuration";
import { IUserRepository } from "@/context/infrastructure/repositories/UserRepository.interface";
import { DI_TYPES } from "@/lib/di/DITypes";

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

      const userRepository = container.resolve<IUserRepository>(
        DI_TYPES.IUserRepository
      );

      const user = await userRepository.findOrCreateByEmail({
        email: session.user.email,
        name: session.user.name ?? undefined,
        image: session.user.image ?? undefined,
      });

      ctx.userId = user.id;

      return handler(req, ctx);
    };
  };
}
