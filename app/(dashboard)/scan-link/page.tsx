"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
           <LinkIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Link Verifier
        </h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">Check URLs against global threat databases and perform deep resolution before you click.</p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-blue-500">
        <div className="bg-white p-8">
          <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Target URL</CardTitle>
          <CardDescription className="text-base text-slate-500 mb-6">Provide the full web address holding http:// or https://</CardDescription>
        
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <div className="relative flex-1">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
              <Input 
                placeholder="https://example.com/login" 
                className="pl-14 text-lg font-medium h-16 bg-slate-50 rounded-2xl border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500 shadow-inner"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <Button 
              size="lg" 
              className="h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-10 text-lg font-bold shadow-lg shadow-blue-200 transition-all w-full sm:w-auto"
              onClick={handleScan}
              disabled={isScanning || !url.trim()}
            >
              {isScanning ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify Link"}
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className={`rounded-3xl shadow-md border-0 overflow-hidden animate-in fade-in slide-in-from-bottom-8 
          ${result.level === 'warning' ? 'bg-yellow-50' : result.level === 'danger' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`h-2 ${result.level === 'warning' ? 'bg-yellow-500' : result.level === 'danger' ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <CardHeader className="pb-4 pt-6 px-8">
            <RiskBadge level={result.level} className="w-max text-sm px-4 py-1.5" />
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex flex-col md:flex-row items-start">
              <div className={`p-4 rounded-2xl mr-6 mb-4 md:mb-0
                ${result.level === 'warning' ? 'bg-yellow-100 text-yellow-600' : result.level === 'danger' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {result.level === "safe" ? <ShieldCheck className="w-10 h-10" /> : <AlertTriangle className="w-10 h-10" />}
              </div>
              <div className={`p-6 rounded-2xl shadow-sm flex-1 bg-white
                ${result.level === 'warning' ? 'text-yellow-900 border border-yellow-100' : result.level === 'danger' ? 'text-red-900 border border-red-100' : 'text-green-900 border border-green-100'}`}>
                <h3 className="text-2xl font-black mb-2">{result.title}</h3>
                <p className="text-lg leading-relaxed opacity-90 font-medium">{result.explanation}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
