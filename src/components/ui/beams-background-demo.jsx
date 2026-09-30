import { BeamsBackground } from '@/components/ui/beams-background'

/**
 * Demo penggunaan BeamsBackground.
 * Berkas referensi — tidak dipasang di halaman utama.
 */
export function BeamsBackgroundDemo() {
  return (
    <BeamsBackground className="min-h-[28rem] rounded-xl" intensity="medium">
      <div className="flex min-h-[28rem] items-center justify-center p-8 text-center">
        <div className="space-y-3">
          <h2 className="text-4xl font-semibold tracking-tight text-balance md:text-5xl">
            Beams
            <br />
            Background
          </h2>
          <p className="text-muted-foreground text-lg">For your pleasure</p>
        </div>
      </div>
    </BeamsBackground>
  )
}

export default BeamsBackgroundDemo
