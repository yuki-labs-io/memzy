# AI Flashcard Generation Feature

## Overview

This feature allows users to generate educational flashcards automatically using AI (OpenAI GPT-4o-mini) from various content sources including text, files, and images.

## Architecture

The implementation follows Clean Architecture principles:

```
src/context/
├── domain/
│   └── entities/
│       └── flashcard.entity.ts       # Domain entities and types
├── application/
│   ├── dtos/
│   │   └── flashcard-generation.dto.ts   # Data Transfer Objects
│   └── use-cases/
│       └── generate-flashcards.use-case.ts  # Business logic
└── infrastructure/
    └── services/
        ├── openai-flashcard.service.ts     # OpenAI integration
        └── content-extraction.service.ts    # Content extraction
```

## Features

### Input Methods

1. **Text Input**: Directly paste or type content
2. **File Upload**: Upload .txt files (PDF and DOCX support planned)
3. **Image Upload**: Upload images (JPG, PNG) with text extraction via OpenAI Vision API

### Content Requirements

- **Minimum**: 20 words
- **Maximum**: 5000 words
- **Language**: Portuguese (pt-BR) by default
- **Card Count**: 5-30 cards (default: 12)

### Generation Options

- **Language**: pt-BR (default)
- **Card Count**: 5-30 (default: 12)
- **Difficulty**: basic, intermediate, advanced
- **Style**: Q&A or Concept/Definition

## API Endpoint

### POST `/api/flashcards/generate`

Generate flashcards from content.

**Request Body:**
```json
{
  "sourceType": "text" | "file" | "image",
  "contentText": "string",
  "options": {
    "language": "pt-BR",
    "cardCount": 12,
    "difficulty": "basic" | "intermediate" | "advanced",
    "style": "qa" | "concept"
  }
}
```

**Response:**
```json
{
  "cards": [
    {
      "id": "fc_001",
      "front": "Question or concept",
      "back": "Answer or explanation",
      "tags": ["tag1", "tag2"],
      "sourceQuote": "Optional source quote"
    }
  ],
  "meta": {
    "language": "pt-BR",
    "cardCount": 12,
    "model": "gpt-4o-mini",
    "generatedAt": "2026-01-09T18:00:00.000Z"
  }
}
```

## Setup

### Environment Variables

Add to your `.env.local` file:

```bash
OPENAI_API_KEY=your-openai-api-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Navigate to: http://localhost:3000/flashcards

## Usage

1. **Login** to the application
2. Navigate to **Dashboard**
3. Click on **AI Flashcard Generator**
4. Choose your input method (Text, File, or Image)
5. Provide your content
6. Click **Generate Flashcards**
7. Review the generated flashcards

## Components

### UI Components

- **FlashcardInput** (`src/components/flashcards/FlashcardInput.tsx`)
  - Handles user input via text, file, or image
  - Manages content extraction
  - Provides validation and error handling

- **FlashcardDisplay** (`src/components/flashcards/FlashcardDisplay.tsx`)
  - Displays generated flashcards in a clean, readable format
  - Shows metadata about the generation
  - Allows users to generate new flashcards

### Pages

- **Flashcards Page** (`src/app/(protected)/flashcards/page.tsx`)
  - Protected route requiring authentication
  - Orchestrates the flashcard generation flow
  - Manages loading and error states

## Validation Rules

### Content Validation

- Content cannot be empty
- Minimum 20 words
- Maximum 5000 words
- Card count between 5-30

### File Validation

- Text files: .txt (supported)
- PDF files: .pdf (not yet implemented)
- DOCX files: .docx (not yet implemented)

### Image Validation

- Supported formats: JPG, PNG
- Maximum file size: 10MB
- Must contain readable text

## Error Handling

The system provides clear error messages for:

- Empty or invalid content
- Content too short or too long
- Unsupported file types
- Failed text extraction
- API errors and timeouts
- Rate limiting issues

## Future Enhancements

Phase 2 (not included in current implementation):

- PDF text extraction
- DOCX text extraction
- Flashcard editing
- Database persistence
- Spaced repetition system
- Progress tracking
- Multi-language support
- Export functionality

## Technical Details

### LLM Configuration

- **Model**: gpt-4o-mini
- **Temperature**: 0.7
- **Response Format**: JSON

### Vision API (for images)

- **Model**: gpt-4o-mini with vision capabilities
- **Max Tokens**: 4096

## Testing

To test the feature:

1. Ensure you have a valid OpenAI API key
2. Add it to your `.env.local` file
3. Start the development server
4. Navigate to the flashcards page
5. Try generating flashcards with different input types

### Example Content

**Sample Text:**
```
Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar. This process primarily occurs in the chloroplasts of plant cells, where chlorophyll captures light energy. The light-dependent reactions convert light energy into chemical energy stored in ATP and NADPH. The light-independent reactions (Calvin cycle) use this chemical energy to convert carbon dioxide into glucose.
```

## PRD Reference

This implementation is based on the Product Requirements Document (PRD) located at:
`.product-lens/prd/features/ai-flashcards-textual-generation.md`

## Acceptance Criteria Met

- ✅ AC-1: Text Input and Processing
- ✅ AC-4: LLM Integration and Flashcard Generation
- ✅ AC-5: Flashcard Display Format
- ✅ AC-6: Processing Progress Indication
- ✅ AC-7: Empty or Invalid Content Handling
- ✅ AC-10: LLM API Error Handling
- ✅ AC-12: Content Length Validation
- ✅ AC-14: Multiple Input Method Support
- ✅ AC-15: Security and Privacy

Partially implemented:
- 🟡 AC-2: File Upload (only .txt currently supported)
- 🟡 AC-3: Image Upload (basic implementation, may need OCR quality improvements)

## License

This feature is part of the Memzy project.
