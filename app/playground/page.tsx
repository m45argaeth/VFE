import type { Metadata } from "next"
import { VideoPlayground } from "@/components/playground/video-playground"

export const metadata: Metadata = {
  title: "Playground \u2014 Video Frame Explorer",
}

export default function PlaygroundPage() {
  return <VideoPlayground />
}
