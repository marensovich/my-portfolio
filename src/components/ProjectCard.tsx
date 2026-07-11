import { useState } from 'react'
import type { Project } from '../types'

interface Props {
  project: Project
  index: number
  onClick: () => void
}

const CATEGORY_INITIALS: Record<string, string> = {
  'Minecraft': 'MC',
  'Боты': 'BOT',
  'Java': 'JV',
  'Python': 'PY',
  'Frontend': 'FE',
  'Web': 'WEB',
  'Go': 'GO',
}

export function ProjectCard({ project, index, onClick }: Props) {
  const [thumbError, setThumbError] = useState(false)
  const coverSrc = project.cover ? `${project.basePath}/${project.cover}` : null
  const initial = CATEGORY_INITIALS[project.category] ?? project.category.slice(0, 2).toUpperCase()

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
  }

  const descSnippet = project.description
    ? project.description.replace(/\n+/g, ' ').trim()
    : ''

  return (
    <div
      className="bg-[var(--bg)] p-6 flex flex-col gap-3 min-h-[180px] cursor-pointer hover:bg-[var(--bg-subtle)] active:bg-[var(--surface)] transition-colors card-enter focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[-2px]"
      role="button"
      tabIndex={0}
      aria-label={`Открыть проект: ${project.title}`}
      onClick={onClick}
      onKeyDown={handleKey}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        {coverSrc && !thumbError ? (
          <img
            src={coverSrc}
            alt=""
            className="w-14 h-14 rounded-xl object-contain bg-[var(--surface)] border border-[var(--border)] shrink-0"
            loading="lazy"
            onError={() => setThumbError(true)}
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-[var(--surface)] border border-[var(--border)] shrink-0 flex items-center justify-center font-mono text-sm font-semibold text-[var(--text-3)] select-none">
            {initial}
          </div>
        )}
        <span className="text-xs text-[var(--text-3)] shrink-0 mt-0.5">
          {project.year}
        </span>
      </div>

      <div className="flex flex-col gap-1.5 flex-1">
        <div className="text-[15px] font-semibold text-[var(--text-1)] tracking-tight leading-snug">
          {project.title}
        </div>
        <div className="text-xs text-[var(--text-3)]">
          {project.category}
        </div>
        {descSnippet && (
          <div className="text-[13px] text-[var(--text-2)] leading-[1.55] line-clamp-2">
            {descSnippet}
          </div>
        )}
      </div>

      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-auto pt-1">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-[2px] rounded text-[11px] font-mono font-medium text-[var(--text-2)] bg-[var(--surface)] border border-[var(--border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
