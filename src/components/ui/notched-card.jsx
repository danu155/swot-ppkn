import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * NotchedCard — kartu dengan "gigitan" membulat di sudut kanan-bawah cover dan
 * cakram panah bersarang di dalamnya. Diadaptasi dari pola NotchedProjectCard
 * (21st.dev), disederhanakan: cover berupa slot React (bukan foto), karena di
 * sini cover diisi ikon + tint warna aspek SWOT.
 *
 * Gigitan digambar tiga lapis dengan warna permukaan DI BELAKANG kartu
 * (`surface`, default warna background halaman). Jika kartu diletakkan di atas
 * latar lain, kirim warna latar itu lewat prop `surface`, atau gigitannya
 * akan terlihat.
 *
 * Seluruh kartu adalah satu <button> sehingga bisa diklik dari mana saja.
 */

const DISC = 44 // cakram panah, px
const BLOCK = 56 // blok gigitan, px (radius = BLOCK - DISC / 2)
const FILLET = 18 // lengkung tempat gigitan bertemu tepi cover, px

export function NotchedCard({
  cover,
  title,
  meta,
  onOpen,
  accent,
  accentForeground = '#ffffff',
  surface = 'var(--color-background)',
  disc = DISC,
  block = BLOCK,
  fillet = FILLET,
  className,
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Buka detail: ${title}`}
      className={cn(
        'group focus-visible:ring-ring focus-visible:ring-offset-background flex w-full flex-col rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-offset-4',
        className,
      )}
    >
      <div className="relative">
        {/* Cover */}
        <div className="bg-muted relative aspect-[16/9] overflow-hidden rounded-2xl">
          {cover}
        </div>

        {/* Gigitan: blok dengan sudut kiri-atas cekung, plus fillet di tiap
            ujung tempat potongan bertemu tepi kanan & bawah cover */}
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0"
          style={{
            width: block,
            height: block,
            borderTopLeftRadius: block - disc / 2,
            background: surface,
          }}
        />
        {[
          { bottom: block, right: 0 },
          { bottom: 0, right: block },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              ...pos,
              width: fillet,
              height: fillet,
              background: `radial-gradient(circle at top left, transparent ${fillet - 0.5}px, ${surface} ${fillet}px)`,
            }}
          />
        ))}

        {/* Cakram panah, bersarang di dalam gigitan. Selalu diberi warna aksen
            aspek agar jelas bisa diklik (tidak bergantung pada hover saja). */}
        <span
          data-slot="notch-disc"
          aria-hidden="true"
          className="absolute right-0 bottom-0 flex items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          style={{
            width: disc,
            height: disc,
            backgroundColor: accent,
            color: accentForeground,
          }}
        >
          <ArrowUpRight className="size-[18px]" strokeWidth={2.25} />
        </span>
      </div>

      {/* Teks di bawah cover */}
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-lg leading-snug font-medium tracking-tight text-balance sm:text-xl">
          {title}
        </h3>
        {meta ? (
          <p className="text-muted-foreground mt-1.5 font-mono text-[0.7rem] tracking-wide">
            {meta}
          </p>
        ) : null}
      </div>
    </button>
  )
}

export default NotchedCard
