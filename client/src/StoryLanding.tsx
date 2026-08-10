import type { MouseEvent } from 'react'
import { ArrowUpRight, ArrowRight, Shirt, Layers, Gem, Leaf, Heart } from 'lucide-react'
import './StoryLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import heroPortrait from './assets/heroright.png'
import heroFull from './assets/hero.png'
import heroBack from './assets/heroleft.png'
import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product3 from './assets/product3.png'
import product4 from './assets/product4.png'
import product5 from './assets/product5.png'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */


const specialties = [
  { icon: Shirt, label: 'Denim & Outerwear' },
  { icon: Layers, label: 'Knitwear & Layers' },
  { icon: Gem, label: 'Accessories' },
  { icon: Leaf, label: 'Sustainable Fabrics' },
]

/* Auto-rotating hero stack — same three campaign shots as the drop
   page, cycling one at a time via a shared CSS animation offset by
   `:nth-child` delays (see .sl-hero-photo in StoryLanding.css). */
const heroPhotos = [
  { src: heroPortrait, alt: 'Portrait of a model in a navy hooded sweatshirt' },
  { src: heroFull, alt: 'Model in an oversized hoodie and wide-leg washed jeans' },
  { src: heroBack, alt: 'Model seen from behind wearing a navy hoodie and slouchy bag' },
]

const works = [
  { img: product1, tag: 'DENIM', label: 'Urban Commuter', handle: 'urban-commuter' },
  { img: product2, tag: 'OUTERWEAR', label: 'Charcoal Layer', handle: 'charcoal-layer' },
  { img: product3, tag: 'COATS', label: 'Winter Trench', handle: 'winter-trench' },
  { img: product4, tag: 'KNITWEAR', label: 'Soft Trench', handle: 'soft-trench' },
]

const stats = [
  { value: '6+', label: 'Years Designing', tone: 'indigo' },
  { value: '500+', label: 'Styles Shipped', tone: 'pink' },
  { value: '10K+', label: 'Happy Wearers', tone: 'denim' },
  { value: '12', label: 'Countries Served', tone: 'gold' },
]

const testimonials = [
  {
    quote: 'Vintage Blue completely changed how I dress for winter. Everything fits like it was made for me.',
    name: 'Jessica M.',
    role: 'Loyal Customer',
  },
  {
    quote: 'The quality and the fit are unmatched — I get compliments every single time I wear it.',
    name: 'Daniel K.',
    role: 'Verified Buyer',
  },
  {
    quote: 'Thoughtful design, honestly the best hoodies I own. Worth every penny.',
    name: 'Sophia L.',
    role: 'Repeat Customer',
  },
]

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function goHome(e: MouseEvent) {
  e.preventDefault()
  navigate('/')
}

function goDrop(e: MouseEvent) {
  e.preventDefault()
  navigate('/drop')
}

