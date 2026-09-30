import { lazy, Suspense } from 'react'

import { ArrowDown, ArrowUpRight } from 'lucide-react'

import HeroOrbitLabels from '@/components/HeroOrbitLabels'
import Logomark from '@/components/Logomark'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { useWebGLSupport } from '@/lib/use-canvas'
import { gayaAspek } from '@/lib/swot-style'
import { meta, swot } from '@/data'
import { cn } from '@/lib/utils'

// three.js hanya diunduh saat Hero benar-benar dirender (bukan di bundel awal).
const HeroScene = lazy(() => import('@/components/three/HeroScene'))

// Sumber angka kunci tetap dari data.js (tidak ada fakta yang di-hardcode).
const sorotan = meta.section.latarBelakang.stats

/**
 * Label yang mengorbit di sekeliling orb 3D. Diturunkan dari data.js: empat
 * aspek SWOT (label + warna aspek). Ditaruh di empat sudut diagonal agar teks
 * punya ruang dan tidak menutupi orb.
 */
const LABEL_ORBIT = swot.map((s) => ({
  label: s.label,
  warna: gayaAspek[s.warna]?.hex ?? 'var(--accent-ikn)',
}))

/**
 * Fallback statis untuk Hero saat WebGL tidak tersedia atau scene masih dimuat:
 * orb bergradien murni CSS agar tata letak tidak pernah kosong.
 */
function OrbFallback({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative grid place-items-center', className)}
    >
      <div className="animate-float border-accent-ikn/20 bg-accent-ikn/5 size-64 rounded-full border sm:size-80 lg:size-[26rem]">
        <div className="from-accent-ikn/35 via-accent-brass/25 absolute inset-6 rounded-full bg-gradient-to-br to-transparent blur-2xl" />
        <div className="border-accent-ikn/30 absolute inset-10 rounded-full border border-dashed" />
      </div>
    </div>
  )
}

function Scene({ className }) {
  const webgl = useWebGLSupport()

  if (!webgl) return <OrbFallback className={className} />

  return (
    <Suspense fallback={<OrbFallback className={className} />}>
      <HeroScene className={cn('h-full w-full', className)} />
    </Suspense>
  )
}

export default function Hero() {
  return (
    <header
      id="beranda"
      className="paper-grain relative isolate overflow-hidden border-b"
    >
      {/* Grid tipis arsitektural di latar, meredup ke bawah */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--paper-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--paper-line)_1px,transparent_1px)] bg-[size:64px_64px] opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Baris meta atas — nuansa lembar laporan */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b py-4">
          <div className="flex items-center gap-3">
            <Logomark className="text-primary size-8" />
            <div className="leading-tight">
              <p className="text-sm font-semibold tracking-tight">IKN</p>
              <p className="label-mono text-muted-foreground/80">
                Nusantara · Kalimantan Timur
              </p>
            </div>
          </div>
          <p className="label-mono text-muted-foreground/80">
            Berkas Analisis · 2022–2045
          </p>
        </div>

        {/* Grid utama: teks asimetris (7) + scene 3D (5) */}
        <div className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-7 lg:pr-8">
            <Reveal>
              <div className="border-accent-ikn/30 bg-accent-ikn/5 text-accent-ikn inline-flex items-center gap-2 rounded-full border px-3 py-1">
                <span className="bg-accent-ikn size-1.5 animate-pulse rounded-full" />
                <span className="label-mono">{meta.labelJelajahi}</span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-6 text-4xl leading-[0.98] tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Analisis <span className="italic">SWOT</span> Ibu Kota{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Nusantara</span>
                  <span
                    aria-hidden="true"
                    className="bg-accent-ikn/25 absolute inset-x-0 bottom-1 -z-0 h-3 -rotate-1"
                  />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-muted-foreground mt-6 max-w-xl text-lg text-pretty">
                {meta.subjudul}
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="group h-12 rounded-full px-6">
                  <a href="#swot">
                    {meta.tombolMulai}
                    <ArrowDown
                      className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="group h-12 rounded-full px-5"
                >
                  <a href="#latar-belakang">
                    Baca latar belakang
                    <ArrowUpRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </div>
            </Reveal>

            {/* Baris angka kunci dengan garis pemisah tipis */}
            <Reveal delay={320}>
              <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-border">
                {sorotan.map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <dt className="text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                      {s.nilai}
                    </dt>
                    <dd className="text-muted-foreground mt-1 text-xs leading-snug text-pretty">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Focal point 3D */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              {/* Cahaya lembut di belakang orb */}
              <div
                aria-hidden="true"
                className="bg-accent-ikn/10 absolute inset-[14%] -z-10 rounded-full blur-3xl"
              />
              {/* Orb 3D mengisi container; ukurannya diatur lewat jarak kamera
                  di HeroScene agar anotasi orbit tetap punya ruang di luar. */}
              <Scene className="absolute inset-0" />

              {/* Label yang berputar mengelilingi orb */}
              <HeroOrbitLabels items={LABEL_ORBIT} className="hidden sm:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Pita pemisah tipis di kaki Hero */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
        <div className="via-accent-ikn/50 h-px bg-gradient-to-r from-transparent to-transparent" />
      </div>
    </header>
  )
}
