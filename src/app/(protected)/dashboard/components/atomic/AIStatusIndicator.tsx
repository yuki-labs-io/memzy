import { AlertCircle, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

type AIStatus = "configured" | "warning" | "not-configured";

interface AIStatusIndicatorProps {
  status: AIStatus;
  provider?: string;
  className?: string;
}

export function AIStatusIndicator({
  status,
  provider,
  className = "",
}: AIStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "configured":
        return {
          icon: CheckCircle,
          color: "text-green-600",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          tooltip: `AI ready - ${provider || "Provider"} configured`,
        };
      case "warning":
        return {
          icon: AlertCircle,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
          borderColor: "border-yellow-200",
          tooltip: "AI configuration needs attention",
        };
      case "not-configured":
        return {
          icon: XCircle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          tooltip: "AI not configured - click to set up",
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Link
      href="/settings"
      className={`group inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all hover:shadow-md ${config.bgColor} ${config.borderColor} ${className}`}
      title={config.tooltip}
      aria-label={config.tooltip}
    >
      <Icon className={`h-5 w-5 ${config.color}`} />
      <span className={`text-sm font-medium ${config.color}`}>
        {status === "configured" ? "AI Ready" : "AI Setup"}
      </span>
    </Link>
  );
}
