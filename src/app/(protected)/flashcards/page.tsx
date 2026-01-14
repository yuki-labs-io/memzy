"use client";

import { useState } from "react";
import AuthGuard from "@/components/auth/AuthGuard";
import FlashcardInput from "@/components/flashcards/FlashcardInput";
import FlashcardDisplay from "@/components/flashcards/FlashcardDisplay";
import GenerationProgress, { GenerationStep } from "@/components/flashcards/GenerationProgress";
import { SourceType, FlashcardGenerationOptions } from "@/context/domain/entities/Flashcard.entity";
import { GenerateFlashcardsOutput } from "@/context/application/dtos/flashcard-generation.dto";
import Link from "next/link";

export default function FlashcardsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerateFlashcardsOutput | null>(null);
  const [currentStep, setCurrentStep] = useState<GenerationStep>("reading");

  const simulateSteps = async () => {
    setCurrentStep("reading");
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setCurrentStep("extracting");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    setCurrentStep("generating");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    
    setCurrentStep("finalizing");
  };

  const handleGenerate = async (
    contentText: string,
    sourceType: SourceType,
    options: FlashcardGenerationOptions
  ) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000);

    const stepsPromise = simulateSteps();

    try {
      const response = await fetch("/api/flashcards/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceType,
          contentText,
          options,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate flashcards");
      }

      await stepsPromise;

      const data: GenerateFlashcardsOutput = await response.json();
      setResult(data);
      setCurrentStep("complete");
    } catch (err) {
      clearTimeout(timeoutId);
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          setError("Request timed out. The generation is taking too long. Please try with shorter content.");
        } else {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNew = () => {
    setResult(null);
    setError(null);
    setCurrentStep("reading");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-8">
                <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                  ← Back to Dashboard
                </Link>
                <h1 className="text-xl font-semibold text-gray-900">
                  AI Flashcard Generator
                </h1>
              </div>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Generate Flashcards from Your Content
            </h2>
            <p className="mt-2 text-gray-600">
              Upload text, a file, or an image, configure your preferences, and let AI create educational flashcards for you.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Error generating flashcards
                  </h3>
                  <p className="mt-2 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="mb-6">
              <GenerationProgress currentStep={currentStep} />
            </div>
          )}

          <div className="rounded-lg bg-white p-6 shadow">
            {!result ? (
              <FlashcardInput onGenerate={handleGenerate} isLoading={isLoading} />
            ) : (
              <FlashcardDisplay
                cards={result.cards}
                meta={result.meta}
                onGenerateNew={handleGenerateNew}
              />
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
