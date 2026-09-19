import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Truck,
} from 'lucide-react'
import Nav from './Nav'
import './HeritageLanding.css'
import { navigate } from './router'
import { Reveal, useParallax, usePrefersReducedMotion, useScrollY } from './motion'
import { SERVICE_REGIONS, STUDIO, STUDIO_DIRECTIONS, STUDIO_MAP_EMBED } from './brand'
import heroBg from './assets2/herobg.png'
import heroCutout from './assets2/herocutout.png'
import craftPhoto from './assets2/About2.png'
import product1 from './assets2/product1.png'
import product2 from './assets2/product2.png'
import product3 from './assets2/product3.png'
import product4 from './assets2/product4.png'
import pant1 from './assets2/pants/pant1.png'
import pant2 from './assets2/pants/pant2.png'
import pant3 from './assets2/pants/pant3.png'
import pant4 from './assets2/pants/pant4.png'
import collectionVideo from './assets/video1.mp4'

const products = [
  { name: 'Shearling Trucker', price: '295 $', img: product1 },
  { name: 'Western Denim Shirt', price: '165 $', img: product2 },
  { name: 'Corduroy Overshirt', price: '210 $', img: product3 },
  { name: 'Classic Denim Jacket', price: '240 $', img: product4 },
]

const pantsProducts = [
  { name: 'Weekend Trouser — Olive', price: '140 $', img: pant1 },
  { name: 'Weekend Trouser — Black', price: '140 $', img: pant2 },
  { name: 'Weekend Trouser — Navy', price: '140 $', img: pant3 },
  { name: 'Weekend Trouser — Taupe', price: '140 $', img: pant4 },
]

const weekendLeft = ['Truckers', 'Overshirts', 'Chore Coats', 'Flannel', 'Shearling']
const weekendRight = ['Straight Leg', 'Wide Leg', 'Selvedge', 'Raw Denim']

/* The marquee strip that caps the first stacked card. */
const promises = [
  'Free Shipping Over ₹2,999',
  'Cut & Sewn In Ludhiana',
  '15-Day Easy Returns',
  'Rope-Dyed Indigo',
  'Est. 2006',
]

const categories = [
  { name: 'Denim & Wash', to: '/shop/denims' },
  { name: 'Outerwear & Layers', to: '/shop/men' },
  { name: 'Shirts & Overshirts', to: '/shop/shirts' },
  { name: 'Weekend Trousers', to: '/shop/pants' },
]

const craftStats = [
  { n: '2006', label: 'Founded' },
  { n: '8', label: 'States Served' },
  { n: '100%', label: 'Made In India' },
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

/**
 * One consistent section header for every band on the page: a numbered
 * index and display-serif title on the left, the supporting line and
 * the "see everything" link on the right, over a hairline rule.
 *
 * Every section used to announce itself with the same 12px uppercase
 * label, which flattened the whole page into one level of hierarchy —
 * the single biggest reason it read as unfinished.
 */
function SectionHead({
  index,
  title,
  blurb,
  cta,
  to,
  tone = 'light',
}: {
  index: string
  title: string
  blurb: string
  cta?: string
  to?: string
  tone?: 'light' | 'dark'
}) {
  return (
    <div className={`hr-head${tone === 'dark' ? ' hr-head-dark' : ''}`}>
      <Reveal className="hr-head-main">
        <span className="hr-head-index">{index}</span>
        <h2 className="hr-head-title">{title}</h2>
      </Reveal>

      <Reveal delay={120} className="hr-head-aside">
        <p className="hr-head-blurb">{blurb}</p>
        {cta && to && (
          <a href={to} className="hr-head-link" onClick={go(to)}>
            {cta} <ArrowUpRight size={14} strokeWidth={1.8} />
          </a>
        )}
      </Reveal>
    </div>
  )
}

/** A product row — used for both the outerwear edit and the trousers. */
function ProductRow({ items, to }: { items: { name: string; price: string; img: string }[]; to: string }) {
  return (
    <div className="hr-grid">
      {items.map((p, i) => (
        <Reveal key={p.name} delay={i * 90} className="hr-card-cell">
          <a href={to} className="hr-card" onClick={go(to)}>
            <div className="hr-card-img">
              <img src={p.img} alt={p.name} />
              <span className="hr-card-quick">
                View <ArrowUpRight size={12} strokeWidth={2} />
              </span>
            </div>
            <div className="hr-card-info">
              <span>{p.name}</span>
              <span>{p.price}</span>
            </div>
          </a>
        </Reveal>
      ))}
    </div>
  )
}

/** Footer newsletter row. Local-only: there's no mailing backend yet. */
function Subscribe() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <form
      className="hr-sub"
      onSubmit={(e) => {
        e.preventDefault()
        if (!email) return
        setDone(true)
        setEmail('')
      }}
    >
      <input
        type="email"
        required
        className="hr-sub-input"
        placeholder="your@email.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
          setDone(false)
        }}
      />
      <button type="submit" className="hr-sub-btn">
        {done ? (
          <>
            <Check size={14} strokeWidth={2.2} /> On The List
          </>
        ) : (
          <>
            Subscribe <ArrowRight size={14} strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  )
}

