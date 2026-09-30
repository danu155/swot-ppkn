import { EditorialHeading } from '@/components/EditorialHeading'
import { cn } from '@/lib/utils'

/**
 * Pembungkus bagian dengan ritme vertikal konsisten dan scroll-margin untuk
 * anchor. Semua section memakai ini agar irama halaman terasa satu naskah.
 */
export function Section({ id, className, children, ...props }) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-20 sm:py-24 lg:py-32', className)}
      {...props}
    >
      {children}
    </section>
  )
}

/**
 * Shorthand judul bagian. Mendelegasikan ke EditorialHeading agar bila gaya
 * heading berubah, seluruh halaman ikut berubah dari satu tempat.
 */
export function SectionHeading({ eyebrow, judul, deskripsi, className, bab, align }) {
  return (
    <EditorialHeading
      bab={bab}
      eyebrow={eyebrow}
      judul={judul}
      deskripsi={deskripsi}
      className={className}
      align={align}
    />
  )
}

export default Section
