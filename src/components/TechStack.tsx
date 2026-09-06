import { Code2, Database, Server, Layers, type LucideProps } from 'lucide-react'
import type { StackCategory } from '../types'

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  code2: Code2,
  database: Database,
  server: Server,
  layers: Layers,
}

interface Props {
  stack: StackCategory[]
}

export function TechStack({ stack }: Props) {
  return (
    <section className="py-10" aria-label="Technologies">
      <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-3)] mb-5">
        Stack
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-xl overflow-hidden">
        {stack.map(cat => {
          const Icon = ICON_MAP[cat.icon] ?? Code2
          return (
            <div
              key={cat.category}
              className="bg-[var(--bg)] hover:bg-[var(--bg-subtle)] transition-colors p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-6 h-6 rounded-[6px] flex items-center justify-center shrink-0"
                  style={{ color: cat.accent, background: `${cat.accent}18` }}
                >
                  <Icon size={14} />
                </span>
                <span className="text-xs font-semibold text-[var(--text-1)]">
                  {cat.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.items.map(item => (
                  <span
                    key={item}
                    className="font-mono text-[11px] px-[7px] py-[2px] rounded bg-[var(--surface)] text-[var(--text-2)] border border-[var(--border)] whitespace-nowrap"
                    style={{ borderColor: `${cat.accent}30` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
