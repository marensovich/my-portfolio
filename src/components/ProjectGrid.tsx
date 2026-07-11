import { useState, useMemo } from 'react'
import { FilterBar } from './FilterBar'
import { ProjectCard } from './ProjectCard'
import type { Project } from '../types'

interface Props {
  projects: Project[]
  onSelect: (slug: string) => void
}

export function ProjectGrid({ projects, onSelect }: Props) {
  const [activeCategory, setActiveCategory] = useState('Все')

  const categories = useMemo(
    () => [...new Set(projects.map(p => p.category))],
    [projects]
  )

  const filtered = useMemo(
    () => activeCategory === 'Все' ? projects : projects.filter(p => p.category === activeCategory),
    [projects, activeCategory]
  )

  return (
    <section aria-label="Проекты">
      <FilterBar categories={categories} active={activeCategory} onChange={setActiveCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden mb-20">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center py-16 text-[var(--text-3)] text-sm bg-[var(--bg)]">
            Нет проектов в этой категории
          </p>
        ) : (
          filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              onClick={() => onSelect(project.slug)}
            />
          ))
        )}
      </div>
    </section>
  )
}
