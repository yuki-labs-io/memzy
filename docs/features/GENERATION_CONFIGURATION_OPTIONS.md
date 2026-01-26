# Generation Configuration Options Feature

## Overview

This feature provides users with intuitive controls to configure AI flashcard generation parameters and transparent feedback during the processing workflow. Users can now customize the number of flashcards, select focus types, choose output language, and see real-time progress during generation.

## Implementation Summary

**PRD:** `.product-lens/prd/features/generation-configuration-options.md`

### Key Components

#### 1. GenerationConfig Component
**Location:** `src/components/flashcards/GenerationConfig.tsx`

A configuration panel that provides:
- **Quantity Slider:** Range input for selecting 5-50 flashcards (default: 10)
- **Focus Type Chips:** Multi-select chips for choosing card types:
  - Definitions (concept and explanation format)
  - Q&A (question and answer format)
  - Dates (timeline and historical events)
  - Vocabulary (terms and their meanings)
- **Language Selector:** Dropdown for choosing output language:
  - English
  - Portuguese (pt-BR)
  - Spanish

**Features:**
- Real-time validation (at least one focus type required)
- Visual feedback for selected options
- Disabled state support during processing
- Touch-friendly design for mobile

#### 2. GenerationProgress Component
**Location:** `src/components/flashcards/GenerationProgress.tsx`

A progressive stepper showing 4 distinct stages:
1. **Reading document** - Processing content
2. **Extracting key concepts** - Analyzing information
3. **Generating questions** - Creating flashcards with AI
4. **Finalizing** - Preparing flashcards

**Features:**
- Visual step indicators (pending, current, complete)
- Animated transitions between steps
- Color-coded status (gray → blue → green)
- Descriptive text for each stage
- Cannot be dismissed during processing

#### 3. Updated FlashcardInput Component
**Location:** `src/components/flashcards/FlashcardInput.tsx`

Enhanced input component with:
- Integrated configuration panel
- Two-step workflow (Step 1: Content, Step 2: Configuration)
- Character count validation (min 100 chars)
- Visual feedback for content validity
- Single "Generate Flashcards" button for all input methods

### Domain Changes

#### flashcard.entity.ts
**Location:** `src/context/domain/entities/flashcard.entity.ts`

- Added `FocusType` type: `"definitions" | "qa" | "dates" | "vocabulary"`
- Extended `FlashcardGenerationOptions` interface with `focusTypes?: FocusType[]`
- Added validation constants:
  - `CARD_COUNT_MIN = 5`
  - `CARD_COUNT_MAX = 50`
  - `CONTENT_MIN_CHARS = 100`
  - `CONTENT_MAX_CHARS = 50000`
- Updated default options:
  - Default card count: 10 (was 12)
  - Default language: "en" (was "pt-BR")
  - Default focus types: ["definitions", "qa"]

### Backend Changes

#### GenerateFlashcards.handler.ts
**Location:** `src/context/application/handlers/GenerateFlashcards.handler.ts`

- Changed validation from word count to character count
- Updated card count range validation (5-50)
- Added focus types validation (at least one required)
- Uses new validation constants from domain

#### LLM Adapters
**Locations:**
- `src/context/infrastructure/adapters/OpenAIAdapter.ts`
- `src/context/infrastructure/adapters/AnthropicAdapter.ts`

Enhanced `buildPrompt()` method to:
- Include focus type descriptions in prompts
- Instruct LLM to distribute cards across selected focus types
- Emphasize output language in instructions
- Maintain backward compatibility with existing options

### Page Integration

#### flashcards/page.tsx
**Location:** `src/app/(protected)/flashcards/page.tsx`

- Added state management for generation steps
- Integrated `GenerationProgress` component
- Updated `handleGenerate` to accept new options
- Simulates step progression during API call
- Shows progress stepper during generation

## Usage

### User Flow

1. **Select Input Method:** Choose Text, File Upload, or Image Upload
2. **Provide Content:** Enter or upload content (minimum 100 characters)
3. **Configure Generation:**
   - Adjust quantity slider (5-50 cards)
   - Select one or more focus types (required)
   - Choose output language
4. **Generate:** Click "Generate Flashcards" button
5. **Monitor Progress:** Watch 4-step progress indicator
6. **Review Results:** View generated flashcards

### Configuration Options

```typescript
interface FlashcardGenerationOptions {
  cardCount: number;        // 5-50
  focusTypes: FocusType[];  // ["definitions", "qa", "dates", "vocabulary"]
  language: string;         // "en", "pt-BR", "es"
}
```

