"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userRiskScore, scanHistory, recentAlerts } from "@/lib/mockData";
import { AlertCard } from "@/components/AlertCard";
import { ShieldAlert, ShieldCheck, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Dashboard() {
  const chartData = [
    { name: "Safe", value: scanHistory.safe, color: "#22c55e" },
    { name: "Warning", value: scanHistory.warning, color: "#eab308" },
    { name: "Danger", value: scanHistory.danger, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 mt-2 text-lg">Overview of your digital safety score and recent activity.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Score */}
        <Card className="rounded-3xl border-slate-200 shadow-sm md:col-span-1 border-b-4 border-b-green-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldCheck className="w-32 h-32 text-green-500" />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-bold uppercase tracking-widest relative z-10">Safety Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-8 pb-8 relative z-10">
            <div className="relative w-44 h-44 flex items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(34,197,94,0.15)] mb-6 border-[12px] border-green-100">
              <div className="absolute inset-0 border-[12px] border-green-500 rounded-full" style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 85%)" }}></div>
              <div className="text-center">
                <span className="text-6xl font-black text-slate-800 tracking-tighter">{userRiskScore.current}</span>
              </div>
            </div>
            <div className="flex items-center text-green-600 font-bold text-xl bg-green-50 px-4 py-2 rounded-full">
               System is Secure
            </div>
          </CardContent>
        </Card>

        {/* Stats & Charts */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="rounded-3xl border-slate-200 shadow-sm flex flex-col justify-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-sm font-bold uppercase tracking-widest flex items-center">
                <div className="p-2 bg-indigo-50 rounded-xl mr-3 text-indigo-600"><Activity className="w-5 h-5" /></div> Total Scans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-slate-800 mb-2 mt-2">{userRiskScore.totalScans}</div>
              <p className="text-slate-500 text-sm font-medium">Processed in the last 30 days</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm flex flex-col justify-center">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-sm font-bold uppercase tracking-widest flex items-center">
                <div className="p-2 bg-red-50 rounded-xl mr-3 text-red-500"><ShieldAlert className="w-5 h-5" /></div> Threats Blocked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-black text-red-500 mb-2 mt-2">{userRiskScore.threatsDetected}</div>
              <p className="text-slate-500 text-sm font-medium">Across all connected devices</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-slate-200 shadow-sm sm:col-span-2 h-72 hidden md:block">
            <CardHeader className="pb-0">
              <CardTitle className="text-slate-500 text-sm font-bold uppercase tracking-widest">Analysis Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAlerts.slice(0, 3).map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
