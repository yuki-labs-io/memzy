import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getLLMConfig } from "./actions";
import { LLMConfigForm } from "./LLMConfigForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ArrowLeft, Sparkles, Image, BookOpen } from "lucide-react";

export const metadata = {
  title: "AI Settings - Memzy",
  description: "Configure your AI provider for flashcard generation and text extraction",
};

export default async function AISettingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const configResult = await getLLMConfig();
  const config = configResult.success && configResult.data
    ? configResult.data
    : { configured: false };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI Settings</h1>
              <p className="text-gray-600">
                Configure your AI provider for intelligent features
              </p>
            </div>
          </div>
        </div>

        {!config.configured && (
          <Card className="mb-6 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <Sparkles className="h-5 w-5" />
                AI Provider Required
              </CardTitle>
              <CardDescription className="text-amber-700">
                To use AI-powered features, you need to configure your own AI provider.
                This keeps costs transparent and gives you control over your API usage.
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <LLMConfigForm initialConfig={config} />

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Features powered by your AI provider
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Flashcard Generation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automatically generate study flashcards from text, PDFs, and other content.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Image className="h-5 w-5 text-primary" />
                  Image Text Extraction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Extract text from images using AI vision capabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-8 rounded-lg bg-gray-100 p-4">
          <h3 className="font-medium text-gray-900">About API Keys</h3>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            <li>• Your API key is encrypted before being stored</li>
            <li>• Keys are never logged or exposed in error messages</li>
            <li>• You maintain full control over your AI provider account</li>
            <li>• API usage costs are billed directly by your provider</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
