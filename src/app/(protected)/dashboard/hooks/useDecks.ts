"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface Deck {
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

export function useDecks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/decks");
      
      if (!response.ok) {
        throw new Error("Failed to fetch decks");
      }

      const data = await response.json();
      setDecks(data.decks || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load decks";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createDeck = useCallback(
    async (title: string, description?: string) => {
      try {
        const response = await fetch("/api/decks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, description }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create deck");
        }

        const newDeck = await response.json();
        setDecks((prev) => [newDeck, ...prev]);
        toast.success("Deck created successfully!");
        
        return newDeck;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create deck";
        toast.error(errorMessage);
        throw err;
      }
    },
    []
  );

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  return {
    decks,
    isLoading,
    error,
    createDeck,
    refetch: fetchDecks,
  };
}
