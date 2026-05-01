<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=DIGI%20RAKSHAK&fontSize=62&fontColor=ffffff&fontAlignY=40&desc=Your%20AI-Powered%20Digital%20Safety%20Guardian&descAlignY=62&descSize=18&animation=fadeIn" width="100%" />

<br/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=22&pause=1000&color=A78BFA&center=true&vCenter=true&width=600&lines=Scan+SMS+%F0%9F%93%B1+%7C+Detect+Phishing+%F0%9F%8E%A3;Analyze+Links+%F0%9F%94%97+%7C+Inspect+Docs+%F0%9F%93%84;Powered+by+Gemini+2.0+Flash+%E2%9A%A1;Privacy-First+%C2%B7+Zero+Data+Retention+%F0%9F%94%92" alt="Typing SVG" />

<br/><br/>

<a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white" /></a>
<a href="https://react.dev"><img src="https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" /></a>
<a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" /></a>
<a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" /></a>
<a href="https://ai.google.dev"><img src="https://img.shields.io/badge/Gemini_2.0_Flash-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" /></a>

<br/><br/>

<img src="https://img.shields.io/github/stars/almostalok/Digi-Rakshak?style=social" />
&nbsp;
<img src="https://img.shields.io/github/forks/almostalok/Digi-Rakshak?style=social" />
&nbsp;
<img src="https://img.shields.io/github/last-commit/almostalok/Digi-Rakshak?style=flat-square&color=a78bfa" />
&nbsp;
<img src="https://img.shields.io/github/languages/top/almostalok/Digi-Rakshak?style=flat-square&color=06b6d4" />

</div>

---

## 🛡️ What is DigiRakshak?

<table>
<tr>
<td width="65%">

**DigiRakshak** (Hindi: *Digital Protector*) is a **privacy-first cybersecurity web application** that helps everyday users identify digital threats.

It scans **SMS messages**, **suspicious URLs**, and **uploaded documents** for phishing, malware, and fraud — using **Google Gemini AI** with an automatic offline fallback when the API is unavailable.

> 🔒 *Zero data retention. No accounts. Always private.*

</td>
<td width="35%" align="center">

```
  🛡️  THREAT LEVELS
  ──────────────────
  🟢  SAFE
  🟡  WARNING
  🔴  DANGER
  ──────────────────
  Powered by AI +
  Rule-Based Engine
```

</td>
</tr>
</table>

---

## ✨ Features

<div align="center">

<table>
<tr>
<td align="center" width="25%">

### 📩
**SMS Scanner**
<br/>
Detect phishing, OTP fraud & social-engineering language in any SMS

</td>
<td align="center" width="25%">

### 🔗
**Link Scanner**
<br/>
Analyze URLs for malicious domains, suspicious params & unsafe routing

</td>
<td align="center" width="25%">

### 📄
**Document Scanner**
<br/>
Upload PDFs, images, text files for deep forensic content analysis

</td>
<td align="center" width="25%">

### 📊
**Dashboard**
<br/>
Real-time risk scores, scan distribution charts & activity logs

</td>
</tr>
<tr>
<td align="center" width="25%">

### 🔔
**Alerts**
<br/>
Centralized log of all flagged threats across every scan type

</td>
<td align="center" width="25%">

### ⚡
**Dual Engine**
<br/>
Gemini 2.0 Flash as primary · rule-based analyzer as fallback

</td>
<td align="center" width="25%">

### 🔒
**Privacy First**
<br/>
Stateless scans — data is processed in-memory & immediately discarded

</td>
<td align="center" width="25%">

### 🌐
**Works Offline**
<br/>
Local fallback engine keeps you protected even without an API key

</td>
</tr>
</table>

</div>

---

## 🧠 How the AI Engine Works

<div align="center">

```
          ┌──────────────────────────────┐
          │         User Input           │
          │  SMS · URL · Document        │
          └──────────────┬───────────────┘
                         │
                         ▼
          ┌──────────────────────────────┐
          │   ⚡ Gemini 2.0 Flash (Cloud) │  ← PRIMARY
          │   Structured JSON prompting  │
          └──────────────┬───────────────┘
                         │  API unavailable / rate-limited?
                         ▼
          ┌──────────────────────────────┐
          │   🔧 Local Rule-Based Engine │  ← FALLBACK
          │   Pattern matching + heuristics │
          └──────────────┬───────────────┘
                         │
                         ▼
          ┌──────────────────────────────┐
          │  🟢 SAFE  🟡 WARNING  🔴 DANGER │
          └──────────────────────────────┘
```

