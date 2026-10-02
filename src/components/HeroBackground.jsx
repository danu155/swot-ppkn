import ibukotaJpg from '../../images/ibukota.jpg'
import ibukotaWebp from '../../images/ibukota.webp'
import { cn } from '@/lib/utils'

/**
 * Latar hero full-bleed memakai foto IKN milik pengguna (images/ibukota.*).
 *
 * - WebP sebagai sumber utama, JPEG sebagai fallback (via <picture>).
 * - object-cover + object-position sedikit ke bawah agar istana dan kawasan
 *   hijau tetap masuk bidikan pada layar lebar; di layar sempit sisi kiri-
 *   kanan yang ter-crop, bukan bagian atas-bawah.
 * - `fetchPriority="high"` karena ini gambar LCP.
 * - Sengaja tanpa animasi (latar statis).
 * - Foto tampil di belakang teks; keterbacaan dijamin scrim gradien di
 *   Hero.jsx (bukan overlay merata yang menutupi seluruh foto).
 */
export default function HeroBackground({ className }) {
  return (
    <picture>
      <source srcSet={ibukotaWebp} type="image/webp" />
      <img
        src={ibukotaJpg}
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchPriority="high"
        className={cn(
          'h-full w-full object-cover object-[50%_58%]',
          className,
        )}
      />
    </picture>
  )
}
