// Local rule-based fallback analyzer when Gemini API is unavailable

const DANGER_KEYWORDS = [
  "otp", "pin", "password", "cvv", "won", "winner", "lottery", "prize",
  "urgent", "immediately", "suspended", "blocked", "verify", "expire",
  "click here", "act now", "limited time", "congratulations", "free gift",
  "bank account", "credit card", "social security", "transfer money",
  "western union", "moneygram", "bitcoin", "crypto", "investment opportunity",
  "guaranteed return", "double your money", "risk free", "no risk",
  "dear customer", "dear user", "your account", "unauthorized",
  "kyc", "aadhar", "pan card", "link expired"
];

const WARNING_KEYWORDS = [
  "offer", "discount", "sale", "cashback", "reward", "redeem",
  "subscribe", "unsubscribe", "opt out", "call now", "missed call",
  "delivery", "package", "shipment", "tracking", "order confirmed",
  "loan", "emi", "insurance", "policy"
];

const SUSPICIOUS_URL_PATTERNS = [
  "bit.ly", "tinyurl", "goo.gl", "t.co", "shorturl", "rb.gy",
  "free", "gift", "prize", "win", "reward", "claim",
  "login", "signin", "verify", "update", "confirm", "secure",
  ".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".top", ".buzz",
  ".ru", ".cn", "@@", "///"
];

const DANGEROUS_FILE_EXTENSIONS = [
  ".exe", ".bat", ".cmd", ".com", ".msi", ".scr", ".pif",
  ".vbs", ".js", ".wsh", ".wsf", ".ps1", ".reg"
];

const SUSPICIOUS_FILE_EXTENSIONS = [
  ".doc", ".docm", ".xls", ".xlsm", ".ppt", ".pptm",
  ".zip", ".rar", ".7z", ".iso", ".img"
];

export function analyzeTextLocally(text: string) {
  const lower = text.toLowerCase();
  const foundDanger: string[] = [];
  const foundWarning: string[] = [];

  for (const kw of DANGER_KEYWORDS) {
    if (lower.includes(kw)) foundDanger.push(kw);
  }
  for (const kw of WARNING_KEYWORDS) {
    if (lower.includes(kw)) foundWarning.push(kw);
  }

  // Check for URLs in text
  const hasUrl = /https?:\/\/\S+|www\.\S+|bit\.ly|tinyurl/i.test(text);
  const hasPhonePrompt = /call\s*\d|dial\s*\d|\+91\s*\d{10}/i.test(text);
  const hasUrgency = /urgent|immediate|expire|last chance|final warning/i.test(text);

  if (foundDanger.length >= 2 || (foundDanger.length >= 1 && (hasUrl || hasUrgency))) {
    return {
      level: "danger" as const,
      title: "High Risk — Likely Scam or Phishing",
      explanation: `This message contains ${foundDanger.length} high-risk pattern(s) commonly used in fraud and phishing attacks. ${hasUrl ? "It also contains a suspicious link." : ""} Do NOT share any personal details, OTPs, or click any links.`,
      highlighted: foundDanger
    };
  }

  if (foundDanger.length === 1 || foundWarning.length >= 2 || hasPhonePrompt) {
    return {
      level: "warning" as const,
      title: "Suspicious — Exercise Caution",
      explanation: `This message has characteristics associated with spam or social engineering. ${foundWarning.length > 0 ? `Detected patterns: ${foundWarning.join(", ")}.` : ""} Verify the sender directly through official channels before acting.`,
      highlighted: [...foundDanger, ...foundWarning]
    };
  }

  return {
    level: "safe" as const,
    title: "No Threats Detected",
    explanation: "This message does not contain any recognized fraud, phishing, or spam patterns. It appears to be a normal communication.",
    highlighted: []
  };
}

