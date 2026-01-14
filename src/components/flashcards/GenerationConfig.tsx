"use client";

import { useState, useEffect } from "react";
import { FocusType, CARD_COUNT_MIN, CARD_COUNT_MAX } from "@/context/domain/entities/flashcard.entity";

interface GenerationConfigProps {
  onConfigChange: (config: GenerationConfiguration) => void;
  disabled?: boolean;
}

export interface GenerationConfiguration {
  cardCount: number;
  focusTypes: FocusType[];
  language: string;
}

const FOCUS_OPTIONS: { value: FocusType; label: string; description: string }[] = [
  { value: "definitions", label: "Definitions", description: "Concept and explanation cards" },
  { value: "qa", label: "Q&A", description: "Question and answer format" },
  { value: "dates", label: "Dates", description: "Timeline and historical events" },
  { value: "vocabulary", label: "Vocabulary", description: "Terms and their meanings" },
];

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "pt-BR", label: "Portuguese" },
  { value: "es", label: "Spanish" },
];

export default function GenerationConfig({ onConfigChange, disabled = false }: GenerationConfigProps) {
  const [cardCount, setCardCount] = useState(10);
  const [focusTypes, setFocusTypes] = useState<FocusType[]>(["definitions"]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    onConfigChange({ cardCount, focusTypes, language });
  }, [cardCount, focusTypes, language, onConfigChange]);

  const toggleFocusType = (focus: FocusType) => {
    if (disabled) return;
    
    setFocusTypes((current) => {
      if (current.includes(focus)) {
        if (current.length === 1) {
          return current;
        }
        return current.filter((f) => f !== focus);
      }
      return [...current, focus];
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="quantity-slider" className="mb-3 block text-sm font-medium text-gray-900">
          Number of Flashcards: <span className="text-blue-600 font-semibold">{cardCount}</span>
        </label>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500">{CARD_COUNT_MIN}</span>
          <input
            id="quantity-slider"
            type="range"
            min={CARD_COUNT_MIN}
            max={CARD_COUNT_MAX}
            step={1}
            value={cardCount}
            onChange={(e) => setCardCount(Number(e.target.value))}
            disabled={disabled}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: `linear-gradient(to right, rgb(37 99 235) 0%, rgb(37 99 235) ${((cardCount - CARD_COUNT_MIN) / (CARD_COUNT_MAX - CARD_COUNT_MIN)) * 100}%, rgb(229 231 235) ${((cardCount - CARD_COUNT_MIN) / (CARD_COUNT_MAX - CARD_COUNT_MIN)) * 100}%, rgb(229 231 235) 100%)`,
            }}
          />
          <span className="text-xs text-gray-500">{CARD_COUNT_MAX}</span>
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>Fewer cards</span>
          <span>More cards</span>
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-gray-900">
          Focus Types <span className="text-gray-500 text-xs">(select at least one)</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FOCUS_OPTIONS.map((option) => {
            const isSelected = focusTypes.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleFocusType(option.value)}
                disabled={disabled}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }
                  ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                `}
                title={option.description}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="mt-1 text-xs text-gray-500">{option.description}</div>
                  </div>
                  {isSelected && (
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="language-select" className="mb-3 block text-sm font-medium text-gray-900">
          Output Language
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={disabled}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 bg-white"
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-500">
          Generated flashcards will be in the selected language
        </p>
      </div>
    </div>
  );
}
