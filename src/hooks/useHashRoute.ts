import { useState, useEffect } from 'react'

export function useHashRoute() {
  const getSlug = () => {
    const hash = window.location.hash
    const match = hash.match(/^#\/projects\/(.+)$/)
    return match ? match[1] : null
  }

  const [activeSlug, setActiveSlug] = useState<string | null>(getSlug)

  useEffect(() => {
    const handler = () => setActiveSlug(getSlug())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const openProject = (slug: string) => {
    window.location.hash = `/projects/${slug}`
  }

  const closeProject = () => {
    history.pushState(null, '', window.location.pathname + window.location.search)
    setActiveSlug(null)
  }

  return { activeSlug, openProject, closeProject }
}
