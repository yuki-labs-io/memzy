# Generation Configuration Options - Visual Guide

## User Interface Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                  AI Flashcard Generator                          │
│                                                                   │
│  [← Back to Dashboard]                                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Step 1: Provide Content                                         │
│                                                                   │
│  ┌───────────┬───────────┬───────────┐                          │
│  │ Text Input│File Upload│Image Upload│  ← Tabs                 │
│  └───────────┴───────────┴───────────┘                          │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                                                           │   │
│  │  Paste or type your content here...                      │   │
│  │                                                           │   │
│  │                                                           │   │
│  └─────────────────────────────────────────────────────────┘   │
│  Character count: 250 ✓                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Step 2: Configure Generation                                    │
│                                                                   │
│  Number of Flashcards: 15                                       │
│  ├────────●─────────────────────────────────────┤              │
│  5                                              50               │
│                                                                   │
│  Focus Types (select at least one)                              │
│  ┌───────────────┐  ┌───────────────┐                          │
│  │ ✓ Definitions │  │ ✓ Q&A         │                          │
│  │ Concept cards │  │ Questions     │                          │
│  └───────────────┘  └───────────────┘                          │
│  ┌───────────────┐  ┌───────────────┐                          │
│  │   Dates       │  │   Vocabulary  │                          │
│  │   Timeline    │  │   Terms       │                          │
│  └───────────────┘  └───────────────┘                          │
│                                                                   │
│  Output Language                                                 │
│  ┌───────────────────────────────────────┐                     │
│  │ English                        ▼      │                     │
│  └───────────────────────────────────────┘                     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│           ┌─────────────────────────────────────┐               │
│           │    Generate Flashcards              │               │
│           └─────────────────────────────────────┘               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## During Generation - Progress Stepper

```
┌─────────────────────────────────────────────────────────────────┐
│                  Generating Flashcards                           │
│           Please wait while we process your content              │
│                                                                   │
│  ● ─────  Reading document                                      │
│           Processing your content...                             │
│                                                                   │
│  ● ─────  Extracting key concepts                               │
│           Analyzing important information...                     │
│                                                                   │
│  ⟳ ─────  Generating questions              ← Current Step      │
│           Creating flashcards with AI...                         │
│                                                                   │
│  ○        Finalizing                        ← Pending           │
│           Preparing your flashcards...                           │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘

Legend:
● = Completed (green)
⟳ = In Progress (blue, animated)
○ = Pending (gray)
```

## Configuration Options

### Quantity Slider
```
Range: 5 to 50 flashcards
Default: 10
Step: 1

Visual representation:
[====●=====================================]
5    15                                   50

Features:
- Smooth dragging
- Real-time value display
- Keyboard accessible (arrow keys)
- Color gradient from start to current position
```

### Focus Type Chips

```
┌─────────────────────────────────────────────────────────────┐
│                                                               │
│  Unselected State          Selected State                   │
│  ┌─────────────────┐      ┌─────────────────┐             │
│  │   Definitions   │      │ ✓ Definitions   │             │
│  │   Concept cards │      │   Concept cards │             │
│  └─────────────────┘      └─────────────────┘             │
│   Gray border              Blue border + background         │
│   White background         Blue highlight                   │
│                                                               │
└─────────────────────────────────────────────────────────────┘

Available Types:
1. Definitions - Concept and explanation format
2. Q&A - Question and answer pairs
3. Dates - Timeline and historical events
4. Vocabulary - Terms and their meanings

Rules:
- At least one must be selected
- Multiple can be selected
- Cannot deselect last remaining chip
```

### Language Selector

```
┌─────────────────────────────────┐
│ English                    ▼   │  ← Dropdown
└─────────────────────────────────┘

Options:
- English (en)
- Portuguese (pt-BR)
- Spanish (es)

Default: English
```

## Component Architecture

```
FlashcardsPage
│
├── GenerationProgress (during generation)
│   └── 4-step stepper with animations
│
└── FlashcardInput (when not generating)
    │
    ├── Tab Navigation
    │   ├── Text Input
    │   ├── File Upload
    │   └── Image Upload
    │
    ├── GenerationConfig
    │   ├── Quantity Slider
    │   ├── Focus Type Chips
    │   └── Language Selector
    │
    └── Generate Button
```

## Data Flow

