import Reveal from '@/components/Reveal'
import { cn } from '@/lib/utils'

export function Section({ id, className, children, ...props }) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-20 py-16 sm:py-20 lg:py-24', className)}
      {...props}
    >
      {children}
    </section>
  )
}

export function SectionHeading({ eyebrow, judul, deskripsi, className }) {
  return (
    <Reveal className={cn('mx-auto max-w-2xl text-center', className)}>
      {eyebrow ? (
        <p className="text-primary mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl lg:text-4xl">
        {judul}
      </h2>
      {deskripsi ? (
        <p className="text-muted-foreground mt-4 text-pretty sm:text-lg">
          {deskripsi}
        </p>
      ) : null}
    </Reveal>
  )
}
