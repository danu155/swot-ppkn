import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'
      }
      title={isDark ? 'Mode terang' : 'Mode gelap'}
      className="relative"
    >
      <Sun
        className="size-4 scale-100 rotate-0 transition-transform duration-200 dark:scale-0 dark:-rotate-90"
        aria-hidden="true"
      />
      <Moon
        className="absolute size-4 scale-0 rotate-90 transition-transform duration-200 dark:scale-100 dark:rotate-0"
        aria-hidden="true"
      />
      <span className="sr-only">Ganti tema</span>
    </Button>
  )
}
