import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import { meta, timeline } from '@/data'

/**
 * Timeline editorial: rel horizontal di desktop, daftar bertumpuk di mobile.
 * Tiap tahap digambar sebagai entri berkas — periode mono, tahun besar, dan
 * garis waktu yang menghubungkan penanda.
 */
export default function Timeline() {
  const { judul, deskripsi } = meta.section.timeline
  const jumlah = timeline.length

  return (
    <Section id="timeline" className="bg-muted/30 border-y">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          bab="03"
          eyebrow="Peta Jalan"
          judul={judul}
          deskripsi={deskripsi}
        />

        <ol className="relative mt-16 grid grid-cols-1 gap-y-10 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-0">
          {/* Rel: vertikal di HP, horizontal di desktop */}
          <div
            aria-hidden="true"
            className="bg-border absolute top-2 bottom-2 left-[7px] w-px lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          />

          {timeline.map((tahap, i) => {
            const pertama = i === 0
            const terakhir = i === jumlah - 1

            return (
              <li key={tahap.periode} className="relative pl-10 lg:pt-10 lg:pl-0">
                {/* Penanda node */}
                <span
                  aria-hidden="true"
                  className="bg-background ring-border absolute top-1 left-0 flex size-4 items-center justify-center rounded-full ring-4 lg:top-0"
                >
                  <span className="bg-accent-ikn size-1.5 rounded-full" />
                </span>

                <Reveal delay={i * 90}>
                  <div className="lg:pr-6">
                    <div className="flex items-center gap-2">
                      <span className="label-mono text-accent-ikn tabular-nums">
                        {tahap.periode}
                      </span>
                      {pertama ? (
                        <span className="border-border text-muted-foreground rounded-full border px-2 py-0.5 font-mono text-[0.6rem] tracking-wider uppercase">
                          Mulai
                        </span>
                      ) : null}
                      {terakhir ? (
                        <span className="border-accent-ikn/40 text-accent-ikn rounded-full border px-2 py-0.5 font-mono text-[0.6rem] tracking-wider uppercase">
                          Target
                        </span>
                      ) : null}
                    </div>

                    <h3 className="mt-4 text-xl leading-snug tracking-tight text-balance">
                      {tahap.judul}
                    </h3>
                    <p className="text-muted-foreground mt-2.5 text-sm leading-relaxed text-pretty">
                      {tahap.deskripsi}
                    </p>

                    <span
                      aria-hidden="true"
                      className="text-muted-foreground/40 mt-4 block font-mono text-xs tabular-nums"
                    >
                      {String(i + 1).padStart(2, '0')} / {String(jumlah).padStart(2, '0')}
                    </span>
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
