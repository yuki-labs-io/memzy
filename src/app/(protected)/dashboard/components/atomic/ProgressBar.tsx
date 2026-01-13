import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-700">
          {clampedProgress.toFixed(0)}%
        </span>
      </div>
      <Progress 
        value={clampedProgress}
        className={cn("[&>div]:transition-all [&>div]:duration-300", `[&>div]:${indicatorColorClass}`)}
      />
    </div>
  );
}
