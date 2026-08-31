import type { CSSProperties, MouseEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './AboutLanding.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import about1 from './assets2/About1.png'
import about2 from './assets2/About2.png'
import about3 from './assets2/About3.png'

const regions = ['Punjab', 'J&K', 'Himachal Pradesh', 'Uttarakhand', 'W. Uttar Pradesh', 'Rajasthan', 'Jharkhand', 'Bihar']

const partners = ['The Souled Store', 'Octave Metal', 'Monte Carlo']

const values = ['Craftsmanship', 'Authenticity', 'Quality', 'Responsibility', 'Innovation', 'Timeless']

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

  return (
    <div className="ab-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="ab-block ab-block-hero">
        <img
          className="ab-block-img"
          style={parallax(0.08)}
          src={about1}
          alt="Model leaning against a weathered doorway in wide-leg denim"
        />
        <div className="ab-block-scrim ab-block-scrim-hero" aria-hidden="true" />

        <div className="ab-block-content ab-block-content-hero">
          <Reveal>
            <p className="ab-eyebrow">Est. 2006</p>
            <h1 className="ab-title">
              <span className="script-initial">A</span>bout Us
            </h1>
            <p className="ab-hero-lede">
              A dedicated denim label in 2006. A complete menswear brand today —
              built on fit, fabric, and finish.
            </p>
          </Reveal>

          <Reveal delay={100} className="ab-chip-row">
            {regions.map((r) => (
              <span key={r} className="ab-chip ab-chip-light">
                {r}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Story & craft ---------------- */}
      <section className="ab-block">
        <img
          className="ab-block-img"
          style={parallax(0.09)}
          src={about2}
          alt="Model walking through a convenience store aisle in relaxed denim"
        />
        <div className="ab-block-scrim" aria-hidden="true" />

        <Reveal className="ab-card ab-card-left">
          <p className="ab-eyebrow">Since 2006</p>
          <h2 className="ab-card-heading">Denim, Worn Like It’s Yours.</h2>
          <p className="ab-card-copy">
            Every fit comes from decades of textile expertise — trusted
            manufacturing partners and our sister company Indigo Multifab's 36
            years in fabric sourcing, with a growing shift to organic, recycled
            materials built to last.
          </p>

          <div className="ab-chip-row ab-chip-row-left">
            {partners.map((p) => (
              <span key={p} className="ab-chip ab-chip-light">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- Values + promise + CTA ---------------- */}
      <section className="ab-block ab-block-tall">
        <img className="ab-block-img" style={parallax(0.07)} src={about3} alt="" aria-hidden="true" />
        <div className="ab-block-scrim ab-block-scrim-strong" aria-hidden="true" />

        <div className="ab-block-content ab-block-content-center">
          <Reveal>
            <p className="ab-eyebrow">What We Stand For</p>
          </Reveal>

          <Reveal delay={60} className="ab-chip-row">
            {values.map((v) => (
              <span key={v} className="ab-chip ab-chip-light">
                {v}
              </span>
            ))}
          </Reveal>

          <Reveal delay={120} className="ab-promise">
            <p className="ab-promise-copy">
              to create thoughtfully designed menswear that combines premium
              quality, exceptional comfort, and contemporary style — crafted
              with integrity and made to be worn for years to come.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <a href="/shop/men" className="ab-cta-link" onClick={go('/shop/men')}>
              Shop The Collection <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>
      </section>

      <a href="/" className="ab-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default AboutLanding
