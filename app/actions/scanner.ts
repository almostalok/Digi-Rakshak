"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function handleApiError(error: any, context: string) {
  console.error(`Gemini API Error (${context}):`, error);
  const msg = error?.message || String(error);
  if (msg.includes("429") || msg.includes("Too Many Requests") || msg.includes("quota")) {
    return {
      level: "warning" as const,
      title: "Rate Limit Reached",
      explanation: "You've exceeded the free-tier API quota. Please wait 60 seconds and try again.",
      highlighted: [] as string[]
    };
  }
  return {
    level: "warning" as const,
    title: "Analysis Error",
    explanation: `Unable to reach the threat intelligence engine. ${context}: ${msg}`,
    highlighted: [] as string[]
  };
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
    // Clean potential markdown returned by Gemini
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error: any) {
    return handleApiError(error, "SMS Analysis");
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
    return handleApiError(error, "Link Verification");
  }
}

export async function analyzeDocument(fileName: string, mimeType: string, base64Data: string) {
  try {
    const prompt = `
      You are a digital forensics expert examining files for threats.
      Analyze this file. Consider the file name: "${fileName}" and its contents.
      Provide a security assessment of whether this document is safe, suspicious, or malicious.
      Respond with a JSON object ONLY (no markdown).

      Required JSON structure:
      {
        "level": "safe" | "warning" | "danger",
        "title": "Short security title",
        "explanation": "Detailed explanation of findings or potential risks."
      }
    `;

    const parts: any[] = [{ text: prompt }];

    // If it's a PDF or supported file, pass it inline
    if (mimeType === 'application/pdf' && base64Data) {
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
    return handleApiError(error, "Document Analysis");
  }
}
