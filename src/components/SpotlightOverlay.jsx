/**
 * Lapisan sorot untuk efek spotlight (lihat useSpotlight).
 * Ditempatkan sebagai anak pertama di dalam kartu.
 * Kartu perlu `group/spot relative overflow-hidden`.
 */
export function SpotlightOverlay({ warna = 'currentColor', ukuran = 220 }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
      style={{
        background: `radial-gradient(${ukuran}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, ${warna} 16%, transparent), transparent 70%)`,
      }}
    />
  )
}
