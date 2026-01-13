import * as ProgressPrimitive from "@radix-ui/react-progress";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  let indicatorColorClass = "bg-red-500";
  if (clampedProgress === 100) {
    indicatorColorClass = "bg-green-500";
  } else if (clampedProgress >= 76) {
    indicatorColorClass = "bg-blue-500";
  } else if (clampedProgress >= 26) {
    indicatorColorClass = "bg-yellow-500";
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-700">
          {clampedProgress.toFixed(0)}%
        </span>
      </div>
      <ProgressPrimitive.Root
        value={clampedProgress}
        className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200"
      >
        <ProgressPrimitive.Indicator
          className={`h-full transition-all duration-300 ${indicatorColorClass}`}
          style={{ transform: `translateX(-${100 - clampedProgress}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
