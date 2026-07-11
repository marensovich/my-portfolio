interface Props {
  categories: string[]
  active: string
  onChange: (cat: string) => void
  sortYear: 'desc' | 'asc'
  onSortYear: () => void
}

export function FilterBar({ categories, active, onChange, sortYear, onSortYear }: Props) {
  const btnBase = 'px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2'
  const btnInactive = 'bg-transparent text-[var(--text-2)] border-transparent hover:bg-[var(--surface)] hover:text-[var(--text-1)] hover:border-[var(--border)]'
  const btnActive = 'bg-[var(--text-1)] text-[var(--bg)] border-[var(--text-1)]'

  return (
    <div className="pt-8 pb-5 flex items-center justify-between gap-4">
      <div className="flex flex-wrap gap-1">
        {['Все', ...categories].map(cat => (
          <button
            key={cat}
            className={`${btnBase} ${active === cat ? btnActive : btnInactive}`}
            onClick={() => onChange(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      <button
        className={`${btnBase} ${btnInactive} shrink-0 flex items-center gap-1.5`}
        onClick={onSortYear}
        title={sortYear === 'desc' ? 'Сначала старые' : 'Сначала новые'}
      >
        {sortYear === 'desc' ? '↓' : '↑'} Год
      </button>
    </div>
  )
}
