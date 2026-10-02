import { useState } from 'react'

import { ArrowLeft, ArrowUpRight } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Rule } from '@/components/Rule'
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
import { meta, swot } from '@/data'
import { gayaUntuk } from '@/lib/swot-style'
import { cn } from '@/lib/utils'

/**
 * Satu baris ledger SWOT — pola yang sama dengan baris angka kunci hero dan
 * Tiga Alasan Utama: tipografi + hairline, TANPA kotak dan tanpa ornamen.
 *
 * Anatomi baris (desktop):
 *   [chip huruf S] [Kategori mono]   Judul Aspek besar   01 poin · 02 poin · 03 poin   ↗
 * Di mobile: chip + kategori, judul, lalu poin tersusun ke bawah.
 */
function BarisAspek({ item, onBuka }) {
  const gaya = gayaUntuk(item.warna)
  const { Icon, singkatan, teks, hex } = gaya

  return (
    <button
      type="button"
      onClick={onBuka}
      aria-label={`Buka detail ${item.kategori} (${item.label})`}
      className="group focus-visible:ring-ring relative w-full text-left outline-none"
    >
      <div className="flex flex-col gap-5 py-8 sm:py-10 lg:flex-row lg:items-center lg:gap-8">
        {/* Identitas: chip huruf + kategori */}
        <div className="flex items-center gap-3.5 lg:w-56 lg:shrink-0">
          <span
            className="flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-base font-semibold tabular-nums"
            style={{
              backgroundColor: `color-mix(in oklab, ${hex} 11%, transparent)`,
              color: hex,
              boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hex} 26%, transparent)`,
            }}
          >
            {singkatan}
          </span>
          <div>
            <span className={cn('label-mono block', teks)}>{item.kategori}</span>
            <span className="text-muted-foreground mt-0.5 hidden items-center gap-1.5 text-xs sm:flex">
              <Icon className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
              <span className="group-hover:text-foreground transition-colors duration-300">
                Lihat tiga poin
              </span>
            </span>
          </div>
        </div>

        {/* Judul aspek */}
        <h3 className="text-foreground text-3xl leading-tight tracking-tight text-balance transition-colors duration-300 sm:text-4xl lg:flex-1">
          {item.label}
        </h3>

        {/* Preview poin: judul saja, rata kanan di desktop. Nomor memakai
            label-mono tapi lebar kolomnya tetap — angka jadi sejajar rapi
            dengan judul poin, tidak jauh / melayang. */}
        <ol className="space-y-2 lg:w-96 lg:shrink-0 lg:text-right">
          {item.poin.map((poin, i) => (
            <li
              key={poin.judul}
              className="flex items-baseline gap-3 lg:grid lg:grid-cols-[1.6rem_1fr] lg:gap-0"
            >
              <span
                className={cn('label-mono shrink-0 tabular-nums', teks)}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-muted-foreground group-hover:text-foreground text-sm leading-snug text-pretty transition-colors duration-300">
                {poin.judul}
              </span>
            </li>
          ))}
        </ol>

        {/* Cakram panah — satu-satunya elemen interaksi */}
        <span
          aria-hidden="true"
          className="border-border text-muted-foreground group-hover:border-transparent group-hover:text-background hidden size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:bg-foreground lg:flex"
        >
          <ArrowUpRight className="size-[18px]" strokeWidth={2} />
        </span>
      </div>
    </button>
  )
}

export default function AnalisisSwot() {
  const { judul, deskripsi } = meta.section.swot
  const [aktif, setAktif] = useState(null)

  return (
    <Section id="swot" className="border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Jembatan dari bab 01: rule editorial pembuka */}
        <Rule className="mt-2" />

        {/* Kepala bagian: judul kiri, lead kanan — senada dengan bab 01 */}
        <div className="mt-12 grid items-end gap-8 sm:mt-14 lg:grid-cols-12">
          <SectionHeading
            bab="02"
            eyebrow="Empat Aspek"
            judul={judul}
            className="lg:col-span-7"
          />
          <Reveal className="lg:col-span-5" delay={120}>
            <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
              {deskripsi}
            </p>
          </Reveal>
        </div>

        {/* Empat baris ledger, dipisah hairline — tanpa kotak */}
        <div className="divide-border mt-10 divide-y sm:mt-12">
          {swot.map((item, i) => (
            <Reveal key={item.kategori} delay={i * 70}>
              <BarisAspek item={item} onBuka={() => setAktif(item)} />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Satu dialog bersama; isinya mengikuti baris yang dibuka */}
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
 * Isi popup satu aspek — bahasa editorial yang sama: hairline, nomor mono,
 * tanpa panel warna blok. Konten tetap utuh dari data.js.
 */
function AspectDetail({ item }) {
  const gaya = gayaUntuk(item.warna)
  const { Icon, teks, hex } = gaya

  return (
    <>
      <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
        {/* Panel identitas */}
        <div className="relative flex flex-col justify-between gap-6 overflow-hidden border-b p-7 sm:border-r sm:border-b-0">
          <DialogHeader className="relative gap-5">
            <span
              className="flex size-14 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `color-mix(in oklab, ${hex} 11%, transparent)`,
                color: hex,
                boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${hex} 26%, transparent)`,
              }}
            >
              <Icon className="size-7" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="space-y-2">
              <span className={cn('label-mono block', teks)}>{item.kategori}</span>
              <DialogTitle className="font-display text-3xl leading-none font-semibold tracking-tight">
                {item.label}
              </DialogTitle>
            </div>
          </DialogHeader>

          <DialogDescription className="text-muted-foreground relative text-base leading-relaxed text-pretty italic sm:text-[1.05rem]">
            {item.teori}
          </DialogDescription>
        </div>

        {/* Daftar poin */}
        <div className="min-h-0 overflow-y-auto p-7">
          <p className="label-mono text-muted-foreground mb-6">Tiga Poin Kunci</p>
          <ol className="divide-border divide-y">
            {item.poin.map((poin, i) => (
              <li key={poin.judul} className="flex gap-5 py-6 first:pt-0 last:pb-0">
                <span className={cn('label-mono shrink-0 pt-1 tabular-nums', teks)} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="space-y-2">
                  <h4 className="text-foreground text-base font-semibold sm:text-[1.05rem]">
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
        <span className="label-mono text-muted-foreground hidden sm:inline">
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
