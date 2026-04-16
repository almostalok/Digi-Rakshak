"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, MessageSquare, Link as LinkIcon, FileText, Bell, X } from "lucide-react";
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
      <div className="md:hidden flex items-center justify-between h-[80px] px-4 bg-black border-b-4 border-white sticky top-0 z-30 w-full">
        <Link href="/dashboard" className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center mr-3 border-2 border-white p-1">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain invert" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase text-white">DIGI RAKSHAK</span>
        </Link>
        <button onClick={() => setIsOpen(true)} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#ffffff] transition-all">
          <Menu className="w-6 h-6" strokeWidth={3} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex flex-col bg-black">
          <div className="flex items-center justify-between h-[80px] px-4 border-b-4 border-white">
            <div className="flex items-center">
              <div className="w-10 h-10 flex items-center justify-center mr-3 border-2 border-white p-1">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain invert" />
              </div>
              <span className="font-black text-xl tracking-tighter uppercase text-white">DIGI RAKSHAK</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-12 h-12 flex items-center justify-center bg-white border-2 border-white text-black hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#ffffff] transition-all">
              <X className="w-6 h-6" strokeWidth={3} />
            </button>
          </div>
          <div className="flex-1 py-8 px-4 space-y-4">
            <span className="mb-4 block text-xs font-black tracking-widest uppercase bg-white text-black px-2 py-1 inline-block">MENU_</span>
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                  <span className={`flex items-center px-4 py-4 text-lg font-black uppercase border-4 transition-all ${
                    isActive
                    ? "border-white bg-white text-black shadow-[6px_6px_0_0_#ffffff]"
                    : "border-transparent bg-black text-white hover:border-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#ffffff]"
                  }`}>
                    <Icon className={`mr-4 h-6 w-6 ${isActive ? "text-black" : "text-white"}`} strokeWidth={3} />
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
