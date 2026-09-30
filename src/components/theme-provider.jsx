import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const STORAGE_KEY = 'ikn-swot-theme'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
})

function getStoredTheme() {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch {
    return null
  }
}

/**
 * Nilai awal diturunkan langsung dari DOM (yang sudah diatur script anti-flash
 * di <head>), lalu fallback ke localStorage, preferensi sistem, lalu 'light'.
 * Dibaca saat render sehingga tidak perlu setState di dalam effect.
 */
function getInitialTheme() {
  if (typeof document === 'undefined') return 'light'
  if (document.documentElement.classList.contains('dark')) return 'dark'

  const stored = getStoredTheme()
  if (stored) return stored

  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }
  return 'light'
}

function applyTheme(theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)

  // Sinkronkan class di <html> setiap kali tema berubah.
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const setTheme = useCallback((next) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* localStorage bisa diblokir; abaikan */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* abaikan */
      }
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}

export { STORAGE_KEY }
