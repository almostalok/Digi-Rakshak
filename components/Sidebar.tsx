"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Link as LinkIcon, FileText, Bell, Shield } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/scan-sms", label: "Scan SMS", icon: MessageSquare },
    { href: "/scan-link", label: "Scan Link", icon: LinkIcon },
    { href: "/scan-doc", label: "Scan Document", icon: FileText },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      <Link href="/dashboard">
        <div className="h-20 flex items-center px-6 border-b border-slate-200 cursor-pointer">
          <Shield className="w-8 h-8 text-indigo-600 mr-3" />
          <span className="text-xl font-bold text-slate-800 tracking-tight">DigiRakshak</span>
        </div>
      </Link>
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <span className={`flex items-center px-4 py-3.5 mb-2 text-base font-medium rounded-xl transition-all ${
                  isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}>
                  <Icon className={`mr-4 h-5 w-5 ${isActive ? "text-indigo-100" : "text-slate-400"}`} />
                  {link.label}
                </span>
              </Link>
            )})}
        </nav>
      </div>
    </div>
  );
}
