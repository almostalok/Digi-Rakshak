"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Menu, LayoutDashboard, MessageSquare, Link as LinkIcon, FileText, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/scan-sms", label: "Scan SMS", icon: MessageSquare },
    { href: "/scan-link", label: "Scan Link", icon: LinkIcon },
    { href: "/scan-doc", label: "Scan Document", icon: FileText },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <>
      <div className="md:hidden flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200 sticky top-0 z-30 w-full shadow-sm">
        <Link href="/dashboard" className="flex items-center">
          <Shield className="w-8 h-8 text-indigo-600 mr-2" />
          <span className="font-bold text-slate-800 text-xl tracking-tight">DigiRakshak</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="w-7 h-7 text-slate-700" />
        </Button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col">
          <div className="flex items-center justify-between h-20 px-6 border-b border-slate-200">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-indigo-600 mr-2" />
              <span className="font-bold text-slate-800 text-xl tracking-tight">DigiRakshak</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="w-7 h-7 text-slate-700" />
            </Button>
          </div>
          <div className="flex-1 py-8 px-6 space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <span className={`flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all ${
                    isActive 
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" 
                    : "text-slate-600"
                  }`}>
                    <Icon className={`mr-4 h-6 w-6 ${isActive ? "text-indigo-100" : "text-slate-400"}`} />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
