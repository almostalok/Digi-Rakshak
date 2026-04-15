export interface Alert {
  id: string;
  type: "sms" | "link" | "document" | "other";
  severity: "safe" | "warning" | "danger";
  summary: string;
  date: string;
}

export const userRiskScore = {
  current: 85,
  status: "safe",
  totalScans: 124,
  threatsDetected: 7,
};

export const recentAlerts: Alert[] = [
  {
    id: "1",
    type: "sms",
    severity: "danger",
    summary: "Suspicious message requesting OTP detected.",
    date: "10 mins ago",
  },
  {
    id: "2",
    type: "link",
    severity: "warning",
    summary: "Unverified URL detected in email.",
    date: "2 hours ago",
  },
  {
    id: "3",
    type: "document",
    severity: "safe",
    summary: "Bank statement scan completed. No threats found.",
    date: "1 day ago",
  },
  {
    id: "4",
    type: "link",
    severity: "danger",
    summary: "Known phishing domain blocked.",
    date: "2 days ago",
  }
];

export const scanHistory = {
  safe: 105,
  warning: 12,
  danger: 7,
};
