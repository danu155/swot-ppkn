import { useEffect, useRef, useState } from 'react'

import { useInView, useMotionValue, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

function bacaReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Angka yang dihitung naik dengan pegas (spring) ala CountUp reactbits.dev.
 * Nilai num diambil dari data (bagian angkanya saja); awalan seperti ">" dan
 * akhiran seperti "%" ditampilkan terpisah agar tetap terbaca persis.
 */
function NilaiSpring({ num, mulai }) {
  const mv = useMotionValue(0)
  const spring = useSpring(mv, { damping: 26, stiffness: 90 })
  const [tampil, setTampil] = useState(0)

  useEffect(() => {
    if (mulai) mv.set(num)
  }, [mulai, num, mv])

  useEffect(() => {
    const unsub = spring.on('change', (v) => setTampil(Math.round(v)))
    return () => unsub()
  }, [spring])

  return <>{tampil.toLocaleString('id-ID')}</>
}

/**
 * Satu angka sorotan: awalan redup + angka (spring) + akhiran beraksen.
 * Tahun besar (mis. 2045) ditampilkan statis; angka kecil dianimasikan.
 */
function StatNilai({ nilai, aktif }) {
  const cocok = String(nilai).match(/^([^0-9]*)(\d+)(.*)$/)
  if (!cocok) return <>{nilai}</>

  const [, awal, angkaStr, akhir] = cocok
  const num = Number(angkaStr)
  const animatable = num < 1000

  return (
    <>
      {awal ? (
        <span className="text-muted-foreground font-normal">{awal}</span>
      ) : null}
      {animatable && !bacaReducedMotion() ? (
        <NilaiSpring num={num} mulai={aktif} />
      ) : (
        angkaStr
      )}
      {akhir ? <span className="text-accent-ikn">{akhir}</span> : null}
    </>
  )
}

/**
 * Pita angka kunci: tiga kolom berjajar yang dipisah SEKAT vertikal tipis
 * (garis halus), tampil langsung di atas latar halaman — bukan kotak. Dengan
 * begitu ia terbaca sebagai "pita data" yang ringan, berbeda jenis dari kartu
 * alasan yang putih & terangkat, sehingga keduanya tidak terlihat bentrok.
 */
export default function StatChips({ items, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  if (!items?.length) return null

  return (
    <dl
      ref={ref}
      className={cn(
        'divide-border grid gap-y-10 sm:grid-cols-3 sm:divide-x sm:gap-y-0',
        className,
      )}
    >
      {items.map((stat, i) => (
        <div
          key={stat.label}
          style={{ transitionDelay: `${i * 120}ms` }}
          className={cn(
            'transition-[opacity,transform] duration-700 ease-out sm:px-8',
            i === 0 && 'sm:pl-0',
            i === items.length - 1 && 'sm:pr-0',
            inView
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100',
          )}
        >
          <dt className="font-display text-4xl leading-none font-semibold tracking-tight tabular-nums">
            <StatNilai nilai={stat.nilai} aktif={inView} />
          </dt>
          <dd className="text-muted-foreground mt-3 max-w-[20ch] text-sm leading-snug text-pretty">
            {stat.label}
          </dd>
        </div>
      ))}
    </dl>
  )
}
