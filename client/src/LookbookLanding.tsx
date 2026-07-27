import { useEffect, useRef, type MouseEvent } from 'react'
import './LookbookLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import heroFull from './assets/hero.png'
import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product4 from './assets/product4.png'
import denimVideo from './assets/video1.mp4'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const goals = [
  {
    title: 'Comfort First',
    copy: 'Oversized fits and brushed fleece built for everyday ease.',
    img: heroFull,
  },
  {
    title: 'Timeless Cuts',
    copy: 'Considered silhouettes that outlast every trend cycle.',
    img: product4,
  },
  {
    title: 'Conscious Fabric',
    copy: 'Responsibly sourced denim and wool, season after season.',
    img: product1,
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function goHome(e: MouseEvent) {
  e.preventDefault()
  navigate('/')
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
      {/* ---------------- Meta row ---------------- */}
      <header className="lb-meta">
        <span>Vintage Blue Studio</span>
        <span>Winter 2026</span>
        <span>@vintageblue.studio</span>
      </header>

      {/* ---------------- Hero collage ---------------- */}
      <section className="lb-hero" aria-label="Winter Lookbook">
        <p className="lb-tagline lb-tagline-right">
          Layering made
          <br />
          effortless
          <br />
          this season.
        </p>

        <h1 className="lb-line lb-line-1">Winter</h1>

        <img
          src={heroFull}
          alt="Model in an oversized hoodie and wide-leg washed jeans"
          className="lb-hero-photo"
        />

        <h1 className="lb-line lb-line-2">Lookbook</h1>

        <p className="lb-tagline lb-tagline-left">
          Unlocking cozy comfort
          <br />
          with intentional design.
        </p>

        <span className="lb-credit lb-credit-left">Presented by Vintage Blue</span>
        <span className="lb-credit lb-credit-right">Presented by Vintage Blue</span>
      </section>

      {/* ---------------- Vision / summary ---------------- */}
      <section className="lb-summary">
        <Reveal className="lb-summary-photo-cell">
          <div className="lb-summary-photo">
            <img src={product2} alt="Model carrying a duffel bag in sunglasses" />
          </div>
        </Reveal>

        <Reveal delay={100} className="lb-summary-copy-cell">
          <h2>The Vision</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim.
          </p>
        </Reveal>
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
          <h2 className="lb-banner-title">The Denim Edit</h2>
          <p className="lb-banner-copy">
            Washed, worn-in, and built to move — every pair is broken in before it
            ever reaches you, cut generously and finished to last well past one
            season.
          </p>
        </div>
      </section>

      {/* ---------------- Goals ---------------- */}
      <section className="lb-goals">
        <div className="lb-goals-grid">
          {goals.map((g, i) => (
            <Reveal key={g.title} delay={i * 90} className="lb-goal-cell">
              <div className="lb-goal">
                <h3>{g.title}</h3>
                <p>{g.copy}</p>
                <div className="lb-goal-photo">
                  <img src={g.img} alt={g.title} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="lb-foot">
        <a href="/" className="lb-back" onClick={goHome}>
          ← Back to the full site
        </a>
      </footer>
    </div>
  )
}

export default LookbookLanding
