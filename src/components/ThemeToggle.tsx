import { Sun, Moon } from 'lucide-react'
import type { Theme } from '../hooks/useTheme'

interface Props {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      className="fixed top-5 right-5 z-50 w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}
