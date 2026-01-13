import { NextRequest } from "next/server";
import { withAuth } from "@/lib/api/WithAuth";
import { withLogging } from "@/lib/api/WithLogging";
import { withErrorHandling } from "@/lib/api/WithErrorHandling";
import { saveLLMConfigHandler } from "@/context/application/handlers/SaveLLMConfig.handler";
import { getLLMConfigHandler } from "@/context/application/handlers/GetLLMConfig.handler";

export async function POST(req: NextRequest) {
  return withAuth(withLogging(withErrorHandling(saveLLMConfigHandler)))(req, {} as any);
}

export async function GET(req: NextRequest) {
  return withAuth(withLogging(withErrorHandling(getLLMConfigHandler)))(req, {} as any);
}
