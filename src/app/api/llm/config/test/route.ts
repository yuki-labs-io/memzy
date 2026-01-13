import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/WithAuth";
import { withLogging } from "@/lib/api/WithLogging";
import { withErrorHandling } from "@/lib/api/WithErrorHandling";
import { testConnectionHandler } from "@/context/application/handlers/TestConnection.handler";

export async function POST(req: NextRequest) {
  return withAuth(withLogging(withErrorHandling(testConnectionHandler)))(req, {} as any);
}
