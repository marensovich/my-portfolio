import { useState, useEffect } from 'react'
import type { Project, ProjectConfig } from '../types'

function resolveGallery(config: ProjectConfig, basePath: string): string[] {
  if (!config.gallery) return []
  if (config.gallery === 'auto') {
    return (config.mainPhotos ?? []).map((_, i) => `${basePath}/gallery/extra-${i + 1}.jpg`)
  }
  return (config.gallery as string[]).map(f => `${basePath}/${f}`)
}

export function useProjects(): Project[] {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    async function load() {
      const base = import.meta.env.BASE_URL
      const slugs: string[] = await fetch(`${base}content/projects.json`).then(r => r.json())

      const results = await Promise.all(
        slugs.map(async slug => {
          try {
            const config: ProjectConfig = await fetch(`${base}content/projects/${slug}/config.json`).then(r => r.json())
            if (!config.published) return null
            const basePath = `${base}content/projects/${slug}`
            return {
              ...config,
              slug: config.slug || slug,
              basePath,
              mainPhotos: config.mainPhotos ?? [],
              galleryImages: resolveGallery(config, basePath),
            } as Project
          } catch {
            return null
          }
        })
      )

      setProjects(
        results
          .filter((p): p is Project => p !== null)
          .sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) return a.order - b.order
            if (a.order !== undefined) return -1
            if (b.order !== undefined) return 1
            return b.year - a.year
          })
      )
    }

    load()
  }, [])

  return projects
}
