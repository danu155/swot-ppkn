import { Building2, Scale, Trees } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import StatChips from '@/components/StatChips'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { latarBelakang, meta } from '@/data'
import { useSpotlight } from '@/lib/use-spotlight'
import { SpotlightOverlay } from '@/components/SpotlightOverlay'

// Ikon murni presentasional, dipetakan per urutan kartu (bukan konten/fakta).
const ikon = [Building2, Scale, Trees]

function KartuLatar({ item, index }) {
  const Icon = ikon[index] ?? Building2
  const { ref, onMouseMove } = useSpotlight()

  return (
    <Card
      ref={ref}
      onMouseMove={onMouseMove}
      className="group/spot relative h-full gap-4 overflow-hidden transition-shadow duration-200 hover:shadow-md"
    >
      <SpotlightOverlay warna="var(--primary)" />
      <CardHeader className="gap-4">
        <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <CardTitle className="text-base leading-snug text-balance sm:text-lg">
          {item.judul}
        </CardTitle>
        <CardDescription className="text-pretty">
          {item.deskripsi}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

export default function LatarBelakang() {
  const { judul, deskripsi, stats } = meta.section.latarBelakang

  return (
    <Section id="latar-belakang" className="bg-muted/40 border-y">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading eyebrow="Konteks" judul={judul} deskripsi={deskripsi} />

        <StatChips items={stats} className="mt-10" />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latarBelakang.map((item, i) => (
            <li key={item.judul}>
              <Reveal delay={i * 80} className="h-full">
                <KartuLatar item={item} index={i} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
