import { ArrowDown, MapPin } from 'lucide-react'

import { BeamsBackground } from '@/components/ui/beams-background'
import { Button } from '@/components/ui/button'
import { meta } from '@/data'

/**
 * Latar dekoratif Hero bertema merah-putih.
 *  - <BeamsBackground> : berkas cahaya bergerak (komponen 21st.dev), warnanya
 *    diambil dari token tema `--beam-*` → nuansa merah.
 *  - Bola cahaya merah melayang pelan (aurora) + gradien dasar.
 *  - Garis diagonal pinstripe yang bergerak sangat lambat.
 * Semua lapisan statis-samar dan pointer-events-none. Gerakan dihentikan bila
 * pengguna mengaktifkan `prefers-reduced-motion`.
 */
function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* (1) Basis: gradien hangat + selubung putih sebagai DASAR.
             Veil diletakkan paling bawah agar TIDAK memutihkan berkas cahaya. */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--destructive)_22%,var(--background))_0%,color-mix(in_oklab,var(--destructive)_7%,var(--background))_42%,var(--background)_78%)]" />
      <div className="absolute -top-28 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--background)_62%,transparent),transparent_72%)]" />

      {/* (2) Aurora: bola cahaya merah melayang.
             Wrapper menangani pemusatan (translate-x-1/2); animasi float hanya
             mengurus sumbu Y & skala pada elemen di dalamnya. */}
      <div className="absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2">
        <div className="motion-safe:animate-float size-full rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--destructive)_46%,transparent),transparent_72%)]" />
      </div>

      {/* (3) Berkas cahaya bergerak (nuansa merah). */}
      <BeamsBackground
        className="absolute inset-0 h-full"
        intensity="strong"
        count={14}
        speed={1}
        cssBlur={3}
      />

      {/* (4) Garis diagonal tipis bernuansa merah-putih, bergerak pelan */}
      <div className="animate-diagonal absolute -inset-40 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,var(--destructive)_0_1px,transparent_1px_16px)] [background-size:128px_128px] dark:opacity-[0.09]" />

      {/* (5) Vignette tipis di tepi bawah agar judul tetap kontras */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}

/**
 * Memberi aksen gradasi merah berkilau pada bagian "(IKN)" di judul.
 * Murni tampilan; teks tetap utuh dari data.js.
 */
function JudulBeraksen({ teks }) {
  const penanda = '(IKN)'
  if (!teks.includes(penanda)) return teks

  const [awal, akhir] = teks.split(penanda)
  return (
    <>
      {awal?.trimEnd()}{' '}
      <span className="animate-shimmer bg-[linear-gradient(100deg,var(--destructive),color-mix(in_oklab,var(--destructive)_45%,var(--foreground))_50%,var(--destructive))] bg-[length:220%_100%] bg-clip-text text-transparent">
        {penanda}
      </span>
      {akhir}
    </>
  )
}

export default function Hero() {
  return (
    <header id="beranda" className="relative isolate overflow-hidden">
      <HeroBackdrop />

      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:py-28 lg:py-32">
        <span className="border-destructive/25 bg-card/70 text-destructive inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-xs backdrop-blur-sm">
          <MapPin className="size-3.5" aria-hidden="true" />
          {meta.labelJelajahi}
        </span>

        <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
          <JudulBeraksen teks={meta.judul} />
        </h1>

        <p className="text-muted-foreground mt-6 max-w-2xl text-base text-pretty sm:text-lg">
          {meta.subjudul}
        </p>

        <div className="mt-8">
          <Button asChild size="lg" className="group">
            <a href="#swot">
              {meta.tombolMulai}
              <ArrowDown
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </Button>
        </div>
      </div>

      {/* Pita pembatas bernuansa merah di kaki Hero */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0">
        <div className="from-destructive/60 via-destructive/25 h-0.5 bg-gradient-to-r to-transparent" />
        <div className="bg-border h-px" />
      </div>
    </header>
  )
}
