import { SocialLink } from './SocialLink'
import type { SiteConfig } from '../types'

interface Props {
  config: SiteConfig
}

export function Hero({ config }: Props) {
  const { person, links } = config
  const initials = person.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)

  return (
    <section className="pt-16 pb-12 sm:pt-[72px] sm:pb-14 flex flex-col gap-5" aria-label="About me">
      <div className="flex items-center gap-5">
        {person.avatar ? (
          <img
            src={`${import.meta.env.BASE_URL}${person.avatar.replace(/^\//, '')}`}
            alt={`Avatar of ${person.name}`}
            className="w-24 h-24 rounded-full object-cover border border-[var(--border)] shrink-0"
          />
        ) : (
          <div
            className="w-24 h-24 rounded-full border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-2xl font-semibold font-mono text-[var(--text-2)] shrink-0"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight text-[var(--text-1)] leading-tight m-0">
            {person.name}
          </h1>
          <p className="text-[15px] text-[var(--text-2)] mt-1 m-0">
            {person.role}
          </p>
        </div>
      </div>

      {person.bio && (
        <p className="text-sm text-[var(--text-2)] leading-[1.7] max-w-[540px] whitespace-pre-line m-0">
          {person.bio}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        {links.map(link => (
          <SocialLink key={link.label} link={link} />
        ))}
      </div>
    </section>
  )
}
