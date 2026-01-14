"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ContentExtractor } from "@/context/infrastructure/services/content-extraction.service";
import { SourceType, FlashcardGenerationOptions, CONTENT_MIN_CHARS } from "@/context/domain/entities/Flashcard.entity";
import GenerationConfig, { GenerationConfiguration } from "./GenerationConfig";

interface FlashcardInputProps {
  onGenerate: (contentText: string, sourceType: SourceType, options: FlashcardGenerationOptions) => void;
  isLoading: boolean;
}

export default function FlashcardInput({ onGenerate, isLoading }: FlashcardInputProps) {
  const [activeTab, setActiveTab] = useState<SourceType>("text");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [config, setConfig] = useState<GenerationConfiguration>({
    cardCount: 10,
    focusTypes: ["definitions"],
    language: "en",
  });

  const contentExtractor = useMemo(() => new ContentExtractor(), []);

  const handleConfigChange = useCallback((newConfig: GenerationConfiguration) => {
    setConfig(newConfig);
  }, []);

  useEffect(() => {
    setSelectedFile(null);
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleTextSubmit = () => {
    if (!textContent.trim()) {
      setError("Please enter some text content");
      return;
    }
    if (textContent.trim().length < CONTENT_MIN_CHARS) {
      setError(`Please provide at least ${CONTENT_MIN_CHARS} characters`);
      return;
    }
    setError(null);
    onGenerate(textContent, "text", {
      cardCount: config.cardCount,
      focusTypes: config.focusTypes,
      language: config.language,
    });
  };

  const handleFileSubmit = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setError(null);
    setIsExtracting(true);

    try {
      const extractedText = await contentExtractor.extractTextFromFile(selectedFile);
      if (extractedText.trim().length < CONTENT_MIN_CHARS) {
        setError(`Extracted text is too short. Please provide content with at least ${CONTENT_MIN_CHARS} characters`);
        setIsExtracting(false);
        return;
      }
      onGenerate(extractedText, "file", {
        cardCount: config.cardCount,
        focusTypes: config.focusTypes,
        language: config.language,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract text from file");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleImageSubmit = async () => {
    if (!selectedFile) {
      setError("Please select an image");
      return;
    }

    setError(null);
    setIsExtracting(true);

    try {
      const extractedText = await contentExtractor.extractTextFromImage(selectedFile);
      if (extractedText.trim().length < CONTENT_MIN_CHARS) {
        setError(`Extracted text is too short. Please provide an image with at least ${CONTENT_MIN_CHARS} characters of text`);
        setIsExtracting(false);
        return;
      }
      onGenerate(extractedText, "image", {
        cardCount: config.cardCount,
        focusTypes: config.focusTypes,
        language: config.language,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract text from image");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setSelectedFile(file);
      setError(null);
      if (file.type.startsWith("image/")) {
        setPreviewUrl(URL.createObjectURL(file));
      }
    }
  };

  const isProcessing = isLoading || isExtracting;
  const charCount = textContent.trim().length;
  const isContentValid = charCount >= CONTENT_MIN_CHARS;

  return (
    <div className="w-full space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Provide Content</h3>
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "text"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("text")}
            disabled={isProcessing}
          >
            Text Input
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "file"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("file")}
            disabled={isProcessing}
          >
            File Upload
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "image"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("image")}
            disabled={isProcessing}
          >
            Image Upload
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
          <p className="font-medium">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {activeTab === "text" && (
        <div>
          <label htmlFor="text-content" className="mb-2 block text-sm font-medium text-gray-700">
            Enter your content (minimum {CONTENT_MIN_CHARS} characters)
          </label>
          <textarea
            id="text-content"
            className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={12}
            placeholder="Paste or type your content here..."
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            disabled={isProcessing}
          />
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className={charCount >= CONTENT_MIN_CHARS ? "text-green-600" : "text-gray-500"}>
              Character count: {charCount} {isContentValid && "✓"}
            </span>
            {!isContentValid && charCount > 0 && (
              <span className="text-amber-600">Need {CONTENT_MIN_CHARS - charCount} more characters</span>
            )}
          </div>
        </div>
      )}

      {activeTab === "file" && (
        <div>
          <label htmlFor="file-upload" className="mb-2 block text-sm font-medium text-gray-700">
            Upload a text file (.txt)
          </label>
          <p className="mb-4 text-sm text-gray-500">
            Note: PDF and DOCX support coming soon. For now, please use .txt files or copy-paste your content.
          </p>
          <input
            id="file-upload"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            disabled={isProcessing}
            className="mb-4 block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <p className="mb-4 text-sm text-gray-600">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>
      )}

      {activeTab === "image" && (
        <div>
          <label htmlFor="image-upload" className="mb-2 block text-sm font-medium text-gray-700">
            Upload an image with text (JPG, PNG)
          </label>
          <p className="mb-4 text-sm text-gray-500">
            Upload a clear image containing text. The system will extract the text and generate flashcards.
            Maximum file size: 10MB
          </p>
          <input
            id="image-upload"
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            onChange={handleFileChange}
            disabled={isProcessing}
            className="mb-4 block w-full text-sm text-gray-900 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
          />
          {selectedFile && (
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </p>
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-48 rounded-lg border border-gray-300"
                />
              )}
            </div>
          )}
        </div>
      )}
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Configure Generation</h3>
        <GenerationConfig onConfigChange={handleConfigChange} disabled={isProcessing} />
      </div>

      <div className="border-t border-gray-200 pt-8">
        <button
          onClick={() => {
            if (activeTab === "text") handleTextSubmit();
            else if (activeTab === "file") handleFileSubmit();
            else handleImageSubmit();
          }}
          disabled={
            isProcessing ||
            (activeTab === "text" && (!textContent.trim() || !isContentValid)) ||
            ((activeTab === "file" || activeTab === "image") && !selectedFile) ||
            config.focusTypes.length === 0
          }
          className="w-full rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isExtracting
            ? "Extracting Content..."
            : isLoading
              ? "Generating Flashcards..."
              : "Generate Flashcards"}
        </button>
        {config.focusTypes.length === 0 && (
          <p className="mt-2 text-sm text-amber-600 text-center">
            Please select at least one focus type
          </p>
        )}
      </div>
    </div>
  );
}
