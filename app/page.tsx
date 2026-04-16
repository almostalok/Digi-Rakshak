import Link from "next/link";
import { Shield, ArrowRight, ShieldCheck, Zap, Lock, Scan, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen mesh-bg flex flex-col font-sans relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[-200px] right-[-100px] w-[600px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(108,92,231,0.08) 0%, transparent 70%)" }} />

      {/* Header */}
      <header className="relative z-10 px-6 md:px-10 h-[72px] flex items-center justify-between border-b border-white/[0.04]">
        <div className="flex items-center">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center mr-3"
            style={{ background: "linear-gradient(135deg, #00d4aa, #00b894)", boxShadow: "0 0 20px rgba(0,212,170,0.3)" }}>
            <Shield className="w-5 h-5 text-[#08090d]" />
          </div>
          <span className="font-bold text-white/90 text-[16px] tracking-tight">DigiRakshak</span>
        </div>
        <Link href="/dashboard">
          <span className="inline-flex items-center px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#08090d] transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #00d4aa, #00b894)", boxShadow: "0 0 25px rgba(0,212,170,0.2)" }}>
            Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </span>
        </Link>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-16 md:py-24 text-center">
        <div className="max-w-3xl">
          {/* Status pill */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-8"
            style={{
              background: "rgba(0,212,170,0.08)",
              border: "1px solid rgba(0,212,170,0.15)",
              color: "#00d4aa",
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] mr-2 animate-pulse-glow" />
            System Active
          </div>

          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-white leading-[1.05] tracking-tight mb-6">
            Your Digital
            <br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #00d4aa, #6c5ce7)" }}>
              Safety Guardian
            </span>
          </h1>
          <p className="text-[17px] text-white/40 mb-12 max-w-xl mx-auto leading-relaxed font-normal">
            Advanced threat detection for SMS, links, and documents. Powered by AI with local fallback analysis.
          </p>
          <Link href="/dashboard">
            <span className="inline-flex items-center px-8 py-4 rounded-2xl text-[15px] font-bold text-[#08090d] transition-all hover:scale-[1.02] hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #00d4aa, #00b894)",
                boxShadow: "0 10px 40px rgba(0,212,170,0.25), 0 0 0 1px rgba(0,212,170,0.3)",
              }}>
              Enter Dashboard <ChevronRight className="ml-2 w-5 h-5" />
            </span>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mt-20 w-full">
          {[
            { icon: ShieldCheck, title: "Real-time Scanning", desc: "Instant analysis of threats in SMS messages, URLs, and uploaded documents.", color: "#00d4aa" },
            { icon: Zap, title: "Dual Engine", desc: "AI-powered analysis with automatic local fallback when offline or rate-limited.", color: "#6c5ce7" },
            { icon: Lock, title: "Privacy First", desc: "Zero data retention. Files are analyzed in-memory and immediately discarded.", color: "#ff6b81" },
          ].map((f, i) => (
            <div key={i} className="card-3d rounded-2xl p-6 text-left group hover:translate-y-[-3px] transition-all duration-300">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${f.color}12`, color: f.color }}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-bold text-white/85 mb-2">{f.title}</h3>
              <p className="text-[13px] text-white/35 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
