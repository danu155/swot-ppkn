import { Building2, Scale, Trees } from 'lucide-react'

import Reveal from '@/components/Reveal'
import StatChips from '@/components/StatChips'
import { Section, SectionHeading } from '@/components/Section'
import { latarBelakang, meta } from '@/data'

// Ikon murni presentasional, dipetakan per urutan (bukan konten/fakta).
const ikon = [Building2, Scale, Trees]

/**
 * Satu butir latar belakang dalam gaya "entri berkas": nomor besar mono,
 * judul serif, ikon garis tipis, dan deskripsi. Diakses kembali pada grid
 * berkolom agar terasa seperti lembar majalah, bukan tumpukan kartu.
 */
function EntriLatar({ item, index }) {
  const Icon = ikon[index] ?? Building2

  return (
    <article className="group relative flex h-full flex-col border-t pt-6">
      <span className="label-mono text-muted-foreground/60 tabular-nums">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="mt-5 flex items-center gap-3">
        <span className="text-accent-ikn">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span aria-hidden="true" className="bg-border h-px flex-1" />
      </div>

      <h3 className="mt-4 text-xl leading-snug tracking-tight text-balance">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Kepala bagian: judul di kiri, deskripsi sebagai lead di kanan */}
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeading
            bab="01"
            eyebrow="Konteks"
            judul={judul}
            className="lg:col-span-6"
          />
          <Reveal className="lg:col-span-6 lg:pt-3" delay={120}>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed text-pretty">
              {deskripsi}
            </p>
          </Reveal>
        </div>

        <StatChips items={stats} className="mt-14" />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {latarBelakang.map((item, i) => (
            <Reveal key={item.judul} delay={i * 90} className="h-full">
              <EntriLatar item={item} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
