import { useState, useEffect } from 'react'
import type { SiteConfig, ThemeConfig } from '../types'

const DEFAULT_THEME: ThemeConfig['theme'] = {
  accent: '#0A84FF',
  gradient: ['#FF6B9D', '#845EF7', '#22D3EE'],
  glassOpacity: 0.08,
  darkModeDefault: true,
}

export function useSiteConfig(): SiteConfig | null {
  const [config, setConfig] = useState<SiteConfig | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/site.json`)
      .then(r => r.json())
      .then(setConfig)
      .catch(e => console.error('Failed to load site.json', e))
  }, [])

  return config
}

export function useThemeConfig(): ThemeConfig['theme'] {
  const [theme, setTheme] = useState<ThemeConfig['theme']>(DEFAULT_THEME)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}content/theme.json`)
      .then(r => r.json())
      .then((data: ThemeConfig) => setTheme(data.theme))
      .catch(() => {})
  }, [])

  return theme
}
