import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react'
import Nav from './Nav'
import './HeritageLanding.css'
import { navigate } from './router'
import { Reveal, usePrefersReducedMotion, useScrollY } from './motion'
import { getProductByHandle, formatPrice } from './catalog'
import { useCart } from './cart'
import heroBg from './assets2/herobg.png'
import heroCutout from './assets2/herocutout.png'
import product1 from './assets2/product1.png'
import product2 from './assets2/product2.png'
import product3 from './assets2/product3.png'
import product4 from './assets2/product4.png'
import collectionVideo from './assets/video1.mp4'
import model1 from './assets2/Model1.png'
import model1Shirt from './assets2/model1-shirt.png'
import model1Jeans from './assets2/model1-jeans.png'
import model2 from './assets2/model2.png'
import model2Shirt from './assets2/model2-shirt.png'
import model2Jeans from './assets2/model2-jeans.png'

interface LookItem {
  img: string
  label: string
  handle: string
  rating: number
  reviews: number
}

const anatomyLooks: {
  title: string
  model: string
  modelAlt: string
  shirt: LookItem
  jeans: LookItem
}[] = [
  {
    title: 'Corduroy shirt in washed sand, worn open over relaxed denim.',
    model: model1,
    modelAlt: 'Model wearing a tan corduroy shirt and wide-leg jeans',
    shirt: { img: model1Shirt, label: 'The Shirt', handle: 'garment-dyed-overshirt', rating: 4.8, reviews: 132 },
    jeans: { img: model1Jeans, label: 'The Denim', handle: 'wide-leg-denim', rating: 4.6, reviews: 87 },
  },
  {
    title: 'Shearling-collar trucker layered over black wash denim.',
    model: model2,
    modelAlt: 'Model wearing a shearling-collar corduroy trucker jacket and black jeans',
    shirt: { img: model2Shirt, label: 'The Jacket', handle: 'charcoal-layer', rating: 4.9, reviews: 204 },
    jeans: { img: model2Jeans, label: 'The Denim', handle: 'raw-selvedge-jean', rating: 4.7, reviews: 96 },
  },
]

const products = [
  { name: 'Shearling Trucker', price: '295 $', img: product1 },
  { name: 'Western Denim Shirt', price: '165 $', img: product2 },
  { name: 'Corduroy Overshirt', price: '210 $', img: product3 },
  { name: 'Classic Denim Jacket', price: '240 $', img: product4 },
]

const weekendLeft = ['Truckers', 'Overshirts', 'Chore Coats', 'Flannel', 'Shearling']
const weekendRight = ['Straight Leg', 'Wide Leg', 'Selvedge', 'Raw Denim']

const categories = ['Denim & Wash', 'Outerwear & Layers', 'Shirts & Overshirts', 'Accessories']

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

/**
 * Replaces the old side "peek" preview of the next/prev look (a
 * faded, low-contrast thumbnail people found hard to read) with a
 * proper shoppable card for one piece of the *current* look — photo,
 * rating, price pulled live from the catalog, and a real add-to-cart
 * action with its own confirmation state.
 */
