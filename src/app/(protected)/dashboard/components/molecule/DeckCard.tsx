import { ProgressBar } from "../atomic/ProgressBar";
import { Calendar, FileText } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface DeckCardProps {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  createdAt: string;
  cardCount: number;
  progress: number;
}

export function DeckCard({
  id,
  title,
  description,
  tags,
  createdAt,
  cardCount,
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
      className="block transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      <Card className="h-full hover:border-blue-400 hover:shadow-md transition-all">
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4">
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="outline">+{tags.length - 3}</Badge>
              )}
            </div>
          )}

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>{cardCount} cards</span>
            </div>
          </div>

          <div>
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
        </CardContent>
      </Card>
    </Link>
  );
}