function StoryLanding() {
  return (
    <div className="sl-page">
      {/* ---------------- Nav ---------------- */}
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="sl-hero">
        <div className="sl-blob sl-blob-a" aria-hidden="true" />
        <div className="sl-blob sl-blob-b" aria-hidden="true" />
        <span className="sl-flower sl-flower-1" aria-hidden="true">
          ✳
        </span>
        <span className="sl-flower sl-flower-2" aria-hidden="true">
          ✦
        </span>

        <div className="sl-hero-copy">
          <Reveal>
            <h1 className="sl-headline">
              STYLE
              <br />
              THAT FEELS
              <br />
              <span className="sl-script">Right</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="sl-lede">
              Vintage Blue is an independent label crafting oversized layers, washed
              denim, and quiet-confidence basics that actually feel like you.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="sl-hero-actions">
              <a href="/drop" className="sl-btn-solid" onClick={goDrop}>
                View Collection <ArrowUpRight size={16} strokeWidth={1.8} />
              </a>
              <a href="#story" className="sl-btn-text">
                Our Story <ArrowRight size={15} strokeWidth={1.8} />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={100} className="sl-hero-figure-cell">
          <div className="sl-hero-figure">
            {heroPhotos.map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} className="sl-hero-photo" />
            ))}
          </div>
          <span className="sl-badge">
            Made
            <br />
            with care
          </span>
          <span className="sl-hero-dots" aria-hidden="true">
            <span className="sl-hero-dot" />
            <span className="sl-hero-dot" />
            <span className="sl-hero-dot" />
          </span>
        </Reveal>
      </section>

      {/* ---------------- Intro ---------------- */}
      <section className="sl-intro" id="story">
        <Reveal className="sl-intro-photo-cell">
          <div className="sl-intro-photo">
            <img src={product5} alt="Model in a grey wool coat" />
          </div>
        </Reveal>

        <Reveal delay={100} className="sl-intro-copy-cell">
          <div className="sl-intro-copy">
            <p className="sl-eyebrow">Hi, we're Vintage Blue.</p>
            <h2>An independent label for quiet, confident style.</h2>
            <p>
              We design oversized layers and washed denim meant to be lived in —
              comfort first, always with intention. Every drop starts with a
              question: would we actually wear this every day?
            </p>
            <p className="sl-signature">Vintage Blue</p>
          </div>
        </Reveal>

        <ul className="sl-specialties">
          {specialties.map(({ icon: Icon, label }) => (
            <li key={label}>
              <Icon size={20} strokeWidth={1.6} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Selected drops ---------------- */}
      <section className="sl-works">
        <div className="sl-works-panel">
          <Reveal className="sl-works-head">
            <h2>Selected Drops</h2>
            <a href="/drop" className="sl-pill-ghost" onClick={goDrop}>
              View all styles <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </Reveal>

          <div className="sl-works-grid">
            {works.map((w, i) => (
              <Reveal key={w.label} delay={i * 90} className="sl-work-cell">
                <a
                  href={`/product/${w.handle}`}
                  className="sl-work"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/product/${w.handle}`)
                  }}
                >
                  <span className="sl-work-tag">{w.tag}</span>
                  <div className="sl-work-img" style={{ backgroundImage: `url(${w.img})` }} />
                  <span className="sl-work-name">{w.label}</span>
                  <span className="sl-work-arrow">
                    <ArrowUpRight size={16} strokeWidth={1.8} />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Services + stats ---------------- */}
      <section className="sl-split">
        <Reveal className="sl-services">
          <h2>What We Do</h2>
          <ul>
            <li>
              <Shirt size={20} strokeWidth={1.6} />
              <div>
                <strong>Denim &amp; Outerwear</strong>
                <span>Washed fits cut to actually move with you.</span>
              </div>
            </li>
            <li>
              <Layers size={20} strokeWidth={1.6} />
              <div>
                <strong>Knitwear &amp; Layers</strong>
                <span>Soft fleece and knit pieces built for stacking.</span>
              </div>
            </li>
            <li>
              <Gem size={20} strokeWidth={1.6} />
              <div>
                <strong>Accessories</strong>
                <span>Bags, caps and the small stuff that finishes a fit.</span>
              </div>
            </li>
            <li>
              <Leaf size={20} strokeWidth={1.6} />
              <div>
                <strong>Sustainable Fabrics</strong>
                <span>Responsibly sourced materials, season after season.</span>
              </div>
            </li>
          </ul>
        </Reveal>

        <div className="sl-stats">
          <Reveal className="sl-stats-title">
            <h2>
              Vintage Blue
              <br />
              by the numbers
            </h2>
          </Reveal>
          <div className="sl-stats-grid">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="sl-stat-cell">
                <div className={`sl-stat sl-stat-${s.tone}`}>
                  <span className="sl-stat-value">{s.value}</span>
                  <span className="sl-stat-label">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Testimonials ---------------- */}
      <section className="sl-love">
        <Reveal>
          <h2>
            Customer Love <Heart size={22} strokeWidth={2} className="sl-love-heart" />
          </h2>
        </Reveal>

        <div className="sl-love-grid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 90} className="sl-quote-cell">
              <figure className="sl-quote">
                <span className="sl-quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="sl-avatar">{t.name.charAt(0)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <br />
                    {t.role}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <footer className="sl-cta">
        <span className="sl-flower sl-flower-3" aria-hidden="true">
          ✳
        </span>
        <Reveal>
          <h2 className="sl-cta-headline">
            LET'S STYLE
            <br />
            <span className="sl-script">Something Special</span>
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="sl-cta-row">
            <div className="sl-cta-contact">
              <a href="mailto:hello@vintageblue.studio">hello@vintageblue.studio</a>
              <span>@vintageblue.studio</span>
              <span>Worldwide Shipping</span>
            </div>
            <a href="/drop" className="sl-btn-solid" onClick={goDrop}>
              Shop Now <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </div>
        </Reveal>

        <a href="/" className="sl-back" onClick={goHome}>
          ← Back to the full site
        </a>
      </footer>
    </div>
  )
}

export default StoryLanding
