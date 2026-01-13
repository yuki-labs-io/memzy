export class DomainError extends Error {
  constructor(
    public code: string,
    message: string
  ) {
    super(message);
    this.name = "DomainError";
  }
}

export class LLMNotConfiguredError extends DomainError {
  constructor() {
    super(
      "LLM_NOT_CONFIGURED",
      "LLM provider not configured. Please configure an AI provider first."
    );
  }
}

export class InvalidAPIKeyError extends DomainError {
  constructor(message: string = "Invalid API key") {
    super("INVALID_KEY", message);
  }
}

export class ModelNotSupportedError extends DomainError {
  constructor(model: string, provider: string) {
    super(
      "MODEL_NOT_SUPPORTED",
      `Model ${model} is not supported by provider ${provider}`
    );
  }
}

export class ProviderUnavailableError extends DomainError {
  constructor(provider: string, message?: string) {
    super(
      "PROVIDER_UNAVAILABLE",
      message || `Provider ${provider} is currently unavailable`
    );
  }
}

export class RateLimitError extends DomainError {
  constructor(message?: string) {
    super("RATE_LIMIT", message || "Rate limit exceeded. Please try again later.");
  }
}

export class InvalidProviderError extends DomainError {
  constructor(provider: string) {
    super("INVALID_PROVIDER", `Provider ${provider} is not supported`);
  }
}
