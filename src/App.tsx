import { AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './components/ThemeToggle'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { About } from './components/About'
import { TechStack } from './components/TechStack'
import { Experience } from './components/Experience'
import { ProjectGrid } from './components/ProjectGrid'
import { ProjectModal } from './components/ProjectModal'
import { useSiteConfig, useThemeConfig } from './hooks/useSiteConfig'
import { useProjects } from './hooks/useProjects'
import { useTheme } from './hooks/useTheme'
import { useHashRoute } from './hooks/useHashRoute'

function App() {
  const themeConfig = useThemeConfig()
  const [theme, toggleTheme] = useTheme(themeConfig.darkModeDefault)
  const siteConfig = useSiteConfig()
  const projects = useProjects()
  const { activeSlug, openProject, closeProject } = useHashRoute()

  const activeProject = activeSlug ? projects.find(p => p.slug === activeSlug) : null

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      <div className="max-w-[960px] mx-auto px-4 sm:px-6">
        <main>
          {siteConfig && <Hero config={siteConfig} />}
          {siteConfig?.stats && <Stats stats={siteConfig.stats} />}
          <div className="h-px bg-[var(--border)] mt-10" />
          {siteConfig?.about && <About paragraphs={siteConfig.about} />}
          {siteConfig?.about && <div className="h-px bg-[var(--border)]" />}
          {siteConfig?.stack && <TechStack stack={siteConfig.stack} />}
          <div className="h-px bg-[var(--border)]" />
          {siteConfig?.experience && <Experience entries={siteConfig.experience} />}
          {siteConfig?.experience && <div className="h-px bg-[var(--border)]" />}
          <ProjectGrid projects={projects} onSelect={openProject} />
        </main>
      </div>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            key={activeProject.slug}
            project={activeProject}
            onClose={closeProject}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
