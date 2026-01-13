# AI Provider Configuration Feature

## Overview

This feature allows users to configure their own LLM (Large Language Model) provider credentials to power AI-generated flashcards. Users can choose between OpenAI and Anthropic providers, select specific models, and securely store their API keys.

## Architecture

The implementation follows Clean Architecture principles with Dependency Injection:

```
src/
├── context/
│   ├── domain/
│   │   ├── entities/
│   │   │   └── LLMConfig.entity.ts         # Domain entities and types
│   │   └── errors/
│   │       └── LLMErrors.ts                # Domain-specific errors
│   ├── application/
│   │   ├── dtos/
│   │   │   └── LLMConfig.dto.ts           # Data Transfer Objects
│   │   └── handlers/
│   │       ├── SaveLLMConfig.handler.ts   # Save configuration handler
│   │       ├── GetLLMConfig.handler.ts    # Get configuration handler
│   │       ├── TestConnection.handler.ts  # Test API key handler
│   │       └── GenerateFlashcards.handler.ts  # Generate flashcards with user config
│   └── infrastructure/
│       ├── adapters/
│       │   ├── LLMAdapter.interface.ts    # LLM provider interface
│       │   ├── OpenAIAdapter.ts           # OpenAI implementation
│       │   └── AnthropicAdapter.ts        # Anthropic implementation
│       ├── repositories/
│       │   ├── LLMConfigRepository.interface.ts
│       │   └── PrismaLLMConfigRepository.ts
│       └── services/
│           └── EncryptionService.ts       # AES-256-GCM encryption
└── lib/
    ├── api/
    │   ├── Types.ts                       # Request pipeline types
    │   ├── WithAuth.ts                    # Authentication middleware
    │   ├── WithLogging.ts                 # Logging middleware
    │   └── WithErrorHandling.ts           # Error handling middleware
    └── di/
        ├── Container.ts                   # DI Container implementation
        ├── DITypes.ts                     # Service type identifiers
        └── Configuration.ts               # DI registration
```

## Request Pipeline Pattern

All API endpoints follow a consistent pipeline structure:

```
Router → withAuth → withLogging → withErrorHandling → Handler
```

This guarantees:
- Clear separation of concerns
- Testable, pure handlers
- Consistent behavior across all AI-related endpoints
- Easy extension (e.g., rate limiting, quotas, tracing)

Example:
```typescript
export async function POST(req: NextRequest) {
  const handler = container.resolve<SaveLLMConfigHandler>(DI_TYPES.SaveLLMConfigHandler);
  return withAuth(
    withLogging(
      withErrorHandling((req, ctx) => handler.handle(req, ctx))
    )
  )(req, {} as any);
}
```

## Dependency Injection

The application uses a custom DI container to manage dependencies:

```typescript
// Registration (in Configuration.ts)
container.registerSingleton<IEncryptionService>(
  DI_TYPES.IEncryptionService,
  () => new EncryptionService()
);

// Resolution (in routes)
const handler = container.resolve<SaveLLMConfigHandler>(DI_TYPES.SaveLLMConfigHandler);
```

### Benefits:
- **Testability**: Easy to mock dependencies in unit tests
- **Decoupling**: Components depend on interfaces, not implementations
- **Flexibility**: Easy to swap implementations
- **Maintainability**: Clear dependency graph

## Supported Providers

### OpenAI
- **Models**:
  - GPT-4o: Most capable model, balanced cost/quality
  - GPT-4.1: Latest iteration, improved reasoning
  - GPT-4o Mini: Faster, more economical option

### Anthropic
- **Models**:
  - Claude 3.5 Sonnet: High intelligence, balanced performance
  - Claude 3 Opus: Most capable Claude model

## Security

### API Key Encryption
- Algorithm: **AES-256-GCM**
- Keys encrypted at rest in database
- Encryption key stored separately in environment variables
- Keys never transmitted to client after initial save
- Keys never logged in plain text

### Encryption Service
```typescript
export interface IEncryptionService {
  encrypt(plaintext: string): string;
  decrypt(ciphertext: string): string;
  maskApiKey(apiKey: string): string;  // Returns: "sk-...xyz123"
}
```

## API Endpoints

### POST /api/llm/config
Save or update LLM configuration

**Request:**
```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "apiKey": "sk-..."
}
```

