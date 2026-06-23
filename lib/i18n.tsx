"use client"

import * as React from "react"

export type Locale = "id" | "en"
export const LOCALES: Locale[] = ["id", "en"]
export const DEFAULT_LOCALE: Locale = "id"
const STORAGE_KEY = "vfe-locale"

const en = {
  hero: {
    badge: "An educational playground for how machines see motion",
    title: "Video Frame Explorer",
    subtitle:
      "Upload a video and discover how computers break motion into thousands of individual images.",
    explore: "Explore Video",
    random: "Random Example",
    caption: "Humans see motion. Computers see frames.",
  },
  pipeline: {
    video: "Video",
    frames: "Frames",
    pixels: "Pixels",
    numbers: "Numbers",
    videoDesc: "A clip is a sequence of frames.",
    framesDesc: "~30 still images every second.",
    pixelsDesc: "Each frame is a grid of pixels.",
    numbersDesc: "Each pixel is just RGB numbers.",
  },
  motion: {
    heading: "Why does video look like motion?",
    body: "A video never actually moves. It is a rapid slideshow of still images \u2014 usually about 30 every second. Your brain blends them into smooth motion, but a computer only ever sees a long stack of separate frames, and each frame is just a grid of numbers.",
  },
  how: {
    heading: "How it works",
    subtitle: "Three steps, entirely in your browser.",
    steps: [
      {
        title: "1. Drop in a video",
        body: "Choose an MP4, WebM, or MOV \u2014 or load a generated example. Nothing leaves your device.",
      },
      {
        title: "2. We slice it into frames",
        body: "Your browser decodes the video and captures individual frames onto a canvas using native web APIs.",
      },
      {
        title: "3. See the numbers",
        body: "Every frame becomes pixels, and every pixel becomes the raw RGB numbers a computer actually processes.",
      },
    ],
  },
  cta: {
    heading: "Ready to watch motion become numbers?",
    subtitle:
      "No sign-up, no upload to any server. Just you, your video, and the math behind how machines see.",
    button: "Open the Playground",
  },
  pg: {
    title: "The Playground",
    subtitle:
      "Drop in a video and watch it dissolve into the thousands of frames \u2014 and billions of numbers \u2014 a computer actually works with. Everything runs locally in your browser.",
    upload: {
      drop: "Drop a video here",
      hint: "MP4, WebM, MOV \u2014 processed entirely in your browser.",
      choose: "Choose video",
      randomLabel: "Or try a generated example",
    },
    processing: "Breaking the video into frames\u2026",
    errorNotVideo:
      "That file is not a video. Please choose an MP4, WebM, or MOV file.",
    errorProcess: "Could not process this video file.",
    overview: {
      heading: "Video Overview",
      duration: "Duration",
      resolution: "Resolution",
      fps: "FPS",
      totalFrames: "Total Frames",
      fileSize: "File Size",
    },
    explorer: {
      heading: "Frame Explorer",
      hint: "Scrub the timeline to step through the video frame by frame.",
      frame: "Frame",
      time: "Timestamp",
      of: "of",
    },
    breakdown: {
      heading: "Frame Breakdown",
      width: "Width",
      height: "Height",
      pixels: "Pixels",
      rgbValues: "RGB Values",
      caption: "To a computer, this single frame is millions of numerical values.",
      numbersTitle: "The numbers behind this frame",
      numbersHint:
        "A downscaled sample of this frame. Each pixel is three numbers \u2014 red, green, blue (0\u2013255).",
    },
    viz: {
      heading: "Video \u2192 Frames Visualization",
      video: "Video",
      frames: "Frames",
      pixelValues: "Pixel Values",
      numbers: "Numbers",
    },
    stats: {
      heading: "The numbers add up fast",
      frames: "Frames",
      pixels: "Pixels per frame",
      pixelValues: "Total Pixel Values",
      note: "Multiply every frame by the pixels inside it and the count explodes into the billions.",
    },
    compare: {
      heading: "Frame Comparison",
      hint: "Pick two frames and see how little \u2014 or how much \u2014 changes between them.",
      frameA: "Frame A",
      frameB: "Frame B",
      difference: "Difference",
      caption: "Motion is simply change between frames.",
    },
    cv: {
      heading: "How AI Sees This Video",
      subtitle:
        "Computer vision models never see motion. They process frames as numbers, then look for patterns.",
      toggle: "Computer Vision Mode",
      video: "Video",
      frames: "Frames",
      objects: "Objects",
      patterns: "Patterns",
      prediction: "Prediction",
    },
    insights: {
      heading: "Educational Insights",
      items: [
        "A computer never sees \u201cmotion\u201d \u2014 only a sequence of separate still frames.",
        "At ~30 frames per second, a 30-second clip is about 900 individual images.",
        "Each frame is a grid of pixels, and each pixel is three numbers: red, green, and blue.",
        "AI models analyze these numbers frame by frame to detect objects and patterns.",
      ],
    },
    facts: {
      heading: "Fun Facts",
      items: [
        "A single 1080p frame holds 2,073,600 pixels \u2014 over 6 million color numbers.",
        "Cinema traditionally runs at 24 frames per second; most phones record at 30 or 60.",
        "One minute of 1080p/30fps video is over 3 billion pixel values before compression.",
        "Video compression exists precisely because raw frame numbers are enormous.",
      ],
    },
    actions: {
      copyStats: "Copy Stats",
      exportFrame: "Export Frame",
      shareLink: "Share Link",
      reset: "Reset",
      copied: "Stats copied to clipboard",
      exported: "Frame exported as image",
      shared: "Share link copied to clipboard",
      shareError: "Could not share",
    },
    assumed: "assumed",
    measured: "measured",
  },
}

