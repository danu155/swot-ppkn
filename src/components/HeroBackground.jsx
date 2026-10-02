import maxresJpg from '../../images/maxresdefault.jpg'
import maxresWebp from '../../images/maxresdefault.webp'
import { cn } from '@/lib/utils'

/**
 * Latar hero full-bleed (images/maxresdefault.* — panorama IKN 1280×720).
 *
 * - WebP sebagai sumber utama, JPEG sebagai fallback (via <picture>).
 * - object-cover + object-position: pusat horizontal, sedikit di bawah tengah
 *   vertikal (58%) — memotong sebagian kecil langit + tepi bawah gelap agar
 *   langit, gedung, dan hutan tetap seimbang di bidikan.
 * - `fetchPriority="high"` karena ini gambar LCP.
 * - Sengaja tanpa animasi (latar statis).
 * - Foto tampil di belakang teks; keterbacaan dijamin scrim gradien di
 *   Hero.jsx (bukan overlay merata yang menutupi seluruh foto).
 */
export default function HeroBackground({ className }) {
  return (
    <picture>
      <source srcSet={maxresWebp} type="image/webp" />
      <img
        src={maxresJpg}
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
