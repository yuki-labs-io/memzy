import { DeckCard, DeckCardProps } from "../molecule/DeckCard";

interface DeckListProps {
  decks: DeckCardProps[];
}

export function DeckList({ decks }: DeckListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <DeckCard key={deck.id} {...deck} />
      ))}
    </div>
  );
}
