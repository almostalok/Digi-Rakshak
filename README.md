<div align="center">

<img src="public/logo.png" alt="DigiRakshak Logo" width="90" />

# DIGI RAKSHAK

### Your Digital Safety Guardian

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev)

*Advanced threat detection for SMS, links, and documents — powered by AI with a local fallback engine.*

---

</div>

## 🛡️ What is DigiRakshak?

**DigiRakshak** (Hindi: *Digital Protector*) is a privacy-first cybersecurity web application that helps everyday users identify digital threats. It scans SMS messages, suspicious URLs, and uploaded documents for phishing, malware, and fraud — using Google Gemini AI with an automatic offline fallback when the API is unavailable.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📩 **SMS Scanner** | Paste any SMS to detect phishing, OTP fraud, and social-engineering language |
| 🔗 **Link Scanner** | Analyze URLs for malicious domains, suspicious parameters, and unsafe routing |
| 📄 **Document Scanner** | Upload PDFs, images, text files and more for forensic content analysis |
| 📊 **Dashboard** | Real-time risk score, scan distribution chart, and recent activity log |
| 🔔 **Alerts** | Centralized log of all flagged threats across scan types |
| ⚡ **Dual Engine** | AI-powered via Gemini 2.0 Flash, with a rule-based local fallback |
| 🔒 **Privacy First** | Zero data retention — files are analyzed in-memory and immediately discarded |

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router)
- **UI Library:** [React 19](https://react.dev) + [shadcn/ui](https://ui.shadcn.com) + [Lucide Icons](https://lucide.dev)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com) with a brutalist design system
- **Charts:** [Recharts](https://recharts.org)
- **AI Engine:** [Google Generative AI — Gemini 2.0 Flash](https://ai.google.dev)
- **Language:** [TypeScript 5](https://www.typescriptlang.org)

---

## 📁 Project Structure

```
digi-rakshak/
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/      # Risk score, stats, recent activity
│   │   ├── scan-sms/       # SMS phishing detection
│   │   ├── scan-link/      # URL threat analysis
│   │   ├── scan-doc/       # Document forensics
│   │   └── alerts/         # Threat alert history
│   ├── actions/
│   │   └── scanner.ts      # Gemini AI server actions
│   ├── layout.tsx
│   └── page.tsx            # Landing page
├── components/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── AlertCard.tsx
│   └── RiskBadge.tsx
├── lib/
│   ├── localAnalyzer.ts    # Offline rule-based fallback engine
│   ├── mockData.ts
│   └── utils.ts
└── public/
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A **Google Gemini API key** — get one free at [ai.google.dev](https://ai.google.dev)

### 1. Clone the repository

```bash
git clone https://github.com/almostalok/Digi-Rakshak.git
cd Digi-Rakshak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
GOOGLE_API=your_gemini_api_key_here
```

> **Note:** If the API key is missing or rate-limited, DigiRakshak automatically falls back to its built-in local analyzer — no crash, no downtime.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 How the AI Engine Works

DigiRakshak uses a **dual-engine architecture**:

```
User Input
    │
    ▼
┌─────────────────────────────┐
│   Gemini 2.0 Flash (Cloud)  │  ← Primary
│   Structured JSON prompt    │
└────────────┬────────────────┘
             │ Rate limit / No key / Error?
             ▼
┌─────────────────────────────┐
│   Local Rule-Based Analyzer │  ← Fallback
│   Pattern matching & heuristics │
└─────────────────────────────┘
             │
             ▼
    Risk Assessment: safe / warning / danger
```

Each scan returns a structured result:

```json
{
  "level": "danger",
  "title": "Phishing Attempt Detected",
  "explanation": "This SMS contains urgency triggers and a shortened URL...",
  "highlighted": ["urgent", "click here", "verify now"]
}
```

---

## 🖥️ Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Privacy & Security

- **No data is stored.** Every scan is stateless — content is processed in-memory and discarded after the response.
- **No user accounts required.**
- **Local fallback** means the app stays functional and private even without an internet connection to the AI API.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

<div align="center">

Built with ❤️ to make the internet safer for everyone.

**[⬆ Back to Top](#digi-rakshak)**

</div>
