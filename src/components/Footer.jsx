import { ArrowUp } from 'lucide-react'

import Logomark from '@/components/Logomark'
import { Rule } from '@/components/Rule'
import { meta } from '@/data'

export default function Footer() {
  const { judulSumber, catatanSumber, sumber, kredit } = meta.footer

  return (
    <footer className="paper-grain relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Kolom kiri: identitas + catatan sumber */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <Logomark animated={false} className="text-primary size-8" />
              <div className="leading-none">
                <p className="text-sm font-semibold tracking-tight">SWOT IKN</p>
                <p className="label-mono text-muted-foreground/70 mt-1">
                  Nusantara · Kalimantan Timur
                </p>
              </div>
            </div>

            <h2 className="label-mono text-muted-foreground mt-10">
              {judulSumber}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg text-sm leading-relaxed text-pretty">
              {catatanSumber}
            </p>
          </div>

          {/* Kolom kanan: daftar sumber & kembali ke atas */}
          <div className="lg:col-span-5">
            <h2 className="label-mono text-muted-foreground">Sumber</h2>
            <ul className="mt-4 divide-y">
              {sumber.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground group flex items-center justify-between gap-4 py-3 text-sm transition-colors"
                  >
                    <span className="text-pretty">{s.label}</span>
                    <ArrowUp
                      className="size-4 shrink-0 rotate-45 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Wordmark besar sebagai penutup editorial */}
        <div aria-hidden="true" className="mt-16 lg:mt-24">
          <span className="text-foreground/[0.06] block text-center text-[15vw] leading-[0.8] font-semibold tracking-tighter select-none sm:text-[13vw]">
            NUSANTARA
          </span>
        </div>

        <Rule className="mt-8" />

        <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm text-pretty">{kredit}</p>
          <a
            href="#beranda"
            className="text-muted-foreground hover:text-foreground group inline-flex shrink-0 items-center gap-2 text-sm transition-colors"
          >
            Kembali ke atas
            <ArrowUp
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
