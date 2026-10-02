import { Compass } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { cn } from '@/lib/utils'

/**
 * Panel lokasi — pelat lokasi tipografis ala lembar laporan.
 *
 * Gagasan: alih-alih peta Indonesia, lokasi IKN disajikan sebagai "pelat
 * survei" gaya laporan lapangan: kertas milimeter, garis bidik silang,
 * penanda berdenyut, nama lokasi display besar, dan watermark "IKN" raksasa.
 * Pesannya sama (IKN berada di Kalimantan Timur, menggantikan Jakarta),
 * penyajiannya khas.
 *
 * Semua elemen dekoratif murni presentasional; teks substantif tetap dari
 * narasi di bawah (tidak ada fakta baru yang di-hardcode).
 */

/* Grid milimeter sebagai background-image (garis 1px, sangat halus). */
const gridMilimeter =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'%3E%3Cpath d=\'M32 0H0V32\' fill=\'none\' stroke=\'%23000\' stroke-opacity=\'0.055\'/%3E%3C/svg%3E")'

/** Garis bidik (crosshair) SVG kecil di sudut panel. */
function Bidik({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn('text-accent-ikn/40 size-5', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="12" cy="12" r="3.25" />
      <path d="M12 1v6.5M12 16.5V23M1 12h6.5M16.5 12H23" />
    </svg>
  )
}

export default function PanelLokasi({ className }) {
  return (
    <Reveal className={className} delay={80}>
      <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-muted/40 to-background">
        {/* Kertas milimeter */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ backgroundImage: gridMilimeter }}
        />

        {/* Garis batas dalam ala bingkai pelat cetak */}
        <div
          aria-hidden="true"
          className="border-border/70 pointer-events-none absolute inset-3 rounded-2xl border sm:inset-4"
        />

        {/* Watermark huruf raksasa */}
        <span
          aria-hidden="true"
          className="text-accent-ikn/6 font-display pointer-events-none absolute -right-4 bottom-0 select-none text-[7rem] leading-none font-semibold tracking-tight sm:text-[9rem] lg:text-[11rem]"
        >
          IKN
        </span>

        <div className="relative grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-8">
          {/* Kolom narasi (materi tetap) */}
          <div className="lg:col-span-5">
            <span className="bg-accent-ikn/10 text-accent-ikn flex size-11 items-center justify-center rounded-xl">
              <Compass className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-2xl leading-tight tracking-tight text-balance">
              Dari Jakarta ke jantung Kalimantan
            </h3>
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed text-pretty sm:text-base">
              Ibu Kota Nusantara berdiri di Kalimantan Timur, menggantikan
              Jakarta yang selama ini menanggung beban sebagai pusat
              pemerintahan sekaligus pusat ekonomi nasional.
            </p>

            <div className="text-muted-foreground mt-6 flex items-center gap-2">
              <span className="bg-accent-ikn size-2 rounded-full" />
              <span className="label-mono">Penanda lokasi IKN</span>
            </div>
          </div>

          {/* Kolom pelat lokasi */}
          <div className="lg:col-span-7">
            <div className="border-border/80 bg-background/70 relative flex h-full min-h-[280px] flex-col justify-between gap-8 rounded-2xl border p-6 backdrop-blur-[2px] sm:p-8">
              {/* Sudut bidik */}
              <Bidik className="absolute top-3 left-3" />
              <Bidik className="absolute top-3 right-3" />
              <Bidik className="absolute bottom-3 left-3" />
              <Bidik className="absolute right-3 bottom-3" />

              {/* Baris atas: penanda lokasi + label kecil */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-3">
                    <span className="bg-accent-ikn/40 animate-pulse-ring absolute inline-flex h-full w-full rounded-full" />
                    <span className="bg-accent-ikn relative inline-flex size-3 rounded-full" />
                  </span>
                  <span className="label-mono text-foreground">
                    Penanda lokasi — IKN
                  </span>
                </div>
                <span className="label-mono text-muted-foreground hidden sm:block">
                  PLAT 01 / LOKASI
                </span>
              </div>

              {/* Tengah: nama lokasi display besar */}
              <div className="relative">
                <p className="font-display text-4xl leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
                  Kalimantan
                  <span className="text-accent-ikn block">Timur</span>
                </p>
              </div>

              {/* Baris bawah: label pelat — chrome UI, bukan fakta baru */}
              <div className="border-border/70 text-muted-foreground flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t pt-4">
                <span className="label-mono">Kalimantan Timur · Indonesia</span>
                <span className="label-mono">Sketsa lokasi — bukan peta</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
