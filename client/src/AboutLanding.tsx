import type { CSSProperties, MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './AboutLanding.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import about1 from './assets2/About1.png'
import about2 from './assets2/About2.png'
import about3 from './assets2/About3.png'

const tickerItems = ['Free Shipping Over ₹2,999', '15-Day Returns', 'Made In Ludhiana Since 2006']

const stats = [
  { n: '2006', label: 'Founded' },
  { n: '36 YRS', label: 'Fabric Sourcing' },
  { n: '8', label: 'States Served' },
  { n: '100%', label: 'Made In India' },
]

const clothFacts = [
  {
    heading: 'Rope-Dyed Indigo',
    copy: 'Sourced through Indigo Multifab, our sister mill, for depth that fades rather than flattens.',
  },
  {
    heading: 'Fit Before Trend',
    copy: 'Blocks are tested on real bodies across four cities before a fit reaches production.',
  },
  {
    heading: 'Organic & Recycled',
    copy: 'A growing share of every drop, without trading away hand or durability.',
  },
]

const nonNegotiables = [
  {
    heading: 'Craftsmanship',
    copy: 'Stitch counts, seam finishing and hardware chosen to outlast the season.',
  },
  {
    heading: 'Authenticity',
    copy: 'No borrowed heritage — twenty years of our own patterns and mills.',
  },
  {
    heading: 'Quality',
    copy: 'Every batch checked twice: once at the mill, once before it ships.',
  },
  {
    heading: 'Responsibility',
    copy: 'Steady migration to organic and recycled fibre, tracked drop by drop.',
  },
  {
    heading: 'Innovation',
    copy: 'New washes and finishes developed in-house, not bought off a swatch card.',
  },
  {
    heading: 'Timeless',
    copy: 'Designed so the garment outlives the reason you bought it.',
  },
]

const regions = ['Punjab', 'J&K', 'Himachal Pradesh', 'Uttarakhand', 'W. Uttar Pradesh', 'Rajasthan', 'Jharkhand', 'Bihar']

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function AboutLanding() {
  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)
  const parallax = (rate: number): CSSProperties =>
    reducedMotion ? {} : { transform: `translate3d(0, ${scrollY * rate}px, 0)` }

  const ticker = (
    <>
      {tickerItems.map((item) => (
        <span className="ab-ticker-item" key={item}>
          {item} <span className="ab-ticker-dot">·</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="ab-page">
      <Nav />

      <div className="ab-ticker" aria-hidden="true">
        <div className="ab-ticker-track">
          {ticker}
          {ticker}
        </div>
      </div>

      {/* ---------------- Hero ---------------- */}
      <section className="ab-hero">
        <img className="ab-hero-img" style={parallax(0.08)} src={about1} alt="Model leaning against a weathered doorway in wide-leg denim" />
        <div className="ab-hero-scrim" aria-hidden="true" />

        <div className="ab-hero-content">
          <Reveal>
            <p className="ab-hero-eyebrow">
              Est. 2006 <span className="ab-rule" aria-hidden="true" /> Ludhiana
            </p>
            <h1 className="ab-hero-title">
              <span>About</span>
              <span className="ab-hero-title-accent">Us</span>
            </h1>
          </Reveal>

          <Reveal delay={100} className="ab-hero-lede">
            <p>
              A dedicated denim label in 2006. A complete menswear brand today —
              built on fit, fabric and finish, and nothing else.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Stats ---------------- */}
      <section className="ab-stats">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 60} className="ab-stat">
            <span className="ab-stat-n">{s.n}</span>
            <span className="ab-stat-label">{s.label}</span>
          </Reveal>
        ))}
      </section>

      {/* ---------------- 01 — The Cloth ---------------- */}
      <section className="ab-split">
        <div className="ab-split-media">
          <img className="ab-split-img" style={parallax(0.05)} src={about2} alt="Model walking through a convenience store aisle in relaxed denim" />
        </div>

        <div className="ab-split-copy">
          <Reveal>
            <p className="ab-eyebrow">
              01 <span className="ab-rule ab-rule-dark" aria-hidden="true" /> The Cloth
            </p>
            <h2 className="ab-split-heading">
              Denim, Worn Like <em>It's</em> Yours.
            </h2>
            <p className="ab-split-lede">
              Every fit comes from decades of textile expertise — trusted
              manufacturing partners and our sister company Indigo Multifab's
              36 years in fabric sourcing, with a growing shift to organic and
              recycled materials built to last.
            </p>
          </Reveal>

          <div className="ab-fact-list">
            {clothFacts.map((f, i) => (
              <Reveal key={f.heading} delay={i * 70} className="ab-fact">
                <span className="ab-fact-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{f.heading}</h3>
                  <p>{f.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 02 — What We Stand For ---------------- */}
      <section className="ab-values">
        <Reveal className="ab-values-head">
          <p className="ab-eyebrow">
            02 <span className="ab-rule ab-rule-dark" aria-hidden="true" /> What We Stand For
          </p>
          <span className="ab-values-tag">Six Non-Negotiables</span>
        </Reveal>

        <div className="ab-values-grid">
          {nonNegotiables.map((v, i) => (
            <Reveal key={v.heading} delay={i * 50} className="ab-value">
              <span className="ab-value-n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{v.heading}</h3>
              <p>{v.copy}</p>
            </Reveal>
          ))}
          <div className="ab-value-accent" aria-hidden="true" />
        </div>
      </section>

      {/* ---------------- 03 — Where We Are ---------------- */}
      <section className="ab-reach">
        <Reveal>
          <p className="ab-eyebrow">
            03 <span className="ab-rule ab-rule-dark" aria-hidden="true" /> Where We Are
          </p>
        </Reveal>

        <Reveal delay={60} className="ab-chip-row">
          {regions.map((r) => (
            <span key={r} className="ab-chip">
              {r}
            </span>
          ))}
        </Reveal>
      </section>

      {/* ---------------- Our promise ---------------- */}
      <section className="ab-promise">
        <img className="ab-promise-img" style={parallax(0.07)} src={about3} alt="" aria-hidden="true" />
        <div className="ab-promise-scrim" aria-hidden="true" />

        <Reveal className="ab-promise-content">
          <p className="ab-eyebrow ab-eyebrow-light">Our Promise</p>
          <h2 className="ab-promise-heading">
            Thoughtfully Designed Menswear, Made To Be Worn For Years.
          </h2>
          <a href="/shop/men" className="ab-promise-cta" onClick={go('/shop/men')}>
            Shop The Collection <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="ab-footer">
        <div className="ab-footer-brand">
          <p className="ab-footer-wordmark">
            <span className="script-initial">V</span>intage Blue
          </p>
          <p className="ab-footer-tag">Menswear built on fit, fabric, and finish. Ludhiana, Punjab — since 2006.</p>
        </div>

        <div className="ab-footer-col">
          <h3>Shop</h3>
          <a href="/shop/popular" onClick={go('/shop/popular')}>Popular</a>
          <a href="/drop" onClick={go('/drop')}>New Drop</a>
          <a href="/shop/men" onClick={go('/shop/men')}>Men</a>
          <a href="/shop/unisex" onClick={go('/shop/unisex')}>Unisex</a>
        </div>

        <div className="ab-footer-col">
          <h3>Brand</h3>
          <a href="/about" onClick={go('/about')}>About Us</a>
          <a href="/lookbook" onClick={go('/lookbook')}>Lookbook</a>
          <a href="/story" onClick={go('/story')}>Our Story</a>
          <a href="/contact" onClick={go('/contact')}>Contact Us</a>
        </div>

        <div className="ab-footer-col">
          <h3>Help</h3>
          <a href="#">Sizing &amp; Fit</a>
          <a href="#">Shipping &amp; Returns</a>
          <a href="#">Denim Care</a>
        </div>

        <div className="ab-footer-bottom">© 2026 Vintage Blue — All Rights Reserved</div>
      </footer>
    </div>
  )
}

export default AboutLanding
