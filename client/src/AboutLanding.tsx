import type { CSSProperties, MouseEvent } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './AboutLanding.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import about1 from './assets2/About1.png'
import about2 from './assets2/About2.png'
import about3 from './assets2/About3.png'

const features = [
  {
    img: about1,
    alt: 'Model leaning against a weathered doorway in wide-leg denim',
    eyebrow: 'Since 2006',
    heading: 'Denim, Worn Like It’s Yours.',
    copy: 'Not styled for a shoot — styled for the street. Every fit is built to lean into a doorway, catch the light, and mean it.',
  },
  {
    img: about2,
    alt: 'Model walking through a convenience store aisle in relaxed denim',
    eyebrow: 'Everyday Wear',
    heading: 'Built For The Real Day.',
    copy: 'Late-night runs, long shifts, longer weekends — our fits move the way life actually happens, not just how it photographs.',
  },
]

const regions = ['Punjab', 'J&K', 'Himachal Pradesh', 'Uttarakhand', 'W. Uttar Pradesh', 'Rajasthan', 'Jharkhand', 'Bihar']

const partners = ['The Souled Store', 'Octave Metal', 'Monte Carlo']

const values = [
  'Craftsmanship',
  'Authenticity',
  'Quality Without Compromise',
  'Responsibility',
  'Innovation',
  'Timeless',
]

const sustainability = [
  'Organic and recycled materials, used across our collections.',
  'Garments built to be worn for years, not one season.',
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

type Feature = (typeof features)[number]

function FeatureBanner({ img, alt, eyebrow, heading, copy, imgStyle }: Feature & { imgStyle: CSSProperties }) {
  return (
    <section className="ab-feature">
      <img className="ab-feature-img" style={imgStyle} src={img} alt={alt} loading="lazy" />
      <div className="ab-feature-scrim" aria-hidden="true" />
      <Reveal className="ab-feature-card ab-feature-card-left">
        <p className="ab-eyebrow">{eyebrow}</p>
        <h2 className="ab-feature-heading">{heading}</h2>
        <p className="ab-feature-copy">{copy}</p>
      </Reveal>
    </section>
  )
}

function AboutLanding() {
  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)
  const parallax = (rate: number): CSSProperties =>
    reducedMotion ? {} : { transform: `translate3d(0, ${scrollY * rate}px, 0)` }

  return (
    <div className="ab-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="ab-hero">
        <div className="ab-hero-grid">
          <Reveal className="ab-hero-heading">
            <p className="ab-eyebrow">Est. 2006</p>
            <h1 className="ab-title">
              <span className="script-initial">A</span>bout Us
            </h1>
            <span className="ab-rule" aria-hidden="true" />
          </Reveal>

          <div className="ab-hero-copy">
            <Reveal delay={80} className="ab-prose">
              <p>
                Vintage Blue Jeanswear started in 2006 as a dedicated men's denim
                label and has grown into a complete menswear brand — shirts,
                trousers, jackets, and everyday staples, all built on the same
                three things: fit, fabric, and finish.
              </p>
            </Reveal>

            <Reveal delay={120} className="ab-chip-row">
              {regions.map((r) => (
                <span key={r} className="ab-chip">
                  {r}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <FeatureBanner {...features[0]} imgStyle={parallax(0.09)} />

      {/* ---------------- Craft ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Manufacturing</p>
            <h2 className="ab-heading">built on manufacturing excellence</h2>
          </Reveal>

          <Reveal delay={80} className="ab-prose">
            <p>
              Behind every garment is decades of textile expertise. We partner
              with retailers like <strong>The Souled Store</strong>,{' '}
              <strong>Octave Metal</strong>, and <strong>Monte Carlo</strong> as
              a trusted manufacturing partner, backed by our sister company{' '}
              <strong>Indigo Multifab</strong>'s 36 years in fabric sourcing.
            </p>
          </Reveal>

          <Reveal delay={120} className="ab-chip-row">
            {partners.map((p) => (
              <span key={p} className="ab-chip">
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      <FeatureBanner {...features[1]} imgStyle={parallax(0.06)} />

      {/* ---------------- Values ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">What We Stand For</p>
          </Reveal>
          <Reveal delay={60} className="ab-chip-row">
            {values.map((v) => (
              <span key={v} className="ab-chip">
                {v}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Sustainability ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Sustainability</p>
            <h2 className="ab-heading">a responsible way forward</h2>
          </Reveal>

          <div className="ab-check-list ab-check-list-center">
            {sustainability.map((s) => (
              <Reveal key={s} className="ab-check-row">
                <Check size={16} strokeWidth={2} />
                <p>{s}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Vision & Mission ---------------- */}
      <section className="ab-section">
        <div className="ab-duo">
          <Reveal className="ab-duo-cell">
            <p className="ab-eyebrow ab-eyebrow-dark">Our Vision</p>
            <p className="ab-duo-copy">
              To become one of India's most admired menswear brands by combining
              exceptional craftsmanship, progressive design, and responsible
              manufacturing into products that stand the test of time.
            </p>
          </Reveal>

          <Reveal delay={80} className="ab-duo-cell">
            <p className="ab-eyebrow ab-eyebrow-dark">Our Mission</p>
            <p className="ab-duo-copy">
              To create contemporary menswear that delivers uncompromising
              quality, refined aesthetics, and lasting value while building
              meaningful partnerships through innovation, integrity, and
              excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Brand promise ---------------- */}
      <section className="ab-promise">
        <img className="ab-promise-bg" style={parallax(0.07)} src={about3} alt="" aria-hidden="true" />
        <div className="ab-promise-scrim" />
        <Reveal className="ab-promise-inner">
          <p className="ab-eyebrow">Brand Promise</p>
          <p className="ab-promise-copy">
            to create thoughtfully designed menswear that combines premium
            quality, exceptional comfort, and contemporary style — crafted with
            integrity and made to be worn for years to come.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="ab-cta">
        <Reveal>
          <h2>Wear The Story.</h2>
          <a href="/shop/men" className="ab-cta-link" onClick={go('/shop/men')}>
            Shop The Collection <ArrowUpRight size={16} strokeWidth={1.8} />
          </a>
        </Reveal>
      </section>

      <a href="/" className="ab-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default AboutLanding
