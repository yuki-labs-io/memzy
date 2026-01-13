import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/WithAuth";
import { withLogging } from "@/lib/api/WithLogging";
import { withErrorHandling } from "@/lib/api/WithErrorHandling";
import { container } from "@/lib/di/Configuration";
import { DI_TYPES } from "@/lib/di/DITypes";
import { TestConnectionHandler } from "@/context/application/handlers/TestConnection.handler";

export async function POST(req: NextRequest) {
  const handler = container.resolve<TestConnectionHandler>(DI_TYPES.TestConnectionHandler);
  return withAuth(
    withLogging(
      withErrorHandling((req, ctx) => handler.handle(req, ctx))
    )
  )(req, {} as any);
}
