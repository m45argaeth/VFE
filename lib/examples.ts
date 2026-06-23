import { sampleGrid, type VideoFrame, type VideoMeta } from "@/lib/video-frames"

export interface ExampleDef {
  id: string
  emoji: string
  label: { id: string; en: string }
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, p: number) => void
}

function sky(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  top: string,
  bottom: string,
) {
  const g = ctx.createLinearGradient(0, 0, 0, h)
  g.addColorStop(0, top)
  g.addColorStop(1, bottom)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, w, h)
}

export const EXAMPLES: ExampleDef[] = [
  {
    id: "walking",
    emoji: "\uD83D\uDEB6",
    label: { id: "Orang Berjalan", en: "Walking Person" },
    draw: (ctx, w, h, p) => {
      sky(ctx, w, h, "#dbeafe", "#eff6ff")
      ctx.fillStyle = "#cbd5e1"
      ctx.fillRect(0, h * 0.78, w, h * 0.22)
      const x = w * (0.1 + 0.8 * p)
      const y = h * 0.78
      const swing = Math.sin(p * Math.PI * 8) * 18
      ctx.strokeStyle = "#0f172a"
      ctx.lineWidth = 8
      ctx.lineCap = "round"
      ctx.fillStyle = "#0f172a"
      ctx.beginPath()
      ctx.arc(x, y - 150, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x, y - 128)
      ctx.lineTo(x, y - 60)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y - 60)
      ctx.lineTo(x - 20 + swing, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y - 60)
      ctx.lineTo(x + 20 - swing, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y - 110)
      ctx.lineTo(x - 22 - swing, y - 70)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x, y - 110)
      ctx.lineTo(x + 22 + swing, y - 70)
      ctx.stroke()
    },
  },
  {
    id: "traffic",
    emoji: "\uD83D\uDE97",
    label: { id: "Lalu Lintas", en: "Busy Traffic" },
    draw: (ctx, w, h, p) => {
      sky(ctx, w, h, "#1e293b", "#334155")
      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, h * 0.55, w, h * 0.45)
      ctx.fillStyle = "#fbbf24"
      const offset = (p * 240) % 120
      for (let lx = -120 + offset; lx < w; lx += 120) {
        ctx.fillRect(lx, h * 0.75, 60, 8)
      }
      const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"]
      for (let i = 0; i < 4; i++) {
        const cx = ((p * (1 + i * 0.3) + i * 0.25) % 1) * w
        const cy = h * 0.6 + i * 28
        ctx.fillStyle = colors[i]
        ctx.fillRect(cx, cy, 90, 34)
        ctx.fillStyle = "#0f172a"
        ctx.fillRect(cx + 12, cy - 16, 50, 18)
      }
    },
  },
  {
    id: "ocean",
    emoji: "\uD83C\uDF0A",
    label: { id: "Ombak Laut", en: "Ocean Waves" },
    draw: (ctx, w, h, p) => {
      sky(ctx, w, h, "#bae6fd", "#7dd3fc")
      ctx.fillStyle = "#0369a1"
      ctx.fillRect(0, h * 0.5, w, h * 0.5)
      ctx.strokeStyle = "rgba(255,255,255,0.7)"
      ctx.lineWidth = 4
      for (let row = 0; row < 5; row++) {
        ctx.beginPath()
        const yBase = h * 0.55 + row * 40
        for (let x = 0; x <= w; x += 10) {
          const y = yBase + Math.sin(x / 80 + p * Math.PI * 2 + row) * 12
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    },
  },
  {
    id: "cat",
    emoji: "\uD83D\uDC31",
    label: { id: "Kucing Berlari", en: "Running Cat" },
    draw: (ctx, w, h, p) => {
      sky(ctx, w, h, "#fde68a", "#fef3c7")
      ctx.fillStyle = "#a16207"
      ctx.fillRect(0, h * 0.8, w, h * 0.2)
      const x = w * (0.1 + 0.8 * p)
      const y = h * 0.8
      const bob = Math.abs(Math.sin(p * Math.PI * 10)) * 14
      ctx.fillStyle = "#1f2937"
      ctx.beginPath()
      ctx.ellipse(x, y - 50 - bob, 60, 28, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(x + 58, y - 70 - bob, 22, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x + 48, y - 88 - bob)
      ctx.lineTo(x + 44, y - 108 - bob)
      ctx.lineTo(x + 58, y - 92 - bob)
      ctx.fill()
      ctx.beginPath()
      ctx.moveTo(x + 70, y - 88 - bob)
      ctx.lineTo(x + 74, y - 108 - bob)
      ctx.lineTo(x + 60, y - 92 - bob)
      ctx.fill()
      ctx.strokeStyle = "#1f2937"
      ctx.lineWidth = 10
      ctx.lineCap = "round"
      ctx.beginPath()
      ctx.moveTo(x - 58, y - 55 - bob)
      ctx.quadraticCurveTo(x - 90, y - 90 - bob, x - 70, y - 110 - bob)
      ctx.stroke()
      const ls = Math.sin(p * Math.PI * 10) * 18
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(x - 30, y - 30 - bob)
      ctx.lineTo(x - 30 + ls, y - bob)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(x + 30, y - 30 - bob)
      ctx.lineTo(x + 30 - ls, y - bob)
      ctx.stroke()
    },
  },
  {
    id: "bird",
    emoji: "\uD83D\uDC26",
    label: { id: "Burung Terbang", en: "Flying Bird" },
    draw: (ctx, w, h, p) => {
      sky(ctx, w, h, "#93c5fd", "#dbeafe")
      ctx.fillStyle = "#fde047"
      ctx.beginPath()
      ctx.arc(w * 0.82, h * 0.2, 46, 0, Math.PI * 2)
      ctx.fill()
      const flap = Math.sin(p * Math.PI * 12) * 22
      ctx.strokeStyle = "#1e3a8a"
      ctx.lineWidth = 6
      ctx.lineCap = "round"
      const drawBird = (bx: number, by: number, scale: number) => {
        ctx.beginPath()
        ctx.moveTo(bx - 30 * scale, by + flap * scale)
        ctx.quadraticCurveTo(bx, by - 10 * scale, bx, by)
        ctx.quadraticCurveTo(bx, by - 10 * scale, bx + 30 * scale, by + flap * scale)
        ctx.stroke()
      }
      drawBird(w * (0.1 + 0.8 * p), h * 0.4, 1.4)
      drawBird(w * (0.2 + 0.7 * p), h * 0.3, 1.0)
      drawBird(w * (0.05 + 0.8 * p), h * 0.55, 0.8)
    },
  },
]

export function generateExampleFrames(
  def: ExampleDef,
  count = 24,
): { frames: VideoFrame[]; meta: VideoMeta } {
  const W = 1280
  const H = 720
  const canvas = document.createElement("canvas")
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Canvas is not supported in this browser.")

  const duration = 30
  const fps = 30
  const frames: VideoFrame[] = []
  for (let i = 0; i < count; i++) {
    const p = i / count
    def.draw(ctx, W, H, p)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85)
    frames.push({
      index: i,
      time: duration * ((i + 0.5) / count),
      dataUrl,
      sample: sampleGrid(canvas, W, H),
    })
  }

  const fileSize = Math.round(duration * 3.6 * 1024 * 1024)
  return {
    frames,
    meta: { duration, width: W, height: H, fps, frameCount: duration * fps, fileSize },
  }
}
