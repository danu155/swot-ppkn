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
        {/* PANGGUNG MELAYANG: halo + garuda dalam SATU wrapper float —
            semuanya naik-turun bareng. */}
        <div className="animate-float absolute inset-0">
          {/* Halo: cahaya radial lembut di belakang garuda. Tanpa tepi keras
              → mustahil "menabrak" bentuk garuda; denyut halus sinkron 14 dtk
              memberi rasa hidup tanpa ornamen tech-cincin yang janggal di
              lambang negara. */}
          <div
            aria-hidden="true"
            className="animate-halo-napas absolute -inset-[18%] rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(circle, oklch(0.82 0.13 88 / 0.32) 0%, oklch(0.72 0.12 80 / 0.12) 42%, transparent 68%)',
            }}
          />

          {/* Garuda emas — bentuk dari mask, warna dari gradien + kilau
              logam yang menyapu permukaannya. */}
          <div
            className="absolute inset-0"
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
            {/* Warna dasar emas */}
            <div className="absolute inset-0 bg-[linear-gradient(160deg,oklch(0.82_0.13_88)_0%,oklch(0.68_0.12_76)_45%,oklch(0.52_0.1_70)_100%)]" />
            {/* Kilau logam: pita highlight diagonal lewat permukaan emas */}
            <div className="animate-kilau-emas absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,244,214,0.75)_47%,rgba(255,255,255,0.9)_50%,rgba(255,244,214,0.75)_53%,transparent_70%)] bg-[length:220%_100%]" />
          </div>
        </div>
      </div>

      {/* Bayangan yang "bernapas" — menyempit & memudar saat garuda di
          puncak float, melebar & pekat saat rendah (sinkron 14 dtk). */}
      <div
        aria-hidden="true"
        className="animate-bayang-napas bg-foreground mx-auto mt-1 h-3 w-2/5 rounded-full blur-md"
      />
    </div>
  )
}
