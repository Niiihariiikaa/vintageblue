import type { MouseEvent } from 'react'
import { Check, ArrowUpRight } from 'lucide-react'
import Nav from './Nav'
import './AboutLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import promiseBg from './assets2/herobg.png'
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

const regions = [
  'Punjab',
  'Jammu & Kashmir',
  'Himachal Pradesh',
  'Uttarakhand',
  'Western Uttar Pradesh',
  'Rajasthan',
  'Jharkhand',
  'Bihar',
]

const partners = ['The Souled Store', 'Octave Metal', 'Monte Carlo']

const sustainability = [
  'Integrating organic and recycled materials into our collections.',
  'Recycling production waste and fabric remnants to reduce landfill impact.',
  'Continuously reducing our environmental footprint through responsible sourcing and efficient manufacturing.',
  'Creating durable garments designed to be worn, valued, and kept for years.',
]

const values = [
  'Craftsmanship',
  'Authenticity',
  'Quality Without Compromise',
  'Innovation',
  'Responsibility',
  'Reliability',
  'Customer-Centricity',
  'Continuous Evolution',
]

const personality = [
  'Contemporary',
  'Confident',
  'Authentic',
  'Refined',
  'Functional',
  'Sophisticated',
  'Dependable',
  'Progressive',
  'Purpose-Driven',
  'Timeless',
]

const whyVintageBlue = [
  'Nearly two decades of denim and menswear expertise.',
  'Premium fabrics with uncompromising attention to detail.',
  'Complete menswear collections for the modern wardrobe.',
  'Trusted manufacturing partner for leading retail brands.',
  'Strong distribution network across Northern and Eastern India.',
  'Backed by over 36 years of textile sourcing expertise through Indigo Multifab.',
  'Growing commitment to sustainable manufacturing and responsible innovation.',
  'Consistent quality, dependable service, and enduring value.',
]

