"use client";

import { useState } from "react";
import { ContentExtractor } from "@/context/infrastructure/services/content-extraction.service";
import { SourceType } from "@/context/domain/entities/flashcard.entity";

interface FlashcardInputProps {
  onGenerate: (contentText: string, sourceType: SourceType) => void;
  isLoading: boolean;
}

export default function FlashcardInput({ onGenerate, isLoading }: FlashcardInputProps) {
  const [activeTab, setActiveTab] = useState<SourceType>("text");
  const [textContent, setTextContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const contentExtractor = new ContentExtractor();

  const handleTextSubmit = () => {
    if (!textContent.trim()) {
      setError("Please enter some text content");
      return;
    }
    setError(null);
    onGenerate(textContent, "text");
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
      onGenerate(extractedText, "file");
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
      onGenerate(extractedText, "image");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract text from image");
    } finally {
      setIsExtracting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const isProcessing = isLoading || isExtracting;

  return (
    <div className="w-full">
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
            Enter your content (minimum 20 words, maximum 5000 words)
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
          <div className="mt-2 text-sm text-gray-500">
            Word count: {textContent.trim().split(/\s+/).filter(Boolean).length}
          </div>
          <button
            onClick={handleTextSubmit}
            disabled={isProcessing || !textContent.trim()}
            className="mt-4 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating Flashcards..." : "Generate Flashcards"}
          </button>
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
          <button
            onClick={handleFileSubmit}
            disabled={isProcessing || !selectedFile}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isExtracting ? "Extracting Text..." : isLoading ? "Generating Flashcards..." : "Generate Flashcards"}
          </button>
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
              {selectedFile.type.startsWith("image/") && (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  className="max-h-48 rounded-lg border border-gray-300"
                />
              )}
            </div>
          )}
          <button
            onClick={handleImageSubmit}
            disabled={isProcessing || !selectedFile}
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isExtracting ? "Extracting Text from Image..." : isLoading ? "Generating Flashcards..." : "Generate Flashcards"}
          </button>
        </div>
      )}
    </div>
  );
}
