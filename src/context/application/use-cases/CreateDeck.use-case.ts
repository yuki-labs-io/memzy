import { Deck } from "../../domain/entities/Deck.entity";
import { IDeckRepository } from "../../infrastructure/repositories/DeckRepository.interface";
import { CreateDeckRequestDTO } from "../dtos/Deck.dto";

export class CreateDeckUseCase {
  constructor(private readonly deckRepository: IDeckRepository) {}

  async execute(
    userId: string,
    request: CreateDeckRequestDTO
  ): Promise<Deck> {
    const trimmedTitle = request.title.trim();
    
    if (!trimmedTitle) {
      throw new Error("Deck title is required");
    }

    const deck = Deck.create({
      userId,
      title: trimmedTitle,
      description: request.description?.trim(),
      tags: request.tags || [],
    });

    return await this.deckRepository.create(deck);
  }
}
