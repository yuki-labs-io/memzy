export interface CreateDeckRequestDTO {
  title: string;
  description?: string;
  tags?: string[];
}

export interface CreateDeckResponseDTO {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  cardCount: number;
  studiedCount: number;
  progress: number;
}

export interface GetDecksResponseDTO {
  decks: DeckItemDTO[];
  total: number;
}

export interface DeckItemDTO {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  cardCount: number;
  studiedCount: number;
  progress: number;
}
