import { NextRequest, NextResponse } from "next/server";
import { GenerateFlashcardsUseCase } from "@/context/application/use-cases/generate-flashcards.use-case";
import { OpenAIFlashcardService } from "@/context/infrastructure/services/openai-flashcard.service";
import { GenerateFlashcardsInput } from "@/context/application/dtos/flashcard-generation.dto";
import { auth } from "@/lib/auth/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to use this feature." },
        { status: 401 }
      );
    }

    const body: GenerateFlashcardsInput = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 }
      );
    }

    const llmService = new OpenAIFlashcardService(process.env.OPENAI_API_KEY);
    const useCase = new GenerateFlashcardsUseCase(llmService);

    const result = await useCase.execute(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Flashcard generation error:", error);

    if (error instanceof Error) {
      if (
        error.message.includes("Content is too short") ||
        error.message.includes("Content is too long") ||
        error.message.includes("Content text is required") ||
        error.message.includes("Card count must be")
      ) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
