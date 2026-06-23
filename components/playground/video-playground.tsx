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
        <div className="mt-1 text-lg font-semibold">{value}</div>
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
      <CardContent className="flex flex-col items-center gap-2 p-5 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {value ? (
          <span className="font-mono text-base font-semibold">{value}</span>
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
  const [compareB, setComp