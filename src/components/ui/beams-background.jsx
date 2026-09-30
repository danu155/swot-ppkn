'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

/**
 * BeamsBackground
 * ------------------------------------------------------------------
 * Latar belakang "berkas cahaya" bergerak di atas <canvas>.
 *
 * Asal: komponen 21st.dev (aceternity/beams-background). Diadaptasi agar
 * aman untuk skor performa:
 *  - Dikonversi ke JavaScript (proyek ini memakai .jsx).
 *  - Warna memakai token tema `--beam-*` (lihat index.css) → otomatis cocok
 *    dengan mode terang/gelap; bisa dipaksa lewat prop `hue`.
 *  - Blur TIDAK lagi diterapkan di dalam kanvas setiap frame (mahal / CPU).
 *    Sebagai gantinya dipakai CSS filter pada elemen kanvas (diakselerasi GPU).
 *  - Animasi dijeda otomatis saat latar tidak terlihat (IntersectionObserver)
 *    dan saat tab tidak aktif (visibilitychange).
 *  - Menghormati `prefers-reduced-motion` (digambar sekali, tanpa loop).
 *  - Ukuran mengikuti elemen induk (ResizeObserver), bukan selalu viewport.
 *
 * @param {object}  props
 * @param {string}  [props.className]
 * @param {React.ReactNode} [props.children]   Konten yang ditumpuk di atas latar.
 * @param {'subtle'|'medium'|'strong'} [props.intensity='medium']
 * @param {number}  [props.hue]        Bila diisi, memaksa hue dasar (0-360).
 * @param {number}  [props.spread=26]  Rentang variasi hue antar berkas.
 * @param {number}  [props.count=12]   Jumlah berkas (relatif).
 * @param {number}  [props.speed=1]    Pengali kecepatan gerak.
 * @param {number}  [props.cssBlur=10] Blur CSS pada lapisan kanvas (px).
 * @param {number}  [props.veilBlur=0] Kekuatan frosted veil (0 = nonaktif).
 */

function createBeam(width, height) {
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 22 + Math.random() * 40,
    length: height * 1.15,
    angle: -35 + Math.random() * 10,
    speed: 1.1 + Math.random() * 1.6,
    opacity: 0.32 + Math.random() * 0.24,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
    drift: 0.25 + Math.random() * 0.4,
  }
}

const opacityMap = {
  subtle: 0.7,
  medium: 0.85,
  strong: 1,
}

export function BeamsBackground({
  className,
  children,
  intensity = 'medium',
  hue,
  spread = 26,
  count = 12,
  speed = 1,
  cssBlur = 10,
  veilBlur = 0,
}) {
  const canvasRef = useRef(null)
  const animationFrameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    // Warna diambil dari token tema yang diwarisi kanvas. Prop `hue` menang.
    const cs = getComputedStyle(canvas)
    const tokenHue = parseFloat(cs.getPropertyValue('--beam-hue'))
    const sat = cs.getPropertyValue('--beam-saturation').trim() || '85%'
    const light = cs.getPropertyValue('--beam-lightness').trim() || '65%'
    const baseHue = Number.isFinite(hue)
      ? hue
      : Number.isFinite(tokenHue)
        ? tokenHue
        : 0

    let beams = []
    let size = { w: 0, h: 0 }
    let running = false

    const paint = () => {
      // Koordinat memakai CSS pixel (kanvas sudah diskalakan DPR).
      ctx.clearRect(0, 0, size.w, size.h)

      for (const beam of beams) {
        // Lewati berkas yang jauh di luar area kanvas.
        if (beam.y > size.h + 60 || beam.y + beam.length < -60) continue

        ctx.save()
        ctx.translate(beam.x, beam.y)
        ctx.rotate((beam.angle * Math.PI) / 180)

        const pulsingOpacity =
          beam.opacity *
          (0.8 + Math.sin(beam.pulse) * 0.2) *
          opacityMap[intensity]

        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length)
        const hsla = (a) => `hsla(${beam.hue}, ${sat}, ${light}, ${a})`
        gradient.addColorStop(0, hsla(0))
        gradient.addColorStop(0.1, hsla(pulsingOpacity * 0.5))
        gradient.addColorStop(0.4, hsla(pulsingOpacity))
        gradient.addColorStop(0.6, hsla(pulsingOpacity))
        gradient.addColorStop(0.9, hsla(pulsingOpacity * 0.5))
        gradient.addColorStop(1, hsla(0))

        ctx.fillStyle = gradient
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length)
        ctx.restore()
      }
    }

    const resetBeam = (beam, index, total) => {
      const column = index % 3
      const spacing = size.w / 3
      beam.y = size.h + 100
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5
      beam.width = 30 + Math.random() * 50
      beam.speed = 0.9 + Math.random() * 0.7
      beam.hue = baseHue + (index * spread) / total
      beam.opacity = 0.32 + Math.random() * 0.16
      return beam
    }

    const sizeCanvas = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth || window.innerWidth
      const h = parent?.clientHeight || window.innerHeight
      if (w === size.w && h === size.h) return

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      size = { w, h }
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      // Skala konteks SEKALI per resize (tidak menumpuk).
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const total = Math.max(4, Math.round(count))
      beams = Array.from({ length: total }, (_, i) => {
        const beam = createBeam(w, h)
        beam.hue = baseHue + (i * spread) / total
        return beam
      })
      paint()
    }

    // Fase waktu untuk goyangan lateral + pembatas FPS (menghemat CPU).
    let t = 0
    let last = 0
    const minDelta = 1000 / 30 // batasi ~30fps; gerakan tetap halus

    const step = () => {
      const total = beams.length
      t += minDelta / 1000
      for (let index = 0; index < total; index += 1) {
        const beam = beams[index]
        beam.y -= beam.speed * speed
        beam.pulse += beam.pulseSpeed
        // Goyangan lateral halus: membuat gerakan terlihat, bukan sekadar naik.
        beam.x += Math.sin(t + beam.pulse) * beam.drift * speed
        if (beam.y + beam.length < -100) resetBeam(beam, index, total)
      }
      paint()
    }

    const loop = (now) => {
      animationFrameRef.current = requestAnimationFrame(loop)
      if (now - last < minDelta) return
      last = now
      step()
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      animationFrameRef.current = requestAnimationFrame(loop)
    }

    const stop = () => {
      running = false
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = 0
    }

    sizeCanvas()

    // Atur mulai/berhenti: hanya saat terlihat, tab aktif, dan gerak diizinkan.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start()
        else stop()
      },
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => {
      if (document.hidden) stop()
      else if (reduceMotion) return
      else {
        const r = canvas.getBoundingClientRect()
        if (r.bottom > 0 && r.top < window.innerHeight) start()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(() => sizeCanvas())
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    window.addEventListener('resize', sizeCanvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', sizeCanvas)
    }
  }, [intensity, hue, spread, count, speed, cssBlur])

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ filter: cssBlur > 0 ? `blur(${cssBlur}px)` : 'none' }}
      />

      {veilBlur > 0 ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          animate={{ opacity: [0.05, 0.15, 0.05] }}
          transition={{
            duration: 10,
            ease: 'easeInOut',
            repeat: Number.POSITIVE_INFINITY,
          }}
          style={{ backdropFilter: `blur(${veilBlur}px)` }}
        />
      ) : null}

      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  )
}

export default BeamsBackground
