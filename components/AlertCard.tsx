import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/lib/mockData";
import { RiskBadge } from "./RiskBadge";
import { Clock, MessageSquare, Link as LinkIcon, FileText, AlertCircle } from "lucide-react";

export function AlertCard({ alert }: { alert: Alert }) {
  const getIcon = () => {
    switch (alert.type) {
      case "sms": return <MessageSquare className="h-5 w-5 text-indigo-500" />;
      case "link": return <LinkIcon className="h-5 w-5 text-indigo-500" />;
      case "document": return <FileText className="h-5 w-5 text-indigo-500" />;
      default: return <AlertCircle className="h-5 w-5 text-indigo-500" />;
    }
  };

  return (
    <Card className="rounded-xl shadow-sm hover:shadow-md transition-all border-slate-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
             {getIcon()}
          </div>
          <CardTitle className="text-sm font-medium uppercase tracking-wider text-slate-500">{alert.type}</CardTitle>
        </div>
        <RiskBadge level={alert.severity} />
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-slate-800 mb-3">{alert.summary}</p>
        <div className="flex items-center text-sm text-slate-500">
          <Clock className="w-4 h-4 mr-1" />
          {alert.date}
        </div>
      </CardContent>
    </Card>
  );
}
