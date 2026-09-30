import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function bacaReducedMotion() {
  if (typeof window === 'undefined') return true // SSR/awal: jangan animasikan
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function useInView(ref) {
  const [inView, setInView] = useState(
    () => bacaReducedMotion() || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    // Sudah aktif sejak awal (reduced-motion / tanpa observer): tak perlu apa pun.
    if (inView) return

    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return inView
}

/**
 * Menampilkan angka sorotan yang SUDAH ada di data (mis. "57%", "75%", "2045").
 * Angka dihitung naik (count-up) saat masuk viewport. Bagian non-angka
 * (seperti ">", "%", atau teks) tetap dipertahankan apa adanya.
 */
function StatNilai({ nilai, aktif }) {
  const cocok = String(nilai).match(/^([^0-9]*)(\d+)(.*)$/)
  const target = cocok ? Number(cocok[2]) : null
  // Tahun (>= 1000) ditampilkan statis; hanya angka kecil yang dihitung naik.
  const animatable = target !== null && target < 1000
  const harusAnimasi = animatable && aktif && !bacaReducedMotion()

  const durasi = 1100
  // Selama belum ada animasi, nilai turunan (target) dipakai langsung;
  // state hanya menyimpan nilai selama proses hitung-naik berlangsung.
  const [animasi, setAnimasi] = useState(0)

  useEffect(() => {
    if (!harusAnimasi) return

    let raf
    const mulai = performance.now()
    const tick = (now) => {
      const t = Math.min((now - mulai) / durasi, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setAnimasi(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [harusAnimasi, target, durasi])

  if (!cocok) return <>{nilai}</>

  return (
    <>
      {cocok[1]}
      {harusAnimasi ? animasi : target}
      {cocok[3]}
    </>
  )
}

export default function StatChips({ items, className }) {
  const ref = useRef(null)
  const inView = useInView(ref)

  if (!items?.length) return null

  return (
    <ul
      ref={ref}
      className={cn('flex flex-wrap justify-center gap-3', className)}
    >
      {items.map((stat, i) => (
        <li
          key={stat.label}
          style={{ transitionDelay: `${i * 90}ms` }}
          className={cn(
            'border-border bg-card flex max-w-xs items-center gap-3 rounded-xl border px-4 py-3 text-left shadow-xs transition-[opacity,transform] duration-500',
            inView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
          )}
        >
          <span className="text-primary min-w-[3.5rem] text-2xl font-semibold tabular-nums">
            <StatNilai nilai={stat.nilai} aktif={inView} />
          </span>
          <span className="text-muted-foreground text-xs leading-snug text-pretty sm:text-sm">
            {stat.label}
          </span>
        </li>
      ))}
    </ul>
  )
}
