import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp, ExternalLink, ImageIcon } from 'lucide-react'
import { SiGithub } from 'react-icons/si'
import { Lightbox } from './Lightbox'
import { getPlaceholderGradient } from '../utils/imageUtils'
import type { Project } from '../types'

interface Props {
  project: Project
  onClose: () => void
}

function PlaceholderPhoto({ gradient }: { gradient: string }) {
  return (
    <div
      className="w-full aspect-video flex items-center justify-center text-[var(--text-3)]"
      style={{ background: gradient }}
      aria-hidden="true"
    >
      <ImageIcon size={32} style={{ opacity: 0.2 }} />
    </div>
  )
}

export function ProjectModal({ project, onClose }: Props) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [photoErrors, setPhotoErrors] = useState<Record<string, boolean>>({})
  const closeRef = useRef<HTMLButtonElement>(null)

  const mainSrcs = (project.mainPhotos ?? []).map(p => `${project.basePath}/${p}`)
  const allLightboxImages = [...mainSrcs, ...project.galleryImages]

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const imgErr = (key: string) => setPhotoErrors(p => ({ ...p, [key]: true }))

  const mainGradients = (project.mainPhotos ?? []).map((_, i) =>
    getPlaceholderGradient(project.slug, i)
  )
  const galleryGradients = project.galleryImages.map((_, i) =>
    getPlaceholderGradient(project.slug, i + 10)
  )

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[4px] sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full sm:max-w-[780px] max-h-[92dvh] rounded-t-[20px] sm:rounded-[20px] overflow-y-auto overflow-x-hidden overscroll-contain bg-[var(--bg)] border border-b-0 sm:border-b border-[var(--border)] shadow-2xl modal-scroll"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-[var(--bg)] border-b border-[var(--border)]">
              <span className="text-[13px] text-[var(--text-3)] font-medium">
                {project.category}
              </span>
              <button
                ref={closeRef}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors cursor-pointer"
                onClick={onClose}
                aria-label="Закрыть проект"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-6 p-6 sm:p-7 pb-10 sm:pb-12">
              {/* Title & Meta */}
              <div className="flex flex-col gap-3">
                <h2
                  id="modal-title"
                  className="text-xl sm:text-2xl font-bold text-[var(--text-1)] tracking-tight leading-tight m-0"
                >
                  {project.title}
                </h2>
                <div className="flex items-center flex-wrap gap-2.5 text-[13px] text-[var(--text-2)]">
                  <span className="font-medium">{project.year}</span>
                  <span className="px-2.5 py-[2px] rounded bg-[var(--surface)] border border-[var(--border)] text-xs font-medium text-[var(--text-1)]">
                    {project.category}
                  </span>
                </div>
                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
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

              {/* Description */}
              <div className="text-sm text-[var(--text-2)] leading-[1.75] p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] whitespace-pre-line">
                {project.description}
              </div>

              {/* Main Photos */}
              {mainSrcs.length > 0 && (
                <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden border border-[var(--border)]">
                  {mainSrcs.map((src, i) => (
                    <div
                      key={src}
                      className={`group relative overflow-hidden cursor-pointer bg-[var(--surface)]${i === 0 ? ' col-span-2' : ''}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Открыть фото ${i + 1}`}
                      onClick={() => setLightboxIndex(i)}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i) }
                      }}
                    >
                      {!photoErrors[src] ? (
                        <img
                          src={src}
                          alt={`${project.title} — фото ${i + 1}`}
                          className="w-full aspect-video object-contain block transition-transform duration-200 group-hover:scale-[1.02]"
                          loading="lazy"
                          onError={() => imgErr(src)}
                        />
                      ) : (
                        <PlaceholderPhoto gradient={mainGradients[i]} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Gallery */}
              {project.galleryImages.length > 0 && (
                <div>
                  <button
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-2)] text-[13px] font-medium hover:bg-[var(--surface)] hover:border-[var(--border-hover)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
                    onClick={() => setGalleryOpen(o => !o)}
                    aria-expanded={galleryOpen}
                  >
                    {galleryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    {galleryOpen ? 'Скрыть фото' : `Ещё фото (${project.galleryImages.length})`}
                  </button>

                  <AnimatePresence>
                    {galleryOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="grid grid-cols-3 gap-1 mt-2 rounded-xl overflow-hidden border border-[var(--border)]">
                          {project.galleryImages.map((img, i) => (
                            <div
                              key={img}
                              className="relative overflow-hidden cursor-pointer aspect-square bg-[var(--surface)] hover:opacity-85 transition-opacity"
                              role="button"
                              tabIndex={0}
                              aria-label={`Открыть фото ${i + 1}`}
                              onClick={() => setLightboxIndex(mainSrcs.length + i)}
                              onKeyDown={e => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setLightboxIndex(mainSrcs.length + i)
                                }
                              }}
                            >
                              {!photoErrors[img] ? (
                                <img
                                  src={img}
                                  alt={`Галерея — фото ${i + 1}`}
                                  className="w-full h-full object-cover block"
                                  loading="lazy"
                                  onError={() => imgErr(img)}
                                />
                              ) : (
                                <div
                                  className="w-full h-full flex items-center justify-center text-[var(--text-3)]"
                                  style={{ background: galleryGradients[i] }}
                                  aria-hidden="true"
                                >
                                  <ImageIcon size={24} style={{ opacity: 0.25 }} />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Links */}
              {(project.githubLink || project.externalLink) && (
                <div className="flex gap-2.5 flex-wrap">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[13px] font-medium no-underline hover:bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors"
                    >
                      <SiGithub size={15} />
                      GitHub
                    </a>
                  )}
                  {project.externalLink && (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text-1)] text-[13px] font-medium no-underline hover:bg-[var(--surface)] hover:border-[var(--border-hover)] transition-colors"
                    >
                      <ExternalLink size={15} />
                      Открыть проект
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {lightboxIndex !== null && (
        <Lightbox
          images={allLightboxImages}
          startIndex={lightboxIndex}
          projectSlug={project.slug}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}
