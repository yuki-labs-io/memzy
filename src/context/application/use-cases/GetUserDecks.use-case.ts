import { IDeckRepository } from "../../infrastructure/repositories/DeckRepository.interface";
import { DeckItemDTO } from "../dtos/Deck.dto";

export class GetUserDecksUseCase {
  constructor(private readonly deckRepository: IDeckRepository) {}

  async execute(userId: string): Promise<DeckItemDTO[]> {
    const decks = await this.deckRepository.findByUserId(userId);

    const deckItems = await Promise.all(
      decks.map(async (deck) => {
        const { total, studied } = await this.deckRepository.countCardsByDeckId(
          deck.id
        );
        const progress = total > 0 ? (studied / total) * 100 : 0;

        return {
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
      })
    );

    return deckItems;
  }
}
