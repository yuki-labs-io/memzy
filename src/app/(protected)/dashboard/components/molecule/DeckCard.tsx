import { ProgressBar } from "../atomic/ProgressBar";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";

export interface DeckCardProps {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
  cardCount: number;
  studiedCount: number;
  progress: number;
}

export function DeckCard({
  id,
  title,
  description,
  tags,
  createdAt,
  cardCount,
  studiedCount,
  progress,
}: DeckCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/decks/${id}`}
      className="block rounded-lg border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-blue-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {tags.length > 0 &&
            tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
              >
                {tag}
              </span>
            ))}
          {tags.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              +{tags.length - 3}
            </span>
          )}
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span>{cardCount} cards</span>
          </div>
        </div>

        <div className="mt-auto">
          <ProgressBar progress={progress} />
          {cardCount === 0 && (
            <p className="mt-2 text-xs text-gray-500 italic">
              No cards yet - add some to start
            </p>
          )}
          {progress === 100 && cardCount > 0 && (
            <p className="mt-2 text-xs text-green-600 font-medium">
              ✓ Complete!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
