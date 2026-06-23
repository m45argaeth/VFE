export interface VideoFrame {
  index: number
  time: number
  dataUrl: string
  sample: number[]
}

export interface VideoMeta {
  duration: number
  width: number
  height: number
  fps: number
  frameCount: number
  fileSize: number
}

export const SAMPLE_GRID = 8

/** Read a downscaled GRID x GRID RGB sample (flattened) from any drawable source. */
export function sampleGrid(
  source: CanvasImageSource,
  sw: number,
  sh: number,
): number[] {
  const c = document.createElement("canvas")
  c.width = SAMPLE_GRID
  c.height = SAMPLE_GRID
  const ctx = c.getContext("2d", { willReadFrequently: true })
  if (!ctx) return []
  ctx.drawImage(source, 0, 0, sw, sh, 0, 0, SAMPLE_GRID, SAMPLE_GRID)
  const data = ctx.getImageData(0, 0, SAMPLE_GRID, SAMPLE_GRID).data
  const out: number[] = []
  for (let i = 0; i < data.length; i += 4) {
    out.push(data[i], data[i + 1], data[i + 2])
  }
  return out
}

function seekTo(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    let settled = false
    const done = () => {
      if (settled) return
      settled = true
      video.removeEventListener("seeked", done)
      resolve()
    }
    video.addEventListener("seeked", done)
    window.setTimeout(done, 1500)
    try {
      video.currentTime = time
    } catch {
      done()
    }
  })
}

/**
 * Decode a handful of frames from a video entirely on the client. Each frame is
 * captured to a canvas, producing a thumbnail data URL plus a small RGB sample
 * for pixel-level inspection \u2014 no network, no external APIs.
 */
export async function extractVideoFrames(
  objectUrl: string,
  fileSize: number,
  count = 24,
): Promise<{ frames: VideoFrame[]; meta: VideoMeta }> {
  const video = document.createElement("video")
  video.muted = true
  video.playsInline = true
  video.preload = "auto"
  video.crossOrigin = "anonymous"
  video.src = objectUrl

  await new Promise<void>((resolve, reject) => {
    let settled = false
    const ok = () => {
      if (settled) return
      settled = true
      resolve()
    }
    video.addEventListener("loadeddata", ok, { once: true })
    video.addEventListener("error", () => {
      if (settled) return
      settled = true
      reject(new Error("Could not load the video."))
    })
    window.setTimeout(ok, 5000)
  })

  const width = video.videoWidth || 640
  const height = video.videoHeight || 360
  const duration =
    Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 2
  const fps = 30
  const frameCount = Math.max(1, Math.round(duration * fps))

  const tw = Math.min(width, 640)
  const th = Math.max(1, Math.round((tw / width) * height))
  const canvas = document.createElement("canvas")
  canvas.width = tw
  canvas.height = th
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Canvas is not supported in this browser.")

  const frames: VideoFrame[] = []
  for (let i = 0; i < count; i++) {
    const time = duration * ((i + 0.5) / count)
    await seekTo(video, Math.min(time, Math.max(0, duration - 0.05)))
    ctx.drawImage(video, 0, 0, tw, th)
    const dataUrl = canvas.toDataURL("image/jpeg", 0.82)
    frames.push({
      index: i,
      time,
      dataUrl,
      sample: sampleGrid(video, width, height),
    })
  }

  return {
    frames,
    meta: { duration, width, height, fps, frameCount, fileSize },
  }
}
