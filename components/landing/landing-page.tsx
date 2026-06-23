"use client"

import Link from "next/link"
import {
  Film,
  Image as ImageIcon,
  Binary,
  Layers,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/lib/i18n"

export function LandingPage() {
  const { t } = useI18n()

  const stages = [
    { icon: Film, label: t.pipeline.video, desc: t.pipeline.videoDesc },
    { icon: Layers, label: t.pipeline.frames, desc: t.pipeline.framesDesc },
    { icon: ImageIcon, label: t.pipeline.pixels, desc: t.pipeline.pixelsDesc },
    { icon: Binary, label: t.pipeline.numbers, desc: t.pipeline.numbersDesc },
  ]

  return (
    <>
      <section className="container flex flex-col items-center py-20 text-center md:py-28">
        <Badge variant="secondary" className="mb-6 gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          {t.hero.badge}
        </Badge>
        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
          {t.hero.subtitle}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/playground">
              <Play className="h-4 w-4" />
              {t.hero.explore}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/playground">{t.hero.random}</Link>
          </Button>
        </div>
        <div className="mt-16 w-full max-w-4xl">
          <div className="grid gap-3 sm:grid-cols-4">
            {stages.map((s) => {
              const Icon = s.icon
              return (
                <Card key={s.label} className="animate-fade-in">
                  <CardContent className="flex flex-col items-center gap-2 p-5 text-center">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.desc}</span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <p className="mt-6 font-mono text-sm text-muted-foreground">
            {t.hero.caption}
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-muted/20">
        <div className="container py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t.motion.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {t.motion.body}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            {t.how.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.how.subtitle}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.how.steps.map((step) => (
            <Card key={step.title}>
              <CardContent className="space-y-2 p-6">
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="container flex flex-col items-center py-20 text-center">
          <h2 className="max-w-xl text-balance text-2xl font-bold tracking-tight md:text-3xl">
            {t.cta.heading}
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">{t.cta.subtitle}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/playground">
              {t.cta.button}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  )
}
