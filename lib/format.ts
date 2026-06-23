import type { Locale } from "@/lib/i18n"

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US").format(
    Math.round(value),
  )
}

const COMPACT: Record<Locale, Array<[number, string]>> = {
  en: [
    [1e12, "trillion"],
    [1e9, "billion"],
    [1e6, "million"],
    [1e3, "thousand"],
  ],
  id: [
    [1e12, "triliun"],
    [1e9, "miliar"],
    [1e6, "juta"],
    [1e3, "ribu"],
  ],
}

/** Locale-aware compact number: 1866240000 -> "1.87 billion" / "1,87 miliar". */
export function compactNumber(value: number, locale: Locale): string {
  if (!Number.isFinite(value) || value <= 0) return "0"
  for (const [threshold, label] of COMPACT[locale]) {
    if (value >= threshold) {
      const scaled = value / threshold
      const digits = scaled >= 100 ? 0 : scaled >= 10 ? 1 : 2
      return `${scaled.toFixed(digits)} ${label}`
    }
  }
  return formatNumber(value, locale)
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function formatBytes(bytes: number, locale: Locale): string {
  if (!bytes || bytes <= 0) return "\u2014"
  const units = ["B", "KB", "MB", "GB"]
  let v = bytes
  let i = 0
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024
    i++
  }
  const n = new Intl.NumberFormat(locale === "id" ? "id-ID" : "en-US", {
    maximumFractionDigits: 1,
  }).format(v)
  return `${n} ${units[i]}`
}
