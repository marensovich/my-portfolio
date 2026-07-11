interface Props {
  paragraphs: string[]
}

export function About({ paragraphs }: Props) {
  if (!paragraphs.length) return null

  return (
    <section className="py-10" aria-label="Обо мне">
      <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-3)] mb-5">
        Обо мне
      </p>
      <div className="flex flex-col gap-4 max-w-[640px]">
        {paragraphs.map((text, i) => (
          <p key={i} className="text-[15px] text-[var(--text-2)] leading-[1.75] m-0">
            {text}
          </p>
        ))}
      </div>
    </section>
  )
}
