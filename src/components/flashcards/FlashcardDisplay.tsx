interface FlashcardDisplayProps {
  cards: Array<{
    id: string;
    front: string;
    back: string;
    tags: string[];
    sourceQuote?: string;
  }>;
  meta: {
    language: string;
    cardCount: number;
    model: string;
    generatedAt: string;
  };
  onGenerateNew: () => void;
}

export default function FlashcardDisplay({ cards, meta, onGenerateNew }: FlashcardDisplayProps) {
  if (!cards || cards.length === 0) {
    return (
      <div className="rounded-lg bg-yellow-50 p-6 text-center">
        <p className="text-yellow-800">No flashcards were generated. Please try with different content.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold text-blue-900">Generation Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-800 md:grid-cols-4">
          <div>
            <span className="font-medium">Cards Generated:</span> {meta.cardCount}
          </div>
          <div>
            <span className="font-medium">Language:</span> {meta.language}
          </div>
          <div>
            <span className="font-medium">Model:</span> {meta.model}
          </div>
          <div>
            <span className="font-medium">Generated:</span>{" "}
            {new Date(meta.generatedAt).toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-500">
                Flashcard {index + 1} of {cards.length}
              </span>
              {card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={`${card.id}-${tag}`}
                      className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-4 border-l-4 border-blue-600 pl-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Question / Front
              </p>
              <p className="text-lg font-medium text-gray-900">{card.front}</p>
            </div>

            <div className="border-l-4 border-green-600 pl-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                Answer / Back
              </p>
              <p className="text-base text-gray-800">{card.back}</p>
            </div>

            {card.sourceQuote && (
              <div className="mt-4 rounded bg-gray-50 p-3">
                <p className="text-xs font-medium text-gray-500">Source Quote:</p>
                <p className="mt-1 text-sm italic text-gray-600">&ldquo;{card.sourceQuote}&rdquo;</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={onGenerateNew}
          className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        >
          Generate New Flashcards
        </button>
      </div>
    </div>
  );
}