export type Dict = typeof en

const id: Dict = {
  hero: {
    badge: "Playground edukasi tentang cara mesin melihat gerakan",
    title: "Video Frame Explorer",
    subtitle:
      "Unggah video dan temukan bagaimana komputer memecah gerakan menjadi ribuan gambar terpisah.",
    explore: "Jelajahi Video",
    random: "Contoh Acak",
    caption: "Manusia melihat gerakan. Komputer melihat frame.",
  },
  pipeline: {
    video: "Video",
    frames: "Frame",
    pixels: "Piksel",
    numbers: "Angka",
    videoDesc: "Klip adalah rangkaian frame.",
    framesDesc: "~30 gambar diam setiap detik.",
    pixelsDesc: "Setiap frame adalah kisi piksel.",
    numbersDesc: "Setiap piksel hanyalah angka RGB.",
  },
  motion: {
    heading: "Kenapa video terlihat bergerak?",
    body: "Video sebenarnya tidak pernah bergerak. Ia hanyalah pertunjukan gambar diam yang cepat \u2014 biasanya sekitar 30 setiap detik. Otakmu menyatukannya menjadi gerakan halus, tapi komputer hanya melihat tumpukan frame terpisah, dan setiap frame hanyalah kisi angka.",
  },
  how: {
    heading: "Cara kerjanya",
    subtitle: "Tiga langkah, sepenuhnya di browser-mu.",
    steps: [
      {
        title: "1. Jatuhkan video",
        body: "Pilih MP4, WebM, atau MOV \u2014 atau muat contoh yang dihasilkan. Tidak ada yang keluar dari perangkatmu.",
      },
      {
        title: "2. Kami mengirisnya jadi frame",
        body: "Browser-mu menguraikan video dan menangkap tiap frame ke kanvas menggunakan API web bawaan.",
      },
      {
        title: "3. Lihat angkanya",
        body: "Setiap frame menjadi piksel, dan setiap piksel menjadi angka RGB mentah yang sebenarnya diproses komputer.",
      },
    ],
  },
  cta: {
    heading: "Siap melihat gerakan berubah jadi angka?",
    subtitle:
      "Tanpa daftar, tanpa unggah ke server mana pun. Hanya kamu, video-mu, dan matematika di balik cara mesin melihat.",
    button: "Buka Playground",
  },
  pg: {
    title: "Playground",
    subtitle:
      "Jatuhkan video dan saksikan ia terurai menjadi ribuan frame \u2014 dan miliaran angka \u2014 yang sebenarnya diproses komputer. Semuanya berjalan lokal di browser-mu.",
    upload: {
      drop: "Jatuhkan video di sini",
      hint: "MP4, WebM, MOV \u2014 diproses sepenuhnya di browser-mu.",
      choose: "Pilih video",
      randomLabel: "Atau coba contoh yang dihasilkan",
    },
    processing: "Memecah video menjadi frame\u2026",
    errorNotVideo:
      "File itu bukan video. Silakan pilih file MP4, WebM, atau MOV.",
    errorProcess: "Gagal memproses file video ini.",
    overview: {
      heading: "Ringkasan Video",
      duration: "Durasi",
      resolution: "Resolusi",
      fps: "FPS",
      totalFrames: "Total Frame",
      fileSize: "Ukuran File",
    },
    explorer: {
      heading: "Penjelajah Frame",
      hint: "Geser garis waktu untuk melangkah melalui video frame demi frame.",
      frame: "Frame",
      time: "Waktu",
      of: "dari",
    },
    breakdown: {
      heading: "Rincian Frame",
      width: "Lebar",
      height: "Tinggi",
      pixels: "Piksel",
      rgbValues: "Nilai RGB",
      caption: "Bagi komputer, satu frame ini adalah jutaan nilai angka.",
      numbersTitle: "Angka di balik frame ini",
      numbersHint:
        "Sampel frame yang diperkecil. Setiap piksel adalah tiga angka \u2014 merah, hijau, biru (0\u2013255).",
    },
    viz: {
      heading: "Visualisasi Video \u2192 Frame",
      video: "Video",
      frames: "Frame",
      pixelValues: "Nilai Piksel",
      numbers: "Angka",
    },
    stats: {
      heading: "Angkanya bertambah dengan cepat",
      frames: "Frame",
      pixels: "Piksel per frame",
      pixelValues: "Total Nilai Piksel",
      note: "Kalikan setiap frame dengan piksel di dalamnya, dan jumlahnya meledak hingga miliaran.",
    },
    compare: {
      heading: "Perbandingan Frame",
      hint: "Pilih dua frame dan lihat seberapa sedikit \u2014 atau banyak \u2014 yang berubah di antaranya.",
      frameA: "Frame A",
      frameB: "Frame B",
      difference: "Perbedaan",
      caption: "Gerakan hanyalah perubahan antar frame.",
    },
    cv: {
      heading: "Bagaimana AI Melihat Video Ini",
      subtitle:
        "Model computer vision tidak pernah melihat gerakan. Mereka memproses frame sebagai angka, lalu mencari pola.",
      toggle: "Mode Computer Vision",
      video: "Video",
      frames: "Frame",
      objects: "Objek",
      patterns: "Pola",
      prediction: "Prediksi",
    },
    insights: {
      heading: "Wawasan Edukasi",
      items: [
        "Komputer tidak pernah melihat \u201cgerakan\u201d \u2014 hanya rangkaian frame diam yang terpisah.",
        "Pada ~30 frame per detik, klip 30 detik berisi sekitar 900 gambar terpisah.",
        "Setiap frame adalah kisi piksel, dan setiap piksel adalah tiga angka: merah, hijau, biru.",
        "Model AI menganalisis angka-angka ini frame demi frame untuk mendeteksi objek dan pola.",
      ],
    },
    facts: {
      heading: "Fakta Seru",
      items: [
        "Satu frame 1080p berisi 2.073.600 piksel \u2014 lebih dari 6 juta angka warna.",
        "Bioskop biasanya berjalan 24 frame per detik; kebanyakan ponsel merekam 30 atau 60.",
        "Satu menit video 1080p/30fps lebih dari 3 miliar nilai piksel sebelum kompresi.",
        "Kompresi video ada justru karena angka frame mentah sangat besar.",
      ],
    },
    actions: {
      copyStats: "Salin Statistik",
      exportFrame: "Ekspor Frame",
      shareLink: "Bagikan Tautan",
      reset: "Atur Ulang",
      copied: "Statistik disalin ke clipboard",
      exported: "Frame diekspor sebagai gambar",
      shared: "Tautan disalin ke clipboard",
      shareError: "Gagal membagikan",
    },
    assumed: "diperkirakan",
    measured: "terukur",
  },
}

const DICTS: Record<Locale, Dict> = { en, id }

interface I18nContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: Dict
}

const I18nContext = React.createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>(DEFAULT_LOCALE)

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored === "id" || stored === "en") setLocaleState(stored)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = locale
  }, [locale])

  const setLocale = React.useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      window.localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: DICTS[locale] }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const ctx = React.useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider")
  return ctx
}
