"use client"

import * as React from "react"
import { toast } from "sonner"
import type { LucideIcon } from "lucide-react"
import {
  Upload,
  Film,
  Image as ImageIcon,
  Binary,
  Layers,
  Cpu,
  Eye,
  Sparkles,
  Copy,
  Download,
  Share2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  extractVideoFrames,
  type VideoFrame,
  type VideoMeta,
} from "@/lib/video-frames"
import { EXAMPLES, generateExampleFrames, type ExampleDef } from "@/lib/examples"
import {
  compactNumber,
  formatBytes,
  formatDuration,
  formatNumber,
} from "@/lib/format"

const FRAME_SAMPLES = 24

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-center text-xl font-bold tracking-tight md:text-2xl">
      {children}
    </h2>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 text-base font-semibold sm:text-lg">{value}</div>
      </CardContent>
    </Card>
  )
}

function Stage({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value?: string
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-2 p-4 text-center sm:p-5">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground sm:h-11 sm:w-11">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {value ? (
          <span className="font-mono text-sm font-semibold sm:text-base">{value}</span>
        ) : null}
      </CardContent>
    </Card>
  )
}

function frameDiff(a: VideoFrame, b: VideoFrame): number {
  const x = a.sample
  const y = b.sample
  if (!x.length || x.length !== y.length) return 0
  let s = 0
  for (let i = 0; i < x.length; i++) s += Math.abs(x[i] - y[i])
  return s / x.length / 255
}

