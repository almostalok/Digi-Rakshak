import Link from "next/link";
import { Shield, ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="px-8 h-20 flex items-center justify-between bg-white border-b border-slate-200">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-indigo-600 mr-3" />
          <span className="font-bold text-slate-900 text-xl tracking-tight">DigiRakshak</span>
        </div>
        <Link href="/dashboard">
          <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-6">
            Go to Dashboard <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-indigo-600 mr-2"></span>
            Version 1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Your Digital Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Guardian</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Protect yourself from online threats, phishing links, and malicious documents with our advanced scanning and analysis engine.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 transition-all">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mt-24">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-left">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Protection</h3>
            <p className="text-slate-600 leading-relaxed">Instantly analyze suspicious SMS, links, and documents to detect potential threats before they harm you.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-left">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <Zap className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Fast & Accurate</h3>
            <p className="text-slate-600 leading-relaxed">Powered by advanced algorithms to provide immediate, reliable risk assessments for all your digital inputs.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-left">
            <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy First</h3>
            <p className="text-slate-600 leading-relaxed">Your data remains private. We analyze content securely without storing sensitive personal information.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
