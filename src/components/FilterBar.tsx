interface Props {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export function FilterBar({ categories, active, onChange }: Props) {
  if (categories.length <= 1) return null

  return (
    <div className="pt-8 pb-5">
      <div className="flex flex-wrap gap-1">
        {['Все', ...categories].map(cat => (
          <button
            key={cat}
            className={`px-3.5 py-1.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2 ${
              active === cat
                ? 'bg-[var(--text-1)] text-[var(--bg)] border-[var(--text-1)]'
                : 'bg-transparent text-[var(--text-2)] border-transparent hover:bg-[var(--surface)] hover:text-[var(--text-1)] hover:border-[var(--border)]'
            }`}
            onClick={() => onChange(cat)}
            aria-pressed={active === cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
