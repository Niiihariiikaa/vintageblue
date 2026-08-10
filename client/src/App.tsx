import { useEffect, useRef, type CSSProperties, type MouseEvent } from 'react'
import { Shirt, Leaf, Gem, Star } from 'lucide-react'
import './App.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import Nav from './Nav'
import { PRODUCTS, formatPrice } from './catalog'
import heroBack from './assets/heroleft.png'
import heroFull from './assets/hero.png'
import heroPortrait from './assets/heroright.png'
import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product3 from './assets/product3.png'
import product4 from './assets/product4.png'
import product5 from './assets/product5.png'
import collectionVideo from './assets/video1.mp4'

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const LongArrow = ({ className = '' }: { className?: string }) => (
  <svg
    className={className}
    width="34"
    height="12"
    viewBox="0 0 34 12"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
  >
    <line x1="1" y1="6" x2="31" y2="6" />
    <path d="M26 1.5 31.5 6 26 10.5" />
  </svg>
)

const Stars = () => (
  <span className="stars" aria-hidden="true">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={11} strokeWidth={0} fill="currentColor" />
    ))}
  </span>
)

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const shopCategories = [
  {
    name: 'Hoodies',
    slug: 'unisex',
    copy: 'Oversized fits. Everyday comfort.',
    img: heroFull,
  },
  {
    name: 'Denim',
    slug: 'men',
    copy: 'Washed, worn, timeless.',
    img: product1,
  },
  {
    name: 'Outerwear',
    slug: 'women',
    copy: 'Layers built for real winters.',
    img: product5,
  },
  {
    name: 'Accessories',
    slug: 'unisex',
    copy: 'The details that finish a fit.',
    img: product2,
  },
]

const newArrivals = [
  { name: 'Urban Commuter', price: '160 $', img: product1, handle: 'urban-commuter', badge: 'Bestseller' },
  { name: 'Charcoal Layer', price: '185 $', img: product2, handle: 'charcoal-layer', badge: 'New' },
  { name: 'Winter Trench', price: '210 $', img: product3, handle: 'winter-trench', badge: null },
  { name: 'Soft Trench', price: '260 $', img: product4, handle: 'soft-trench', badge: 'Limited' },
  { name: 'Winter City Layer', price: '300 $', img: product5, handle: 'winter-city-layer', badge: null },
]

const bestsellers = PRODUCTS.filter((p) => p.popular)

const collectionLeft = ['Tees', 'Hoodies', 'Sweats', 'Knitwear', 'Denim', 'Outerwear']
const collectionRight = ['Joggers', 'Trousers', 'Skirts', 'Socks', 'Caps']

const fitTags = ['Oversized', 'Relaxed', 'Tailored']

const denimCards = [
  { title: 'Raw', copy: 'Deep indigo. Clean finish.' },
  { title: 'Washed', copy: 'Softened. Lived-in.' },
  { title: 'Faded', copy: 'Character from day one.' },
]

const looks = [
  {
    n: '01',
    title: 'The Everyday',
    copy: 'Signature Hoodie, wide-leg denim, canvas sneakers.',
    img: heroFull,
    handle: 'signature-hoodie-navy',
  },
  {
    n: '02',
    title: 'After Hours',
    copy: 'Charcoal Layer jacket, tapered trousers, boots.',
    img: product2,
    handle: 'charcoal-layer',
  },
  {
    n: '03',
    title: 'The Weekender',
    copy: 'Urban Commuter sweatshirt, duffel, trainers.',
    img: product1,
    handle: 'urban-commuter',
  },
]

const journalPosts = [
  { tag: 'Style Guide', title: 'How To Build A Capsule Wardrobe' },
  { tag: 'Fit Notes', title: 'The Perfect Hoodie: A Fit Guide' },
  { tag: 'Style Guide', title: '5 Ways To Style Wide-Leg Denim' },
]

const instagramImages = [heroBack, product2, heroPortrait, product4, product1, product5]