function CompareSlot({
  label,
  frame,
  index,
  max,
  onChange,
}: {
  label: string
  frame: VideoFrame
  index: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <Card className="overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={frame.dataUrl} alt="" className="w-full bg-black object-contain" />
      <CardContent className="space-y-2 p-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{label}</span>
          <span className="font-mono">{formatDuration(frame.time)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={max}
          value={index}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-foreground"
        />
      </CardContent>
    </Card>
  )
}

export function VideoPlayground() {
  const { locale, t } = useI18n()
  const tp = t.pg

  const [frames, setFrames] = React.useState<VideoFrame[] | null>(null)
  const [meta, setMeta] = React.useState<VideoMeta | null>(null)
  const [selected, setSelected] = React.useState(0)
  const [loading, setLoading] = React.useState(false)
  const [dragging, setDragging] = React.useState(false)
  const [compareA, setCompareA] = React.useState(0)
  const [compareB, setCompareB] = React.useState(0)
  const [cv, setCv] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const reset = React.useCallback(() => {
    setFrames(null)
    setMeta(null)
    setSelected(0)
    setCompareA(0)
    setCompareB(0)
    setCv(false)
  }, [])

  const applyResult = (result: { frames: VideoFrame[]; meta: VideoMeta }) => {
    setFrames(result.frames)
    setMeta(result.meta)
    setSelected(0)
    setCompareA(0)
    setCompareB(Math.max(0, result.frames.length - 1))
    setCv(false)
  }

  const handleFile = React.useCallback(
    async (file: File) => {
      if (!file.type.startsWith("video/")) {
        toast.error(tp.errorNotVideo)
        return
      }
      setLoading(true)
      const url = URL.createObjectURL(file)
      try {
        const result = await extractVideoFrames(url, file.size, FRAME_SAMPLES)
        applyResult(result)
      } catch {
        toast.error(tp.errorProcess)
      } finally {
        URL.revokeObjectURL(url)
        setLoading(false)
      }
    },
    [tp],
  )

  const handleExample = React.useCallback(
    async (def: ExampleDef) => {
      setLoading(true)
      await new Promise((r) => window.setTimeout(r, 50))
      try {
        applyResult(generateExampleFrames(def, FRAME_SAMPLES))
      } catch {
        toast.error(tp.errorProcess)
      } finally {
        setLoading(false)
      }
    },
    [tp],
  )

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) void handleFile(file)
  }

  const pixels = meta ? meta.width * meta.height : 0
  const rgbValues = pixels * 3
  const totalPixelValues = meta ? meta.frameCount * pixels : 0
  const currentFrame =
    frames && frames.length ? frames[Math.min(selected, frames.length - 1)] : null
  const realFrameNumber =
    meta && currentFrame
      ? Math.min(meta.frameCount, Math.max(1, Math.round(currentFrame.time * meta.fps)))
      : 0

  const copyStats = async () => {
    if (!meta) return
    const lines = [
      "Video Frame Explorer",
      `Duration: ${formatDuration(meta.duration)}`,
      `Resolution: ${meta.width}\u00d7${meta.height}`,
      `FPS: ${meta.fps}`,
      `Total Frames: ${formatNumber(meta.frameCount, locale)}`,
      `Pixels per frame: ${formatNumber(pixels, locale)}`,
      `Total pixel values: ${formatNumber(totalPixelValues, locale)}`,
    ]
    try {
      await navigator.clipboard.writeText(lines.join("\n"))
      toast.success(tp.actions.copied)
    } catch {
      toast.error(tp.actions.shareError)
    }
  }

  const exportFrame = () => {
    if (!currentFrame) return
    const a = document.createElement("a")
    a.href = currentFrame.dataUrl
    a.download = `vfe-frame-${realFrameNumber}.jpg`
    a.click()
    toast.success(tp.actions.exported)
  }

  const shareLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : ""
    try {
      await navigator.clipboard.writeText(url)
      toast.success(tp.actions.shared)
    } catch {
      toast.error(tp.actions.shareError)
    }
  }

  return (
    <div className="container space-y-12 py-10 md:space-y-16 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">{tp.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground sm:text-base">{tp.subtitle}</p>
      </div>

      {!frames || !meta || !currentFrame ? (
        <div className="mx-auto max-w-2xl space-y-8">
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            className={cn(
              "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors sm:p-12",
              dragging ? "border-primary bg-primary/5" : "border-border",
            )}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <Upload className="h-6 w-6" />
            </span>
            <div>
              <p className="font-medium">{tp.upload.drop}</p>
              <p className="mt-1 text-sm text-muted-foreground">{tp.upload.hint}</p>
            </div>
            <Button onClick={() => inputRef.current?.click()} disabled={loading}>
              {loading ? tp.processing : tp.upload.choose}
            </Button>
            <input
              ref={inputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) void handleFile(f)
                e.target.value = ""
              }}
            />
          </div>

          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-muted-foreground">
              {tp.upload.randomLabel}
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {EXAMPLES.map((ex) => (
                <Button
                  key={ex.id}
                  variant="outline"
                  disabled={loading}
                  onClick={() => void handleExample(ex)}
                  className="h-auto justify-start gap-2 py-3"
                >
                  <span className="text-lg">{ex.emoji}</span>
                  <span className="text-sm">{ex.label[locale]}</span>
                </Button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-center text-sm text-muted-foreground">{tp.processing}</p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-12 md:space-y-16">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={copyStats}>
              <Copy className="h-4 w-4" />
              {tp.actions.copyStats}
            </Button>
            <Button variant="outline" size="sm" onClick={exportFrame}>
              <Download className="h-4 w-4" />
              {tp.actions.exportFrame}
            </Button>
            <Button variant="outline" size="sm" onClick={shareLink}>
              <Share2 className="h-4 w-4" />
              {tp.actions.shareLink}
            </Button>
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="h-4 w-4" />
              {tp.actions.reset}
            </Button>
          </div>

          <section className="space-y-5">
            <SectionTitle>{tp.overview.heading}</SectionTitle>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <Stat label={tp.overview.duration} value={formatDuration(meta.duration)} />
              <Stat label={tp.overview.resolution} value={`${meta.width}\u00d7${meta.height}`} />
              <Stat label={tp.overview.fps} value={`${meta.fps}`} />
              <Stat label={tp.overview.totalFrames} value={formatNumber(meta.frameCount, locale)} />
              <Stat label={tp.overview.fileSize} value={formatBytes(meta.fileSize, locale)} />
            </div>
          </section>

          <section className="space-y-5">
            <div className="text-center">
              <SectionTitle>{tp.explorer.heading}</SectionTitle>
              <p className="mt-2 text-sm text-muted-foreground">{tp.explorer.hint}</p>
            </div>
            <Card className="mx-auto max-w-3xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={currentFrame.dataUrl} alt="" className="w-full bg-black object-contain" />
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono">
                    {tp.explorer.frame} {realFrameNumber} / {formatNumber(meta.frameCount, locale)}
                  </span>
                  <span className="font-mono text-muted-foreground">
                    {formatDuration(currentFrame.time)}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={frames.length - 1}
                  value={selected}
                  onChange={(e) => setSelected(Number(e.target.value))}
                  className="w-full accent-foreground"
                />
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelected((s) => Math.max(0, s - 1))}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSelected((s) => Math.min(frames.length - 1, s + 1))}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {frames.map((f, i) => (
                    <button
                      key={i}
                      onClick={() => setSelected(i)}
                      className={cn(
                        "h-12 w-20 shrink-0 overflow-hidden rounded-md border-2",
                        i === selected
                          ? "border-primary"
                          : "border-transparent opacity-70 hover:opacity-100",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={f.dataUrl} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5">
            <SectionTitle>{tp.breakdown.heading}</SectionTitle>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <Stat label={tp.breakdown.width} value={formatNumber(meta.width, locale)} />
              <Stat label={tp.breakdown.height} value={formatNumber(meta.height, locale)} />
              <Stat label={tp.breakdown.pixels} value={formatNumber(pixels, locale)} />
              <Stat label={tp.breakdown.rgbValues} value={formatNumber(rgbValues, locale)} />
            </div>
            <p className="text-center font-mono text-sm text-muted-foreground">
              {tp.breakdown.caption}
            </p>
            <Card className="mx-auto max-w-3xl">
              <CardContent className="space-y-4 p-4 sm:p-6">
                <div>
                  <h3 className="text-sm font-semibold">{tp.breakdown.numbersTitle}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tp.breakdown.numbersHint}</p>
                </div>
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="grid w-full max-w-[280px] shrink-0 grid-cols-8 gap-1 sm:w-[240px]">
                    {Array.from({ length: 64 }).map((_, i) => {
                      const r = currentFrame.sample[i * 3] ?? 0
                      const g = currentFrame.sample[i * 3 + 1] ?? 0
                      const b = currentFrame.sample[i * 3 + 2] ?? 0
                      return (
                        <div
                          key={i}
                          className="aspect-square rounded-sm"
                          style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                          title={`rgb(${r}, ${g}, ${b})`}
                        />
                      )
                    })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="max-h-44 overflow-y-auto rounded-lg bg-muted/40 p-3 font-mono text-xs leading-relaxed">
                      {currentFrame.sample.slice(0, 96).map((n, i) => (
                        <span
                          key={i}
                          className={
                            i % 3 === 0
                              ? "text-red-500"
                              : i % 3 === 1
                                ? "text-green-600"
                                : "text-blue-500"
                          }
                        >
                          {n}{" "}
                        </span>
                      ))}
                      {"\u2026"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5 rounded-2xl border bg-muted/20 p-6 md:p-8">
            <SectionTitle>{tp.viz.heading}</SectionTitle>
            <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4">
              <Stage icon={Film} label={tp.viz.video} value="1" />
              <Stage icon={Layers} label={tp.viz.frames} value={formatNumber(meta.frameCount, locale)} />
              <Stage icon={ImageIcon} label={tp.viz.pixelValues} value={compactNumber(totalPixelValues, locale)} />
              <Stage icon={Binary} label={tp.viz.numbers} value={"0\u2013255"} />
            </div>
          </section>

          <section className="space-y-5 text-center">
            <SectionTitle>{tp.stats.heading}</SectionTitle>
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-4 font-mono text-sm sm:flex-row">
              <div className="rounded-xl border px-5 py-4">
                <div className="text-2xl font-bold">{formatNumber(meta.frameCount, locale)}</div>
                <div className="text-xs text-muted-foreground">{tp.stats.frames}</div>
              </div>
              <span className="text-xl text-muted-foreground">{"\u00d7"}</span>
              <div className="rounded-xl border px-5 py-4">
                <div className="text-2xl font-bold">{formatNumber(pixels, locale)}</div>
                <div className="text-xs text-muted-foreground">{tp.stats.pixels}</div>
              </div>
              <span className="text-xl text-muted-foreground">=</span>
              <div className="rounded-xl border bg-primary px-5 py-4 text-primary-foreground">
                <div className="text-2xl font-bold">{formatNumber(totalPixelValues, locale)}</div>
                <div className="text-xs opacity-80">{tp.stats.pixelValues}</div>
              </div>
            </div>
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">{tp.stats.note}</p>
          </section>

          <section className="space-y-5">
            <div className="text-center">
              <SectionTitle>{tp.compare.heading}</SectionTitle>
              <p className="mt-2 text-sm text-muted-foreground">{tp.compare.hint}</p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              <CompareSlot
                label={tp.compare.frameA}
                frame={frames[Math.min(compareA, frames.length - 1)]}
                index={compareA}
                max={frames.length - 1}
                onChange={setCompareA}
              />
              <CompareSlot
                label={tp.compare.frameB}
                frame={frames[Math.min(compareB, frames.length - 1)]}
                index={compareB}
                max={frames.length - 1}
                onChange={setCompareB}
              />
            </div>
            <div className="text-center">
              <Badge variant="secondary" className="font-mono">
                {tp.compare.difference}:{" "}
                {(frameDiff(frames[Math.min(compareA, frames.length - 1)], frames[Math.min(compareB, frames.length - 1)]) * 100).toFixed(1)}%
              </Badge>
              <p className="mt-3 font-mono text-sm text-muted-foreground">{tp.compare.caption}</p>
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border p-6 md:p-8">
            <div className="flex flex-col items-center gap-3 text-center">
              <SectionTitle>{tp.cv.heading}</SectionTitle>
              <p className="max-w-xl text-sm text-muted-foreground">{tp.cv.subtitle}</p>
              <Button
                variant={cv ? "default" : "outline"}
                size="sm"
                onClick={() => setCv((v) => !v)}
              >
                <Eye className="h-4 w-4" />
                {tp.cv.toggle}
              </Button>
            </div>
            {cv ? (
              <div className="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-5">
                <Stage icon={Film} label={tp.cv.video} />
                <Stage icon={Layers} label={tp.cv.frames} />
                <Stage icon={ImageIcon} label={tp.cv.objects} />
                <Stage icon={Sparkles} label={tp.cv.patterns} />
                <Stage icon={Cpu} label={tp.cv.prediction} />
              </div>
            ) : null}
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="space-y-3 p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-4 w-4" />
                  {tp.insights.heading}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tp.insights.items.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-foreground">{"\u2022"}</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="space-y-3 p-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Binary className="h-4 w-4" />
                  {tp.facts.heading}
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {tp.facts.items.map((it, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-foreground">{"\u2022"}</span>
                      {it}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>
        </div>
      )}
    </div>
  )
}
