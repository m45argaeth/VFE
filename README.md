<div align="center">

# 🎬 Video Frame Explorer (VFE)

### *Humans see motion. Computers see frames.*
### *Manusia lihat gerakan. Komputer lihat frame.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?logo=tailwindcss)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000?logo=vercel)](https://vfe-playground.vercel.app)

**[🚀 Live Demo](https://vfe-playground.vercel.app)**

</div>

---

## 📖 Overview

**Video Frame Explorer** is an educational playground that breaks video into individual frames, letting you see how computers perceive video as sequences of numerical data.

**Video Frame Explorer** adalah playground edukatif yang memecah video menjadi frame-frame individual, memungkinkanmu melihat bagaimana komputer mempersepsi video sebagai urutan data numerik.

## ✨ Features

- 🎥 **Frame Extraction** — Decompose any video into its constituent frames
- 🔢 **Number View** — See raw pixel data as numbers, bridging visual and computational understanding
- 🌓 **Dark / Light Theme** — Comfortable viewing in any environment
- 🌍 **Bilingual UI** — Full Indonesian & English support (custom i18n)
- 📱 **Responsive** — Works on desktop and mobile
- 🔒 **100% Client-Side** — Your videos never leave your browser

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| Theming | next-themes |
| Internationalization | Custom i18n (id/en) |
| Deployment | Vercel |

## 📁 Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── playground/
│       └── page.tsx
├── components/
│   ├── landing/
│   │   └── landing-page.tsx
│   ├── playground/
│   │   └── video-playground.tsx
│   ├── language-toggle.tsx
│   ├── site-footer.tsx
│   ├── site-header.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/               # shadcn/ui components
└── lib/
    ├── examples.ts
    ├── format.ts
    ├── i18n.tsx
    ├── site-config.ts
    ├── utils.ts
    └── video-frames.ts
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [pnpm](https://pnpm.io), [npm](https://www.npmjs.com), or [yarn](https://yarnpkg.com)

### Development

```bash
git clone https://github.com/m45argaeth/VFE.git
cd VFE
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Deploy to Vercel

Push to GitHub and import the repo on [vercel.com](https://vercel.com), or:

```bash
npx vercel
```

---

## 🧭 Part of *Curious About Everything*

VFE is part of the **Curious About Everything** educational series:

| Project | Description |
|---|---|
| **EBN** | Explore By Numbers |
| **TE** | Text Explorer |
| **TtB** | Text to Bits |
| **BD** | [Bias Detector](https://github.com/m45argaeth/BD) |
| **VFE** | Video Frame Explorer ← you are here |

---

<div align="center">

**Made with ❤️ by [m45argaeth](https://github.com/m45argaeth)**

🔒 Your data stays on your device. No uploads, no tracking.

</div>
