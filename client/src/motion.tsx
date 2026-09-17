import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'

/* ------------------------------------------------------------------ */
/* Hooks — shared between the homepage and the drop landing page      */
/* ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  return useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  )
}

/** Scroll position, throttled to one update per animation frame. */
export function useScrollY(disabled: boolean) {
  const [y, setY] = useState(0)

  useEffect(() => {
    if (disabled) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setY(window.scrollY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [disabled])

  return y
}

/* ------------------------------------------------------------------ */
/* Scroll-reveal wrapper — fades/rises children in once they cross    */
/* into view. Styles live in index.css (`.reveal` / `.reveal.in`).    */
/* ------------------------------------------------------------------ */

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  /**
   * How the block enters. `rise` (the default, and what every existing
   * caller gets) fades up from below; `mask` wipes the block open from
   * its top edge, which suits full-bleed photography far better than a
   * fade because the image never appears half-transparent; `fade` is a
   * plain cross-fade for things that shouldn't move at all.
   */
  variant?: 'rise' | 'mask' | 'fade'
}

export function Reveal({ children, delay = 0, className = '', variant = 'rise' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in')
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal-${variant} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Element-relative parallax                                          */
/* ------------------------------------------------------------------ */

/**
 * Parallax measured against the element's *own* trip through the
 * viewport rather than against absolute `window.scrollY`.
 *
 * The scrollY approach only behaves for a banner sitting at the very
 * top of the page: further down, `scrollY * rate` grows without bound,
 * so by mid-page a backdrop is translated hundreds of pixels and slides
 * clean off its own frame (that's what left a grey band above the
 * weekend-edit video). Here the offset is derived from how far the
 * element has travelled across the viewport, so it is always within
 * +/- (strength * height / 2) and can never out-run its overscan.
 *
 * The ref goes on the *frame* (the clipping wrapper) and the returned
 * style on the child that moves, because reading a rect off the moving
 * element itself would feed its own transform back into the next
 * measurement.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(strength = 0.18) {
  const ref = useRef<T>(null)
  const [offset, setOffset] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion) return
    let raf = 0

    const measure = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      /* 0 as the frame's top edge enters from below, 1 as its bottom
         edge leaves past the top. */
      const raw = (vh - rect.top) / (vh + rect.height)
      const progress = Math.min(Math.max(raw, 0), 1)
      setOffset((progress - 0.5) * strength * rect.height)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(measure)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion, strength])

  const style: CSSProperties = reducedMotion
    ? {}
    : { transform: `translate3d(0, ${offset.toFixed(2)}px, 0)` }

  return { ref, style }
}
