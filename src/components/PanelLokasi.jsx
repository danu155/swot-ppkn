import { Compass } from 'lucide-react'

import GarudaEmas from '@/components/GarudaEmas'
import Reveal from '@/components/Reveal'
import { cn } from '@/lib/utils'

/**
 * Blok lokasi — SPLIT EDITORIAL TERBUKA (tanpa kartu/panel/bingkai).
 *
 * Kiri : narasi "Dari Jakarta ke jantung Kalimantan" + daftar lokator mono.
 * Kanan: garuda emas melayang bebas (GarudaEmas), identitas lokasi di
 *        bawahnya sebagai teks biasa — bukan di dalam pelat.
 *
 * Tanpa kotak, teks miniman yang tersisa terdistribusi sehingga ruang kosong
 * kebaca sebagai napas (pola sama dengan baris ledger di bab 02).
 */

/** Satu baris lokator mono (chrome UI — bukan fakta baru). */
function Lokator({ urutan, teks, total }) {
  return (
    <div
      className={cn(
        'text-muted-foreground flex items-baseline gap-4 py-3',
        // Hairline antar baris: semua kecuali baris terakhir (index via urutan).
        urutan < total - 1 && 'border-b border-dashed',
      )}
    >
      <span className="label-mono text-accent-ikn shrink-0 tabular-nums">
        {String(urutan + 1).padStart(2, '0')}
      </span>
      <span className="label-mono">{teks}</span>
    </div>
  )
}

export default function PanelLokasi({ className }) {
  const lokator = [
    'Kalimantan Timur · Indonesia',
    'Diapit Balikpapan & Samarinda',
    'Ibu kota negara sejak 2024',
  ]

  return (
    <Reveal className={className} delay={80}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Kolom narasi */}
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

          {/* Lokator — mengganti fungsi label pelat, tanpa kotak */}
          <div className="mt-8">
            {lokator.map((teks, i) => (
              <Lokator key={teks} urutan={i} teks={teks} total={lokator.length} />
            ))}
          </div>
        </div>

        {/* Kolom garuda — melayang bebas, tanpa bingkai; digeser ke kanan */}
        <div className="lg:col-span-7">
          {/* Wrapper ikut bergeser agar teks + garuda satu poros */}
          <div className="mx-auto flex max-w-md flex-col items-center gap-7 py-6 lg:mr-0 lg:ml-auto lg:max-w-lg lg:translate-x-10 lg:pr-4">
            <GarudaEmas className="w-full max-w-[320px]" />

            {/* Identitas lokasi — teks terbuka, bukan caption di dalam pelat */}
            <div className="text-center">
              <p className="font-display text-3xl leading-[0.95] tracking-tight sm:text-4xl">
                Kalimantan
                <span className="text-accent-ikn block">Timur</span>
              </p>
              <p className="label-mono text-muted-foreground mt-3">
                Lambang Negara — publik domain
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