export function analyzeLinkLocally(url: string) {
  const lower = url.toLowerCase();
  const foundPatterns: string[] = [];

  for (const pattern of SUSPICIOUS_URL_PATTERNS) {
    if (lower.includes(pattern)) foundPatterns.push(pattern);
  }

  const isHttps = lower.startsWith("https://");
  const hasIP = /https?:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/i.test(url);
  const hasManySubdomains = (url.match(/\./g) || []).length > 3;
  const hasEncodedChars = /%[0-9a-f]{2}/i.test(url);

  const riskScore = foundPatterns.length * 2 + (hasIP ? 3 : 0) + (hasManySubdomains ? 2 : 0) + (!isHttps ? 1 : 0) + (hasEncodedChars ? 1 : 0);

  if (riskScore >= 4 || hasIP) {
    return {
      level: "danger" as const,
      title: "High Risk — Potentially Malicious URL",
      explanation: `This URL exhibits ${foundPatterns.length > 0 ? `suspicious patterns (${foundPatterns.join(", ")})` : "characteristics"} commonly associated with phishing or malware distribution. ${hasIP ? "It uses a raw IP address instead of a domain name." : ""} ${!isHttps ? "It lacks HTTPS encryption." : ""} Do NOT visit this link.`
    };
  }

  if (riskScore >= 2) {
    return {
      level: "warning" as const,
      title: "Caution — Unverified URL",
      explanation: `This URL has some characteristics that warrant caution. ${foundPatterns.length > 0 ? `Detected: ${foundPatterns.join(", ")}.` : ""} ${!isHttps ? "The connection is not encrypted (no HTTPS)." : ""} Verify the destination before entering any credentials.`
    };
  }

  return {
    level: "safe" as const,
    title: "URL Appears Safe",
    explanation: `This URL ${isHttps ? "uses secure HTTPS encryption and" : ""} does not match any known suspicious patterns. Standard web safety practices still apply.`
  };
}

export function analyzeDocumentLocally(fileName: string, content?: string) {
  const lower = fileName.toLowerCase();
  const ext = "." + lower.split(".").pop();

  // First check dangerous executable file types (always dangerous regardless of content)
  if (DANGEROUS_FILE_EXTENSIONS.includes(ext)) {
    return {
      level: "danger" as const,
      title: "Dangerous File Type Detected",
      explanation: `Files with the "${ext}" extension are executable and can run malicious code on your system. Never open executable files from untrusted sources. This file type is commonly used to distribute malware, ransomware, and trojans.`
    };
  }

  // If we have actual file content, analyze it
  if (content && content.trim().length > 0) {
    return analyzeFileContent(fileName, ext, content);
  }

  // Fallback: extension + name based analysis (when content is not available)
  if (SUSPICIOUS_FILE_EXTENSIONS.includes(ext)) {
    return {
      level: "warning" as const,
      title: "Potentially Risky File Type",
      explanation: `Files with the "${ext}" extension can contain embedded macros or scripts. If this file is from an untrusted source, do not enable macros when prompted. Verify the sender's identity before opening.`
    };
  }

  const suspiciousNames = ["invoice", "payment", "receipt", "urgent", "password", "confidential"];
  const hasSuspiciousName = suspiciousNames.some(n => lower.includes(n));

  if (hasSuspiciousName) {
    return {
      level: "warning" as const,
      title: "Suspicious File Name",
      explanation: `The file name contains terms commonly used in social engineering attacks ("${fileName}"). While the file type itself is not dangerous, verify that this file is from a trusted and expected source.`
    };
  }

  return {
    level: "safe" as const,
    title: "File Appears Safe",
    explanation: `The file "${fileName}" has a standard file type and name with no detected risk indicators. Standard precautions still apply — only open files from trusted sources.`
  };
}

// ────── Content-based document analysis ──────

const CONTENT_DANGER_PATTERNS = [
  // Phishing / social engineering
  "verify your account", "confirm your identity", "your account has been suspended",
  "click here to restore", "enter your password", "update your payment",
  "your account will be closed", "unauthorized transaction", "security alert",
  "reset your password immediately", "we detected unusual activity",
  // Malicious script indicators
  "eval(", "document.write(", "window.location", "powershell", "cmd.exe",
  "base64_decode", "exec(", "system(", "shell_exec", "fromCharCode",
  "\\x", "unescape(", "WScript.Shell", "ActiveXObject",
  // Credential harvesting
  "enter your credit card", "social security number", "enter your ssn",
  "bank account number", "routing number", "enter your pin",
];

