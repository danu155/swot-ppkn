import { useState } from 'react'

import { ArrowLeft } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { NotchedCard } from '@/components/ui/notched-card'
import { meta, swot } from '@/data'
import { gayaUntuk } from '@/lib/swot-style'
import { cn } from '@/lib/utils'

/**
 * Cover kartu aspek: pengganti "foto" pada referensi. Komposisi editorial —
 * pil kategori di kiri-atas, "medali" ikon aspek sebagai fokus, dan huruf
 * raksasa samar sebagai latar.
 */
function CoverAspek({ item, gaya }) {
  const { Icon, singkatan, coverBg, teks, pill, hex } = gaya

  return (
    <div className={cn('absolute inset-0', coverBg)}>
      {/* Pola garis halus */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--paper-line)_1px,transparent_1px),linear-gradient(90deg,var(--paper-line)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(circle_at_50%_45%,black,transparent_82%)]"
      />

      {/* Huruf raksasa samar sebagai latar */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute right-0 -bottom-12 font-display text-[8rem] leading-none font-semibold opacity-[0.12] select-none',
          teks,
        )}
      >
        {singkatan}
      </span>

      {/* Pil kategori (kiri-atas) */}
      <span
        className={cn(
          'bg-background/70 absolute top-3.5 left-3.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] font-medium tracking-[0.18em] uppercase backdrop-blur-md',
          pill,
        )}
      >
        {item.kategori}
      </span>

      {/* Medali ikon aspek */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="flex size-16 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
          style={{
            backgroundColor: `color-mix(in oklab, ${hex} 12%, transparent)`,
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hex} 28%, transparent)`,
          }}
        >
          <Icon
            className={cn('size-8', teks)}
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </span>
      </div>
    </div>
  )
}

export default function AnalisisSwot() {
  const { judul, deskripsi } = meta.section.swot
  const [aktif, setAktif] = useState(null)

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

        <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {swot.map((item, i) => {
            const gaya = gayaUntuk(item.warna)
            return (
              <Reveal key={item.kategori} delay={i * 90} className="h-full">
                <NotchedCard
                  onOpen={() => setAktif(item)}
                  title={item.label}
                  meta={`${item.kategori} · 3 poin`}
                  accent={gaya.hex}
                  accentForeground="#ffffff"
                  cover={<CoverAspek item={item} gaya={gaya} />}
                />
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* Satu dialog bersama; isinya mengikuti kartu yang dibuka */}
      <Dialog open={Boolean(aktif)} onOpenChange={(o) => !o && setAktif(null)}>
        {aktif ? (
          <DialogContent className="flex max-h-[92vh] min-h-[38rem] flex-col gap-0 overflow-hidden p-0 sm:max-w-[min(72rem,calc(100%-2rem))]">
            <AspectDetail item={aktif} />
          </DialogContent>
        ) : null}
      </Dialog>
    </Section>
  )
}

/**
 * Isi popup satu aspek. Di layar lebar dipakai dua kolom: panel identitas
 * berwarna di kiri (ikon, kategori, judul, definisi teori) dan daftar tiga poin
 * di kanan yang bisa digulir. Di layar sempit, tumpukan satu kolom.
 */
function AspectDetail({ item }) {
  const gaya = gayaUntuk(item.warna)
  const { Icon, teks, hex } = gaya

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        {/* Panel identitas berwarna */}
        <div
          className={cn(
            'relative flex flex-col justify-between gap-6 overflow-hidden border-b p-7 sm:border-r sm:border-b-0',
            gaya.latarIkon,
          )}
        >
          {/* Watermark huruf raksasa */}
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -right-3 -bottom-14 font-display text-[11rem] leading-none font-semibold opacity-[0.12] select-none',
              teks,
            )}
          >
            {gaya.singkatan}
          </span>

          <DialogHeader className="relative gap-5">
            <span
              className={cn(
                'flex size-14 items-center justify-center rounded-2xl',
                'bg-background/70 ring-1',
                teks,
              )}
              style={{ '--tw-ring-color': `color-mix(in oklab, ${hex} 30%, transparent)` }}
            >
              <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="space-y-2">
              <span className={cn('label-mono block', teks)}>{item.kategori}</span>
              <DialogTitle className="font-display text-3xl leading-none font-medium tracking-tight">
                {item.label}
              </DialogTitle>
            </div>
          </DialogHeader>

          <DialogDescription
            className={cn(
              'relative text-base leading-relaxed text-pretty italic sm:text-[1.05rem]',
              teks,
            )}
          >
            {item.teori}
          </DialogDescription>
        </div>

        {/* Daftar poin */}
        <div className="min-h-0 overflow-y-auto p-7">
          <p className="label-mono text-muted-foreground mb-6">Tiga Poin Kunci</p>
          <ol className="space-y-7">
            {item.poin.map((poin, i) => (
              <li key={poin.judul} className="flex gap-4">
                <span
                  className={cn(
                    'flex size-9 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-medium tabular-nums',
                    gaya.latarIkon,
                    teks,
                  )}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h4 className="text-base font-semibold text-foreground sm:text-[1.05rem]">
                    {poin.judul}
                  </h4>
                  <p className="text-muted-foreground text-base leading-relaxed text-pretty">
                    {poin.deskripsi}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Kaki */}
      <div className="flex items-center justify-between gap-3 border-t px-7 py-4">
        <span className="text-muted-foreground hidden font-mono text-xs tracking-wide sm:inline">
          {item.poin.length} poin · {item.kategori}
        </span>
        <DialogClose asChild>
          <Button variant="outline" size="sm" className="rounded-full">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Kembali
          </Button>
        </DialogClose>
      </div>
    </>
  )
}
