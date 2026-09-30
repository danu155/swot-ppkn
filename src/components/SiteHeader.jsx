import { useEffect, useState } from 'react'

import Logomark from '@/components/Logomark'
import ScrollProgress from '@/components/ScrollProgress'
import ThemeToggle from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { meta } from '@/data'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#latar-belakang', label: 'Latar Belakang', nomor: '01' },
  { href: '#swot', label: 'SWOT', nomor: '02' },
  { href: '#timeline', label: 'Timeline', nomor: '03' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'sticky top-0 z-40 border-b transition-colors duration-300',
        scrolled
          ? 'bg-background/80 supports-[backdrop-filter]:bg-background/65 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-10">
        <a
          href="#beranda"
          className="group flex items-center gap-2.5 whitespace-nowrap"
        >
          <Logomark animated={false} className="text-primary size-7" />
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">
              SWOT IKN
            </span>
            <span className="label-mono text-muted-foreground/70 mt-0.5">
              Berkas Analisis
            </span>
          </span>
        </a>

        <nav aria-label="Navigasi bagian">
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground group hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors sm:inline-flex"
                >
                  <span className="label-mono text-muted-foreground/50 group-hover:text-accent-ikn transition-colors">
                    {item.nomor}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="ml-1">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="hidden rounded-full sm:inline-flex"
              >
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
