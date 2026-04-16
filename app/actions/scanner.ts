"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { analyzeTextLocally, analyzeLinkLocally, analyzeDocumentLocally } from "@/lib/localAnalyzer";

const apiKey = process.env.GOOGLE_API || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function isRateLimitError(error: any): boolean {
  const msg = error?.message || String(error);
  return msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("quota");
}

export async function analyzeSMS(text: string) {
  try {
    const prompt = `
      You are a cybersecurity expert analyzing SMS messages for fraud, phishing, or malware vectors.
      Analyze the following SMS message and return a pure JSON string with no markdown formatting or backticks.
      
      Required JSON structure:
      {
        "level": "safe" | "warning" | "danger",
        "title": "Short title describing the threat level",
        "explanation": "A detailed explanation of why it was categorized this way",
        "highlighted": ["Array", "of", "suspicious", "words", "or", "phrases"]
      }

      SMS to analyze:
      "${text}"
    `;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error: any) {
    console.error("Gemini API Error (SMS):", error?.message || error);
    // Fallback to local analysis
    console.log("[DigiRakshak] Falling back to local SMS analyzer...");
    return analyzeTextLocally(text);
  }
}

export async function analyzeLink(url: string) {
  try {
    const prompt = `
      You are a cybersecurity URL analyzer. Analyze the given URL for phishing, malicious domains, 
      or unsafe routing. Note that checking the actual content is impossible here, so focus purely on heuristics, domain structure, url parameters, and known patterns.
      Respond with a JSON object ONLY (no markdown).

      Required JSON structure:
      {
        "level": "safe" | "warning" | "danger",
        "title": "Short title describing the risk",
        "explanation": "Detail the findings about this domain and URL structure."
      }

      URL to analyze:
      "${url}"
    `;
    
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error: any) {
    console.error("Gemini API Error (Link):", error?.message || error);
    console.log("[DigiRakshak] Falling back to local link analyzer...");
    return analyzeLinkLocally(url);
  }
}

export async function analyzeDocument(fileName: string, mimeType: string, base64Data: string) {
  // MIME types that Gemini can accept as inlineData
  const geminiSupportedMimes = [
    'application/pdf',
    'image/png', 'image/jpeg', 'image/gif', 'image/webp',
    'audio/mpeg', 'audio/wav', 'audio/ogg',
    'video/mp4', 'video/webm',
  ];

  // Text-based MIME types where we can decode and read the content
  const textMimeTypes = [
    'text/plain', 'text/html', 'text/css', 'text/csv', 'text/xml',
    'application/json', 'application/xml', 'application/javascript',
    'text/javascript', 'text/markdown',
  ];

  // Decode text content from base64 for text-based files
  let extractedText = "";
  const isTextFile = textMimeTypes.some(t => mimeType.startsWith(t.split('/')[0] + '/') && mimeType === t) 
    || mimeType.startsWith('text/')
    || ['application/json', 'application/xml', 'application/javascript'].includes(mimeType)
    || fileName.match(/\.(txt|csv|html|htm|xml|json|js|ts|jsx|tsx|css|md|py|java|c|cpp|h|log|cfg|ini|yaml|yml|toml|env|sh|bat|sql)$/i);

  if (isTextFile && base64Data) {
    try {
      extractedText = Buffer.from(base64Data, 'base64').toString('utf-8');
      // Limit to first 15000 chars to avoid token limits
      if (extractedText.length > 15000) {
        extractedText = extractedText.substring(0, 15000) + "\n... [content truncated]";
      }
    } catch {
      extractedText = "";
    }
  }

  try {
    let prompt = `
      You are a digital forensics expert examining files for threats.
      Analyze this file thoroughly based on its ACTUAL CONTENT, not just its name.
      File name: "${fileName}"
      MIME type: "${mimeType}"
    `;

    if (extractedText) {
      prompt += `
      
      === FILE CONTENT START ===
      ${extractedText}
      === FILE CONTENT END ===

      Analyze the above content for:
      - Phishing attempts, social engineering, or scam language
      - Malicious scripts, obfuscated code, or suspicious commands
      - Sensitive data exposure (passwords, API keys, credentials)
      - Suspicious URLs or embedded links
      - Any other security concerns based on the actual text content
      `;
    } else {
      prompt += `
      Analyze the attached file content for any security threats, malware indicators, or suspicious patterns.
      `;
    }

    prompt += `
      Provide a security assessment of whether this document is safe, suspicious, or malicious.
      Respond with a JSON object ONLY (no markdown).

      Required JSON structure:
      {
        "level": "safe" | "warning" | "danger",
        "title": "Short security title",
        "explanation": "Detailed explanation of findings or potential risks based on the actual content analysis."
      }
    `;

    const parts: any[] = [{ text: prompt }];

    // Attach file as inlineData if Gemini supports the MIME type
    const isGeminiSupported = geminiSupportedMimes.includes(mimeType);
    if (isGeminiSupported && base64Data) {
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
    }

    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error: any) {
    console.error("Gemini API Error (Document):", error?.message || error);
    console.log("[DigiRakshak] Falling back to local document analyzer...");
    return analyzeDocumentLocally(fileName, extractedText);
  }
}