const goals = [
  'Build Vintage Blue into a globally recognized premium menswear brand.',
  'Expand our retail and distribution presence across India and international markets.',
  'Lead with innovation in denim, fabrics, and garment technology.',
  'Strengthen long-term partnerships with retail and private-label brands.',
  'Increase the adoption of sustainable materials and responsible manufacturing practices.',
  'Deliver products that consistently exceed expectations in quality, comfort, and design.',
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

type Feature = (typeof features)[number]

function FeatureBanner({ img, alt, eyebrow, heading, copy }: Feature) {
  return (
    <section className="ab-feature">
      <img className="ab-feature-img" src={img} alt={alt} loading="lazy" />
      <Reveal className="ab-feature-card ab-feature-card-left">
        <p className="ab-eyebrow">{eyebrow}</p>
        <h2 className="ab-feature-heading">{heading}</h2>
        <p className="ab-feature-copy">{copy}</p>
      </Reveal>
    </section>
  )
}

function AboutLanding() {
  return (
    <div className="ab-page">
      <Nav />

      {/* ---------------- Hero / intro ---------------- */}
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
                Established in 2006, Vintage Blue Jeanswear was founded with a singular
                vision — to create denim that embodies authenticity, craftsmanship, and
                enduring style.
              </p>
              <p>
                What began as a dedicated men's denim label has evolved into a
                contemporary menswear brand, redefining everyday essentials with
                collections that seamlessly balance timeless design and modern
                functionality. Since expanding into a complete menswear portfolio in
                2022, Vintage Blue has introduced thoughtfully designed shirts,
                t-shirts, trousers, cargos, jackets, and elevated wardrobe staples for
                the modern man.
              </p>
              <p>
                Every garment is created with an uncompromising focus on fit, fabric,
                and finish — combining premium materials with refined construction to
                deliver clothing that feels as exceptional as it looks.
              </p>
              <p>
                Today, Vintage Blue Jeanswear proudly serves customers across Punjab,
                Jammu &amp; Kashmir, Himachal Pradesh, Uttarakhand, Western Uttar
                Pradesh, Rajasthan, Jharkhand, and Bihar, with a steadily expanding
                presence across India.
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

      <FeatureBanner {...features[0]} />

      {/* ---------------- Manufacturing excellence ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Manufacturing</p>
            <h2 className="ab-heading">built on manufacturing excellence</h2>
          </Reveal>

          <Reveal delay={80} className="ab-prose">
            <p>
              Behind every Vintage Blue garment is decades of textile expertise
              and manufacturing precision.
            </p>
            <p>
              Alongside our own collections, we partner with leading retailers and
              fashion brands like <strong>The Souled Store</strong>,{' '}
              <strong>Octave Metal</strong>, and <strong>Monte Carlo</strong>,
              among others, as a trusted manufacturing and private-label partner —
              delivering end-to-end apparel solutions with consistency, quality,
              and reliability.
            </p>
            <p>
              Our manufacturing ecosystem is further strengthened by our sister
              company, <strong>Indigo Multifab</strong>, a fabric sourcing and
              trading specialist with over 36 years of industry experience. This
              deep-rooted expertise allows us to innovate with premium fabrics,
              maintain rigorous quality standards, and respond to evolving market
              trends with confidence.
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

      {/* ---------------- Sustainability ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Sustainability</p>
            <h2 className="ab-heading">a responsible way forward</h2>
          </Reveal>

          <Reveal delay={80} className="ab-prose">
            <p>
              At Vintage Blue Jeanswear, we believe great fashion should leave a
              lasting impression — not a lasting environmental footprint.
              Sustainability continues to shape the way we design and manufacture
              our products through conscious material choices and responsible
              production practices.
            </p>
          </Reveal>

          <div className="ab-check-list">
            {sustainability.map((s, i) => (
              <Reveal key={s} delay={i * 60} className="ab-check-row">
                <Check size={16} strokeWidth={2} />
                <p>{s}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100} className="ab-prose">
            <p>
              Every step reflects our commitment to building a more responsible
              future for fashion.
            </p>
          </Reveal>
        </div>
      </section>

      <FeatureBanner {...features[1]} />

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
              meaningful partnerships with customers, retailers, and brands
              through innovation, integrity, and excellence.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Brand philosophy ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Brand Philosophy</p>
            <h2 className="ab-heading">great style is never excessive.</h2>
          </Reveal>

          <Reveal delay={80} className="ab-prose">
            <p>
              It is defined by confidence, simplicity, quality, and authenticity.
              Every collection is designed to become an essential part of a modern
              wardrobe — versatile enough for everyday life and timeless enough to
              outlast trends.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Values & personality ---------------- */}
      <section className="ab-section">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Brand Values</p>
          </Reveal>
          <Reveal delay={60} className="ab-chip-row">
            {values.map((v) => (
              <span key={v} className="ab-chip">
                {v}
              </span>
            ))}
          </Reveal>

          <Reveal delay={100}>
            <p className="ab-eyebrow ab-eyebrow-dark ab-mt">Brand Personality</p>
          </Reveal>
          <Reveal delay={140} className="ab-chip-row">
            {personality.map((p) => (
              <span key={p} className="ab-chip">
                {p}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Brand promise (dark banner) ---------------- */}
      <section className="ab-promise">
        <img className="ab-promise-bg" src={promiseBg} alt="" aria-hidden="true" />
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

      {/* ---------------- Why Vintage Blue (in-image feature) ---------------- */}
      <section className="ab-feature ab-feature-tall">
        <img
          className="ab-feature-img"
          src={about3}
          alt="Model pulling on a denim jacket in studio light"
          loading="lazy"
        />
        <div className="ab-feature-card-center-wrap">
          <Reveal className="ab-feature-card ab-feature-card-why">
            <h2 className="ab-feature-heading">Why Vintage Blue Jeanswear</h2>
            <div className="ab-feature-checklist">
              {whyVintageBlue.map((w) => (
                <div key={w} className="ab-feature-check-row">
                  <Check size={15} strokeWidth={2} />
                  <p>{w}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Our goals ---------------- */}
      <section className="ab-section ab-section-flush">
        <div className="ab-section-inner">
          <Reveal>
            <p className="ab-eyebrow ab-eyebrow-dark">Looking Ahead</p>
            <h2 className="ab-heading">our goals</h2>
          </Reveal>
        </div>

        <Reveal delay={80} className="ab-goals-marquee">
          <div className="ab-goals-track">
            {[...goals, ...goals].map((g, i) => (
              <div className="ab-goal-card" key={i} aria-hidden={i >= goals.length}>
                <span className="ab-goal-n">{String((i % goals.length) + 1).padStart(2, '0')}</span>
                <p>{g}</p>
              </div>
            ))}
          </div>
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