function ShopLookCard({ item }: { item: LookItem }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const product = getProductByHandle(item.handle)
  if (!product) return null

  const handleAdd = () => {
    addItem(product.handle, 'M', 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="hr-shop-card">
      <a href={`/product/${product.handle}`} className="hr-shop-card-img" onClick={go(`/product/${product.handle}`)}>
        <img src={item.img} alt={product.name} />
        <span className="hr-shop-card-tag">{item.label}</span>
      </a>

      <div className="hr-shop-card-body">
        <a
          href={`/product/${product.handle}`}
          className="hr-shop-card-name"
          onClick={go(`/product/${product.handle}`)}
        >
          {product.name}
        </a>

        <div className="hr-shop-card-rating">
          <span className="hr-shop-card-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} strokeWidth={0} fill="currentColor" />
            ))}
          </span>
          <span>
            {item.rating} ({item.reviews})
          </span>
        </div>

        <div className="hr-shop-card-footer">
          <span className="hr-shop-card-price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className={`hr-shop-card-add${added ? ' added' : ''}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={13} strokeWidth={2.4} /> Added
              </>
            ) : (
              <>
                <Plus size={13} strokeWidth={2.4} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function HeritageLanding() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [look, setLook] = useState(0)
  const active = anatomyLooks[look]

  const prevLook = () => setLook((i) => (i - 1 + anatomyLooks.length) % anatomyLooks.length)
  const nextLook = () => setLook((i) => (i + 1) % anatomyLooks.length)

  const reducedMotion = usePrefersReducedMotion()
  const scrollY = useScrollY(reducedMotion)
  const parallax = (rate: number): CSSProperties =>
    reducedMotion ? {} : { transform: `translate3d(0, ${scrollY * rate}px, 0)` }

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

  return (
    <div className="hr-page">
      <Nav />

      {/* ---------------- Hero ---------------- */}
      <section className="hr-hero" aria-label="Vintage Blue heritage denim">
        <div className="hr-hero-inner">
          <img className="hr-hero-bg" style={parallax(0.1)} src={heroBg} alt="" aria-hidden="true" />
          <div className="hr-hero-scrim" />

          <h1 className="hr-wordmark" style={parallax(-0.06)}>
            Vintage Blue
          </h1>

          <img
            className="hr-cutout"
            style={parallax(0.03)}
            src={heroCutout}
            alt="Model wearing a shearling-collar denim jacket over dark wash jeans"
          />

          <Reveal className="hr-hero-copy">
            <p className="hr-eyebrow">Heritage Denim</p>
            <a href="/shop/men" className="hr-cta" onClick={go('/shop/men')}>
              Shop The Collection <ArrowUpRight size={16} strokeWidth={1.8} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Products ---------------- */}
      <section className="hr-products" id="hr-products">
        <Reveal>
          <h2 className="hr-products-heading">built to wear in.</h2>
        </Reveal>

        <div className="hr-grid">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} className="hr-card-cell">
              <a href="/shop/men" className="hr-card" onClick={go('/shop/men')}>
                <div className="hr-card-img">
                  <img src={p.img} alt={p.name} />
                </div>
                <div className="hr-card-info">
                  <span>{p.name}</span>
                  <span>{p.price}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="hr-cats">
        <Reveal>
          <p className="hr-cats-heading">Categories</p>
        </Reveal>

        <ul className="hr-cats-list">
          {categories.map((c, i) => (
            <Reveal key={c} delay={i * 60}>
              <li>
                <a href="/shop/men" className="hr-cats-row" onClick={go('/shop/men')}>
                  <span>{c} /</span>
                  <ArrowRight size={18} strokeWidth={1.6} />
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ---------------- Weekend edit banner ---------------- */}
      <section className="hr-weekend" aria-label="The weekend edit">
        <video
          ref={videoRef}
          className="hr-weekend-bg"
          style={parallax(0.05)}
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
              Shop The Edit →
            </a>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Lookbook ---------------- */}
      <section className="hr-lookbook">
        <Reveal>
          <h2 className="hr-products-heading">the way we wear it.</h2>
        </Reveal>

        <Reveal delay={80} className="hr-anatomy-cell">
          <div className="hr-anatomy">
            <ShopLookCard item={active.shirt} />

            <button
              type="button"
              className="hr-anatomy-nav hr-anatomy-prev"
              aria-label="Previous look"
              onClick={prevLook}
            >
              <ChevronLeft size={18} strokeWidth={1.8} />
            </button>

            <div className="hr-anatomy-stage">
              <p className="hr-anatomy-caption">{active.title}</p>

              <img className="hr-anatomy-model" src={active.model} alt={active.modelAlt} />

              <svg
                className="hr-anatomy-lines"
                viewBox="0 0 200 300"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <line x1="168" y1="58" x2="112" y2="81" />
                <circle cx="112" cy="81" r="2.5" />
                <line x1="32" y1="222" x2="96" y2="178" />
                <circle cx="96" cy="178" r="2.5" />
              </svg>

              <a
                href={`/product/${active.shirt.handle}`}
                className="hr-detail-card hr-detail-1"
                onClick={go(`/product/${active.shirt.handle}`)}
              >
                <span className="hr-detail-tag">{active.shirt.label}</span>
                <img src={active.shirt.img} alt="" />
              </a>

              <a
                href={`/product/${active.jeans.handle}`}
                className="hr-detail-card hr-detail-2"
                onClick={go(`/product/${active.jeans.handle}`)}
              >
                <span className="hr-detail-tag">{active.jeans.label}</span>
                <img src={active.jeans.img} alt="" />
              </a>

              <span className="hr-anatomy-label">Get The Look</span>
            </div>

            <button
              type="button"
              className="hr-anatomy-nav hr-anatomy-next"
              aria-label="Next look"
              onClick={nextLook}
            >
              <ChevronRight size={18} strokeWidth={1.8} />
            </button>

            <ShopLookCard item={active.jeans} />
          </div>

          <div className="hr-anatomy-dots">
            {anatomyLooks.map((l, i) => (
              <button
                key={l.title}
                type="button"
                className={`hr-anatomy-dot${i === look ? ' active' : ''}`}
                aria-label={`Show look ${i + 1}`}
                onClick={() => setLook(i)}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer className="hr-footer">
        <div className="hr-footer-inner">
          <div className="hr-footer-top">
            <p className="hr-footer-wordmark">Vintage Blue</p>
            <p className="hr-footer-tag">Heritage denim, reimagined.</p>
          </div>

          <div className="hr-footer-grid">
            <div className="hr-footer-col">
              <h3>Shop</h3>
              <a href="/shop/men" onClick={go('/shop/men')}>
                Men
              </a>
              <a href="/shop/unisex" onClick={go('/shop/unisex')}>
                Unisex
              </a>
              <a href="/shop/popular" onClick={go('/shop/popular')}>
                Popular
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
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">Size Guide</a>
              <a href="#">FAQs</a>
            </div>

            <div className="hr-footer-col hr-footer-note">
              <h3>Stay In The Loop</h3>
              <p>Drops, restocks, and stories from the workshop. No noise.</p>
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
