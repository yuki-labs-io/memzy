interface ProgressBarProps {
  progress: number;
  className?: string;
}

export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  let colorClass = "bg-red-500";
  if (clampedProgress === 100) {
    colorClass = "bg-green-500";
  } else if (clampedProgress >= 76) {
    colorClass = "bg-blue-500";
  } else if (clampedProgress >= 26) {
    colorClass = "bg-yellow-500";
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-700">
          {clampedProgress.toFixed(0)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ${colorClass}`}
          style={{ width: `${clampedProgress}%` }}
        ></div>
      </div>
    </div>
  );
}
