# LLM Management UI

## Overview

This feature provides a user interface for managing LLM (Large Language Model) provider configurations and integrates the configured provider across all AI-powered features.

## Architecture

### Components

```
src/
├── app/
│   ├── (protected)/
│   │   └── settings/
│   │       └── ai/
│   │           ├── page.tsx          # Server Component - AI Settings page
│   │           ├── actions.ts        # Server Actions for LLM config
│   │           └── LLMConfigForm.tsx # Client Component - Config form
│   └── api/
│       └── image-text-extraction/
│           └── route.ts              # Updated to use configured LLM
├── context/
│   ├── application/
│   │   └── handlers/
│   │       └── ExtractImageText.handler.ts  # New handler for image extraction
│   └── infrastructure/
│       └── adapters/
│           ├── LLMAdapter.interface.ts      # Updated interface
│           ├── OpenAIAdapter.ts             # Added extractTextFromImage
│           └── AnthropicAdapter.ts          # Added extractTextFromImage
└── components/
    └── ui/                           # shadcn/ui components
        ├── button.tsx
        ├── card.tsx
        ├── input.tsx
        ├── label.tsx
        ├── select.tsx
        ├── badge.tsx
        ├── alert-dialog.tsx
        └── sonner.tsx
```

### Data Flow

```
User → LLMConfigForm (Client)
         ↓
    Server Actions (saveLLMConfig, testLLMConnection, deleteLLMConfig)
         ↓
    DI Container → Repositories/Adapters
         ↓
    Database (LLMConfiguration table)
```

### Image Text Extraction Flow

```
User uploads image → POST /api/image-text-extraction
                           ↓
                    ExtractImageTextHandler
                           ↓
              Fetch user's LLM config from DB
                           ↓
              Resolve appropriate adapter (OpenAI/Anthropic)
                           ↓
              Call adapter.extractTextFromImage()
                           ↓
              Return extracted text
```

## API

### Server Actions

#### getLLMConfig

Fetches the current LLM configuration for the authenticated user.

```typescript
async function getLLMConfig(): Promise<ActionResult<LLMConfigState>>
```

**Returns:**
- `configured: boolean` - Whether a configuration exists
- `provider?: LLMProvider` - The configured provider (openai/anthropic)
- `model?: LLMModel` - The configured model
- `apiKeyMasked?: string` - Masked API key (e.g., "••••••")
- `updatedAt?: string` - Last update timestamp

#### saveLLMConfig

Saves or updates the LLM configuration.

```typescript
async function saveLLMConfig(
  provider: LLMProvider,
  model: LLMModel,
  apiKey: string
): Promise<ActionResult>
```

**Behavior:**
1. Validates provider/model combination
2. Tests connection with the provider API
3. Encrypts the API key
4. Upserts configuration in database

#### testLLMConnection

Tests the connection without saving.

```typescript
async function testLLMConnection(
  provider: LLMProvider,
  model: LLMModel,
  apiKey: string
): Promise<ActionResult>
```

#### deleteLLMConfig

Deletes the user's LLM configuration.

```typescript
async function deleteLLMConfig(): Promise<ActionResult>
```

### ILLMAdapter Interface

Updated to include image text extraction:

```typescript
interface ILLMAdapter {
  testConnection(apiKey: string, model: LLMModel): Promise<void>;
  generateFlashCards(...): Promise<FlashcardGenerationResult>;
  extractTextFromImage(
    apiKey: string,
    model: LLMModel,
    imageBase64: string
  ): Promise<string>;
}
```

## UI Components

### LLMConfigForm

Client component that handles:
- Provider selection (OpenAI/Anthropic)
- Model selection (dynamic based on provider)
- API key input with show/hide toggle
- Connection testing
- Save/update configuration
- Delete configuration with confirmation dialog

Uses shadcn/ui components:
- `Button`, `Card`, `Input`, `Label`, `Select`, `Badge`, `AlertDialog`
- `toast` from sonner for notifications

### AI Settings Page

Server component that:
- Checks authentication
- Fetches initial configuration via Server Action
- Renders informational cards about AI features
- Displays configuration form

## Error Handling

### HTTP Status Codes

- `400` - Bad Request (invalid input, insufficient text extracted)
- `401` - Unauthorized (not authenticated)
- `428` - Precondition Required (LLM not configured)
- `429` - Rate limit exceeded
- `500` - Server error

### Error Messages

- Invalid API key: "Invalid [Provider] API key"
- Rate limit: "[Provider] rate limit exceeded. Please try again later."
- No configuration: "LLM provider not configured. Please configure in Settings → AI."
- Insufficient text: "Could not extract sufficient text from the image..."

## Security

- API keys are encrypted using AES encryption before storage
- Keys are never exposed after initial save (masked display)
- Keys are never logged or included in error messages
- Decryption only happens at request time for API calls

## Provider Support

### OpenAI
- Models: gpt-4o, gpt-4.1, gpt-4o-mini
- Vision: Uses chat completions with image_url content type

### Anthropic
- Models: claude-3.5-sonnet, claude-3-opus
- Vision: Uses messages API with base64 image source

## Related PRD

See [.product-lens/prd/features/llm-management-ui.md](../../.product-lens/prd/features/llm-management-ui.md) for full requirements.
