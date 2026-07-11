export interface SocialLink {
  label: string
  icon: string
  url: string
}

export interface StackCategory {
  category: string
  icon: string
  accent: string
  items: string[]
}

export interface StatItem {
  value: string
  label: string
}

export interface ExperienceEntry {
  title: string
  place: string
  from: string
  to?: string
  description?: string
  tags?: string[]
}

export interface SiteConfig {
  person: {
    name: string
    role: string
    bio: string
    avatar: string
  }
  links: SocialLink[]
  about?: string[]
  stats?: StatItem[]
  experience?: ExperienceEntry[]
  stack?: StackCategory[]
  seo: {
    title: string
    description: string
    ogImage: string
  }
}

export interface ThemeConfig {
  theme: {
    accent: string
    gradient: string[]
    glassOpacity: number
    darkModeDefault: boolean
  }
}

export interface ProjectConfig {
  title: string
  slug: string
  year: number
  category: string
  tags: string[]
  description: string
  cover?: string
  mainPhotos?: string[]
  gallery?: 'auto' | string[]
  externalLink?: string
  githubLink?: string
  published: boolean
  order?: number
}

export interface Project extends ProjectConfig {
  basePath: string
  galleryImages: string[]
}
