import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

/**
 * Garuda emas animasi — siluet Garuda Pancasila (Wikimedia, public domain)
 * dipakai sebagai CSS mask; warnanya datang dari gradien emas CSS.
 *
 * Tanpa bingkai/pelat: garuda melayang bebas di latar halaman, ditemani
 * satu cincin orbit putus-putus dengan dua titik "pulau" (narasi
 * kepulauan). Animasi murni CSS + tilt pseudo-3D mengikuti kursor;
 * semuanya mati otomatis saat prefers-reduced-motion / layar sentuh.
 */
export default function GarudaEmas({ className }) {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  // Tilt pseudo-3D: hanya aktif untuk pointer presisi (mouse/pen).
  useEffect(() => {
    const el = ref.current
    if (!el) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return undefined

    const halus = 6 // derajat maksimum
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: -py * halus * 2, y: px * halus * 2 })
    }
    const onLeave = () => setTilt({ x: 0, y: 0 })

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={ref} className={cn('relative select-none', className)}>
      {/* Bidang perspektif untuk tilt */}
      <div
        className="relative aspect-square w-full [perspective:900px]"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 250ms ease-out',
        }}
      >
        {/* Cincin orbit putus-putus + dua titik pulau */}
        <div
          aria-hidden="true"
          className="animate-spin-slow absolute -inset-[6%]"
        >
          <div className="absolute inset-0 rounded-full border border-dashed border-[color-mix(in_oklab,var(--accent-ikn)_32%,transparent)]" />
          <span className="bg-accent-ikn absolute top-[1.5%] left-1/2 size-2 -translate-x-1/2 rounded-full" />
          <span className="bg-accent-ikn/55 absolute bottom-[10%] right-[6%] size-1.5 rounded-full" />
        </div>

        {/* Garuda emas — bentuk dari mask, warna dari gradien */}
        <div
          className="animate-float absolute inset-0"
          style={{
            WebkitMaskImage: 'url(/garuda-mask.webp)',
            maskImage: 'url(/garuda-mask.webp)',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        >
          <div className="h-full w-full bg-[linear-gradient(160deg,oklch(0.82_0.13_88)_0%,oklch(0.68_0.12_76)_45%,oklch(0.52_0.1_70)_100%)]" />
        </div>
      </div>

      {/* Bayangan lembut di bawah — memberi bobot tanpa kotak */}
      <div
        aria-hidden="true"
        className="bg-foreground/15 mx-auto mt-1 h-3 w-2/5 rounded-full blur-md"
      />
    </div>
  )
}
