# 🎬 Video Frame Explorer (VFE)

> **Humans see motion. Computers see frames.**
> **Manusia lihat gerakan. Komputer lihat frame.**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8?logo=tailwindcss)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)

🔗 **Live → [vfe-playground.vercel.app](https://vfe-playground.vercel.app)**

</div>

---

## 🌐 Overview

**Video Frame Explorer** is an educational playground that breaks video into individual frames, letting you see how computers perceive video as sequences of numerical data. Upload any video or try a generated example — watch frames decompose into pixels, and pixels into raw RGB numbers.

No server. No uploads. 100% client-side.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎥 **Frame Extraction** | Decompose video into 24 sample frames via browser-native `<video>` + `<canvas>` seeking |
| 🔍 **Frame Explorer** | Scrub timeline to step through frames with thumbnail strip |
| 🔢 **Frame Breakdown** | 8×8 RGB sample grid with actual numeric values, color-coded (R/G/B) |
| 📊 **Pixel Statistics** | Frames × Pixels per frame = Total pixel values — see how numbers explode |
| 🔄 **Frame Comparison** | Pick two frames side-by-side, see percentage difference |
| 🤖 **Computer Vision Mode** | 5-stage pipeline: Video → Frames → Objects → Patterns → Prediction |
| 🎲 **Generated Examples** | 5 procedural canvas animations (Walking Person, Traffic, Ocean, Cat, Bird) — no video file needed |
| 📐 **Video Overview** | Duration, resolution, FPS, total frames, file size at a glance |
| 💡 **Educational Insights & Fun Facts** | Curated facts about video, frames, and pixels |
| 📤 **Export / Share / Copy** | Copy stats, export frame as JPG, share via URL |
| 🌗 **Dark / Light Theme** | Toggle between themes with system preference support |
| 🌏 **Bahasa Indonesia / English** | Full bilingual UI with seamless language switching |
| 📱 **Responsive** | Works on desktop and mobile |
| 🔒 **Privacy-First** | Everything runs in your browser — no data leaves your device |

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) + tailwindcss-animate |
| Components | [shadcn/ui](https://ui.shadcn.com/) (new-york style) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Icons | [lucide-react](https://lucide.dev/) |
| Fonts | Inter (sans) + JetBrains Mono (mono) via next/font |
| i18n | Custom React Context (Bahasa Indonesia / English) |
| Utilities | clsx, tailwind-merge, class-variance-authority |

---

## 📁 Project Structure

```
├── app/
│   ├── globals.css                    # Global styles & CSS variables
│   ├── layout.tsx                     # Root layout (fonts, providers, header/footer)
│   ├── page.tsx                       # Landing page
│   └── playground/
│       └── page.tsx                   # Playground page
├── components/
│   ├── landing/
│   │   └── landing-page.tsx           # Hero, pipeline viz, "How it works", CTA
│   ├── playground/
│   │   └── video-playground.tsx       # Main playground (upload, frames, breakdown, comparison, CV mode)
│   ├── site-header.tsx / site-footer.tsx
│   ├── language-toggle.tsx / theme-toggle.tsx
│   └── ui/ (badge, button, card, separator, skeleton, sonner, tabs)
├── lib/
│   ├── video-frames.ts               # Core engine: extractVideoFrames(), sampleGrid()
│   ├── examples.ts                    # 5 procedural canvas animations + frame generator
│   ├── i18n.tsx                       # Bilingual i18n system (id/en)
│   ├── site-config.ts                 # Site data, projects, universes
│   ├── format.ts                      # Locale-aware number/duration/byte formatters
│   └── utils.ts                       # cn() utility
└── ...
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm, yarn, pnpm, or bun

### Development

```bash
# Clone the repo
git clone https://github.com/m45argaeth/VFE.git
cd VFE

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/m45argaeth/VFE)

> 🚀 Deployed automatically to [Vercel](https://vercel.com/) on every push to `main`.

---

## 🔒 Privacy

**Everything runs in your browser.** No data is sent to any server. Your videos stay on your device — frames are extracted using browser-native `<video>` and `<canvas>` APIs. Even the example scenes are generated procedurally on canvas.

---

## 🧩 Part of the "Sini Gajelasin" Series

VFE is one of many educational playgrounds under the **[Sini Gajelasin](https://sinigajelasin.vercel.app)** hub — *Curious About Everything*.

### 🪐 EBN Universe — How Computers Process Data

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 1 | 🔢 **EBN** | Media → Numbers | 🟢 Live | [ebn-playground.vercel.app](https://ebn-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EBN) |
| 2 | 🔤 **TtB** | Text → Binary | 🟢 Live | [ttb-playground.vercel.app](https://ttb-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TtB) |
| 3 | 🔡 **Token Explorer** | Text → Tokens | 🟢 Live | [te-playground.vercel.app](https://te-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/TE) |
| 4 | 🎬 **Video Frame Explorer** | Video → Frames | 🟢 Live | [vfe-playground.vercel.app](https://vfe-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/VFE) |
| 5 | 🧠 **Embedding Explorer** | Words → Vectors | 🟢 Live | [ee-playground.vercel.app](https://ee-playground.vercel.app) · [GitHub](https://github.com/m45argaeth/EE) |
| 6 | 💬 **Prompt Explorer** | Prompt → Tokens → Output | 🟡 WIP | — |
| 7 | 🤥 **Hallucination Explorer** | LLM Hallucination | 🟡 WIP | — |
| 8 | 📦 **Compression Explorer** | Data → Compression | 🟡 WIP | — |
| 9 | 🌐 **Internet Packet Explorer** | Data → Packets | 🟡 WIP | — |
| 10 | 🤖 **Human vs AI Explorer** | Human vs AI Processing | 🟡 WIP | — |

### 🧬 Human Mind Universe — How We Think

| # | Playground | Topic | Status | Link |
|---|---|---|---|---|
| 11 | 🔍 **Bias Detector** | Cognitive Biases | 🟢 Live | [bd-playground-snowy.vercel.app](https://bd-playground-snowy.vercel.app) · [GitHub](https://github.com/m45argaeth/BD) |
| 12 | 🧠 **Memory Explorer** | Memory Systems | 🟡 WIP | — |
| 13 | 🌀 **False Memory Explorer** | False Memories | 🟡 WIP | — |
| 14 | 👁️ **Attention Explorer** | Attention & Focus | 🟡 WIP | — |
| 15 | 💊 **Dopamine Explorer** | Dopamine Loops | 🟡 WIP | — |

---

## 👤 Author

**Arga** — [GitHub](https://github.com/m45argaeth) · [Twitter/X](https://x.com/sinigajelasin) · [Blog](https://www.kompasiana.com/argacahyanugraha6628)

Made with ❤️ as part of **[Sini Gajelasin](https://sinigajelasin.vercel.app)** — *Curious About Everything* 🔍
