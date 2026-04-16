"use client";
import { useState } from "react";
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
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      <div className="border-b-4 border-white pb-6">
        <div className="w-16 h-16 flex items-center justify-center mb-6 bg-black border-4 border-white shadow-[4px_4px_0_0_#ffffff]">
          <MessageSquare className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">SMS Analyzer_</h1>
        <p className="text-sm font-black uppercase tracking-widest text-black bg-white px-3 py-1 inline-block">Detect smishing, fraud, and urgency-based phishing.</p>
      </div>

      {/* Input Area */}
      <div className="card-brutalist p-8 bg-black">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-black uppercase tracking-widest text-black bg-white px-2 py-1 border-2 border-black">Message Content</span>
          <span className="text-sm font-black text-white bg-black border-2 border-white px-2 py-1">[{text.length} CHARS]</span>
        </div>
        <textarea
          placeholder="PASTE SMS HERE..."
          className="w-full min-h-[160px] text-lg text-white placeholder:text-gray-500 p-6 focus:outline-none focus:ring-0 transition-all font-mono border-4 border-white bg-black hover:bg-gray-900 resize-none uppercase"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mt-6 flex justify-end">
          <button
            className="inline-flex items-center px-8 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-50 transition-all border-4 bg-white text-black border-white hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0_0_#ffffff] hover:shadow-[6px_6px_0_0_#ffffff]"
            onClick={handleScan}
            disabled={isScanning || !text.trim()}
          >
            {isScanning ? <Loader2 className="mr-3 h-6 w-6 animate-spin" strokeWidth={3} /> : null}
            {isScanning ? "Analyzing..." : "Analyze Source_"}
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="card-brutalist overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-500"
          style={{
            borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
            boxShadow: `6px 6px 0 0 ${result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff"}`,
          }}>
          <div className="p-8">
            <div className="flex flex-col mb-6">
              <div className="flex items-center justify-between border-b-4 pb-4 mb-4" style={{
                borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center border-4 bg-black" style={{
                    borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                    color: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                  }}>
                    {result.level === "danger" || result.level === "warning" ? <AlertTriangle className="w-6 h-6" strokeWidth={3} /> : <ShieldCheck className="w-6 h-6" strokeWidth={3} />}
                  </div>
                  <span className="text-2xl font-black text-white uppercase tracking-tighter" style={{
                    color: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                  }}>{result.title}</span>
                </div>
                <RiskBadge level={result.level} />
              </div>
            </div>
            
            <div className="p-6 border-4 bg-black" style={{
              borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
            }}>
              <p className="text-sm font-bold text-white uppercase leading-relaxed">
                {result.explanation}
              </p>
            </div>

            {result.highlighted && result.highlighted.length > 0 && result.level === "danger" && (
              <div className="mt-8 border-t-4 pt-4 border-dashed border-[#ff0000]">
                <span className="text-xs font-black uppercase tracking-widest text-[#ff0000] block mb-4 border-2 border-[#ff0000] w-max px-2 py-1">Flagged Triggers</span>
                <div className="flex flex-wrap gap-2">
                  {result.highlighted.map((word: string, i: number) => (
                    <span key={i} className="px-3 py-1 font-black uppercase tracking-widest text-[#ff0000] border-2 border-[#ff0000] bg-black">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
