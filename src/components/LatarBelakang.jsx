import { Building2, Scale, Trees } from 'lucide-react'

import Reveal from '@/components/Reveal'
import StatChips from '@/components/StatChips'
import { Section, SectionHeading } from '@/components/Section'
import { latarBelakang, meta } from '@/data'

// Ikon murni presentasional, dipetakan per urutan (bukan konten/fakta).
const ikon = [Building2, Scale, Trees]

/**
 * Satu alasan sebagai kartu bersih: lencana ikon lembut, judul, lalu deskripsi.
 * Tanpa garis dekoratif — hanya permukaan kartu dan bayangan halus saat hover.
 */
function KartuAlasan({ item, index }) {
  const Icon = ikon[index] ?? Building2

  return (
    <article className="group bg-card relative flex h-full flex-col rounded-2xl border p-6 shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-xl sm:p-7">
      <span className="bg-accent-ikn/10 text-accent-ikn flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105">
        <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
      </span>

      <h3 className="mt-5 text-lg leading-snug tracking-tight text-balance sm:text-xl">
        {item.judul}
      </h3>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-pretty">
        {item.deskripsi}
      </p>
    </article>
  )
}

export default function LatarBelakang() {
  const { judul, deskripsi, stats } = meta.section.latarBelakang

  return (
    <Section id="latar-belakang" className="border-b">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        {/* Kepala bagian: judul di kiri, lead di kanan */}
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionHeading
            bab="01"
            eyebrow="Konteks"
            judul={judul}
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {deskripsi}
            </p>
          </Reveal>
        </div>

        {/* Pita angka kunci (satu panel cekung dengan sekat) */}
        <StatChips items={stats} className="mt-14 sm:mt-16" />

        {/* Label pemisah menuju tiga alasan (tanpa garis) */}
        <p className="label-mono text-muted-foreground mt-16 lg:mt-20">
          Tiga Alasan Utama
        </p>

        {/* Tiga alasan sebagai kartu terangkat */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latarBelakang.map((item, i) => (
            <Reveal key={item.judul} delay={i * 90} className="h-full">
              <KartuAlasan item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
