"use client";
import { useState } from "react";
import { RiskBadge } from "@/components/RiskBadge";
import { Link as LinkIcon, AlertTriangle, ShieldCheck, Globe, Loader2 } from "lucide-react";
import { analyzeLink } from "@/app/actions/scanner";

export default function ScanLink() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    if (!url.trim()) return;
    setIsScanning(true);
    setResult(null);
    try {
      const data = await analyzeLink(url);
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
          <LinkIcon className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">Link Verifier_</h1>
        <p className="text-sm font-black uppercase tracking-widest text-black bg-white px-3 py-1 inline-block">Check URLs against threat intelligence.</p>
      </div>

      {/* Input */}
      <div className="card-brutalist p-8 bg-black">
        <span className="text-xs font-black uppercase tracking-widest text-black bg-white px-2 py-1 block mb-6 w-max border-2 border-black">Target URL</span>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white w-6 h-6" strokeWidth={3} />
            <input
              placeholder="https://example.com/login"
              className="w-full text-lg text-white placeholder:text-gray-500 pl-14 pr-4 py-4 focus:outline-none focus:ring-0 transition-all font-mono border-4 border-white bg-black hover:bg-gray-900"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            className="px-8 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-50 sm:w-auto w-full transition-all border-4 bg-white text-black border-white hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0_0_#ffffff] hover:shadow-[6px_6px_0_0_#ffffff]"
            onClick={handleScan}
            disabled={isScanning || !url.trim()}
          >
            {isScanning ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Verify_"}
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
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 flex items-center justify-center shrink-0 border-4 bg-black" style={{
                borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                color: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
              }}>
                {result.level === "safe" ? <ShieldCheck className="w-8 h-8" strokeWidth={3} /> : <AlertTriangle className="w-8 h-8" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                  <span className="text-2xl font-black text-white uppercase tracking-tighter" style={{
                    color: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                  }}>{result.title}</span>
                  <RiskBadge level={result.level} />
                </div>
                <p className="text-sm font-bold text-white uppercase leading-relaxed border-l-4 pl-4" style={{
                  borderColor: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                }}>{result.explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
