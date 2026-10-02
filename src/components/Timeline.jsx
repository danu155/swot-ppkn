import Reveal from '@/components/Reveal'
import { Rule } from '@/components/Rule'
import { Section, SectionHeading } from '@/components/Section'
import { meta, timeline } from '@/data'
import { cn } from '@/lib/utils'

/**
 * Timeline pembangunan — rel editorial NETRAL, semua tahap sejajar.
 *
 * - Semua node digambar sama (ring kecil berisi titik) — tidak ada
 *   penanda status "selesai/berjalan".
 * - Rel: satu garis solid tipis, STATIS — tanpa animasi isi.
 * - Tanpa kartu: nomor mono besar, periode, judul, deskripsi di kolom
 *   terbuka. Desktop: rel horizontal; mobile: rel vertikal di kiri.
 */
export default function Timeline() {
  const { judul, deskripsi } = meta.section.timeline
  const jumlah = timeline.length

  return (
    <Section id="timeline" className="border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Rule className="mt-2" />

        {/* Kepala bagian — senada bab 01 & 02 */}
        <div className="mt-12 grid items-end gap-8 sm:mt-14 lg:grid-cols-12">
          <SectionHeading
            bab="03"
            eyebrow="Peta Jalan"
            judul={judul}
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {deskripsi}
            </p>
          </Reveal>
        </div>

        {/* Rel + tahapan — semua node sejajar, netral */}
        <ol className="relative mt-16 grid grid-cols-1 gap-y-12 sm:mt-20 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {/* Rel solid tipis: vertikal di HP, horizontal di desktop */}
          <div
            aria-hidden="true"
            className="bg-border absolute top-2 bottom-2 left-[7px] w-px lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />

          {timeline.map((tahap, i) => {
            const terakhir = i === jumlah - 1

            return (
              <li
                key={tahap.periode}
                className={cn(
                  'relative',
                  'pl-10 lg:pt-10 lg:pl-0',
                  terakhir && 'lg:pr-0',
                )}
              >
                {/* Node seragam: ring kecil berisi titik */}
                <span
                  aria-hidden="true"
                  className="bg-background ring-border absolute top-1.5 left-0 flex size-4 items-center justify-center rounded-full ring-1 lg:top-0"
                >
                  <span className="bg-accent-ikn size-1.5 rounded-full" />
                </span>

                <Reveal delay={i * 90}>
                  {/* Isi tanpa kartu — nomor & periode jadi satu klaster
                      rapat (tahun tepat di bawah nomor, bukan dijauhkan). */}
                  <div className="pt-1">
                    <span className="font-display text-4xl leading-none font-semibold tracking-tight text-[color-mix(in_oklab,var(--accent-ikn)_26%,transparent)] tabular-nums select-none sm:text-5xl">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="label-mono text-accent-ikn mt-2 block tabular-nums">
                      {tahap.periode}
                    </span>

                    <h3 className="mt-4 text-lg leading-snug font-semibold tracking-tight text-balance">
                      {tahap.judul}
                    </h3>
                    <p className="text-muted-foreground mt-2.5 max-w-md text-sm leading-relaxed text-pretty lg:max-w-none">
                      {tahap.deskripsi}
                    </p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </Section>
  )
}
