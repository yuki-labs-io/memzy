"use client";

import { useState, useEffect, useCallback } from "react";

type AIStatus = "configured" | "warning" | "not-configured";

interface StatusResult {
  status: AIStatus;
  provider?: string;
}

export function useAIStatus() {
  const [status, setStatus] = useState<AIStatus>("not-configured");
  const [provider, setProvider] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const determineStatus = (response: Response, data?: { provider?: string }): StatusResult => {
    if (response.ok && data?.provider) {
      return { status: "configured", provider: data.provider };
    }
    
    if (response.status === 404) {
      return { status: "not-configured" };
    }
    
    return { status: "warning" };
  };

  const checkStatus = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/llm/config");
      const data = response.ok ? await response.json() : undefined;
      
      const result = determineStatus(response, data);
      setStatus(result.status);
      setProvider(result.provider);
    } catch {
      setStatus("warning");
      setProvider(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    status,
    provider,
    isLoading,
    refetch: checkStatus,
  };
}
