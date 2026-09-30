import Reveal from '@/components/Reveal'
import { cn } from '@/lib/utils'

/**
 * Judul bagian bergaya editorial.
 *
 * Berbeda dari judul "template" yang selalu di tengah, heading ini rata kiri
 * dengan nomor bab gaya mono, judul serif besar, dan deskripsi pendukung — pola
 * yang lazim pada laporan tahunan/majalah. Dipakai konsisten oleh semua section.
 */
export function EditorialHeading({
  bab,
  eyebrow,
  judul,
  deskripsi,
  className,
  align = 'left',
}) {
  const center = align === 'center'

  return (
    <Reveal
      className={cn(
        'flex flex-col',
        center ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-3',
          center && 'justify-center',
        )}
      >
        {bab ? (
          <span className="label-mono text-accent-ikn tabular-nums">{bab}</span>
        ) : null}
        {bab && eyebrow ? (
          <span aria-hidden="true" className="bg-accent-ikn/40 h-px w-6" />
        ) : null}
        {eyebrow ? (
          <span className="label-mono text-muted-foreground">{eyebrow}</span>
        ) : null}
      </div>

      <h2
        className={cn(
          'mt-5 max-w-3xl text-3xl leading-[1.05] tracking-tight text-balance sm:text-4xl lg:text-[2.9rem]',
          center && 'mx-auto',
        )}
      >
        {judul}
      </h2>

      {deskripsi ? (
        <p
          className={cn(
            'text-muted-foreground mt-5 max-w-xl text-base text-pretty sm:text-lg',
            center && 'mx-auto',
          )}
        >
          {deskripsi}
        </p>
      ) : null}
    </Reveal>
  )
}

export default EditorialHeading
