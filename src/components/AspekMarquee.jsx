import Marquee from '@/components/Marquee'
import { swot } from '@/data'

/**
 * Pita bergulir berisi empat aspek SWOT (nama + label Indonesia), dipakai
 * sebagai pemisah antar-section. Isinya diturunkan dari array `swot` di data.js.
 */
export default function AspekMarquee() {
  const items = swot.map((s) => `${s.kategori} · ${s.label}`)

  return (
    <div className="bg-muted/40">
      <Marquee items={items} />
    </div>
  )
}