</div>

Each scan returns a **structured JSON result**:

```json
{
  "level": "danger",
  "title": "Phishing Attempt Detected",
  "explanation": "This SMS contains urgency triggers and a shortened URL...",
  "highlighted": ["urgent", "click here", "verify now"]
}
```

---

## 🚀 Tech Stack

<div align="center">

| Layer | Technology |
|:---:|:---|
| 🖥️ **Framework** | [Next.js 16](https://nextjs.org) — App Router, Server Actions |
| ⚛️ **UI** | [React 19](https://react.dev) · [shadcn/ui](https://ui.shadcn.com) · [Lucide Icons](https://lucide.dev) |
| 🎨 **Styling** | [Tailwind CSS v4](https://tailwindcss.com) — brutalist design system |
| 📈 **Charts** | [Recharts](https://recharts.org) |
| 🤖 **AI Engine** | [Google Gemini 2.0 Flash](https://ai.google.dev) |
| 🔤 **Language** | [TypeScript 5](https://www.typescriptlang.org) |

</div>

<br/>

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind,vercel&theme=dark" />
</div>

---

## 📁 Project Structure

```
digi-rakshak/
├── 📂 app/
│   ├── 📂 (dashboard)/
│   │   ├── 📊 dashboard/      ← Risk score, stats, recent activity
│   │   ├── 📩 scan-sms/       ← SMS phishing detection
│   │   ├── 🔗 scan-link/      ← URL threat analysis
│   │   ├── 📄 scan-doc/       ← Document forensics
│   │   └── 🔔 alerts/         ← Threat alert history
│   ├── 📂 actions/
│   │   └── 🤖 scanner.ts      ← Gemini AI server actions
│   ├── layout.tsx
│   └── page.tsx               ← Landing page
├── 📂 components/
│   ├── Sidebar.tsx
│   ├── Navbar.tsx
│   ├── AlertCard.tsx
│   └── RiskBadge.tsx
├── 📂 lib/
│   ├── 🔧 localAnalyzer.ts    ← Offline rule-based fallback engine
│   ├── mockData.ts
│   └── utils.ts
└── 📂 public/
```

---

## ⚙️ Getting Started

> **Prerequisites:** Node.js ≥ 18 · A free [Google Gemini API key](https://ai.google.dev)

<table>
<tr>
<td>

**① Clone**

```bash
git clone https://github.com/almostalok/Digi-Rakshak.git
cd Digi-Rakshak
```

</td>
<td>

**② Install**

```bash
npm install
```

</td>
</tr>
<tr>
<td>

**③ Configure**

```env
# .env.local
GOOGLE_API=your_gemini_api_key_here
```

</td>
<td>

**④ Run**

```bash
npm run dev
# → http://localhost:3000
```

</td>
</tr>
</table>

> 💡 **No API key?** DigiRakshak automatically falls back to its built-in local analyzer — no crash, no downtime.

---

## 🖥️ Available Scripts

<div align="center">

| Command | Action |
|:---|:---|
| `npm run dev` | 🔥 Start development server |
| `npm run build` | 📦 Build for production |
| `npm run start` | 🚀 Start production server |
| `npm run lint` | 🔍 Run ESLint |

</div>

---

## 🔐 Privacy & Security

<div align="center">

```
┌─────────────────────────────────────────────────────┐
│  ✅  No data is ever stored or logged               │
│  ✅  No user accounts required                      │
│  ✅  All scans are stateless and in-memory          │
│  ✅  Works offline with local fallback engine       │
│  ✅  Open source — audit the code yourself          │
└─────────────────────────────────────────────────────┘
```

</div>

---

## 🤝 Contributing

Contributions are welcome! 🎉

```bash
# 1 · Fork the repo & create your branch
git checkout -b feature/my-feature

# 2 · Make your changes and commit
git commit -m "feat: add my feature"

# 3 · Push & open a Pull Request
git push origin feature/my-feature
```

---

## 📄 License

This project is open source. See the repository for license details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=120&section=footer" width="100%" />

*Built with* ❤️ *to make the internet safer for everyone.*

**[⬆ Back to Top](#digi-rakshak)**

</div>
