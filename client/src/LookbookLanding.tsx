import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import './LookbookLanding.css'
import { navigate } from './router'
import { Reveal, useParallax, usePrefersReducedMotion } from './motion'
import Nav from './Nav'
import ShopTheLook from './ShopTheLook'
import lbTileR1C1 from './assets2/lb-tile-r1c1.png'
import lbTileR1C2 from './assets2/lb-tile-r1c2.png'
import lbTileR2C2 from './assets2/lb-tile-r2c2.png'
import lbTileR2C3 from './assets2/lb-tile-r2c3.png'
import lbTileR3C1 from './assets2/lb-tile-r3c1.png'
import lbTileR3C2 from './assets2/lb-tile-r3c2.png'
import lbTileR3C3 from './assets2/lb-tile-r3c3.png'
import pant3 from './assets2/pants/pant3.png'
import product2 from './assets2/product2.png'
import about1 from './assets2/About1.png'
import about2 from './assets2/About2.png'
import goalPhoto1 from './assets2/product1.png'
import goalPhoto2 from './assets2/product3.png'
import product4 from './assets2/product4.png'
import denimVideo from './assets/video1.mp4'
import filmBackdrop from './assets2/lookbook-base.png'
import filmVideo from './assets2/lookbook-vid.mp4'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

/** The lifestyle photo sliced into a precise, gapless 3×3 grid (row-major
 *  order), so most tiles reassemble the original image exactly when laid
 *  edge to edge. The top-right corner (plain background, no part of the
 *  model) is swapped for a shoppable flat lay of the shirt he's wearing;
 *  the trouser flat lay sits in row 2, column 1. */
const gridCells: {
  type: 'photo' | 'product'
  img: string
  alt: string
  label?: string
  to?: string
}[] = [
  { type: 'photo', img: lbTileR1C1, alt: '' },
  { type: 'photo', img: lbTileR1C2, alt: 'Model in a chambray shirt' },
  { type: 'product', img: product2, alt: 'Light wash denim western shirt, flat lay', label: 'Shop The Shirt', to: '/shop/shirts' },
  { type: 'product', img: pant3, alt: 'Navy chino trousers, flat lay', label: 'Shop The Trouser', to: '/shop/pants' },
  { type: 'photo', img: lbTileR2C2, alt: '' },
  { type: 'photo', img: lbTileR2C3, alt: '' },
  { type: 'photo', img: lbTileR3C1, alt: '' },
  { type: 'photo', img: lbTileR3C2, alt: '' },
  { type: 'photo', img: lbTileR3C3, alt: '' },
]

/* The page's own contents list, shown in the hero. Ids match the
   sections below. */
const chapters = [
  { n: '01', label: 'The Film', id: 'lb-film' },
  { n: '02', label: 'The Looks', id: 'lb-looks' },
  { n: '03', label: 'The Mood', id: 'lb-mood' },
  { n: '04', label: 'The Vision', id: 'lb-vision' },
  { n: '05', label: 'Shop By Focus', id: 'lb-focus' },
]

const moodShots = [
  {
    img: about1,
    alt: 'Model leaning against a weathered doorway in wide-leg denim',
    caption: 'Worn hard, styled easy.',
    note: 'Wide-leg denim, broken in on the street.',
  },
  {
    img: about2,
    alt: 'Model walking through a convenience store aisle in relaxed denim',
    caption: 'Built for the in-between hours.',
    note: 'A relaxed wash for the late run to the shop.',
  },
]

const stats = [
  { n: '36', label: 'Years of fabric expertise' },
  { n: '8', label: 'States served' },
  { n: '2', label: 'Considered drops a year' },
]

