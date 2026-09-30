import { useCallback, useRef } from 'react'

/**
 * Efek "spotlight" ala komponen 21st.dev/Aceternity: sorot cahaya radial yang
 * mengikuti kursor di atas kartu.
 *
 * Dioptimalkan: posisi kursor ditulis langsung ke CSS variable pada elemen
 * (via ref) sehingga TIDAK memicu re-render React saat mousemove.
 *
 * Pasangkan dengan <SpotlightOverlay /> dan kelas `group/spot` pada elemen.
 */
export function useSpotlight() {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }, [])

  return { ref, onMouseMove }
}
