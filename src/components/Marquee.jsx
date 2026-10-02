import { cn } from '@/lib/utils'

/**
 * Strip bergulir horizontal. Memakai animasi CSS murni (keyframes `marquee`) —
 * ringan, tanpa JS. Nonaktif otomatis saat `prefers-reduced-motion`
 * (lihat index.css) dan dihentikan sementara saat kursor di atasnya.
 */
export default function Marquee({ items, className }) {
  if (!items?.length) return null

  // Dua salinan berjejer agar loop terlihat mulus (track bergeser -50%).
  const track = [...items, ...items]

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden border-y py-5 select-none',
        className,
      )}
      aria-hidden="true"
    >
      {/* Gradien pemudar di kedua ujung agar keluar-masuk terasa halus */}
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l to-transparent" />

      <ul className="animate-marquee flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-12 text-sm whitespace-nowrap"
          >
            <span className="label-mono text-muted-foreground">{item}</span>
            <span className="bg-accent-ikn/50 size-1 rotate-45" />
          </li>
        ))}
      </ul>
    </div>
  )
}
