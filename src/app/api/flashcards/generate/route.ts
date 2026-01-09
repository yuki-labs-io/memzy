import { NextRequest, NextResponse } from "next/server";
import { GenerateFlashcardsUseCase } from "@/context/application/use-cases/generate-flashcards.use-case";
import { OpenAIFlashcardService } from "@/context/infrastructure/services/openai-flashcard.service";
import { GenerateFlashcardsInput } from "@/context/application/dtos/flashcard-generation.dto";

export async function POST(request: NextRequest) {
  try {
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
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
