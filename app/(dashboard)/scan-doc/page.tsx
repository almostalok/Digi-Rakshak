"use client";
import { useState, useRef } from "react";
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
        const base64String = (reader.result as string).split(",")[1] || "";
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
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error(err);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      <div className="border-b-4 border-white pb-6">
        <div className="w-16 h-16 flex items-center justify-center mb-6 bg-black border-4 border-white shadow-[4px_4px_0_0_#ffffff]">
          <FileText className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-2">Document Analyser_</h1>
        <p className="text-sm font-black uppercase tracking-widest text-black bg-white px-3 py-1 inline-block">Scan files for hidden malware and payloads.</p>
      </div>

      {/* Upload Area */}
      <div className="card-brutalist p-8 bg-black">
        <span className="text-xs font-black uppercase tracking-widest text-black bg-white px-2 py-1 block mb-6 w-max border-2 border-black">File Upload</span>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

        {!file ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="p-12 flex flex-col items-center justify-center text-center cursor-pointer group transition-all duration-300 border-4 border-dashed border-white hover:bg-white hover:text-black mb-6"
          >
            <div className="w-20 h-20 flex items-center justify-center mb-6 border-4 border-white group-hover:border-black bg-black group-hover:bg-white group-hover:shadow-[4px_4px_0_0_#000000] shadow-[4px_4px_0_0_#ffffff] transition-all">
              <UploadCloud className="w-10 h-10 text-white group-hover:text-black" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest">Click to browse</h3>
            <p className="text-sm font-bold uppercase mt-2">PDF, DOCX, XLSX, TXT — Max 10MB</p>
          </div>
        ) : (
          <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between border-4 border-white bg-black mb-6 gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center mr-4 border-4 border-white bg-black">
                <File className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-black text-white uppercase tracking-tighter truncate max-w-[200px] sm:max-w-xs">{file.name}</h3>
                <p className="text-sm font-bold text-white uppercase mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button onClick={clearFile}
              className="w-12 h-12 flex items-center justify-center border-4 border-white bg-black text-white hover:bg-white hover:text-black transition-colors shrink-0">
              <X className="w-6 h-6" strokeWidth={3} />
            </button>
          </div>
        )}

        <div className="flex justify-end">
          <button
            className="inline-flex items-center px-8 py-4 text-sm font-black uppercase tracking-widest disabled:opacity-50 transition-all border-4 bg-white text-black border-white hover:translate-x-[-2px] hover:translate-y-[-2px] shadow-[4px_4px_0_0_#ffffff] hover:shadow-[6px_6px_0_0_#ffffff]"
            onClick={handleScan}
            disabled={isScanning || !file}
          >
            {isScanning ? <Loader2 className="mr-3 h-6 w-6 animate-spin" strokeWidth={3} /> : <ShieldCheck className="mr-3 h-6 w-6" strokeWidth={3} />}
            {isScanning ? "Scanning..." : "Start Scan_"}
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
                <span className="text-2xl font-black text-white uppercase tracking-tighter" style={{
                  color: result.level === "danger" ? "#ff0000" : result.level === "warning" ? "#aaaaaa" : "#ffffff",
                }}>{result.title}</span>
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
          </div>
        </div>
      )}
    </div>
  );
}
