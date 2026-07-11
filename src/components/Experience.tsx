import type { ExperienceEntry } from '../types'

interface Props {
  entries: ExperienceEntry[]
}

export function Experience({ entries }: Props) {
  if (!entries.length) return null

  return (
    <section className="py-10" aria-label="Опыт">
      <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-3)] mb-6">
        Опыт
      </p>
      <div className="flex flex-col">
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-5 pb-8 last:pb-0 relative">
            {/* Timeline line */}
            {i < entries.length - 1 && (
              <div className="absolute left-[7px] top-4 bottom-0 w-px bg-[var(--border)]" />
            )}

            {/* Dot */}
            <div className="w-[15px] h-[15px] rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shrink-0 mt-[3px] z-10" />

            {/* Content */}
            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <span className="text-[15px] font-semibold text-[var(--text-1)] leading-tight">
                  {entry.title}
                </span>
                <span className="text-xs font-mono text-[var(--text-3)] shrink-0">
                  {entry.from} — {entry.to ?? 'н.в.'}
                </span>
              </div>

              <span className="text-sm text-[var(--accent)]">
                {entry.place}
              </span>

              {entry.description && (
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed m-0">
                  {entry.description}
                </p>
              )}

              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {entry.tags.map(tag => (
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
          </div>
        ))}
      </div>
    </section>
  )
}
