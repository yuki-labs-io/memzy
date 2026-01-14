"use client";

import { useMemo } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export type GenerationStep = "reading" | "extracting" | "generating" | "finalizing" | "complete";

interface GenerationProgressProps {
  currentStep: GenerationStep;
}

const STEPS: { key: GenerationStep; label: string; description: string }[] = [
  { key: "reading", label: "Reading document", description: "Processing your content..." },
  { key: "extracting", label: "Extracting key concepts", description: "Analyzing important information..." },
  { key: "generating", label: "Generating questions", description: "Creating flashcards with AI..." },
  { key: "finalizing", label: "Finalizing", description: "Preparing your flashcards..." },
];

export default function GenerationProgress({ currentStep }: GenerationProgressProps) {
  const visibleSteps = useMemo(() => {
    const stepOrder: GenerationStep[] = ["reading", "extracting", "generating", "finalizing"];
    const currentIndex = stepOrder.indexOf(currentStep);
    
    if (currentIndex >= 0) {
      return new Set(stepOrder.slice(0, currentIndex + 1));
    }
    return new Set<GenerationStep>(["reading"]);
  }, [currentStep]);

  const getStepStatus = (stepKey: GenerationStep): "complete" | "current" | "pending" => {
    if (!visibleSteps.has(stepKey)) return "pending";
    if (stepKey === currentStep) return "current";
    
    const stepOrder: GenerationStep[] = ["reading", "extracting", "generating", "finalizing"];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepKey);
    
    if (stepIndex < currentIndex) return "complete";
    return "pending";
  };

  const stepOrder: GenerationStep[] = ["reading", "extracting", "generating", "finalizing"];
  const currentStepIndex = stepOrder.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / stepOrder.length) * 100;

  return (
    <div className="w-full py-8 px-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900">Generating Flashcards</h3>
        <p className="text-sm text-gray-600 mt-1">Please wait while we process your content</p>
      </div>

      <div className="mb-6">
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const status = getStepStatus(step.key);
          const isLast = index === STEPS.length - 1;

          return (
            <div key={step.key} className="relative">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${
                        status === "complete"
                          ? "bg-green-500 border-green-500"
                          : status === "current"
                            ? "bg-blue-500 border-blue-500 animate-pulse"
                            : "bg-gray-100 border-gray-300"
                      }
                    `}
                  >
                    {status === "complete" ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : status === "current" ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-gray-400" />
                    )}
                  </div>
                  {!isLast && (
                    <div
                      className={`
                        w-0.5 h-12 mt-2 transition-colors duration-300
                        ${status === "complete" ? "bg-green-500" : "bg-gray-300"}
                      `}
                    />
                  )}
                </div>

                <div className="flex-1 pb-4">
                  <h4
                    className={`
                      text-sm font-medium transition-colors
                      ${
                        status === "complete"
                          ? "text-green-700"
                          : status === "current"
                            ? "text-blue-700"
                            : "text-gray-500"
                      }
                    `}
                  >
                    {step.label}
                  </h4>
                  <p
                    className={`
                      text-xs mt-1 transition-colors
                      ${
                        status === "complete"
                          ? "text-green-600"
                          : status === "current"
                            ? "text-blue-600"
                            : "text-gray-400"
                      }
                    `}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
