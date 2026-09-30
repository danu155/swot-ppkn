import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

function bacaReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Membungkus konten dengan animasi fade + slide-in halus saat masuk viewport.
 * - Memakai IntersectionObserver (ringan, tanpa library animasi).
 * - Animasi hanya berjalan sekali.
 * - Otomatis nonaktif bila pengguna mengaktifkan "prefers-reduced-motion"
 *   atau bila IntersectionObserver tidak tersedia.
 */
export default function Reveal({
  as: Tag = 'div',
  className,
  delay = 0,
  children,
  ...props
}) {
  const ref = useRef(null)
  // Nilai awal langsung "tampil" bila animasi tidak semestinya berjalan.
  const [visible, setVisible] = useState(
    () => bacaReducedMotion() || typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    // Sudah tampil sejak awal (reduced-motion / tanpa observer): tak perlu apa pun.
    if (visible) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
