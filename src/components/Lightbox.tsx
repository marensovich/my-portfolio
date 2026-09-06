import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { getPlaceholderGradient } from '../utils/imageUtils'

interface Props {
  images: string[]
  startIndex: number
  projectSlug: string
  onClose: () => void
}

export function Lightbox({ images, startIndex, projectSlug, onClose }: Props) {
  const [current, setCurrent] = useState(startIndex)
  const [imgError, setImgError] = useState<Record<number, boolean>>({})

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const gradient = getPlaceholderGradient(projectSlug, current)
  const src = images[current]

  const btnCls = "flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90"
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          className="max-w-[90vw] max-h-[85dvh] flex items-center justify-center"
          onClick={e => e.stopPropagation()}
          key={current}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
          {!imgError[current] ? (
            <img
              src={src}
              alt={`Photo ${current + 1} of ${images.length}`}
              className="max-w-[90vw] max-h-[85dvh] object-contain rounded-xl"
              onError={() => setImgError(prev => ({ ...prev, [current]: true }))}
            />
          ) : (
            <div
              className="w-[80vw] max-w-[860px] aspect-video rounded-xl"
              style={{ background: gradient }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {images.length > 1 && (
          <>
            <button
              className={`${btnCls} fixed left-5 top-1/2 -translate-y-1/2 z-[201]`}
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className={`${btnCls} fixed right-5 top-1/2 -translate-y-1/2 z-[201]`}
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        <button
          className={`${btnCls} fixed top-5 right-5 z-[201]`}
          onClick={onClose}
          aria-label="Close viewer"
        >
          <X size={20} />
        </button>

        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[201] text-[13px] text-white/40 font-mono"
          aria-live="polite"
        >
          {current + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
