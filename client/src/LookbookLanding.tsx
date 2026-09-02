import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Check, Plus } from 'lucide-react'
import './LookbookLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import { getProductByHandle, formatPrice } from './catalog'
import { useCart } from './cart'
import heroAbout from './assets2/hero-about.png'
import about1 from './assets2/About1.png'
import about2 from './assets2/About2.png'
import goalPhoto from './assets/product1.png'
import product4 from './assets2/product4.png'
import model1 from './assets2/Model1.png'
import model1Shirt from './assets2/model1-shirt.png'
import model1Jeans from './assets2/model1-jeans.png'
import model2 from './assets2/model2.png'
import model2Shirt from './assets2/model2-shirt.png'
import model2Jeans from './assets2/model2-jeans.png'
import denimVideo from './assets/video1.mp4'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const goals = [
  {
    title: 'Comfort First',
    copy: 'Oversized fits and brushed fleece built for everyday ease.',
    img: goalPhoto,
    to: '/shop/shirts',
  },
  {
    title: 'Timeless Cuts',
    copy: 'Considered silhouettes that outlast every trend cycle.',
    img: goalPhoto,
    to: '/shop/men',
  },
  {
    title: 'Conscious Fabric',
    copy: 'Responsibly sourced denim and wool, season after season.',
    img: goalPhoto,
    to: '/shop/denims',
  },
]

const looks = [
  {
    n: '01',
    img: model1,
    imgAlt: 'Model wearing a tan corduroy shirt and wide-leg jeans',
    caption: 'Corduroy shirt in washed sand, worn open over relaxed denim.',
    details: [
      'Corduroy softens and lightens a shade with every wash.',
      'Wide-leg denim cut for a relaxed, uncropped break at the ankle.',
      'Layers just as easily over a plain tee on warmer days.',
    ],
    pieces: [
      { img: model1Shirt, label: 'The Shirt', handle: 'garment-dyed-overshirt' },
      { img: model1Jeans, label: 'The Denim', handle: 'wide-leg-denim' },
    ],
  },
  {
    n: '02',
    img: model2,
    imgAlt: 'Model wearing a shearling-collar corduroy trucker jacket and black jeans',
    caption: 'Shearling-collar trucker layered over black wash denim.',
    details: [
      'Sherpa collar detaches for warmer weeks in between seasons.',
      'Black wash denim holds its tone longer than a standard rinse.',
      'Finished throughout in matte, tarnish-resistant hardware.',
    ],
    pieces: [
      { img: model2Shirt, label: 'The Jacket', handle: 'charcoal-layer' },
      { img: model2Jeans, label: 'The Denim', handle: 'raw-selvedge-jean' },
    ],
  },
]

const moodShots = [
  {
    img: about1,
    alt: 'Model leaning against a weathered doorway in wide-leg denim',
    caption: 'Worn hard, styled easy.',
  },
  {
    img: about2,
    alt: 'Model walking through a convenience store aisle in relaxed denim',
    caption: 'Built for the in-between hours.',
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
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

function LookPiece({ img, label, handle }: { img: string; label: string; handle: string }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = getProductByHandle(handle)
  if (!product) return null

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product.handle, 'M', 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <a href={`/product/${product.handle}`} className="lb-piece" onClick={go(`/product/${product.handle}`)}>
      <img src={img} alt="" />
      <span className="lb-piece-body">
        <span className="lb-piece-tag">{label}</span>
        <span className="lb-piece-name">{product.name}</span>
        <span className="lb-piece-price">{formatPrice(product.price)}</span>
      </span>
      <button
        type="button"
        className={`lb-piece-add${added ? ' added' : ''}`}
        aria-label={`Add ${product.name} to cart`}
        onClick={handleAdd}
      >
        {added ? <Check size={14} strokeWidth={2.4} /> : <Plus size={14} strokeWidth={2.4} />}
      </button>
    </a>
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
          src={heroAbout}
          alt="Model crouching in sunglasses, wearing a shearling-collar jacket and dark denim"
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

      {/* ---------------- The Looks ---------------- */}
      <section className="lb-looks">
        <Reveal className="lb-looks-head">
          <p className="lb-looks-eyebrow">The Looks</p>
          <h2>Two ways to wear the season.</h2>
        </Reveal>

        {looks.map((look, i) => (
          <Reveal
            key={look.n}
            delay={i * 100}
            className={`lb-look${i % 2 === 1 ? ' lb-look-reverse' : ''}`}
          >
            <div className="lb-look-photo">
              <span className="lb-look-n">{look.n}</span>
              <img src={look.img} alt={look.imgAlt} />
            </div>

            <div className="lb-look-info">
              <p className="lb-look-caption">{look.caption}</p>

              <ul className="lb-look-details">
                {look.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <div className="lb-look-pieces">
                {look.pieces.map((piece) => (
                  <LookPiece key={piece.handle} img={piece.img} label={piece.label} handle={piece.handle} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ---------------- Mood ---------------- */}
      <section className="lb-mood">
        <Reveal className="lb-looks-head">
          <p className="lb-looks-eyebrow">The Mood</p>
          <h2>Not staged. Just worn.</h2>
        </Reveal>

        <div className="lb-mood-grid">
          {moodShots.map((m, i) => (
            <Reveal key={m.caption} delay={i * 90} className="lb-mood-cell">
              <div className="lb-mood-photo">
                <img src={m.img} alt={m.alt} />
                <span className="lb-mood-caption">{m.caption}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Vision / summary ---------------- */}
      <section className="lb-summary">
        <Reveal className="lb-summary-copy-cell">
          <h2>The Vision</h2>
          <p>
            A lookbook isn't meant to be aspirational in a way you'll never actually
            wear — it's a reference. Every pairing here is built from pieces meant to
            leave the rail and go straight into rotation.
          </p>
          <p>
            Corduroy that softens with age, denim that holds its wash, shearling
            that earns its collar — chosen for how they wear in, not just how they
            photograph on day one.
          </p>
          <a href="/shop/popular" className="lb-cta" onClick={go('/shop/popular')}>
            Shop The Edit →
          </a>

          <div className="lb-stats">
            <div className="lb-stat">
              <span className="lb-stat-n">36</span>
              <span className="lb-stat-label">Years Fabric Expertise</span>
            </div>
            <div className="lb-stat">
              <span className="lb-stat-n">8</span>
              <span className="lb-stat-label">States Served</span>
            </div>
            <div className="lb-stat">
              <span className="lb-stat-n">2</span>
              <span className="lb-stat-label">Considered Drops A Year</span>
            </div>
          </div>
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
        <Reveal className="lb-looks-head">
          <p className="lb-looks-eyebrow">Shop By Focus</p>
          <h2>What matters, sorted.</h2>
        </Reveal>

        <div className="lb-goals-grid">
          {goals.map((g, i) => (
            <Reveal key={g.title} delay={i * 90} className="lb-goal-cell">
              <a href={g.to} className="lb-goal" onClick={go(g.to)}>
                <h3>{g.title}</h3>
                <p>{g.copy}</p>
                <div className="lb-goal-photo">
                  <img src={g.img} alt={g.title} />
                </div>
              </a>
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
