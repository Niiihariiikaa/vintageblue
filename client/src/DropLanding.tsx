import { useRef, type MouseEvent } from 'react'
import { Search, ShoppingBag, Menu, ChevronDown, ArrowUpRight } from 'lucide-react'
import './DropLanding.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion } from './motion'
import heroBack from './assets/heroleft.png'
import heroFull from './assets/hero.png'
import heroPortrait from './assets/heroright.png'
import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product3 from './assets/product3.png'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const navLinks = ['Men', 'Women', 'Unisex', 'Popular']
const socials = ['Instagram', 'Pinterest', 'TikTok', 'Threads']
const marqueeItems = ['New Winter Drop 2026', 'Washed Denim', 'Soft Layers', 'Vintage Blue']

const peeks = [
  { img: product1, label: 'Beanies & Layers' },
  { img: product2, label: 'Sunglasses & Bags' },
  { img: product3, label: 'Coats & Boots' },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function goHome(e: MouseEvent) {
  e.preventDefault()
  navigate('/')
}

function DropLanding() {
  const reducedMotion = usePrefersReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const tiltFrame = useRef(0)

  /** Pointer-driven 3D tilt on the hero photo group — skipped entirely
   * under reduced motion, and throttled to one update per frame. */
  const handleHeroPointerMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    cancelAnimationFrame(tiltFrame.current)
    tiltFrame.current = requestAnimationFrame(() => {
      el.style.setProperty('--tilt-x', `${(px * 9).toFixed(2)}deg`)
      el.style.setProperty('--tilt-y', `${(py * -9).toFixed(2)}deg`)
    })
  }

  const handleHeroPointerLeave = () => {
    const el = heroRef.current
    if (!el) return
    el.style.setProperty('--tilt-x', '0deg')
    el.style.setProperty('--tilt-y', '0deg')
  }

  const marqueeRow = (
    <>
      {marqueeItems.map((item) => (
        <span className="dl-marquee-item" key={item}>
          {item} <span className="dl-marquee-dot">•</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="dl-page">
      <div className="dl-frame">
        {/* ---------------- Top bar ---------------- */}
        <header className="dl-topbar">
          <button className="dl-icon-btn" aria-label="Menu">
            <Menu size={20} strokeWidth={1.6} />
          </button>

          <a href="/" className="dl-logo" onClick={goHome}>
            <span className="script-initial">V</span>intage Blue
          </a>

          <div className="dl-cart" aria-label="Cart, 3 items">
            <span className="dl-cart-count">3</span>
            <ShoppingBag size={20} strokeWidth={1.6} />
          </div>
        </header>

        {/* ---------------- Filter bar ---------------- */}
        <div className="dl-filterbar">
          <div className="dl-filters">
            <button className="dl-chip" type="button">
              Categories <ChevronDown size={14} strokeWidth={1.8} />
            </button>
            <button className="dl-chip" type="button">
              New Arrivals <ChevronDown size={14} strokeWidth={1.8} />
            </button>
            <label className="dl-search">
              <Search size={14} strokeWidth={1.8} />
              <input type="text" placeholder="Search…" aria-label="Search products" />
            </label>
          </div>

          <nav className="dl-navlinks" aria-label="Shop by audience">
            {navLinks.map((l) => (
              <a href="#" key={l}>
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* ---------------- Hero ---------------- */}
        <section className="dl-hero" aria-label="Vintage Blue new drop">
          <Reveal>
            <p className="dl-eyebrow">The best layers are only here</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="dl-headline">
              <span className="script-initial">V</span>intage{' '}
              <span className="dl-headline-accent">Blue</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <div
              className="dl-heroimg"
              ref={heroRef}
              onMouseMove={handleHeroPointerMove}
              onMouseLeave={handleHeroPointerLeave}
            >
              <div className="dl-heroimg-bg" aria-hidden="true" />

              <img
                src={heroBack}
                alt="Model seen from behind wearing a navy hoodie and slouchy bag"
                className="dl-fig dl-fig-left"
              />
              <img
                src={heroPortrait}
                alt="Portrait of a model in a navy hooded sweatshirt"
                className="dl-fig dl-fig-center"
              />
              <img
                src={heroFull}
                alt="Model in an oversized hoodie and wide-leg washed jeans"
                className="dl-fig dl-fig-right"
              />

              <div className="dl-swipe-card">
                <span className="dl-swipe-label">Swipe</span>
                <a href="#peek" className="dl-discover">
                  Discover now <ArrowUpRight size={15} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ---------------- Social row ---------------- */}
        <ul className="dl-social" aria-label="Follow Vintage Blue">
          {socials.map((s) => (
            <li key={s}>
              <a href="#">{s}</a>
            </li>
          ))}
        </ul>

        {/* ---------------- Marquee ---------------- */}
        <div className="dl-marquee" aria-hidden="true">
          <div className="dl-marquee-track">
            {marqueeRow}
            {marqueeRow}
          </div>
        </div>

        {/* ---------------- Peek row ---------------- */}
        <div className="dl-peekrow" id="peek">
          {peeks.map((p, i) => (
            <Reveal key={p.label} delay={i * 100} className="dl-peek-cell">
              <a href="#" className="dl-peek">
                <img src={p.img} alt={p.label} />
                <span>{p.label}</span>
              </a>
            </Reveal>
          ))}
        </div>

        <a href="/" className="dl-back" onClick={goHome}>
          ← Back to the full site
        </a>
      </div>
    </div>
  )
}

export default DropLanding