/** A clipping frame whose child drifts as the frame crosses the viewport. */
function ParallaxMedia({
  strength,
  className,
  children,
}: {
  strength: number
  className: string
  children: (style: CSSProperties) => ReactNode
}) {
  const { ref, style } = useParallax<HTMLDivElement>(strength)
  return (
    <div className={className} ref={ref}>
      {children(style)}
    </div>
  )
}

function HeritageLanding() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)

  /* The hero is pinned (`position: sticky`), so its own rect stops
     moving the moment it sticks — which is exactly when the interesting
     part of the scroll happens. Element-relative parallax would read a
     frozen rect and sit still, so the hero's layers are driven off raw
     scroll instead, capped at one hero-height of travel. Everything
     further down the page uses `useParallax`, which stays inside its
     own frame no matter how far down the page it sits. */
  const heroTravel = reducedMotion ? 0 : Math.min(scrollY, 900)
  const heroLayer = (rate: number): CSSProperties =>
    reducedMotion ? {} : { transform: `translate3d(0, ${heroTravel * rate}px, 0)` }
  const heroFade: CSSProperties = reducedMotion
    ? {}
    : { opacity: Math.max(0, 1 - heroTravel / 560) }

  /* Same fix used for the other video banners on the site: React's
   * `muted` JSX attribute doesn't reliably set the DOM *property*
   * before the browser checks autoplay eligibility, so it's set
   * imperatively here to guarantee muted autoplay actually starts. */
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {})
  }, [])

  const marquee = (
    <>
      {promises.map((p) => (
        <span className="hr-marquee-item" key={p}>
          {p}
          <span className="hr-marquee-dot" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </>
  )

  return (
    <div className="hr-page">
      <Nav />

      {/* The pinned cards live inside one wrapper on purpose: a sticky
          element stays stuck until its *containing block* ends, so with
          `.hr-page` as the container the first card stayed pinned for
          the whole page and reappeared in the gap above the footer.
          Bounding it here releases both pins as soon as the trousers
          card has finished covering the one above it. */}
      <div className="hr-stack">
        {/* ---------------- Hero ---------------- */}
        <section className="hr-hero" aria-label="Vintage Blue heritage denim">
          <div className="hr-hero-inner">
            <img className="hr-hero-bg" style={heroLayer(0.12)} src={heroBg} alt="" aria-hidden="true" />
            <div className="hr-hero-scrim" />

            <h1 className="hr-wordmark" style={{ ...heroLayer(0.16), ...heroFade }}>
              Vintage Blue
            </h1>

            <img
              className="hr-cutout"
              style={heroLayer(-0.035)}
              src={heroCutout}
              alt="Model wearing a shearling-collar denim jacket over dark wash jeans"
            />

            <p className="hr-hero-meta" aria-hidden="true">
              Est. 2006 <span className="hr-hero-meta-rule" /> Ludhiana, India
            </p>

            <Reveal className="hr-hero-copy">
              <p className="hr-eyebrow">Heritage Denim</p>
              <p className="hr-hero-lede">
                Twenty years of fit, fabric and finish — cut for the way men actually
                wear denim.
              </p>
              <a href="/shop/men" className="hr-cta" onClick={go('/shop/men')}>
                Shop The Collection <ArrowUpRight size={16} strokeWidth={1.8} />
              </a>
            </Reveal>

            <span className="hr-hero-scroll" style={heroFade} aria-hidden="true">
              Scroll
            </span>
          </div>
        </section>

        {/* ---------------- 01 — Outerwear edit (pins so the trousers card
             below can rise and cover it, continuing the stack) ------------ */}
        <section className="hr-card-section hr-card-sticky" id="hr-products">
          <div className="hr-marquee" aria-hidden="true">
            <div className="hr-marquee-track">
              {marquee}
              {marquee}
            </div>
          </div>

          <div className="hr-wrap">
            <SectionHead
              index="01"
              title="Built To Wear In."
              blurb="Heavy cotton, real hardware and washes that keep improving after the hundredth wear."
              cta="All Outerwear"
              to="/shop/men"
            />
            <ProductRow items={products} to="/shop/men" />
          </div>
        </section>

        {/* ---------------- 02 — Trousers ---------------- */}
        <section className="hr-card-section">
          <div className="hr-wrap">
            <SectionHead
              index="02"
              title="Weekend Trousers."
              blurb="A relaxed block in four colourways, cut from washed cotton twill that softens with every wash."
              cta="All Trousers"
              to="/shop/pants"
            />
            <ProductRow items={pantsProducts} to="/shop/pants" />
          </div>
        </section>
      </div>

      {/* ---------------- Craft split ---------------- */}
      <section className="hr-craft" aria-label="How we make it">
        <ParallaxMedia strength={0.16} className="hr-craft-media">
          {(style) => (
            <Reveal variant="mask" className="hr-craft-mask">
              <img className="hr-craft-img" style={style} src={craftPhoto} alt="Model walking through a lit store aisle in relaxed denim" />
            </Reveal>
          )}
        </ParallaxMedia>

        <div className="hr-craft-copy">
          <Reveal>
            <p className="hr-craft-eyebrow">The Making</p>
            <h2 className="hr-craft-title">Cut, sewn and washed under one roof.</h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="hr-craft-body">
              We started in 2006 as a denim label and never outsourced the part that
              matters. Indigo is rope-dyed at our sister mill, blocks are tested on
              real bodies across four cities, and every batch is checked twice before
              it ships.
            </p>
          </Reveal>

          <div className="hr-craft-stats">
            {craftStats.map((s, i) => (
              <Reveal key={s.label} delay={180 + i * 80} className="hr-craft-stat">
                <span className="hr-craft-stat-n">{s.n}</span>
                <span className="hr-craft-stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420}>
            <a href="/about" className="hr-craft-link" onClick={go('/about')}>
              Read Our Story <ArrowUpRight size={14} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- 03 — Categories ---------------- */}
      <section id="hr-categories" className="hr-card-section">
        <div className="hr-wrap">
          <SectionHead
            index="03"
            title="Shop By Category."
            blurb="Four ways in. Everything else lives in the full shop."
            cta="Browse Everything"
            to="/shop/men"
          />

          <ul className="hr-cats-list">
            {categories.map((c, i) => (
              <Reveal key={c.name} delay={i * 60}>
                <li>
                  <a href={c.to} className="hr-cats-row" onClick={go(c.to)}>
                    <span>{c.name} /</span>
                    <ArrowRight size={18} strokeWidth={1.6} />
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Weekend edit banner ---------------- */}
      <ParallaxMedia strength={0.14} className="hr-weekend">
        {(style) => (
          <>
            <video
              ref={videoRef}
              className="hr-weekend-bg"
              style={style}
              src={collectionVideo}
              autoPlay
              muted
              loop
              playsInline
              poster={product4}
              aria-hidden="true"
            />

            <div className="hr-weekend-panel">
              <ul className="hr-weekend-list hr-weekend-list-left">
                {weekendLeft.map((c, i) => (
                  <Reveal key={c} delay={i * 70}>
                    <li>{c}</li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="hr-weekend-panel">
              <ul className="hr-weekend-list hr-weekend-list-right">
                {weekendRight.map((c, i) => (
                  <Reveal key={c} delay={i * 70}>
                    <li>{c}</li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="hr-weekend-title">
              <Reveal>
                <p className="hr-weekend-eyebrow">Made For Off-Duty</p>
                <h2>The Weekend Edit</h2>
                <p className="hr-weekend-copy">
                  Heavier washes, softer layers. The pieces that carry a Saturday from the
                  porch to the road and back again.
                </p>
                <a href="/shop/men" className="hr-weekend-cta" onClick={go('/shop/men')}>
                  Shop The Edit <ArrowUpRight size={14} strokeWidth={1.8} />
                </a>
              </Reveal>
            </div>
          </>
        )}
      </ParallaxMedia>

      {/* ---------------- 04 — Find us ---------------- */}
      {/* A card again: with the lookbook gone it rises straight over
          the weekend banner, like every other section on the page. */}
      <section className="hr-card-section hr-visit">
        <div className="hr-wrap">
          <SectionHead
            index="04"
            title="Find The Workshop."
            blurb="Every pair is cut, sewn and washed at our studio in Ludhiana, then sent out across the north."
            cta="Contact Us"
            to="/contact"
          />

          <div className="hr-visit-grid">
            <Reveal className="hr-visit-info">
              <div className="hr-visit-block">
                <span className="hr-visit-label">
                  <MapPin size={14} strokeWidth={1.7} /> Studio
                </span>
                <p className="hr-visit-address">
                  {STUDIO.name}
                  <br />
                  {STUDIO.street}
                  <br />
                  {STUDIO.city}
                </p>
              </div>

              <div className="hr-visit-row">
                <div className="hr-visit-block">
                  <span className="hr-visit-label">
                    <Phone size={14} strokeWidth={1.7} /> Call · {STUDIO.hours}
                  </span>
                  <a className="hr-visit-link" href={STUDIO.phoneHref}>
                    {STUDIO.phone}
                  </a>
                </div>

                <div className="hr-visit-block">
                  <span className="hr-visit-label">
                    <Mail size={14} strokeWidth={1.7} /> Write
                  </span>
                  <a className="hr-visit-link" href={`mailto:${STUDIO.email}`}>
                    {STUDIO.email}
                  </a>
                </div>
              </div>

              <div className="hr-visit-block">
                <span className="hr-visit-label">
                  <Truck size={14} strokeWidth={1.7} /> {SERVICE_REGIONS.length} states we serve
                </span>
                <ul className="hr-visit-regions">
                  {SERVICE_REGIONS.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>

              <a
                className="hr-visit-directions"
                href={STUDIO_DIRECTIONS}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions <ArrowUpRight size={15} strokeWidth={1.8} />
              </a>
            </Reveal>

            {/* The frame behind the iframe is styled as a quiet map
                placeholder, so if the embed is blocked or slow the space
                still reads as intentional rather than broken. */}
            <Reveal delay={120} className="hr-visit-map">
              <iframe
                title={`Map showing the Vintage Blue studio in ${STUDIO.street}, ${STUDIO.city}`}
                src={STUDIO_MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="hr-footer">
        <div className="hr-footer-inner">
          <div className="hr-footer-top">
            <div>
              <p className="hr-footer-wordmark">Vintage Blue</p>
              <p className="hr-footer-tag">Heritage denim, reimagined.</p>
            </div>

            <div className="hr-footer-sub">
              <p className="hr-footer-sub-label">Drops, restocks and stories from the workshop. No noise.</p>
              <Subscribe />
            </div>
          </div>

          <div className="hr-footer-grid">
            <div className="hr-footer-col">
              <h3>Shop</h3>
              <a href="/shop/men" onClick={go('/shop/men')}>
                Men
              </a>
              <a href="/shop/denims" onClick={go('/shop/denims')}>
                Denim
              </a>
              <a href="/shop/pants" onClick={go('/shop/pants')}>
                Trousers
              </a>
              <a href="/drop" onClick={go('/drop')}>
                The Drop
              </a>
            </div>

            <div className="hr-footer-col">
              <h3>Brand</h3>
              <a href="/about" onClick={go('/about')}>
                About Us
              </a>
              <a href="/story" onClick={go('/story')}>
                Our Story
              </a>
              <a href="/concept" onClick={go('/concept')}>
                The Concept
              </a>
              <a href="/lookbook" onClick={go('/lookbook')}>
                Lookbook
              </a>
            </div>

            <div className="hr-footer-col">
              <h3>Help</h3>
              <a href="/contact" onClick={go('/contact')}>
                Contact Us
              </a>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">Size Guide</a>
            </div>

            <div className="hr-footer-col">
              <h3>Visit</h3>
              <p className="hr-footer-address">
                {STUDIO.name}
                <br />
                {STUDIO.street}
                <br />
                {STUDIO.city}
              </p>
            </div>
          </div>

          <div className="hr-footer-bottom">
            <span>© 2026 Vintage Blue Jeanswear</span>
            <span className="hr-footer-social">
              <a href="#">Instagram</a>
              <a href="#">Pinterest</a>
              <a href="#">TikTok</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HeritageLanding
