import { cn } from '@/lib/utils'

/**
 * Strip bergulir horizontal ala situs modern (21st.dev/magicui).
 * Memakai animasi CSS murni (keyframes `marquee`) — ringan, tanpa JS.
 * Nonaktif otomatis saat `prefers-reduced-motion` (lihat index.css).
 */
export default function Marquee({ items, className }) {
  if (!items?.length) return null

  // Dua salinan berjejer agar loop terlihat mulus.
  const track = [...items, ...items]

  return (
    <div
      className={cn(
        'group relative flex overflow-hidden border-y py-4 select-none',
        className,
      )}
      aria-hidden="true"
    >
      <ul className="animate-marquee flex shrink-0 items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-sm font-semibold tracking-[0.16em] whitespace-nowrap uppercase"
          >
            {item}
            <span className="bg-border size-1.5 rounded-full" />
          </li>
        ))}
      </ul>
    </div>
  )
}