const goals = [
  {
    title: 'Comfort First',
    copy: 'Oversized fits and brushed fleece built for everyday ease.',
    img: goalPhoto1,
    to: '/shop/shirts',
  },
  {
    title: 'Timeless Cuts',
    copy: 'Considered silhouettes that outlast every trend cycle.',
    img: goalPhoto2,
    to: '/shop/men',
  },
  {
    title: 'Conscious Fabric',
    copy: 'Responsibly sourced denim and wool, season after season.',
    img: product4,
    to: '/shop/denims',
  },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function goHome(e: MouseEvent) {
  e.preventDefault()
  navigate('/')
}

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

/* In-page jumps scroll rather than touch the URL: the app's router
   treats any history change as a page change. */
function jump(id: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * One section header for every chapter on the page: the chapter number
 * and name as a kicker, a display-face title, and an optional
 * standfirst on the right, over a hairline.
 */
function LbHead({
  n,
  kicker,
  title,
  children,
}: {
  n: string
  kicker: string
  title: string
  children?: ReactNode
}) {
  return (
    <Reveal className="lb-head">
      <div className="lb-head-main">
        <span className="lb-kicker">
          <em>{n}</em> {kicker}
        </span>
        <h2>{title}</h2>
      </div>
      {children && <div className="lb-head-aside">{children}</div>}
    </Reveal>
  )
}

type FullscreenVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

/**
 * The film band: the campaign still, blurred and toned down to a dark
 * ground, with the portrait film playing in a frame over it. The band
 * loops silently; the viewfinder mark on the frame's corner opens the
 * film full screen with sound and native controls, and closing full
 * screen drops it back to the silent loop.
 */
function LookbookFilm() {
  const videoRef = useRef<FullscreenVideo>(null)
  const reducedMotion = usePrefersReducedMotion()
  const parallax = useParallax<HTMLElement>(0.14)

  /* Same muted-autoplay guard as the page's other video. With reduced
     motion the film holds on its first frame until someone asks for it. */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    if (reducedMotion) el.pause()
    else el.play().catch(() => {})
  }, [reducedMotion])

  useEffect(() => {
    const onChange = () => {
      const el = videoRef.current
      if (!el) return
      const full = document.fullscreenElement === el
      el.controls = full
      if (!full) el.muted = true
    }
    /* iOS closes its own player without a fullscreenchange event. */
    const onIosExit = () => {
      const el = videoRef.current
      if (el) el.muted = true
    }
    const video = videoRef.current
    document.addEventListener('fullscreenchange', onChange)
    video?.addEventListener('webkitendfullscreen', onIosExit)
    return () => {
      document.removeEventListener('fullscreenchange', onChange)
      video?.removeEventListener('webkitendfullscreen', onIosExit)
    }
  }, [])

  const openFullscreen = () => {
    const el = videoRef.current
    if (!el) return
    el.play().catch(() => {})
    if (el.requestFullscreen) {
      /* Sound only once full screen has actually opened, so a refused
         request can't leave the inline loop playing out loud. */
      el.requestFullscreen()
        .then(() => {
          el.muted = false
        })
        .catch(() => {})
    } else if (el.webkitEnterFullscreen) {
      /* iOS Safari only full-screens video through its own call. */
      el.muted = false
      el.webkitEnterFullscreen()
    }
  }

  return (
    <section className="lb-film" id="lb-film" ref={parallax.ref} aria-labelledby="lb-film-title">
      <div className="lb-film-bg" aria-hidden="true">
        <img src={filmBackdrop} alt="" style={parallax.style} />
      </div>

      <Reveal className="lb-film-copy">
        <span className="lb-kicker lb-kicker-light">
          <em>01</em> The Film
        </span>
        <h2 id="lb-film-title">Two fits, one fitting room.</h2>
        <p>
          Ten seconds from the fitting room: the looks further down this page, moving
          the way they are meant to be worn.
        </p>
      </Reveal>

      <p className="lb-film-hint" aria-hidden="true">
        <span className="lb-film-hint-mark" /> Tap the corner mark to watch with sound
      </p>

      <Reveal className="lb-film-cell">
        <div className="lb-film-frame">
          <video
            ref={videoRef}
            src={filmVideo}
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Two models in denim jackets and sunglasses in a dressing room"
          />

          <button
            type="button"
            className="lb-film-focus"
            aria-label="Watch the film full screen with sound"
            onClick={openFullscreen}
          >
            <svg viewBox="0 0 48 48" aria-hidden="true">
              <path d="M4 15V4h11M33 4h11v11M44 33v11H33M15 44H4V33" />
              <circle cx="24" cy="24" r="14" />
            </svg>
          </button>
        </div>
      </Reveal>
    </section>
  )
}

