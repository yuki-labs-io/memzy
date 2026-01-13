import { Deck } from "../../domain/entities/Deck.entity";

export interface IDeckRepository {
  findByUserId(userId: string): Promise<Deck[]>;
  findById(id: string): Promise<Deck | null>;
  create(deck: Deck): Promise<Deck>;
  update(deck: Deck): Promise<Deck>;
  delete(id: string): Promise<void>;
  countCardsByDeckId(deckId: string): Promise<{ total: number; studied: number }>;
}
