import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { meta, swot } from '@/data'
import { gayaUntuk } from '@/lib/swot-style'
import { cn } from '@/lib/utils'

/**
 * Satu kuadran matriks SWOT. Menampilkan singkatan besar (S/W/O/T) sebagai
 * jangkar visual, lalu daftar tiga poin yang bisa dibuka-tutup.
 *
 * Sengaja bukan "kartu melayang": tiap kuadran adalah panel rata bertepi tipis
 * dengan huruf raksasa, sehingga terbentuk matriks 2×2 yang koheren.
 */
function KuadranSwot({ item }) {
  const gaya = gayaUntuk(item.warna)
  const { Icon, singkatan } = gaya

  return (
    <div
      className="group/kuadran bg-card/40 relative flex h-full flex-col overflow-hidden border-t-2 pt-0"
      style={{ borderTopColor: gaya.hex }}
    >
      {/* Huruf raksasa sebagai latar */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-6 right-2 font-display text-[8rem] leading-none font-semibold opacity-[0.06] select-none sm:text-[10rem]',
          gaya.teks,
        )}
      >
        {singkatan}
      </span>

      <Accordion
        type="single"
        collapsible
        defaultValue={item.kategori}
        className="relative"
      >
        <AccordionItem value={item.kategori} className="border-b-0">
          <AccordionTrigger className="items-center gap-4 px-6 py-6 hover:no-underline">
            <span className="flex items-center gap-3.5">
              <span
                className={cn(
                  'flex size-11 shrink-0 items-center justify-center rounded-lg',
                  gaya.latarIkon,
                  gaya.teks,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col items-start">
                <span className={cn('label-mono', gaya.teks)}>
                  {item.kategori}
                </span>
                <span className="mt-1 text-xl font-medium text-foreground">
                  {item.label}
                </span>
              </span>
            </span>
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <div className="px-6 pb-6">
              <p className="text-muted-foreground border-l-2 border-border pl-4 text-sm leading-relaxed text-pretty italic">
                {item.teori}
              </p>

              <ol className="mt-6 space-y-5">
                {item.poin.map((poin, i) => (
                  <li key={poin.judul} className="flex gap-4">
                    <span
                      className={cn(
                        'mt-0.5 font-mono text-xs tabular-nums',
                        gaya.teks,
                      )}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-semibold text-foreground">
                        {poin.judul}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
                        {poin.deskripsi}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default function AnalisisSwot() {
  const { judul, deskripsi } = meta.section.swot

  return (
    <Section id="swot">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          bab="02"
          eyebrow="Empat Aspek"
          judul={judul}
          deskripsi={deskripsi}
          align="center"
          className="mx-auto"
        />

        {/* Matriks 2×2 */}
        <div className="mt-16 grid overflow-hidden border-x border-b lg:grid-cols-2">
          {swot.map((item, i) => (
            <Reveal
              key={item.kategori}
              delay={i * 80}
              className={cn(
                'h-full',
                i % 2 === 0 && 'lg:border-r',
                i >= 2 && 'border-t',
              )}
            >
              <KuadranSwot item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
