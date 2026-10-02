import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'

/**
 * Kartu aspek modern: sudut membulat besar, garis tepi tipis, permukaan putih,
 * dan "cakram" panah yang jelas bisa diklik. Saat hover seluruh kartu terangkat
 * halus dan cakram panah bergeser diagonal.
 *
 * `cover` adalah slot React (di sini diisi ilustrasi ikon + gradien warna aspek),
 * `accent` mengatur warna cakram panah.
 */
export function AspectCard({
  cover,
  title,
  meta,
  onOpen,
  accent,
  accentForeground = '#ffffff',
  className,
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Buka detail: ${title}`}
      className={cn(
        'group focus-visible:ring-ring focus-visible:ring-offset-background relative flex w-full flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-[0_1px_2px_color-mix(in_oklab,var(--foreground)_8%,transparent)] transition-all duration-300 ease-out outline-none hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_color-mix(in_oklab,var(--foreground)_28%,transparent)] focus-visible:ring-2 focus-visible:ring-offset-4',
        className,
      )}
    >
      {/* Cover ilustratif */}
      <div className="bg-muted relative aspect-[16/10] overflow-hidden border-b">
        {cover}
      </div>

      {/* Teks */}
      <div className="flex flex-1 flex-col gap-1 p-5">
        {meta ? (
          <p className="text-muted-foreground font-mono text-[0.68rem] tracking-[0.16em] uppercase">
            {meta}
          </p>
        ) : null}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg leading-snug font-semibold tracking-tight text-balance sm:text-xl">
            {title}
          </h3>
          <span
            aria-hidden="true"
            className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            style={{ backgroundColor: accent, color: accentForeground }}
          >
            <ArrowUpRight className="size-[18px]" strokeWidth={2.25} />
          </span>
        </div>
      </div>
    </button>
  )
}

export default AspectCard
