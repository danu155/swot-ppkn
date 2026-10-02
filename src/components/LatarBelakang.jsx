import { Building2, Compass, Scale, Trees } from 'lucide-react'

import PetaIndonesia from '@/components/PetaIndonesia'
import Reveal from '@/components/Reveal'
import StatChips from '@/components/StatChips'
import { Section, SectionHeading } from '@/components/Section'
import { latarBelakang, meta } from '@/data'

// Ikon murni presentasional, dipetakan per urutan (bukan konten/fakta).
const ikon = [Building2, Scale, Trees]

/**
 * Satu alasan sebagai kartu: lencana ikon lembut, judul, lalu deskripsi.
 * Permukaan putih dengan garis tepi tipis dan bayangan halus saat hover.
 */
function KartuAlasan({ item, index }) {
  const Icon = ikon[index] ?? Building2

  return (
    <article className="group bg-card relative flex h-full flex-col rounded-2xl border p-6 shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_30px_60px_-34px_color-mix(in_oklab,var(--foreground)_30%,transparent)] sm:p-7">
      <span className="bg-accent-ikn/10 text-accent-ikn flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
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
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
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

        {/* Pita angka kunci */}
        <StatChips items={stats} className="mt-14 sm:mt-16" />

        {/* Panel peta: menegaskan letak ibu kota baru */}
        <Reveal className="mt-14" delay={80}>
          <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-b from-muted/40 to-background">
            <div className="grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="bg-accent-ikn/10 text-accent-ikn flex size-11 items-center justify-center rounded-xl">
                  <Compass className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl leading-tight tracking-tight text-balance">
                  Dari Jakarta ke jantung Kalimantan
                </h3>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed text-pretty">
                  Ibu Kota Nusantara berdiri di Kalimantan Timur, menggantikan
                  Jakarta yang selama ini menanggung beban sebagai pusat
                  pemerintahan sekaligus pusat ekonomi nasional.
                </p>
                <div className="text-muted-foreground mt-6 flex items-center gap-2">
                  <span className="bg-accent-ikn size-2 rounded-full" />
                  <span className="label-mono">Penanda lokasi IKN</span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <PetaIndonesia className="mx-auto max-w-3xl" />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Tiga alasan utama */}
        <p className="label-mono text-muted-foreground mt-16 lg:mt-20">
          Tiga Alasan Utama
        </p>
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
