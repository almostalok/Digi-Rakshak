import { Alert } from "@/lib/mockData";
import { RiskBadge } from "./RiskBadge";
import { Clock, MessageSquare, Link as LinkIcon, FileText, AlertCircle } from "lucide-react";

export function AlertCard({ alert }: { alert: Alert }) {
  const getIcon = () => {
    switch (alert.type) {
      case "sms": return <MessageSquare className="h-6 w-6" strokeWidth={3} />;
      case "link": return <LinkIcon className="h-6 w-6" strokeWidth={3} />;
      case "document": return <FileText className="h-6 w-6" strokeWidth={3} />;
      default: return <AlertCircle className="h-6 w-6" strokeWidth={3} />;
    }
  };

  const iconColors: Record<string, string> = {
    danger: "#ff0000",
    warning: "#aaaaaa",
    safe: "#ffffff",
  };

  return (
    <div className="card-brutalist p-6 flex flex-col justify-between group h-full">
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 flex items-center justify-center border-4 bg-black shadow-[4px_4px_0_0_#ffffff]"
              style={{
                borderColor: iconColors[alert.severity],
                color: iconColors[alert.severity],
                boxShadow: `4px 4px 0 0 ${iconColors[alert.severity]}`
              }}
            >
              {getIcon()}
            </div>
            <span className="text-sm font-black uppercase tracking-widest text-white px-2 py-1 bg-black border-2 border-white">{alert.type}</span>
          </div>
          <RiskBadge level={alert.severity} />
        </div>
        <p className="text-lg font-bold text-white uppercase tracking-tight leading-snug border-l-4 border-white pl-4">{alert.summary}</p>
      </div>
      <div className="flex items-center text-xs text-black bg-white w-max px-3 py-1 font-black uppercase tracking-widest border-2 border-white mt-auto">
        <Clock className="w-4 h-4 mr-2" strokeWidth={3} />
        {alert.date}
      </div>
    </div>
  );
}
