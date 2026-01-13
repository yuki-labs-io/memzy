"use client";

import { useState, useEffect, useCallback } from "react";

type AIStatus = "configured" | "warning" | "not-configured";

export function useAIStatus() {
  const [status, setStatus] = useState<AIStatus>("not-configured");
  const [provider, setProvider] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const checkStatus = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/llm/config");
      
      if (response.ok) {
        const data = await response.json();
        if (data.provider) {
          setStatus("configured");
          setProvider(data.provider);
        } else {
          setStatus("not-configured");
          setProvider(undefined);
        }
      } else if (response.status === 404) {
        setStatus("not-configured");
        setProvider(undefined);
      } else {
        setStatus("warning");
        setProvider(undefined);
      }
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
