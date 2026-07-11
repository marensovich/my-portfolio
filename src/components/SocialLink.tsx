import { Globe, Mail } from 'lucide-react'
import { SiGithub, SiTelegram, SiInstagram, SiDiscord, SiX, SiVk, SiYoutube } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import type { SocialLink as SocialLinkType } from '../types'

const BRAND_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  github: SiGithub,
  telegram: SiTelegram,
  instagram: SiInstagram,
  discord: SiDiscord,
  linkedin: FaLinkedin,
  twitter: SiX,
  x: SiX,
  vk: SiVk,
  youtube: SiYoutube,
}

const GENERIC_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  mail: Mail,
  website: Globe,
  behance: Globe,
  dribbble: Globe,
  whatsapp: Globe,
}

interface Props {
  link: SocialLinkType
}

export function SocialLink({ link }: Props) {
  const key = link.icon.toLowerCase()
  const BrandIcon = BRAND_ICONS[key]
  const GenericIcon = GENERIC_ICONS[key] ?? Globe

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--border)] text-[var(--text-2)] text-sm font-medium no-underline hover:text-[var(--text-1)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2"
      aria-label={link.label}
    >
      {BrandIcon ? <BrandIcon size={14} /> : <GenericIcon size={14} />}
      {link.label}
    </a>
  )
}
