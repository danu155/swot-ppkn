import { useEffect, useState } from 'react'

import { meta } from '@/data'
import { cn } from '@/lib/utils'

/**
 * Garis tipis di bagian bawah header yang menunjukkan progres baca halaman.
 * Memakai requestAnimationFrame + transform (bukan animasi berat) agar mulus.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let raf = 0

    const update = () => {
      raf = 0
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      const nilai = max > 0 ? doc.scrollTop / max : 0
      setProgress(Math.min(1, Math.max(0, nilai)))
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      role="progressbar"
      aria-label={meta.progresBaca}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      className="bg-border/60 absolute inset-x-0 bottom-0 h-0.5 overflow-hidden"
    >
      <div
        className={cn(
          'bg-primary h-full origin-left transition-transform duration-150 ease-out',
        )}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
