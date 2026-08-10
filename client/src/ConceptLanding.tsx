import type { MouseEvent } from 'react'
import Nav from './Nav'
import './ConceptLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import heroBack from './assets/heroleft.png'
import product4 from './assets/product4.png'
import heroBlackFront from './assets/heromiddle.png'

const principles = [
  {
    n: '01',
    title: 'Comfort Is Not Compromise',
    copy: 'Oversized doesn’t mean careless. Every relaxed fit is still cut, seamed, and proportioned on purpose.',
  },
  {
    n: '02',
    title: 'Color As Calm',
    copy: 'A palette pulled from denim washes and winter skies — nothing loud enough to fight with what you already own.',
  },
  {
    n: '03',
    title: 'Cut With Intention',
    copy: 'Volume where it earns its keep, structure where it doesn’t. No silhouette is oversized by accident.',
  },
  {
    n: '04',
    title: 'Make Less, Mean More',
    copy: 'Fewer pieces, worn more often, replaced less. Longevity is a design constraint, not an afterthought.',
  },
]

const palette = [
  { name: 'Indigo', hex: '#3A5571', varName: '--indigo' },
  { name: 'Denim', hex: '#94ACC1', varName: '--denim' },
  { name: 'Pastel Blue', hex: '#CDD9E5', varName: '--pastel-blue' },
  { name: 'Obsidian', hex: '#1F2327', varName: '--obsidian' },
  { name: 'Beige', hex: '#E8E6DA', varName: '--beige' },
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function ConceptLanding() {
  return (
    <div className="cn-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="cn-hero">
        <img src={heroBack} alt="Model seen from behind wearing a navy hoodie and slouchy bag" />
        <div className="cn-hero-scrim" />
        <Reveal className="cn-hero-copy">
          <p className="cn-eyebrow">The Concept</p>
          <h1>
            A Study In
            <br />
            Quiet Layers
          </h1>
          <p className="cn-hero-lede">
            Vintage Blue is built on a small set of ideas we don’t compromise on —
            here’s what they are.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Manifesto ---------------- */}
      <section className="cn-manifesto">
        {principles.map((p, i) => (
          <Reveal key={p.n} delay={i * 90} className="cn-principle-cell">
            <div className="cn-principle">
              <span className="cn-principle-n">{p.n}</span>
              <h2>{p.title}</h2>
              <p>{p.copy}</p>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ---------------- Palette ---------------- */}
      <section className="cn-palette">
        <Reveal>
          <p className="cn-eyebrow cn-eyebrow-dark">The Palette</p>
          <h2 className="cn-palette-heading">Every color earns its place.</h2>
        </Reveal>
        <div className="cn-swatches">
          {palette.map((c, i) => (
            <Reveal key={c.hex} delay={i * 70} className="cn-swatch-cell">
              <div className="cn-swatch">
                <span className="cn-swatch-chip" style={{ background: `var(${c.varName})` }} />
                <span className="cn-swatch-name">{c.name}</span>
                <span className="cn-swatch-hex">{c.hex}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Alternating sections ---------------- */}
      <section className="cn-feature">
        <Reveal className="cn-feature-img-cell">
          <div className="cn-feature-img">
            <img src={product4} alt="Model in an oversized wool coat" />
          </div>
        </Reveal>
        <Reveal delay={100} className="cn-feature-copy-cell">
          <p className="cn-eyebrow cn-eyebrow-dark">The Silhouette</p>
          <h2>Volume that still moves with you.</h2>
          <p>
            We start every piece from the body outward — how a shoulder actually sits,
            how a hem should fall when you sit down, walk, reach for something. Oversized
            is a decision, not a default.
          </p>
        </Reveal>
      </section>

      <section className="cn-feature cn-feature-reverse">
        <Reveal className="cn-feature-img-cell">
          <div className="cn-feature-img">
            <img src={heroBlackFront} alt="Model in a black oversized hoodie and wide jeans" />
          </div>
        </Reveal>
        <Reveal delay={100} className="cn-feature-copy-cell">
          <p className="cn-eyebrow cn-eyebrow-dark">The Fabric</p>
          <h2>Weight you can feel from across the room.</h2>
          <p>
            Brushed cotton fleece, heavyweight denim, wool blends with real drape — the
            kind of materials that look better a year in, not a year out.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Closing CTA ---------------- */}
      <section className="cn-cta">
        <Reveal>
          <h2>See It In Motion.</h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="cn-cta-actions">
            <a href="/lookbook" className="cn-btn-solid" onClick={go('/lookbook')}>
              View the Lookbook
            </a>
            <a href="/shop/popular" className="cn-btn-text" onClick={go('/shop/popular')}>
              Shop the Concept →
            </a>
          </div>
        </Reveal>
      </section>

      <a href="/" className="cn-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default ConceptLanding