## Validation Rules

### Content Validation
- **Minimum:** 100 characters
- **Maximum:** 50,000 characters
- Real-time character count display
- Visual feedback when requirements met

### Configuration Validation
- **Card Count:** Must be between 5 and 50
- **Focus Types:** At least one must be selected
- **Language:** Required (dropdown with default)

### Button State
Button is disabled when:
- Content is empty or below minimum length
- No file/image selected (for file/image tabs)
- No focus types selected
- Processing is in progress

## LLM Prompt Enhancement

The focus types are translated into prompt instructions:

```
Focus your flashcards on the following types:
  - concept and explanation format - define key terms and concepts
  - question and answer pairs that test understanding

Distribute the flashcards across these focus types.
```

This guides the AI to create cards matching user preferences.

## Technical Details

### Dependencies
- React hooks: `useState`, `useEffect`, `useCallback`, `useMemo`
- Next.js 16 (App Router)
- Tailwind CSS for styling
- TypeScript for type safety

### Accessibility
- Keyboard navigation support
- ARIA labels for screen readers
- High contrast color scheme
- Touch-friendly tap targets (44px minimum)
- Visual focus indicators

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly controls
- No horizontal scrolling

## Future Enhancements

### Planned (Not in MVP)
- **Token Cost Estimation:** Display estimated API cost before generation
- **Curation Redirect:** Automatic redirect to curation interface after success
- **Configuration Persistence:** Save user preferences in localStorage
- **Advanced Focus Types:** Add custom focus types or combinations
- **Difficulty Selection:** Expose difficulty setting in UI

### Out of Scope
- Background processing
- Batch document processing
- Custom prompt engineering by users
- A/B testing different configurations

## Testing Recommendations

### Manual Testing Checklist
- [ ] Quantity slider moves smoothly (5-50)
- [ ] Focus chips toggle correctly
- [ ] Cannot deselect last focus chip
- [ ] Language selector shows all options
- [ ] Generate button disabled when invalid
- [ ] Character count updates in real-time
- [ ] Progress stepper shows all 4 stages
- [ ] Generated cards reflect selected focus types
- [ ] Cards are in selected output language
- [ ] Mobile layout works correctly

### Edge Cases to Test
- Very short content (< 100 chars)
- Very long content (> 50,000 chars)
- Requesting more cards than content supports
- Single focus type selection
- All focus types selected
- Different language combinations

## API Changes

### Request Format
```json
{
  "sourceType": "text",
  "contentText": "...",
  "options": {
    "cardCount": 15,
    "focusTypes": ["definitions", "qa"],
    "language": "en"
  }
}
```

### Response Format
No changes to response format. Same as before:
```json
{
  "cards": [...],
  "meta": {
    "language": "en",
    "cardCount": 15,
    "model": "gpt-4o-mini",
    "generatedAt": "2026-01-14T..."
  }
}
```

## Metrics to Track

Based on PRD success criteria:
- Configuration completion rate
- Focus type selection distribution
- Average card count selected
- Language preference breakdown
- Time from page load to generation
- Most common configuration patterns

## Known Limitations

1. **No Cost Estimation:** Token cost preview not implemented (nice-to-have)
2. **No Curation Redirect:** Users stay on generation page after success
3. **No Persistence:** Configuration resets on page reload
4. **Simulated Progress:** Step timing is estimated, not real-time from backend
5. **Fixed Languages:** Only 3 languages available (en, pt-BR, es)

## Acceptance Criteria Met

Based on PRD:
- ✅ FR-1: Input Method Selection
- ✅ FR-4: Quantity Slider Control (5-50 range)
- ✅ FR-5: Focus Chips Selection (multi-select, 4 types)
- ✅ FR-6: Output Language Selector (3 languages)
- ✅ FR-7: Generate Button with Validation
- ✅ FR-8: Textual Stepper Progress Indicator (4 steps)
- ✅ FR-10: Content Validation and Feedback
- ❌ FR-9: Token Cost Estimate Display (nice-to-have, not implemented)
- ❌ FR-13: Curation Redirect (requires curation feature)

## Related Documentation

- [AI Flashcards Feature](./AI_FLASHCARDS_FEATURE.md)
- [PRD: Generation Configuration Options](../.product-lens/prd/features/generation-configuration-options.md)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Clean Architecture](../README.md#architecture)

---

**Last Updated:** 2026-01-14  
**Feature Status:** Implemented (MVP)  
**Related Issue:** #22
