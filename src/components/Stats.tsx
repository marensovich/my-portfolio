import type { StatItem } from '../types'

interface Props {
  stats: StatItem[]
}

export function Stats({ stats }: Props) {
  return (
    <div className="grid gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden"
      style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
    >
      {stats.map(s => (
        <div key={s.label} className="bg-[var(--bg)] px-4 py-5 flex flex-col gap-1">
          <span className="text-2xl font-bold text-[var(--text-1)] font-mono leading-none">
            {s.value}
          </span>
          <span className="text-xs text-[var(--text-3)] leading-tight">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}
