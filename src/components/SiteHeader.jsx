import { useEffect, useState } from 'react'

import Logomark from '@/components/Logomark'
import ScrollProgress from '@/components/ScrollProgress'
import { Button } from '@/components/ui/button'
import { meta } from '@/data'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '#latar-belakang', label: 'Latar Belakang', nomor: '01' },
  { href: '#swot', label: 'SWOT', nomor: '02' },
  { href: '#timeline', label: 'Timeline', nomor: '03' },
  { href: '#diskusi', label: 'Diskusi', nomor: '04' },
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
        'sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300',
        scrolled
          ? 'bg-background/80 supports-[backdrop-filter]:bg-background/65 border-border shadow-[0_8px_30px_-24px_color-mix(in_oklab,var(--foreground)_45%,transparent)] backdrop-blur-md'
          : 'border-transparent bg-transparent',
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
            <span className="label-mono text-muted-foreground mt-0.5">
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
                  aria-label={item.label}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted group inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-sm transition-colors sm:px-3"
                >
                  <span className="label-mono text-muted-foreground group-hover:text-accent-ikn transition-colors">
                    {item.nomor}
                  </span>
                  <span className="hidden md:inline">{item.label}</span>
                </a>
              </li>
            ))}
            <li className="ml-1 hidden sm:block">
              <Button asChild size="sm" className="rounded-full">
                <a href="#swot">{meta.tombolMulai}</a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <ScrollProgress />
    </div>
  )
}