const values = [
  {
    icon: Leaf,
    label: 'Sustainable Fabrics',
    copy: 'Responsibly sourced materials, season after season.',
  },
  {
    icon: Gem,
    label: 'Considered Craft',
    copy: 'Small-batch pieces, finished with care.',
  },
  {
    icon: Shirt,
    label: 'Made To Last',
    copy: 'Cut generously, built to outlive the trend cycle.',
  },
]

const marqueeItems = [
  'Vintage Blue',
  'Ready-to-Wear',
  'Winter 2026',
  'Washed Denim',
  'Soft Layers',
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)

  const parallax = (rate: number): CSSProperties =>
    reducedMotion ? {} : { transform: `translate3d(0, ${scrollY * rate}px, 0)` }

  const panelVideo = useRef<HTMLVideoElement>(null)

  /* Same fix as the lookbook page's banner video: React's `muted` JSX
   * attribute doesn't reliably set the DOM *property* before the
   * browser checks autoplay eligibility, so it's set imperatively
   * here to guarantee muted autoplay actually starts. */
  useEffect(() => {
    const el = panelVideo.current
    if (!el) return
    el.muted = true
    el.play().catch(() => {})
  }, [])

  const marqueeRow = (
    <>
      {marqueeItems.map((item) => (
        <span className="marquee-item" key={item}>
          {item} <span className="marquee-star">✦</span>
        </span>
      ))}
    </>
  )

  return (
    <div className="page">
      {/* ---------------- Navigation ---------------- */}
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="hero" aria-label="Vintage Blue winter collection">
        <div className="figure figure-left" style={parallax(0.16)}>
          <img src={heroBack} alt="Model seen from behind wearing a navy hoodie and slouchy bag" />
        </div>

        <div className="figure figure-right" style={parallax(0.12)}>
          <img src={heroPortrait} alt="Portrait of a model in a navy hooded sweatshirt" />
        </div>

        <h1 className="wordmark" style={parallax(-0.08)}>
          <span className="script-initial">V</span>intage Blue
        </h1>

        <div className="figure figure-mid" style={parallax(0.06)}>
          <img src={heroFull} alt="Model in an oversized hoodie and wide-leg washed jeans" />
        </div>

        <div className="hero-cta">
          <button className="shop-now" onClick={() => navigate('/shop/popular')}>
            SHOP THE COLLECTION →
          </button>
        </div>
      </section>

      {/* ---------------- Shop by category ---------------- */}
      <section className="shop-cats container">
        <Reveal>
          <h2 className="section-title">Shop By Category</h2>
        </Reveal>

        <div className="shop-cats-grid">
          {shopCategories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} className="shop-cat-cell">
              <a href={`/shop/${c.slug}`} className="shop-cat" onClick={go(`/shop/${c.slug}`)}>
                <div className="shop-cat-img">
                  <img src={c.img} alt={c.name} />
                </div>
                <h3>{c.name}</h3>
                <p>{c.copy}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- New arrivals ---------------- */}
      <section className="rtw container">
        <Reveal>
          <div className="section-head">
            <div>
              <h2 className="section-title">The Latest Edit</h2>
              <p className="section-subtitle">New pieces, rooted in timeless style.</p>
            </div>
            <a href="/shop/popular" className="see-more" onClick={go('/shop/popular')}>
              see more <LongArrow className="see-more-arrow" />
            </a>
          </div>
        </Reveal>

        <div className="product-grid">
          {newArrivals.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="product-cell">
              <a href={`/product/${p.handle}`} className="product-card" onClick={go(`/product/${p.handle}`)}>
                <div className="product-frame">
                  {p.badge && <span className="product-badge">{p.badge}</span>}
                  <div
                    className="product-img"
                    role="img"
                    aria-label={p.name}
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                </div>
                <footer className="product-meta">
                  <span className="product-name">{p.name}</span>
                  <Stars />
                  <span className="product-price">{p.price}</span>
                </footer>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Marquee ---------------- */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {marqueeRow}
          {marqueeRow}
        </div>
      </div>

      {/* ---------------- Editorial / collection banner ---------------- */}
      <section className="collection" aria-label="Made to be worn">
        <video
          ref={panelVideo}
          className="collection-bg"
          style={parallax(0.05)}
          src={collectionVideo}
          autoPlay
          muted
          loop
          playsInline
          poster={product1}
          aria-hidden="true"
        />

        <div className="panel">
          <ul className="panel-list panel-list-left">
            {collectionLeft.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <li>{c}</li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="panel">
          <ul className="panel-list panel-list-right">
            {collectionRight.map((c, i) => (
              <Reveal key={c} delay={i * 70}>
                <li>{c}</li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="collection-title">
          <Reveal>
            <p className="collection-eyebrow">Made To Be Worn</p>
            <h2>The Winter Edit</h2>
            <p className="collection-copy">
              Not saved for special occasions. Vintage Blue is built around pieces that
              become part of your story — worn, lived in, and made your own.
            </p>
            <a href="/story" className="collection-cta" onClick={go('/story')}>
              Explore the Story →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Bestsellers ---------------- */}
      <section className="bestsellers container">
        <Reveal>
          <p className="eyebrow">Bestsellers</p>
          <h2 className="section-title">The Ones You Keep Reaching For</h2>
        </Reveal>

        <div className="best-grid">
          {bestsellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="best-cell">
              <a href={`/product/${p.handle}`} className="best-card" onClick={go(`/product/${p.handle}`)}>
                <div className="best-img">
                  <img src={p.images[0]} alt={p.name} />
                </div>
                <div className="best-info">
                  <span>{p.name}</span>
                  <span>{formatPrice(p.price)}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- The Vintage Blue Fit ---------------- */}
      <section className="fit-split">
        <Reveal className="fit-img-cell">
          <div className="fit-img">
            <img src={product3} alt="Model in a relaxed wool trench" />
          </div>
        </Reveal>
        <Reveal delay={100} className="fit-copy-cell">
          <p className="eyebrow">The Vintage Blue Fit</p>
          <h2>Relaxed where it matters. Structured where it counts.</h2>
          <p>
            Our silhouettes are designed around effortless everyday dressing — easy
            proportions, considered details, and room to move.
          </p>
          <a href="/shop/popular" className="fit-cta" onClick={go('/shop/popular')}>
            Discover Our Fits →
          </a>
          <ul className="fit-tags">
            {fitTags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ---------------- Denim story ---------------- */}
      <section className="denim container">
        <Reveal>
          <p className="eyebrow">Denim Story</p>
          <h2 className="section-title">Blue, With A History.</h2>
          <p className="denim-lede">
            From deep indigo to worn-in washes, every pair is designed to age
            beautifully.
          </p>
          <a href="/shop/men" className="denim-cta" onClick={go('/shop/men')}>
            Shop Denim →
          </a>
        </Reveal>

        <div className="denim-grid">
          {denimCards.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="denim-card">
                <h3>{d.title}</h3>
                <p>{d.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Style edit ---------------- */}
      <section className="style-edit container">
        <Reveal>
          <h2 className="section-title">The Weekend Edit</h2>
        </Reveal>

        <div className="looks-grid">
          {looks.map((l, i) => (
            <Reveal key={l.n} delay={i * 90} className="look-cell">
              <div className="look">
                <div className="look-img">
                  <img src={l.img} alt={l.title} />
                </div>
                <span className="look-n">{l.n}</span>
                <h3>{l.title}</h3>
                <p>{l.copy}</p>
                <a href={`/product/${l.handle}`} className="look-cta" onClick={go(`/product/${l.handle}`)}>
                  Shop the Look →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Brand story ---------------- */}
      <section className="brand-story">
        <Reveal className="brand-story-copy-cell">
          <div className="brand-story-copy">
            <h2>
              Not Trend-Driven.
              <br />
              Time-Driven.
            </h2>
            <p>
              Vintage Blue was created around a simple idea — good clothes shouldn't
              have an expiry date. Inspired by the effortless style of another era and
              made for the way people dress today, we create essentials designed to
              live beyond a season.
            </p>
            <a href="/concept" className="brand-story-cta" onClick={go('/concept')}>
              Our Story →
            </a>
          </div>
        </Reveal>
        <Reveal delay={100} className="brand-story-img-cell">
          <div className="brand-story-img">
            <img src={heroPortrait} alt="Portrait of a model in a navy hooded sweatshirt" />
          </div>
        </Reveal>
      </section>

      {/* ---------------- Values ---------------- */}
      <section className="values container">
        <Reveal>
          <p className="eyebrow">✦ Why Vintage Blue</p>
        </Reveal>

        <ul className="values-grid">
          {values.map(({ icon: Icon, label, copy }, i) => (
            <Reveal key={label} delay={i * 80}>
              <li className="value">
                <Icon size={26} strokeWidth={1.3} />
                <h3>{label}</h3>
                <p>{copy}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------- Journal ---------------- */}
      <section className="journal container">
        <Reveal>
          <h2 className="section-title">From the Journal</h2>
        </Reveal>

        <div className="journal-grid">
          {journalPosts.map((p, i) => (
            <Reveal key={p.title} delay={i * 90} className="journal-cell">
              <a href="/story" className="journal-card" onClick={go('/story')}>
                <span className="journal-tag">{p.tag}</span>
                <h3>{p.title}</h3>
                <span className="journal-read">Read the story →</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Instagram ---------------- */}
      <section className="insta">
        <Reveal>
          <p className="eyebrow">@vintageblue.studio</p>
          <h2 className="section-title">Worn Your Way.</h2>
        </Reveal>

        <div className="insta-grid">
          {instagramImages.map((img, i) => (
            <Reveal key={img} delay={i * 60} className="insta-cell">
              <div className="insta-img">
                <img src={img} alt="" />
              </div>
            </Reveal>
          ))}
        </div>

        <a href="#" className="insta-cta">
          Follow Along →
        </a>
      </section>

      {/* ---------------- Newsletter ---------------- */}
      <section className="newsletter container">
        <Reveal>
          <h2>Stay In The Blue.</h2>
          <p className="newsletter-lede">New collections, stories, and things worth knowing.</p>
          <form
            className="newsletter-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="email" placeholder="Your email address" aria-label="Email address" required />
            <button type="submit">Join Us</button>
          </form>
          <p className="newsletter-note">10% off your first order.</p>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="footer">
        <Reveal>
          <p className="footer-wordmark">
            <span className="script-initial">V</span>intage Blue
          </p>
        </Reveal>

        <div className="footer-grid">
          <div className="footer-col">
            <h3>Shop</h3>
            <a href="/shop/popular" onClick={go('/shop/popular')}>New Arrivals</a>
            <a href="/shop/men" onClick={go('/shop/men')}>Men</a>
            <a href="/shop/women" onClick={go('/shop/women')}>Women</a>
            <a href="/shop/unisex" onClick={go('/shop/unisex')}>Unisex</a>
            <a href="/shop/popular" onClick={go('/shop/popular')}>Bestsellers</a>
          </div>
          <div className="footer-col">
            <h3>About</h3>
            <a href="/story" onClick={go('/story')}>Our Story</a>
            <a href="/concept" onClick={go('/concept')}>The Concept</a>
            <a href="/lookbook" onClick={go('/lookbook')}>Lookbook</a>
            <a href="/drop" onClick={go('/drop')}>New Drop</a>
          </div>
          <div className="footer-col">
            <h3>Help</h3>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Size Guide</a>
            <a href="#">FAQs</a>
          </div>
          <div className="footer-col footer-note">
            <h3>Stay in the loop</h3>
            <p>Drops, restocks and stories from the studio. No noise.</p>
            <a href="#" className="pill pill-ghost">
              Subscribe <LongArrow />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Vintage Blue</span>
          <span className="footer-social">
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">TikTok</a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
