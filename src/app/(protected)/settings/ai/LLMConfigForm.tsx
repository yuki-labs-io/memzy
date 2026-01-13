"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Check, Loader2, Trash2, Eye, EyeOff, ExternalLink, Zap } from "lucide-react";
import {
  LLMConfigState,
  saveLLMConfig,
  testLLMConnection,
  deleteLLMConfig,
} from "./actions";
import {
  LLMProvider,
  LLMModel,
  PROVIDER_MODELS,
  MODEL_DISPLAY_NAMES,
} from "@/context/domain/entities/LLMConfig.entity";

interface LLMConfigFormProps {
  initialConfig: LLMConfigState;
}

const PROVIDER_OPTIONS: { value: LLMProvider; label: string }[] = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic" },
];

const PROVIDER_DOCS: Record<LLMProvider, string> = {
  openai: "https://platform.openai.com/api-keys",
  anthropic: "https://console.anthropic.com/settings/keys",
};

export function LLMConfigForm({ initialConfig }: LLMConfigFormProps) {
  const [config, setConfig] = useState<LLMConfigState>(initialConfig);
  const [provider, setProvider] = useState<LLMProvider | "">(
    initialConfig.provider || ""
  );
  const [model, setModel] = useState<LLMModel | "">(initialConfig.model || "");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);

  const [isSaving, startSaving] = useTransition();
  const [isTesting, startTesting] = useTransition();
  const [isDeleting, startDeleting] = useTransition();

  const availableModels = provider ? PROVIDER_MODELS[provider] : [];
  const isFormValid = provider && model && apiKey.trim().length > 0;
  const isEditMode = config.configured;

  function handleProviderChange(value: LLMProvider) {
    setProvider(value);
    setModel("");
    setTestResult(null);
  }

  function handleModelChange(value: LLMModel) {
    setModel(value);
    setTestResult(null);
  }

  function handleApiKeyChange(value: string) {
    setApiKey(value);
    setTestResult(null);
  }

  function handleTestConnection() {
    if (!provider || !model || !apiKey) return;

    startTesting(async () => {
      const result = await testLLMConnection(provider, model as LLMModel, apiKey);

      if (result.success) {
        setTestResult("success");
        toast.success("Connection successful! Your API key is valid.");
      } else {
        setTestResult("error");
        toast.error(result.error || "Connection test failed");
      }
    });
  }

  function handleSave() {
    if (!provider || !model || !apiKey) return;

    startSaving(async () => {
      const result = await saveLLMConfig(provider, model as LLMModel, apiKey);

      if (result.success) {
        toast.success("LLM provider configured successfully");
        setConfig({
          configured: true,
          provider,
          model: model as LLMModel,
          apiKeyMasked: "••••••••",
          updatedAt: new Date().toISOString(),
        });
        setApiKey("");
        setTestResult(null);
      } else {
        toast.error(result.error || "Failed to save configuration");
      }
    });
  }

  function handleDelete() {
    startDeleting(async () => {
      const result = await deleteLLMConfig();

      if (result.success) {
        toast.success("LLM configuration deleted");
        setConfig({ configured: false });
        setProvider("");
        setModel("");
        setApiKey("");
        setTestResult(null);
      } else {
        toast.error(result.error || "Failed to delete configuration");
      }
    });
  }

  return (
    <div className="space-y-6">
      {config.configured && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  Current Configuration
                  <Badge variant="default" className="bg-green-600">
                    <Check className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Your current AI provider settings
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Provider</p>
                <p className="text-lg font-semibold capitalize">{config.provider}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Model</p>
                <p className="text-lg font-semibold">
                  {config.model && MODEL_DISPLAY_NAMES[config.model]}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">API Key</p>
                <p className="text-lg font-semibold font-mono">{config.apiKeyMasked}</p>
              </div>
            </div>
            {config.updatedAt && (
              <p className="mt-4 text-sm text-muted-foreground">
                Last updated: {new Date(config.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {isEditMode ? "Update Configuration" : "Configure AI Provider"}
          </CardTitle>
          <CardDescription>
            {isEditMode
              ? "Update your AI provider settings. Enter your new API key to save changes."
              : "Connect your AI provider to enable flashcard generation and text extraction."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="provider">Provider</Label>
            <Select value={provider} onValueChange={handleProviderChange}>
              <SelectTrigger id="provider">
                <SelectValue placeholder="Select a provider" />
              </SelectTrigger>
              <SelectContent>
                {PROVIDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select
              value={model}
              onValueChange={handleModelChange}
              disabled={!provider}
            >
              <SelectTrigger id="model">
                <SelectValue
                  placeholder={provider ? "Select a model" : "Select a provider first"}
                />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((m) => (
                  <SelectItem key={m} value={m}>
                    {MODEL_DISPLAY_NAMES[m]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="apiKey">API Key</Label>
              {provider && (
                <a
                  href={PROVIDER_DOCS[provider]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  Get API key
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                placeholder={isEditMode ? "Enter new API key to update" : "Enter your API key"}
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              Your API key is encrypted before storage and never exposed.
            </p>
          </div>

          {testResult && (
            <div
              className={`rounded-lg p-4 ${
                testResult === "success"
                  ? "bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200"
                  : "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {testResult === "success" ? (
                  <>
                    <Check className="h-5 w-5" />
                    <span>Connection successful! Your API key is valid.</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600">Connection failed. Please check your API key.</span>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handleTestConnection}
              disabled={!isFormValid || isTesting}
            >
              {isTesting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Test Connection
                </>
              )}
            </Button>

            <div className="flex gap-3">
              {isEditMode && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" disabled={isDeleting}>
                      {isDeleting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="mr-2 h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete LLM Configuration?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will remove your AI provider configuration. Features like flashcard
                        generation and image text extraction will be disabled until you
                        configure a new provider.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete Configuration
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <Button
                type="button"
                onClick={handleSave}
                disabled={!isFormValid || isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Configuration"
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
