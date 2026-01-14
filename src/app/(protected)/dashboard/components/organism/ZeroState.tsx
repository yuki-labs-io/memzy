import { Button } from "@/components/ui/button";
import { BookOpen, Plus } from "lucide-react";

interface ZeroStateProps {
  onCreateDeck: () => void;
}

export function ZeroState({ onCreateDeck }: ZeroStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-24 h-24 mb-6 rounded-full bg-blue-100 flex items-center justify-center">
        <BookOpen className="w-12 h-12 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome to Memzy!
      </h2>
      
      <p className="text-gray-600 text-center max-w-md mb-6">
        Create your first deck to start your learning journey. Organize your
        study materials into decks and track your progress.
      </p>
      
      <Button
        onClick={onCreateDeck}
        size="lg"
        className="gap-2"
      >
        <Plus className="h-5 w-5" />
        Create Your First Deck
      </Button>
      
      <div className="mt-8 text-sm text-gray-500 text-center max-w-lg">
        <p className="mb-2">
          <strong>What is a deck?</strong>
        </p>
        <p>
          A deck is a collection of flashcards organized by topic or subject.
          Use decks to separate different study materials like &quot;Biology 101&quot; or
          &quot;Spanish Vocabulary&quot;.
        </p>
      </div>
    </div>
  );
}
