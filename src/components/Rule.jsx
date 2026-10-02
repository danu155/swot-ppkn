import { cn } from '@/lib/utils'

/**
 * Garis pemisah editorial (hairline). Dua varian:
 *  - "full"  → garis tipis penuh dengan gradien memudar di ujung.
 *  - "label" → garis dengan label mono di tengah, seperti kepala bab laporan.
 */
export function Rule({ label, className }) {
  if (!label) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'via-border h-px w-full bg-gradient-to-r from-transparent to-transparent',
          className,
        )}
      />
    )
  }

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span aria-hidden="true" className="bg-border h-px flex-1" />
      <span className="label-mono text-muted-foreground shrink-0">{label}</span>
      <span aria-hidden="true" className="bg-border h-px flex-1" />
    </div>
  )
}

export default Rule
