"use client";
import { userRiskScore, scanHistory, recentAlerts } from "@/lib/mockData";
import { AlertCard } from "@/components/AlertCard";
import { ShieldAlert, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export default function Dashboard() {
  const chartData = [
    { name: "Safe", value: scanHistory.safe, color: "#ffffff" },
    { name: "Warning", value: scanHistory.warning, color: "#aaaaaa" },
    { name: "Danger", value: scanHistory.danger, color: "#ff0000" },
  ];

  const scoreColor = userRiskScore.current >= 70 ? "#ffffff" : userRiskScore.current >= 40 ? "#aaaaaa" : "#ff0000";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      {/* Header */}
      <div className="flex items-end justify-between border-b-4 border-white pb-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Dashboard_</h1>
          <p className="text-white bg-black border-2 border-white px-2 py-1 mt-2 inline-block text-sm font-bold uppercase">Threat Overview</p>
        </div>
        <div className="hidden md:flex items-center text-sm font-black uppercase text-black bg-white px-4 py-2 border-2 border-transparent">
          [SYNC_STATUS: ACTIVE]
        </div>
      </div>

      {/* Top row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Risk Score */}
        <div className="lg:col-span-4 card-brutalist p-6 flex flex-col items-center justify-center text-center">
          <span className="bg-white text-black text-sm font-black uppercase tracking-widest px-3 py-1 block mb-8 w-full border-2 border-black">System Score</span>

          <div className="flex flex-col items-center">
            {/* Brutalist score UI */}
            <div className="relative w-40 h-40 mb-6 flex items-center justify-center border-4 border-white bg-black group-hover:bg-white transition-colors cursor-crosshair">
              <div className="absolute inset-2 border-4 border-dashed border-white opacity-50" />
              <div className="z-10 flex flex-col items-center justify-center bg-black border-4 border-white w-28 h-28 transform -translate-x-2 -translate-y-2 shadow-[4px_4px_0_0_#ffffff]">
                <span className="text-5xl font-black text-white tabular-nums tracking-tighter" style={{ color: scoreColor }}>{userRiskScore.current}</span>
              </div>
            </div>
            
            <span className="inline-flex items-center px-4 py-2 text-sm font-black uppercase tracking-widest border-4 bg-black shadow-[4px_4px_0_0_#ffffff]"
              style={{ borderColor: scoreColor, color: scoreColor }}>
              <span className="w-3 h-3 block mr-3 animate-ping" style={{ background: scoreColor }} />
              Condition Normal
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Total Scans */}
          <div className="card-brutalist p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-white text-black text-xs font-black uppercase tracking-widest px-2 py-1 border-2 border-black">Total Scans</span>
              <div className="w-12 h-12 flex items-center justify-center border-4 border-white bg-black">
                <Activity className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
            </div>
            <div>
              <span className="text-6xl font-black text-white tabular-nums tracking-tighter block">{userRiskScore.totalScans}</span>
              <span className="text-sm text-white font-bold uppercase mt-2 block border-t-2 border-white pt-2">Last 30 Days</span>
            </div>
          </div>

          {/* Threats Blocked */}
          <div className="card-brutalist p-6 flex flex-col justify-between" style={{ borderColor: '#ff0000', boxShadow: '6px 6px 0 0 #ff0000' }}>
            <div className="flex justify-between items-start mb-6">
              <span className="bg-[#ff0000] text-black text-xs font-black uppercase tracking-widest px-2 py-1 border-2 border-black">Threats Blocked</span>
              <div className="w-12 h-12 flex items-center justify-center border-4 border-[#ff0000] bg-black">
                <ShieldAlert className="w-6 h-6 text-[#ff0000]" strokeWidth={3} />
              </div>
            </div>
            <div>
              <span className="text-6xl font-black text-[#ff0000] tabular-nums tracking-tighter block">{userRiskScore.threatsDetected}</span>
              <span className="text-sm text-[#ff0000] font-bold uppercase mt-2 block border-t-2 border-[#ff0000] pt-2">Global Quarantine</span>
            </div>
          </div>

          {/* Chart */}
          <div className="card-brutalist p-6 sm:col-span-2 hidden md:flex flex-col">
            <span className="bg-white text-black text-sm font-black uppercase tracking-widest px-3 py-1 mb-4 inline-block border-2 border-black w-max">Distribution Analysis</span>
            <div className="flex-1 min-h-[200px] border-4 border-white p-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={0} outerRadius={80} paddingAngle={0} dataKey="value" stroke="#000000" strokeWidth={4}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "#000000",
                      border: "4px solid #ffffff",
                      borderRadius: "0px",
                      boxShadow: "4px 4px 0 0 #ffffff",
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 900,
                      textTransform: "uppercase"
                    }}
                    cursor={{ fill: "transparent" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="pt-8 border-t-4 border-white mt-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter bg-black px-2 border-l-8 border-white">Recent Activity_</h2>
          <span className="text-sm font-black uppercase tracking-widest border-2 border-white px-3 py-1">Last 3 Logs</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentAlerts.slice(0, 3).map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      </div>
    </div>
  );
}
