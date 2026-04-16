"use client";
import { recentAlerts } from "@/lib/mockData";
import { AlertCard } from "@/components/AlertCard";
import { Bell } from "lucide-react";

export default function AlertsList() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 font-mono">
      <div className="border-b-4 border-white pb-6">
        <div className="w-16 h-16 flex items-center justify-center mb-6 bg-black border-4 border-white shadow-[4px_4px_0_0_#ffffff]">
          <Bell className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">Security Alerts_</h1>
        <p className="text-sm font-black uppercase tracking-widest text-black bg-white px-3 py-1 inline-block">Review threat notifications and blocked activity.</p>
      </div>

      {/* Timeline */}
      <div className="relative pl-6 space-y-8 border-l-4 border-white pb-8">
        {recentAlerts.map((alert) => {
          const dotColor = alert.severity === "danger" ? "#ff0000" : alert.severity === "warning" ? "#aaaaaa" : "#ffffff";
          return (
            <div key={alert.id} className="relative pl-6">
              {/* Dot */}
              <div className="absolute top-8 left-[-31px] w-6 h-6 border-4 border-white bg-black flex items-center justify-center z-10"
                style={{
                  borderColor: dotColor,
                }}
              >
                  <div className="w-2 h-2 animate-ping" style={{ backgroundColor: dotColor }} />
              </div>
              <AlertCard alert={alert} />
            </div>
          );
        })}
      </div>

      {recentAlerts.length === 0 && (
        <div className="text-center p-12 border-4 border-white bg-black">
          <Bell className="w-16 h-16 text-white mx-auto mb-6" strokeWidth={3} />
          <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">NO ALERTS_</h3>
          <p className="text-lg font-bold uppercase text-white bg-black border-2 border-white px-4 py-2 inline-block">System is clean</p>
        </div>
      )}
    </div>
  );
}
