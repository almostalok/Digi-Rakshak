import { Badge } from "@/components/ui/badge";

export function RiskBadge({ level, className }: { level: "safe" | "warning" | "danger", className?: string }) {
  const getBadgeStyles = () => {
    switch (level) {
      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white border-red-600";
      case "warning":
        return "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600";
      case "safe":
      default:
        return "bg-green-500 hover:bg-green-600 text-white border-green-600";
    }
  };

  const getLabel = () => {
    switch(level) {
      case "danger": return "High Risk";
      case "warning": return "Warning";
      default: return "Safe";
    }
  }

  return (
    <Badge className={`${getBadgeStyles()} ${className || ""}`}>
      {getLabel()}
    </Badge>
  );
}
