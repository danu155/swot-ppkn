import { Factory, Hammer, Landmark, Trophy } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import { meta, timeline } from '@/data'

// Ikon presentasional per tahap (indeks mengikuti urutan timeline di data.js).
const ikon = [Hammer, Landmark, Factory, Trophy]

export default function Timeline() {
  const { judul, deskripsi } = meta.section.timeline
  const jumlah = timeline.length

  return (
    <Section id="timeline" className="bg-muted/40 border-y">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Peta Jalan" judul={judul} deskripsi={deskripsi} />

        <ol className="relative mt-14 space-y-8 lg:grid lg:grid-cols-4 lg:gap-6 lg:space-y-0">
          {/* Garis penghubung: vertikal di HP, horizontal di desktop */}
          <div
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[19px] w-px bg-gradient-to-b from-primary via-border to-border lg:top-[19px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          {timeline.map((tahap, i) => {
            const Icon = ikon[i] ?? Hammer
            const pertama = i === 0
            const terakhir = i === jumlah - 1

            return (
              <li key={tahap.periode} className="relative pl-14 lg:pt-14 lg:pl-0">
                {/* Penanda node bernomor + ikon */}
                <span
                  aria-hidden="true"
                  className="bg-card text-primary ring-border absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border-2 border-primary/60 shadow-sm ring-4 lg:top-0"
                >
                  <Icon className="size-[18px]" />
                </span>

                <Reveal delay={i * 90} className="lg:mt-0">
                  <div className="border-border bg-card group relative rounded-xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="bg-primary/10 text-primary inline-flex rounded-md px-2 py-0.5 text-xs font-semibold tracking-wide">
                        {tahap.periode}
                      </span>
                      {pertama ? (
                        <span className="border-destructive/30 text-destructive inline-flex rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase">
                          Mulai
                        </span>
                      ) : null}
                      {terakhir ? (
                        <span className="border-primary/40 text-primary inline-flex rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide uppercase">
                          Target
                        </span>
                      ) : null}
                      <span className="text-muted-foreground/60 ml-auto text-xs font-medium tabular-nums">
                        {String(i + 1).padStart(2, '0')}/{String(jumlah).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-balance">
                      {tahap.judul}
                    </h3>
                    <p className="text-muted-foreground mt-2 text-sm text-pretty">
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
