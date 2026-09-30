import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/lib/use-canvas'
import { cn } from '@/lib/utils'

/**
 * Anotasi orbit di sekeliling orb 3D — gaya diagram teknik/laporan:
 *
 *   KEKUATAN  ──────•
 *   label     garis   titik simpul (di jalur orbit)
 *
 * Titik simpul mendarat tepat di jalur orbit (menghadap orb); garis + label
 * memanjang KELUAR, jadi tidak ada yang menutupi orb. Tiap aspek ditaruh pada
 * sudut berbeda, lalu bergilir tersorot searah jarum jam → terlihat berputar.
 *
 * Radius simpul dibuat sedikit lebih besar dari cangkang 3D (yang sudah
 * dikecilkan lewat jarak kamera) supaya kebersihan visual terjaga.
 *
 * Saat `prefers-reduced-motion`, anotasi tampil statis tanpa pergantian.
 */
export function HeroOrbitLabels({ items, className, interval = 2600 }) {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced || items.length < 2) return
    const tick = setInterval(
      () => setActive((i) => (i + 1) % items.length),
      interval,
    )
    return () => clearInterval(tick)
  }, [reduced, items.length, interval])

  const jumlah = items.length

  return (
    <div
      className={cn('pointer-events-none absolute inset-0', className)}
      aria-hidden="true"
    >
      {/* Cincin jalur orbit — tipis & samar */}
      <div className="border-border/60 absolute inset-[8%] rounded-full border border-dashed" />

      {items.map((item, i) => {
        // Geser 45° agar label jatuh di sudut diagonal (bukan tepat kiri/kanan),
        // lalu searah jarum jam.
        const derajat = -135 + (360 / jumlah) * i
        const rad = (derajat * Math.PI) / 180
        const cos = Math.cos(rad)
        const sin = Math.sin(rad)
        const radius = 42 // % dari sisi container; simpul mendarat di cincin
        const cx = 50 + radius * cos
        const cy = 50 + radius * sin
        const aktif = i === active
        // Label memanjang ke luar: ke kanan bila cos>=0, ke kiri bila cos<0.
        const keKanan = cos >= 0

        return (
          <div
            key={item.label}
            className="absolute flex items-center"
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              // Baris di-anchor di titik simpul (kiri-atas elemen), lalu
              // dipindah ke luar sesuai sisi: kanan → geser ke kanan; kiri →
              // cerminkan agar label tumbuh ke kiri.
              transform: keKanan
                ? 'translate(0, -50%)'
                : 'translate(-100%, -50%)',
              flexDirection: keKanan ? 'row' : 'row-reverse',
            }}
          >
            {/* Titik simpul, di ujung dalam (menghadap orb) */}
            <span className="relative flex items-center justify-center">
              <span
                className={cn(
                  'rounded-full transition-all duration-500',
                  aktif ? 'size-2' : 'size-1.5',
                )}
                style={{ backgroundColor: item.warna }}
              />
              {aktif ? (
                <span
                  className="animate-ping absolute size-4 rounded-full opacity-40"
                  style={{ backgroundColor: item.warna }}
                />
              ) : null}
            </span>

            {/* Garis penunjuk */}
            <span
              className={cn('h-px transition-all duration-500', aktif ? 'w-5' : 'w-3')}
              style={{
                backgroundColor: aktif ? item.warna : 'var(--color-border)',
              }}
            />

            {/* Label mono */}
            <span
              className={cn(
                'font-mono text-[0.6rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-500',
                aktif ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {item.label}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default HeroOrbitLabels
