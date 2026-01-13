import { NextRequest, NextResponse } from "next/server";
import { RequestContext } from "@/lib/api/Types";
import { CreateDeckUseCase } from "../use-cases/CreateDeck.use-case";
import { CreateDeckRequestDTO, CreateDeckResponseDTO } from "../dtos/Deck.dto";
import { IDeckRepository } from "../../infrastructure/repositories/DeckRepository.interface";

export class CreateDeckHandler {
  constructor(private readonly deckRepository: IDeckRepository) {}

  async handle(
    req: NextRequest,
    ctx: RequestContext
  ): Promise<NextResponse<CreateDeckResponseDTO>> {
    try {
      const body: CreateDeckRequestDTO = await req.json();

      const useCase = new CreateDeckUseCase(this.deckRepository);
      const deck = await useCase.execute(ctx.userId, body);

      const { total, studied } = await this.deckRepository.countCardsByDeckId(
        deck.id
      );
      const progress = total > 0 ? (studied / total) * 100 : 0;

      const response: CreateDeckResponseDTO = {
        id: deck.id,
        title: deck.title,
        description: deck.description,
        tags: deck.tags,
        createdAt: deck.createdAt.toISOString(),
        updatedAt: deck.updatedAt.toISOString(),
        cardCount: total,
        studiedCount: studied,
        progress: Math.round(progress * 100) / 100,
      };

      return NextResponse.json(response, { status: 201 });
    } catch (error) {
      if (error instanceof Error) {
        return NextResponse.json(
          { error: error.message } as any,
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to create deck" } as any,
        { status: 500 }
      );
    }
  }
}
