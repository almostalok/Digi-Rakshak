"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RiskBadge } from "@/components/RiskBadge";
import { FileText, AlertTriangle, ShieldCheck, UploadCloud, Loader2, X, File } from "lucide-react";

import { analyzeDocument } from "@/app/actions/scanner";

export default function ScanDoc() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleScan = async () => {
    if (!file) return;
    setIsScanning(true);
    setResult(null);
    
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1] || "";
        try {
          const data = await analyzeDocument(file.name, file.type, base64String);
          setResult(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsScanning(false);
        }
      };
      reader.onerror = () => {
        setIsScanning(false);
        console.error("Failed to read file");
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-6">
           <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Document Analyzer
        </h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">Upload PDF, Word, or text files to detect hidden malware and malicious macros securely.</p>
      </div>

      <Card className="rounded-3xl border-slate-200 shadow-sm overflow-hidden border-t-4 border-t-purple-500">
        <div className="bg-white p-8">
          <CardTitle className="text-2xl font-bold text-slate-800 mb-2">Upload File</CardTitle>
          <CardDescription className="text-base text-slate-500 mb-6">File remains secure and is discarded immediately after scan.</CardDescription>
        
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
          />

          {!file ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-3 border-dashed border-slate-300 rounded-3xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-purple-400 transition-all group bg-slate-50 min-h-[250px]"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Click to browse or drag file</h3>
              <p className="text-slate-500 font-medium">Supports PDF, DOCX, XLSX, TXT (Max 10MB)</p>
            </div>
          ) : (
             <div className="border-2 border-purple-100 bg-purple-50 rounded-3xl p-8 flex items-center justify-between shadow-inner">
               <div className="flex items-center">
                 <div className="p-4 bg-white rounded-2xl shadow-sm mr-6">
                    <File className="w-10 h-10 text-purple-600" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 mb-1">{file.name}</h3>
                   <p className="text-slate-500 text-sm font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                 </div>
               </div>
               <Button variant="ghost" size="icon" onClick={clearFile} className="hover:bg-purple-100 rounded-full h-12 w-12 text-slate-500 hover:text-purple-700">
                 <X className="w-6 h-6" />
               </Button>
             </div>
          )}

          <div className="mt-8 flex justify-end">
            <Button 
              size="lg" 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-10 h-14 text-lg font-bold shadow-lg shadow-purple-200 transition-all"
              onClick={handleScan}
              disabled={isScanning || !file}
            >
              {isScanning ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : <ShieldCheck className="mr-3 h-6 w-6" />}
              {isScanning ? "Scanning File Zones..." : "Start Security Scan"}
            </Button>
          </div>
        </div>
      </Card>

      {result && (
        <Card className={`rounded-3xl shadow-md border-0 overflow-hidden animate-in fade-in slide-in-from-bottom-8 
          ${result.level === 'warning' ? 'bg-yellow-50' : result.level === 'danger' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`h-2 ${result.level === 'warning' ? 'bg-yellow-500' : result.level === 'danger' ? 'bg-red-500' : 'bg-green-500'}`}></div>
          <CardHeader className="pb-4 pt-6 px-8 flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center text-slate-800">
               Analysis Result
            </CardTitle>
            <RiskBadge level={result.level} className="text-sm px-4 py-1.5" />
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className={`p-6 rounded-2xl shadow-sm bg-white border ${result.level === 'warning' ? 'border-yellow-100' : result.level === 'danger' ? 'border-red-100' : 'border-green-100'}`}>
               <h3 className={`text-2xl font-black mb-3 ${result.level === 'warning' ? 'text-yellow-700' : result.level === 'danger' ? 'text-red-700' : 'text-green-700'}`}>
                 {result.title}
               </h3>
               <p className="text-lg text-slate-700 leading-relaxed font-medium">{result.explanation}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
