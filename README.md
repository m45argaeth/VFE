# Video Frame Explorer

An educational SaaS that turns any video into a story about numbers. Upload a video (or pick a generated example) and watch how a computer breaks motion into thousands of individual frames, each frame into millions of pixels, and each pixel into raw RGB numbers.

> Humans see motion. Computers see frames.

Part of the **Curious About Everything** series alongside [Everything Becomes Numbers](https://ebn-playground.vercel.app), [Token Explorer](https://te-playground.vercel.app), and [Text To Binary](https://ttb-playground.vercel.app).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (new-york)
- next-themes (light default, dark toggle)
- Custom i18n (Bahasa Indonesia default + English)
- 100% client-side processing — no database, no servers, no external APIs

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

Deploys cleanly to Vercel.