```
User Input
    ↓
FlashcardInput Component
    ↓
Configuration State (cardCount, focusTypes, language)
    ↓
Generate Button Click
    ↓
API Request with Options
    ↓
POST /api/flashcards/generate
{
  sourceType: "text",
  contentText: "...",
  options: {
    cardCount: 15,
    focusTypes: ["definitions", "qa"],
    language: "en"
  }
}
    ↓
GenerateFlashcardsHandler
    ↓
Validation (char count, focus types, card count)
    ↓
LLM Adapter (OpenAI or Anthropic)
    ↓
Enhanced Prompt with Focus Types
    ↓
AI Generation
    ↓
Response
{
  cards: [...],
  meta: {
    language: "en",
    cardCount: 15,
    model: "gpt-4o-mini",
    generatedAt: "..."
  }
}
    ↓
FlashcardDisplay Component
```

## Validation States

### Valid Configuration
```
✓ Content length: 250 chars (min 100)
✓ Focus types: 2 selected
✓ Language: English
✓ Card count: 15

→ Generate Button: ENABLED (blue, clickable)
```

### Invalid Configuration
```
✗ Content length: 50 chars (need 50 more)
✗ Focus types: 0 selected
✓ Language: English
✓ Card count: 15

→ Generate Button: DISABLED (gray, with tooltip)
   "Please provide at least 100 characters"
   "Please select at least one focus type"
```

## Mobile Responsive Layout

```
Mobile (< 768px)
┌─────────────────────┐
│ [Tabs]              │
│                     │
│ [Content Area]      │
│                     │
│ ─────────────────── │
│                     │
│ [Config: Stacked]   │
│  Slider             │
│  Chips (2 columns)  │
│  Language           │
│                     │
│ ─────────────────── │
│                     │
│ [Generate Button]   │
│  (Full Width)       │
└─────────────────────┘

Desktop (≥ 768px)
┌──────────────────────────────────┐
│ [Tabs]                           │
│                                  │
│ [Content Area]                   │
│                                  │
│ ──────────────────────────────── │
│                                  │
│ [Config: Side by Side]           │
│  Slider          Chips (2x2)     │
│                  Language         │
│                                  │
│ ──────────────────────────────── │
│                                  │
│      [Generate Button]           │
│         (Centered)               │
└──────────────────────────────────┘
```

## Color Scheme

```
Primary Actions:  Blue (#2563EB)
Success/Complete: Green (#10B981)
In Progress:      Blue (#3B82F6) with animation
Pending:          Gray (#9CA3AF)
Error/Warning:    Red (#EF4444) / Amber (#F59E0B)
Disabled:         Gray (#D1D5DB)
Background:       Gray-50 (#F9FAFB)
Cards:            White (#FFFFFF)
```

## Accessibility Features

```
✓ Keyboard Navigation
  - Tab through all interactive elements
  - Arrow keys for slider adjustment
  - Space/Enter for chip selection

✓ Screen Reader Support
  - ARIA labels on all controls
  - State announcements for changes
  - Form validation errors announced

✓ Visual Indicators
  - Clear focus outlines
  - Color + icon for status
  - High contrast text (4.5:1 minimum)
  - Large touch targets (44x44px)

✓ Semantic HTML
  - Proper button elements
  - Form labels associated
  - Landmark regions defined
```

## Performance Optimizations

```
1. useMemo for step calculations
   - Prevents unnecessary re-renders
   - Memoizes visible steps computation

2. useCallback for config changes
   - Stable function reference
   - Prevents child re-renders

3. Conditional rendering
   - Only render active tab content
   - Hide progress when not generating

4. Optimized event handlers
   - Debounced naturally by React
   - No manual debouncing needed
```

## Testing Checklist

```
Manual Testing:
□ Slider moves smoothly across range
□ Chips toggle selection correctly
□ Cannot deselect last chip
□ Language selector shows all options
□ Generate button disabled when invalid
□ Character count updates real-time
□ Progress stepper shows all steps
□ Steps animate correctly
□ Cards match selected focus types
□ Output in correct language
□ Mobile layout works properly
□ Keyboard navigation functions
□ Screen reader announces changes

Integration Testing:
□ Configuration passed to API correctly
□ Validation errors returned properly
□ LLM prompt includes focus types
□ Generated cards reflect configuration
□ Error handling works correctly
```

---

**Legend:**
- ✓ = Implemented and working
- ○ = In progress
- ✗ = Not implemented (intentional)
- → = Leads to / causes
- ├─ = Has component
- └─ = Last component
