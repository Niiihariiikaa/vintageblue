import { useEffect, useRef, type CSSProperties } from 'react'
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  AlignRight,
  Shirt,
  Leaf,
  Gem,
} from 'lucide-react'
import './App.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import { useCart } from './cart'
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

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const products = [
  { name: 'Urban Commuter', price: '160 $', img: product1, handle: 'urban-commuter' },
  { name: 'Charcoal Layer', price: '185 $', img: product2, handle: 'charcoal-layer' },
  { name: 'Winter Trench', price: '210 $', img: product3, handle: 'winter-trench' },
  { name: 'Soft Trench', price: '260 $', img: product4, handle: 'soft-trench' },
  { name: 'Winter City Layer', price: '300 $', img: product5, handle: 'winter-city-layer' },
]

const categories = [
  { name: 'Essentials & Core', slug: 'unisex' },
  { name: 'Outerwear & Layers', slug: 'men' },
  { name: 'The Soft Palette', slug: 'women' },
  { name: 'Accessories', slug: 'unisex' },
]

const collectionLeft = ['Tees', 'Hoodies', 'Sweats', 'Knitwear', 'Denim', 'Outerwear']
const collectionRight = ['Joggers', 'Trousers', 'Skirts', 'Socks', 'Caps']

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

/* ------------------------------------------------------------------ */
/* App                                                                 */
/* ------------------------------------------------------------------ */

function App() {
  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)
  const { count } = useCart()

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
      <header className="nav">
        <button className="icon-btn" aria-label="Search">
          <Search size={19} strokeWidth={1.5} />
        </button>

        <a href="/" className="logo">
          <span className="script-initial">V</span>intage Blue
        </a>

        <nav className="nav-actions" aria-label="Account and cart">
          <a
            href="/cart"
            className="icon-btn cart-icon-btn"
            aria-label={`Cart, ${count} items`}
            onClick={(e) => {
              e.preventDefault()
              navigate('/cart')
            }}
          >
            {count > 0 && <span className="cart-count">{count}</span>}
            <ShoppingBag size={19} strokeWidth={1.5} />
          </a>
          <button className="icon-btn" aria-label="Wishlist">
            <Heart size={19} strokeWidth={1.5} />
          </button>
          <button className="icon-btn" aria-label="Account">
            <User size={19} strokeWidth={1.5} />
          </button>
          <button className="icon-btn" aria-label="Menu">
            <AlignRight size={19} strokeWidth={1.5} />
          </button>
        </nav>
      </header>

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

        <button className="shop-now" onClick={() => navigate('/shop/popular')}>
          SHOP NOW
        </button>
      </section>

      {/* ---------------- Ready-to-wear ---------------- */}
      <section className="rtw container">
        <Reveal>
          <div className="section-head">
            <h2 className="section-title">READY-TO-WEAR</h2>
            <a
              href="/shop/popular"
              className="see-more"
              onClick={(e) => {
                e.preventDefault()
                navigate('/shop/popular')
              }}
            >
              see more <LongArrow className="see-more-arrow" />
            </a>
          </div>
        </Reveal>

        <div className="product-grid">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="product-cell">
              <a
                href={`/product/${p.handle}`}
                className="product-card"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/product/${p.handle}`)
                }}
              >
                <div className="product-frame">
                  <div
                    className="product-img"
                    role="img"
                    aria-label={p.name}
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                </div>
                <footer className="product-meta">
                  <span className="product-name">{p.name}</span>
                  <span className="product-price">{p.price}</span>
                </footer>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="categories container">
        <Reveal>
          <h2 className="section-title">CATEGORIES</h2>
        </Reveal>

        <div className="cat-list">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i * 80}>
              <a
                href={`/shop/${c.slug}`}
                className="cat-row"
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/shop/${c.slug}`)
                }}
              >
                <span className="cat-name">{c.name}&nbsp;/</span>
                <LongArrow className="cat-arrow" />
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

      {/* ---------------- Collection banner ---------------- */}
      <section className="collection" aria-label="The Winter Edit collection">
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
            <h2>The Winter Edit</h2>
            <p className="collection-year">2026</p>
          </Reveal>
        </div>
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
            <a href="#">New In</a>
            <a href="#">Denim</a>
            <a href="#">Outerwear</a>
            <a href="#">Accessories</a>
          </div>
          <div className="footer-col">
            <h3>Company</h3>
            <a href="#">About</a>
            <a href="#">Journal</a>
            <a href="#">Stores</a>
          </div>
          <div className="footer-col">
            <h3>Support</h3>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Contact</a>
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
            <a
              href="/drop"
              onClick={(e) => {
                e.preventDefault()
                navigate('/drop')
              }}
            >
              New Drop
            </a>
            <a
              href="/story"
              onClick={(e) => {
                e.preventDefault()
                navigate('/story')
              }}
            >
              Our Story
            </a>
            <a
              href="/lookbook"
              onClick={(e) => {
                e.preventDefault()
                navigate('/lookbook')
              }}
            >
              Lookbook
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default App
