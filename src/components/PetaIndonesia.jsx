import { useEffect, useRef, useState } from 'react'

import { MARKA, PETA_PATH, PETA_RASIO, PETA_VIEWBOX } from '@/lib/peta-indonesia'
import { cn } from '@/lib/utils'

/**
 * Peta Indonesia bergaya modern.
 *
 * Siluet digambar sebagai goresan yang "menulis" dirinya saat masuk viewport
 * (IntersectionObserver → kelas `is-tergambar`). Di atasnya ditandai:
 *  - lokasi IKN dengan gelombang cincin yang memancar (animate-pulse-ring),
 *  - busur putus-putus dari Jakarta ke IKN sebagai lambang pemindahan ibu kota.
 *
 * Semua geometri berasal dari src/lib/peta-indonesia.js.
 */

/* Busur pemindahan Jakarta → IKN (kuadratik, melengkung ke utara). */
const JAKARTA = MARKA.jakarta
const BIDIK = MARKA.ikn
const ARC = `M${JAKARTA.x} ${JAKARTA.y} Q${(JAKARTA.x + BIDIK.x) / 2} ${
  Math.min(JAKARTA.y, BIDIK.y) - 70
} ${BIDIK.x} ${BIDIK.y}`

export default function PetaIndonesia({ className, label = true }) {
  const wrapRef = useRef(null)
  const [tergambar, setTergambar] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTergambar(true)
          obs.disconnect()
        }
      },
      { threshold: 0.25 },
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={cn('relative', className)}>
      <svg
        viewBox={PETA_VIEWBOX}
        role="img"
        aria-label="Peta Indonesia dengan penanda lokasi Ibu Kota Nusantara di Kalimantan Timur"
        className="h-auto w-full"
        style={{ aspectRatio: PETA_RASIO }}
      >
        <defs>
          <linearGradient id="peta-daratan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-ikn)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--accent-ikn)" stopOpacity="0.04" />
          </linearGradient>

          <filter id="peta-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Garis khatulistiwa tipis sebagai penuntun mata */}
        <line
          x1="0"
          y1="138"
          x2="1000"
          y2="138"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 8"
        />

        {/* Isian siluet daratan */}
        <path
          d={PETA_PATH}
          fill="url(#peta-daratan)"
          className={cn(
            'transition-opacity duration-1000',
            tergambar ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Goresan siluet yang menggambar diri */}
        <path
          d={PETA_PATH}
          fill="none"
          stroke="var(--accent-ikn)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          style={{ '--draw-length': 6500 }}
          className={cn('peta-garis', tergambar && 'is-tergambar')}
        />

        {/* Busur pemindahan ibu kota: Jakarta → IKN */}
        <path
          d={ARC}
          fill="none"
          stroke="var(--accent-ikn)"
          strokeWidth="1.4"
          strokeDasharray="5 6"
          strokeLinecap="round"
          opacity="0.55"
          className={cn(
            'transition-opacity duration-700 delay-1000',
            tergambar ? 'opacity-55' : 'opacity-0',
          )}
        />

        {/* Titik Jakarta (ibu kota lama) */}
        <circle cx={JAKARTA.x} cy={JAKARTA.y} r="3" fill="var(--muted-foreground)" />

        {/* Penanda IKN: gelombang + inti */}
        <g
          className={cn(
            'transition-opacity duration-700 delay-700',
            tergambar ? 'opacity-100' : 'opacity-0',
          )}
        >
          {[0, 1.1, 2.2].map((delay) => (
            <circle
              key={delay}
              cx={BIDIK.x}
              cy={BIDIK.y}
              r="7"
              fill="none"
              stroke="var(--accent-ikn)"
              strokeWidth="1.6"
              className="animate-pulse-ring"
              style={{
                transformOrigin: `${BIDIK.x}px ${BIDIK.y}px`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
          <circle
            cx={BIDIK.x}
            cy={BIDIK.y}
            r="4.5"
            fill="var(--accent-ikn)"
            filter="url(#peta-glow)"
          />
        </g>

        {/* Label IKN */}
        {label ? (
          <g
            className={cn(
              'transition-opacity duration-700 delay-[1100ms]',
              tergambar ? 'opacity-100' : 'opacity-0',
            )}
          >
            <line
              x1={BIDIK.x}
              y1={BIDIK.y}
              x2={BIDIK.x + 54}
              y2={BIDIK.y - 46}
              stroke="var(--accent-ikn)"
              strokeWidth="1"
              opacity="0.5"
            />
            <circle
              cx={BIDIK.x + 54}
              cy={BIDIK.y - 46}
              r="2.5"
              fill="var(--accent-ikn)"
            />
            <text
              x={BIDIK.x + 64}
              y={BIDIK.y - 50}
              fontSize="17"
              fontWeight="700"
              fill="var(--foreground)"
              fontFamily="var(--font-display)"
            >
              IKN
            </text>
            <text
              x={BIDIK.x + 64}
              y={BIDIK.y - 33}
              fontSize="12"
              fill="var(--muted-foreground)"
            >
              Nusantara · Kaltim
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  )
}