function LookbookLanding() {
  const videoRef = useRef<HTMLVideoElement>(null)

  /* React's `muted` JSX attribute doesn't reliably set the DOM
   * *property* before the browser checks autoplay eligibility, so
   * Chrome's "autoplay requires muted" policy can silently block
   * playback. Setting it imperatively here guarantees the property is
   * true before calling play(). */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {})
  }, [])

  return (
    <div className="lb-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="lb-hero" aria-labelledby="lb-hero-title">
        <div className="lb-hero-copy">
          <Reveal className="lb-hero-intro">
            <span className="lb-kicker">
              Lookbook <i aria-hidden="true">/</i> Winter 2026
            </span>
            <h1 id="lb-hero-title">The Weekend Edit.</h1>
            <p className="lb-hero-lede">
              Heavier washes, softer layers. The pieces that carry a Saturday from the
              porch to the road and back again, shown the way we actually wear them.
            </p>

            <div className="lb-hero-actions">
              <a href="/shop/men" className="lb-btn lb-btn-solid" onClick={go('/shop/men')}>
                Shop The Edit <ArrowRight size={15} strokeWidth={1.8} />
              </a>
              <a href="#lb-film" className="lb-btn lb-btn-line" onClick={jump('lb-film')}>
                Watch The Film <ArrowDown size={15} strokeWidth={1.8} />
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lb-hero-side">
          <Reveal delay={120}>
            <nav className="lb-contents" aria-label="In this lookbook">
              <span className="lb-contents-label">In this lookbook</span>
              <ol>
                {chapters.map((c) => (
                  <li key={c.id}>
                    <a href={`#${c.id}`} onClick={jump(c.id)}>
                      <em>{c.n}</em>
                      <span>{c.label}</span>
                      <ArrowDown size={14} strokeWidth={1.6} />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>

          <p className="lb-hero-meta">
            <span>Vintage Blue Studio</span>
            <span>@vintageblue.studio</span>
          </p>
        </div>
      </section>

      {/* ---------------- Mosaic ---------------- */}
      <section className="lb-grid-hero" aria-label="The Weekend Edit, photographed">
        <div className="lb-grid-mosaic">
          {gridCells.map((cell, i) =>
            cell.type === 'product' ? (
              <a
                key={i}
                href={cell.to}
                className="lb-grid-tile lb-grid-tile-product"
                onClick={go(cell.to!)}
              >
                <img src={cell.img} alt={cell.alt} />
                <span className="lb-grid-tag">{cell.label}</span>
              </a>
            ) : (
              <div key={i} className="lb-grid-tile" aria-hidden={!cell.alt}>
                <img src={cell.img} alt={cell.alt} />
              </div>
            ),
          )}
        </div>

        {/* Shade along the bottom edge so the overlays below read over
            any part of the photo; it never takes clicks from the tiles. */}
        <div className="lb-grid-shade" aria-hidden="true" />

        <span className="lb-grid-hint">
          <span className="lb-grid-hint-dot" aria-hidden="true" /> The shirt and trouser tiles are shoppable
        </span>

        <span className="lb-grid-brand">
          <span className="lb-grid-brand-mark">
            <span className="script-initial">V</span>intage Blue
          </span>
          <span className="lb-grid-brand-tag">The Weekend Edit</span>
        </span>

        <a href="/shop/men" className="lb-grid-cta" onClick={go('/shop/men')}>
          Shop This Look <ArrowRight size={14} strokeWidth={1.8} />
        </a>
      </section>

      {/* ---------------- 01 The Film ---------------- */}
      <LookbookFilm />

      {/* ---------------- 02 The Looks ---------------- */}
      <section className="lb-section" id="lb-looks">
        <div className="lb-wrap">
          <LbHead n="02" kicker="The Looks" title="Two ways to wear the season.">
            <p>
              Each look broken down piece by piece. Tap a card to shop the exact garment,
              or add the whole look in one go.
            </p>
          </LbHead>

          <ShopTheLook />
        </div>
      </section>

      {/* ---------------- 03 The Mood ---------------- */}
      <section className="lb-section lb-section-tint" id="lb-mood">
        <div className="lb-wrap">
          <LbHead n="03" kicker="The Mood" title="Not staged. Just worn.">
            <p>Candid frames from the same season, shot off the rail and out on the street.</p>
          </LbHead>

          <div className="lb-mood-grid">
            {moodShots.map((m, i) => (
              <Reveal key={m.caption} delay={i * 110} className={`lb-mood-cell lb-mood-cell-${i + 1}`}>
                <figure className="lb-mood-figure">
                  <div className="lb-mood-photo">
                    <img src={m.img} alt={m.alt} />
                  </div>
                  <figcaption>
                    <em>{String(i + 1).padStart(2, '0')}</em>
                    <span>
                      <strong>{m.caption}</strong>
                      {m.note}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 04 The Vision ---------------- */}
      <section className="lb-section" id="lb-vision">
        <div className="lb-wrap">
          <div className="lb-vision">
            <Reveal className="lb-vision-title">
              <span className="lb-kicker">
                <em>04</em> The Vision
              </span>
              <h2>A reference, not a fantasy.</h2>
            </Reveal>

            <Reveal delay={120} className="lb-vision-body">
              <p>
                A lookbook isn't meant to be aspirational in a way you'll never actually
                wear. It's a reference. Every pairing here is built from pieces meant to
                leave the rail and go straight into rotation.
              </p>
              <p>
                Corduroy that softens with age, denim that holds its wash, shearling that
                earns its collar: chosen for how they wear in, not just how they
                photograph on day one.
              </p>
              <a href="/shop/popular" className="lb-btn lb-btn-solid" onClick={go('/shop/popular')}>
                Shop The Edit <ArrowRight size={15} strokeWidth={1.8} />
              </a>
            </Reveal>
          </div>

          <div className="lb-stats">
            {stats.map((st, i) => (
              <Reveal key={st.label} delay={i * 90} className="lb-stat">
                <span className="lb-stat-n">{st.n}</span>
                <span className="lb-stat-label">{st.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Banner ---------------- */}
      <section className="lb-banner">
        <video
          ref={videoRef}
          className="lb-banner-bg"
          src={denimVideo}
          poster={product4}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="lb-banner-content">
          <span className="lb-kicker lb-kicker-light">Interlude</span>
          <h2 className="lb-banner-title">The Denim Edit</h2>
          <p className="lb-banner-copy">
            Washed, worn-in, and built to move. Every pair is broken in before it ever
            reaches you, cut generously and finished to last well past one season.
          </p>
          <a href="/shop/denims" className="lb-btn lb-btn-light" onClick={go('/shop/denims')}>
            Shop Denim <ArrowRight size={15} strokeWidth={1.8} />
          </a>
        </div>
      </section>

      {/* ---------------- 05 Shop by focus ---------------- */}
      <section className="lb-section" id="lb-focus">
        <div className="lb-wrap">
          <LbHead n="05" kicker="Shop By Focus" title="What matters, sorted.">
            <p>Three ways into the range, depending on what you care about most.</p>
          </LbHead>

          <div className="lb-goals-grid">
            {goals.map((g, i) => (
              <Reveal key={g.title} delay={i * 90} className="lb-goal-cell">
                <a href={g.to} className="lb-goal" onClick={go(g.to)}>
                  <div className="lb-goal-photo">
                    <img src={g.img} alt="" />
                  </div>
                  <div className="lb-goal-body">
                    <em>{String(i + 1).padStart(2, '0')}</em>
                    <h3>{g.title}</h3>
                    <p>{g.copy}</p>
                    <span className="lb-goal-link">
                      Shop now <ArrowUpRight size={14} strokeWidth={1.8} />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="lb-footer">
        <div className="lb-footer-brand">
          <p className="lb-footer-wordmark">
            <span className="script-initial">V</span>intage Blue
          </p>
          <p className="lb-footer-tag">Menswear built on fit, fabric, and finish. Ludhiana, Punjab — since 2006.</p>
        </div>

        <div className="lb-footer-col">
          <h3>Shop</h3>
          <a href="/shop/popular" onClick={go('/shop/popular')}>Popular</a>
          <a href="/drop" onClick={go('/drop')}>New Drop</a>
          <a href="/shop/pants" onClick={go('/shop/pants')}>Pants</a>
          <a href="/shop/men" onClick={go('/shop/men')}>Men</a>
        </div>

        <div className="lb-footer-col">
          <h3>Brand</h3>
          <a href="/about" onClick={go('/about')}>About Us</a>
          <a href="/story" onClick={go('/story')}>Our Story</a>
          <a href="/lookbook" onClick={go('/lookbook')}>Lookbook</a>
          <a href="/contact" onClick={go('/contact')}>Contact Us</a>
        </div>

        <div className="lb-footer-col">
          <h3>Help</h3>
          <a href="#">Sizing &amp; Fit</a>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Denim Care</a>
        </div>

        <div className="lb-footer-bottom">
          <span>© 2026 Vintage Blue — All Rights Reserved</span>
          <a href="/" onClick={goHome}>
            ← Back to the full site
          </a>
        </div>
      </footer>
    </div>
  )
}

export default LookbookLanding
