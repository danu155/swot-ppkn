import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card } from '@/components/ui/card'
import { meta, swot } from '@/data'
import { SpotlightOverlay } from '@/components/SpotlightOverlay'
import { useSpotlight } from '@/lib/use-spotlight'
import { gayaUntuk } from '@/lib/swot-style'
import { cn } from '@/lib/utils'

function SwotKartu({ item }) {
  const gaya = gayaUntuk(item.warna)
  const { Icon } = gaya
  const { ref, onMouseMove } = useSpotlight()

  return (
    <Card
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        'group/spot relative h-full gap-0 overflow-hidden py-0 transition-shadow duration-200 hover:shadow-md',
        'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-1 before:content-[""]',
        gaya.garis,
      )}
    >
      <SpotlightOverlay warna={gaya.hex} />

      <Accordion type="single" collapsible>
        <AccordionItem value={item.kategori} className="border-b-0">
          <AccordionTrigger className="items-center gap-4 px-6 py-5 hover:no-underline">
            <span className="flex items-center gap-3">
              <span
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  gaya.latarIkon,
                  gaya.teks,
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="flex flex-col">
                <span
                  className={cn(
                    'text-[0.7rem] font-semibold tracking-[0.14em] uppercase',
                    gaya.teks,
                  )}
                >
                  {item.kategori}
                </span>
                <span className="text-base font-semibold text-foreground sm:text-lg">
                  {item.label}
                </span>
              </span>
            </span>
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <div className="px-6 pb-6">
              <p className="text-muted-foreground text-sm text-pretty italic">
                {item.teori}
              </p>

              <ol className="mt-5 space-y-4">
                {item.poin.map((poin, i) => (
                  <li key={poin.judul} className="flex gap-3">
                    <span
                      className={cn(
                        'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                        gaya.latarIkon,
                        gaya.teks,
                      )}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-foreground">
                        {poin.judul}
                      </h4>
                      <p className="text-muted-foreground text-sm text-pretty">
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
    </Card>
  )
}

export default function AnalisisSwot() {
  const { judul, deskripsi } = meta.section.swot

  return (
    <Section id="swot">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Empat Aspek"
          judul={judul}
          deskripsi={deskripsi}
        />

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-2">
          {swot.map((item, i) => (
            <Reveal key={item.kategori} delay={i * 80}>
              <SwotKartu item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
