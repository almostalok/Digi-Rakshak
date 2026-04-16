"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Link as LinkIcon, FileText, Bell } from "lucide-react";

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
    <div className="hidden md:flex flex-col w-[260px] h-screen sticky top-0 bg-black border-r-4 border-white">
      {/* Logo */}
      <Link href="/dashboard">
        <div className="h-[80px] flex items-center px-4 border-b-4 border-white cursor-pointer hover:bg-white hover:text-black transition-colors group">
          <div className="w-12 h-12 flex items-center justify-center mr-3 border-2 border-transparent group-hover:border-black p-1">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain invert group-hover:invert-0" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap block">DIGI RAKSHAK</span>
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div className="flex-1 py-6 px-4">
        <span className="mb-4 block text-xs font-black tracking-widest uppercase bg-white text-black px-2 py-1 inline-block">MENU_</span>
        <nav className="space-y-4">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href}>
                <span className={`block flex items-center px-4 py-3 text-sm font-black uppercase border-2 transition-all ${
                  isActive
                  ? "border-white bg-white text-black shadow-[4px_4px_0_0_#ffffff]"
                  : "border-transparent bg-black text-white hover:border-white hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#ffffff]"
                }`}>
                  <Icon className={`mr-4 h-5 w-5 ${isActive ? "text-black" : "text-white"}`} strokeWidth={3} />
                  {link.label}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 bg-black animate-ping" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom version */}
      <div className="px-6 py-4 border-t-4 border-white">
        <span className="text-xs font-black uppercase tracking-widest">v1.0.0.0</span>
      </div>
    </div>
  );
}
