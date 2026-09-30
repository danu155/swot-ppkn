import { meta } from '@/data'

export default function Footer() {
  const { judulSumber, catatanSumber, sumber, kredit } = meta.footer

  return (
    <footer className="border-t py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold">{judulSumber}</h2>
            <p className="text-muted-foreground mt-2 text-sm text-pretty">
              {catatanSumber}
            </p>
          </div>

          <ul className="space-y-2 sm:justify-self-end">
            {sumber.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 transition-colors hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-border text-muted-foreground mt-10 border-t pt-6 text-sm">
          <p className="text-pretty">{kredit}</p>
        </div>
      </div>
    </footer>
  )
}
