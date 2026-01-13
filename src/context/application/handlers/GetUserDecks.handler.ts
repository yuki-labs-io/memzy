import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { GetUserDecksUseCase } from "../use-cases/GetUserDecks.use-case";
import { GetDecksResponseDTO } from "../dtos/Deck.dto";
import { IDeckRepository } from "../../infrastructure/repositories/DeckRepository.interface";

export class GetUserDecksHandler {
  constructor(private readonly deckRepository: IDeckRepository) {}

  async handle(
    req: NextRequest,
    ctx: RequestContext
  ): Promise<NextResponse<GetDecksResponseDTO>> {
    try {
      const useCase = new GetUserDecksUseCase(this.deckRepository);
      const decks = await useCase.execute(ctx.userId);

      const response: GetDecksResponseDTO = {
        decks,
        total: decks.length,
      };

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch decks" } as any,
        { status: 500 }
      );
    }
  }
}
