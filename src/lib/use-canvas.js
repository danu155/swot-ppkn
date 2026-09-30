import { useEffect, useState } from 'react'

/**
 * Mengembalikan true bila pengguna meminta pengurangan gerak.
 * Dipakai agar scene 3D bisa menampilkan bingkai statis, bukan animasi kontinu.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReduced(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

let cachedWebGL = null

function detectWebGL() {
  if (cachedWebGL !== null) return cachedWebGL
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')
    cachedWebGL = Boolean(gl)
    // Lepaskan konteks uji agar tidak memakan slot GPU.
    if (gl && typeof gl.getExtension === 'function') {
      const lose = gl.getExtension('WEBGL_lose_context')
      lose?.loseContext()
    }
  } catch {
    cachedWebGL = false
  }
  return cachedWebGL
}

/**
 * Deteksi dukungan WebGL sekali (hasil di-cache di modul).
 * Bila tidak didukung, Hero akan menampilkan fallback statis.
 */
export function useWebGLSupport() {
  const [supported] = useState(detectWebGL)
  return supported
}
