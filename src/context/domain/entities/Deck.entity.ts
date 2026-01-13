export interface DeckProps {
  id: string;
  userId: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Deck {
  private constructor(private readonly props: DeckProps) {
    this.validate();
  }

  static create(props: Omit<DeckProps, "id" | "createdAt" | "updatedAt">): Deck {
    return new Deck({
      ...props,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static reconstitute(props: DeckProps): Deck {
    return new Deck(props);
  }

  private validate(): void {
    if (!this.props.title || this.props.title.trim().length === 0) {
      throw new Error("Deck title cannot be empty");
    }

    if (this.props.title.length > 100) {
      throw new Error("Deck title must be at most 100 characters");
    }

    if (this.props.description && this.props.description.length > 500) {
      throw new Error("Deck description must be at most 500 characters");
    }

    if (!this.props.userId || this.props.userId.trim().length === 0) {
      throw new Error("Deck must have a userId");
    }
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get tags(): string[] {
    return [...this.props.tags];
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateTitle(newTitle: string): Deck {
    const trimmedTitle = newTitle.trim();
    if (trimmedTitle.length === 0) {
      throw new Error("Deck title cannot be empty");
    }
    if (trimmedTitle.length > 100) {
      throw new Error("Deck title must be at most 100 characters");
    }

    return new Deck({
      ...this.props,
      title: trimmedTitle,
      updatedAt: new Date(),
    });
  }

  updateDescription(newDescription?: string): Deck {
    if (newDescription && newDescription.length > 500) {
      throw new Error("Deck description must be at most 500 characters");
    }

    return new Deck({
      ...this.props,
      description: newDescription,
      updatedAt: new Date(),
    });
  }

  toJSON(): DeckProps {
    return {
      ...this.props,
      tags: [...this.props.tags],
    };
  }
}
