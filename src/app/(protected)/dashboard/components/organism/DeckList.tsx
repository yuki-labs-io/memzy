import { DeckCard, DeckCardProps } from "../molecule/DeckCard";
import { List } from "@/components/ui/list";

interface DeckListProps {
  decks: DeckCardProps[];
}

export function DeckList({ decks }: DeckListProps) {
  return (
    <List
      items={decks}
      renderItem={(deck) => <DeckCard {...deck} />}
      keyExtractor={(deck) => deck.id}
      columns={{ sm: 1, md: 2, lg: 3 }}
    />
  );
}
