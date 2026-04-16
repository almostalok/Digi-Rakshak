export function RiskBadge({ level, className }: { level: "safe" | "warning" | "danger", className?: string }) {
  const styles: Record<string, { bg: string; text: string; border: string; shadow: string }> = {
    danger: {
      bg: "#ff0000",
      text: "#000000",
      border: "#000000",
      shadow: "4px 4px 0 0 #000000",
    },
    warning: {
      bg: "#000000",
      text: "#aaaaaa",
      border: "#aaaaaa",
      shadow: "4px 4px 0 0 #aaaaaa",
    },
    safe: {
      bg: "#000000",
      text: "#ffffff",
      border: "#ffffff",
      shadow: "4px 4px 0 0 #ffffff",
    },
  };

  const s = styles[level] || styles.safe;
  const labels: Record<string, string> = { danger: "High Risk", warning: "Warning", safe: "Secure" };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-xs font-black uppercase tracking-widest border-4 ${className || ""}`}
      style={{
        background: s.bg,
        color: s.text,
        borderColor: s.border,
        boxShadow: s.shadow,
      }}
    >
      <span className="w-2 h-2 mr-2 animate-ping" style={{ background: s.text, border: `1px solid ${s.bg}` }} />
      {labels[level]}
    </span>
  );
}
