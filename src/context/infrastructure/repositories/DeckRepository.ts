import { PrismaClient } from "@prisma/client";
import { IDeckRepository } from "./DeckRepository.interface";
import { Deck } from "../../domain/entities/Deck.entity";

export class DeckRepository implements IDeckRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<Deck[]> {
    const decks = await this.prisma.deck.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return decks.map((deck) =>
      Deck.reconstitute({
        id: deck.id,
        userId: deck.userId,
        title: deck.title,
        description: deck.description ?? undefined,
        tags: deck.tags,
        createdAt: deck.createdAt,
        updatedAt: deck.updatedAt,
      })
    );
  }

  async findById(id: string): Promise<Deck | null> {
    const deck = await this.prisma.deck.findUnique({
      where: { id },
    });

    if (!deck) {
      return null;
    }

    return Deck.reconstitute({
      id: deck.id,
      userId: deck.userId,
      title: deck.title,
      description: deck.description ?? undefined,
      tags: deck.tags,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    });
  }

  async create(deck: Deck): Promise<Deck> {
    const created = await this.prisma.deck.create({
      data: {
        id: deck.id,
        userId: deck.userId,
        title: deck.title,
        description: deck.description,
        tags: deck.tags,
        createdAt: deck.createdAt,
        updatedAt: deck.updatedAt,
      },
    });

    return Deck.reconstitute({
      id: created.id,
      userId: created.userId,
      title: created.title,
      description: created.description ?? undefined,
      tags: created.tags,
      createdAt: created.createdAt,
      updatedAt: created.updatedAt,
    });
  }

  async update(deck: Deck): Promise<Deck> {
    const updated = await this.prisma.deck.update({
      where: { id: deck.id },
      data: {
        title: deck.title,
        description: deck.description,
        tags: deck.tags,
        updatedAt: deck.updatedAt,
      },
    });

    return Deck.reconstitute({
      id: updated.id,
      userId: updated.userId,
      title: updated.title,
      description: updated.description ?? undefined,
      tags: updated.tags,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deck.delete({
      where: { id },
    });
  }

  async countCardsByDeckId(
    _deckId: string
  ): Promise<{ total: number; studied: number }> {
    // For MVP, returning 0 as flashcard integration is not in scope
    // This will be implemented when flashcards are linked to decks
    return { total: 0, studied: 0 };
  }
}
