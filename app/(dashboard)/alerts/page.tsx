"use client";
import { recentAlerts } from "@/lib/mockData";
import { AlertCard } from "@/components/AlertCard";
import { Bell } from "lucide-react";

export default function AlertsList() {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
           <Bell className="w-8 h-8 text-red-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Security Alerts</h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Review all the recent security notifications and blocked threats across your devices.
        </p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 md:ml-6 space-y-12 pb-10">
        {recentAlerts.map((alert, idx) => (
          <div key={alert.id} className="relative pl-8 md:pl-10">
            {/* Timeline Dot */}
            <div className={`absolute top-6 -left-3.5 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center
              ${alert.severity === 'danger' ? 'bg-red-500' : alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-green-500'}
            `}></div>
            
            <AlertCard alert={alert} />
          </div>
        ))}
      </div>
      
      {recentAlerts.length === 0 && (
         <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
           <h3 className="text-xl font-bold text-slate-700">No recent alerts</h3>
           <p className="text-slate-500">You're all caught up!</p>
         </div>
      )}
    </div>
  );
}
