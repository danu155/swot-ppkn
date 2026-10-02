import { cn } from '@/lib/utils'

/**
 * Monogram IKN — tanda SVG dengan garis yang "tergambar" saat muncul.
 *
 * Sengaja memakai SVG (bukan kanvas/WebGL) agar ringan dan tajam di semua
 * ukuran. Garis digambar memakai animasi stroke-dashoffset CSS yang otomatis
 * berhenti saat prefers-reduced-motion.
 *
 * Bentuk: huruf "N" dari tiga goresan (mewakili Nusantara) yang mengapit sebuah
 * wajik hijau — penanda lokasi ibu kota baru.
 */
export default function Logomark({ className, animated = true }) {
  return (
    <svg
      viewBox="0 0 32 32"
      role="img"
      aria-label="Monogram IKN"
      className={cn('size-7', className)}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Bidikan bingkai tipis */}
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        className="stroke-border"
        strokeWidth="1"
      />

      {/* Huruf "N" — tiga goresan */}
      <g
        stroke="currentColor"
        strokeWidth="2"
        className={animated ? 'logomark-draw' : undefined}
      >
        <path pathLength="1" d="M9 23V9" />
        <path pathLength="1" d="M9 9l14 14" />
        <path pathLength="1" d="M23 23V9" />
      </g>

      {/* Wajik aksen (lokasi ibu kota) */}
      <path
        d="M16 12.5l2.6 3.5-2.6 3.5-2.6-3.5z"
        className={cn('fill-accent-ikn', animated && 'logomark-pop')}
        style={{ transformOrigin: '16px 16px' }}
      />
    </svg>
  )
}
