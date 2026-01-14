import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  let indicatorColorClass = styles.progressIndicatorRed;
  if (clampedProgress === 100) {
    indicatorColorClass = styles.progressIndicatorGreen;
  } else if (clampedProgress >= 76) {
    indicatorColorClass = styles.progressIndicatorBlue;
  } else if (clampedProgress >= 26) {
    indicatorColorClass = styles.progressIndicatorYellow;
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
