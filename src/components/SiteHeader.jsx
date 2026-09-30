import ScrollProgress from '@/components/ScrollProgress'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { meta } from '@/data'

const navItems = [
  { href: '#latar-belakang', label: 'Latar Belakang' },
  { href: '#swot', label: 'SWOT' },
  { href: '#timeline', label: 'Timeline' },
]

export default function SiteHeader() {
  return (
    <div className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <a
          href="#beranda"
          className="text-sm font-semibold tracking-tight whitespace-nowrap"
        >
          SWOT IKN
        </a>

        <nav aria-label="Navigasi bagian">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground hidden rounded-md px-2 py-1 text-sm transition-colors sm:inline-block"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Button asChild size="sm" variant="outline" className="hidden sm:inline-flex">
                <a href="#swot">{meta.tombolMulai}</a>
              </Button>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>

      <ScrollProgress />
    </div>
  )
}