const CONTENT_WARNING_PATTERNS = [
  // Suspicious URLs in content
  "bit.ly/", "tinyurl.com/", "goo.gl/", "t.co/",
  // Urgency language
  "act now", "limited time", "expire", "immediately", "urgent action required",
  "final notice", "last warning", "respond within",
  // Data collection
  "fill out the form", "provide your details", "send your information",
  // Macro / script references
  "enable macros", "enable content", "enable editing",
  "run this script", "execute the following",
];

function analyzeFileContent(fileName: string, ext: string, content: string): {
  level: "safe" | "warning" | "danger";
  title: string;
  explanation: string;
} {
  const lowerContent = content.toLowerCase();
  const foundDanger: string[] = [];
  const foundWarning: string[] = [];

  for (const pattern of CONTENT_DANGER_PATTERNS) {
    if (lowerContent.includes(pattern.toLowerCase())) {
      foundDanger.push(pattern);
    }
  }

  for (const pattern of CONTENT_WARNING_PATTERNS) {
    if (lowerContent.includes(pattern.toLowerCase())) {
      foundWarning.push(pattern);
    }
  }

  // Check for suspicious URLs in content
  const urlMatches = content.match(/https?:\/\/[^\s<>"']+/gi) || [];
  const suspiciousUrls = urlMatches.filter(url => {
    const u = url.toLowerCase();
    return SUSPICIOUS_URL_PATTERNS.some(p => u.includes(p))
      || /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(u);
  });

  // Check for obfuscated content (high ratio of special chars)
  const specialCharRatio = (content.replace(/[a-zA-Z0-9\s]/g, '').length) / content.length;
  const isObfuscated = specialCharRatio > 0.4 && content.length > 200;

  // Check for embedded base64 data (potential hidden payloads)
  const hasLargeBase64 = /[A-Za-z0-9+/]{100,}={0,2}/.test(content);

  // Scoring
  const dangerScore = foundDanger.length * 3 + suspiciousUrls.length * 2 + (isObfuscated ? 4 : 0) + (hasLargeBase64 ? 2 : 0);
  const warningScore = foundWarning.length * 2;

  if (dangerScore >= 4) {
    const issues: string[] = [];
    if (foundDanger.length > 0) issues.push(`dangerous patterns detected: "${foundDanger.slice(0, 3).join('", "')}"`);
    if (suspiciousUrls.length > 0) issues.push(`${suspiciousUrls.length} suspicious URL(s) found`);
    if (isObfuscated) issues.push("content appears to be obfuscated");
    if (hasLargeBase64) issues.push("embedded encoded data detected (possible hidden payload)");

    return {
      level: "danger",
      title: "Malicious Content Detected",
      explanation: `Analysis of "${fileName}" content revealed serious threats: ${issues.join("; ")}. This file likely contains phishing content, malicious scripts, or social engineering attacks. Do NOT follow any instructions in this file.`
    };
  }

  if (dangerScore >= 2 || warningScore >= 4) {
    const issues: string[] = [];
    if (foundDanger.length > 0) issues.push(`suspicious patterns: "${foundDanger.slice(0, 2).join('", "')}"`);
    if (foundWarning.length > 0) issues.push(`cautionary indicators: "${foundWarning.slice(0, 2).join('", "')}"`);
    if (suspiciousUrls.length > 0) issues.push(`${suspiciousUrls.length} unverified URL(s)`);

    return {
      level: "warning",
      title: "Suspicious Content Found",
      explanation: `Analysis of "${fileName}" content found concerning elements: ${issues.join("; ")}. Exercise caution and verify the source of this file before trusting its content.`
    };
  }

  // Check extension-based risk even if content seems ok
  if (SUSPICIOUS_FILE_EXTENSIONS.includes(ext)) {
    return {
      level: "warning",
      title: "Risky File Type — Content Appears Normal",
      explanation: `The content of "${fileName}" does not contain obvious threats, but the "${ext}" file format can embed macros or scripts not visible in plain text. Do not enable macros if prompted.`
    };
  }

  return {
    level: "safe",
    title: "Content Verified — No Threats Found",
    explanation: `The content of "${fileName}" was analyzed and no phishing, malware, or social engineering patterns were detected. The file appears to contain legitimate content.`
  };
}