**Response:**
```json
{
  "status": "ok",
  "provider": "openai",
  "model": "gpt-4o-mini"
}
```

### GET /api/llm/config
Get current LLM configuration

**Response:**
```json
{
  "configured": true,
  "provider": "openai",
  "model": "gpt-4o-mini",
  "apiKeyMasked": "sk-...xyz123"
}
```

### POST /api/llm/config/test
Test API connection before saving

**Request:**
```json
{
  "provider": "openai",
  "model": "gpt-4o-mini",
  "apiKey": "sk-..."
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Connection test successful"
}
```

## Error Handling

### Domain Errors
- `LLM_NOT_CONFIGURED`: User hasn't configured LLM provider
- `INVALID_KEY`: API key is invalid or unauthorized
- `MODEL_NOT_SUPPORTED`: Model not supported by provider
- `PROVIDER_UNAVAILABLE`: Provider API is unavailable
- `RATE_LIMIT`: Rate limit exceeded
- `INVALID_PROVIDER`: Provider not supported

All errors are normalized through the `withErrorHandling` middleware with appropriate HTTP status codes:
- `INVALID_KEY`: 401
- `MODEL_NOT_SUPPORTED`: 400
- `PROVIDER_UNAVAILABLE`: 503
- `RATE_LIMIT`: 429
- `LLM_NOT_CONFIGURED`: 400

## Database Schema

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  image     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  llmConfig LLMConfiguration?

  @@map("users")
}

model LLMConfiguration {
  id         String   @id @default(uuid())
  userId     String   @unique
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider   String   // "openai" | "anthropic"
  model      String   // model identifier
  apiKeyEnc  String   // encrypted API key
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("llm_configurations")
}
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/memzy?schema=public"

# Encryption Key for API Keys
# Generate with: openssl rand -base64 32
ENCRYPTION_KEY=your-encryption-key-here

# Optional: Legacy OpenAI key for backwards compatibility
OPENAI_API_KEY=your-openai-api-key-here
```

## Usage Flow

### 1. Configuration Setup
1. User navigates to Settings → Artificial Intelligence
2. Selects provider (OpenAI or Anthropic)
3. Selects model from provider-specific list
4. Enters API key
5. Clicks "Test Connection" to validate
6. Saves configuration if test succeeds

### 2. Flashcard Generation
1. User submits content for flashcard generation
2. System checks for valid LLM configuration
3. If configured: retrieves and decrypts API key
4. Calls appropriate provider adapter
5. Generates flashcards using user's configuration

### 3. Configuration Update
1. User can view masked API key
2. Change provider, model, or API key
3. Must test new configuration before saving
4. Previous configuration is replaced

## Testing

### Unit Tests
Test handlers with mocked dependencies:

```typescript
const mockRepository = {
  getUserLLMSettings: jest.fn(),
  upsertUserLLMSettings: jest.fn(),
};

const handler = new SaveLLMConfigHandler(
  mockProviderRegistry,
  mockEncryptionService,
  mockRepository
);
```

### Integration Tests
Test adapters with real API endpoints (using test keys).

## Code Conventions

### Naming
- **Files**: PascalCase (e.g., `SaveLLMConfig.handler.ts`)
- **Interfaces**: Prefix with `I` (e.g., `ILLMAdapter`, `IEncryptionService`)
- **Classes**: PascalCase (e.g., `OpenAIAdapter`)
- **Functions/Methods**: camelCase (e.g., `testConnection`)

### Dependency Injection
- All handlers receive dependencies via constructor
- Services registered in `lib/di/Configuration.ts`
- Use interfaces, not concrete implementations
- Singletons for infrastructure services
- New instances for handlers

## Future Enhancements

- [ ] Support for additional providers (Google PaLM, Cohere)
- [ ] Multiple configurations per user
- [ ] Cost tracking and usage analytics
- [ ] Model performance comparison
- [ ] API key rotation
- [ ] Team/organization shared configurations
- [ ] Advanced model parameters (temperature, top-p)

## References

- [PRD: AI Provider Configuration](../../.product-lens/prd/features/ai-provider-configuration.md)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Anthropic Claude API Documentation](https://docs.anthropic.com/claude/reference)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Dependency Injection Pattern](https://en.wikipedia.org/wiki/Dependency_injection)
