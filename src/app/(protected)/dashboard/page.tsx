"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import AuthGuard from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { AIStatusIndicator } from "./components/atomic/AIStatusIndicator";
import { DeckList } from "./components/organism/DeckList";
import { ZeroState } from "./components/organism/ZeroState";
import { CreateDeckModal } from "./components/molecule/CreateDeckModal";
import { useDecks } from "./hooks/useDecks";
import { useAIStatus } from "./hooks/useAIStatus";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { decks, isLoading, createDeck } = useDecks();
  const { status: aiStatus, provider } = useAIStatus();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateDeck = async (title: string, description?: string) => {
    await createDeck(title, description);
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  My Decks
                </h1>
                <AIStatusIndicator status={aiStatus} provider={provider} />
              </div>
              <div className="flex items-center gap-3">
                {decks.length > 0 && (
                  <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Create New Deck
                  </Button>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading your decks...</p>
              </div>
            </div>
          ) : decks.length === 0 ? (
            <div className="rounded-lg bg-white shadow">
              <ZeroState onCreateDeck={() => setIsCreateModalOpen(true)} />
            </div>
          ) : (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {session?.user?.name || "User"}!
                  </h2>
                  <p className="text-gray-600 mt-1">
                    You have {decks.length} {decks.length === 1 ? "deck" : "decks"}
                  </p>
                </div>
              </div>
              <DeckList decks={decks} />
            </div>
          )}
        </main>

        <CreateDeckModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreateDeck={handleCreateDeck}
        />
      </div>
    </AuthGuard>
  );
}
