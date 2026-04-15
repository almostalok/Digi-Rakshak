"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RiskBadge } from "@/components/RiskBadge";
import { MessageSquare, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";

import { analyzeSMS } from "@/app/actions/scanner";

export default function ScanSMS() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!text.trim()) return;
    setIsScanning(true);
    setResult(null);
    
    try {
      const data = await analyzeSMS(text);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
           <MessageSquare className="w-8 h-8 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          SMS Security Scanner
        </h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">Instantly analyze text messages for smishing, unauthorized OTP requests, and urgency-based fraud tactics.</p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-indigo-500">
        <div className="bg-white p-8">
          <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Message Content</CardTitle>
          <CardDescription className="text-base text-slate-500 mb-6">Paste the SMS exactly as received. Do not edit commas or links.</CardDescription>
          
          <Textarea 
            placeholder="E.g., Dear customer, your account is suspended. Click here to verify your identity to unlock..." 
            className="min-h-[160px] text-lg p-5 rounded-2xl border-2 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 resize-none shadow-inner bg-slate-50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="mt-8 flex justify-end">
            <Button 
              size="lg" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-14 text-lg font-medium shadow-lg shadow-indigo-200 transition-all"
              onClick={handleScan}
              disabled={isScanning || !text.trim()}
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Pattern...
                </>
              ) : "Analyze Message"}
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className={`rounded-3xl shadow-md border-0 overflow-hidden animate-in fade-in slide-in-from-bottom-8 ${result.level === 'danger' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`h-2 ${result.level === 'danger' ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <CardHeader className="pb-4 pt-6 px-8">
           <div className="flex items-center justify-between">
              <RiskBadge level={result.level} className="text-sm px-4 py-1.5" />
            </div>
            <CardTitle className={`flex items-center text-2xl font-extrabold mt-4 ${result.level === 'danger' ? 'text-red-900' : 'text-green-900'}`}>
              {result.level === "danger" ? <AlertTriangle className="w-7 h-7 mr-3 text-red-600" /> : <ShieldCheck className="w-7 h-7 mr-3 text-green-600" />}
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className={`rounded-2xl p-6 text-lg font-medium leading-relaxed ${result.level === 'danger' ? 'bg-white text-red-800 shadow-sm' : 'bg-white text-green-800 shadow-sm'}`}>
              {result.explanation}
            </div>
            
            {result.highlighted && result.highlighted.length > 0 && result.level === "danger" && (
              <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm">
                <span className="font-bold text-slate-800 block mb-3 text-sm uppercase tracking-widest">Flagged Triggers</span>
                <div className="flex flex-wrap gap-2">
                  {result.highlighted.map((word: string, i: number) => (
                    <span key={i} className="inline-flex items-center bg-red-100 border border-red-200 text-red-800 px-3 py-1.5 rounded-lg text-sm font-semibold shadow-sm">{word}</span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
