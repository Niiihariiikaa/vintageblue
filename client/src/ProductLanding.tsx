import { useState, type MouseEvent } from 'react'
import { Minus, Plus, Check } from 'lucide-react'
import './ProductLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import { useCart } from './cart'
import { getProductByHandle, PRODUCTS, formatPrice } from './catalog'

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function ProductLanding({ handle }: { handle: string }) {
  const product = getProductByHandle(handle)
  const { addItem } = useCart()

  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)

  if (!product) {
    return (
      <div className="pd-page">
        <Nav />
        <div className="pd-notfound">
          <h1>We couldn't find that piece.</h1>
          <a href="/shop/popular" className="pd-btn-solid" onClick={go('/shop/popular')}>
            Back to shop
          </a>
        </div>
      </div>
    )
  }

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)),
  ).slice(0, 4)

  const handleAdd = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem(product.handle, size, qty)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 2200)
  }

  return (
    <div className="pd-page">
      <Nav />

      <a
        href={`/shop/${product.categories[0]}`}
        className="pd-breadcrumb"
        onClick={go(`/shop/${product.categories[0]}`)}
      >
        ← Back to {product.categories[0]}
      </a>

      <section className="pd-main">
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            <img src={product.images[activeImg]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="pd-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  className={`pd-thumb${i === activeImg ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`View image ${i + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <Reveal className="pd-info-cell">
          <div className="pd-info">
            {product.popular && <span className="pd-tag">Popular</span>}
            <h1>{product.name}</h1>
            <p className="pd-price">{formatPrice(product.price)}</p>
            <p className="pd-desc">{product.description}</p>

            <div className="pd-sizes">
              <span className="pd-label">Size {sizeError && <em>— please select one</em>}</span>
              <div className="pd-size-row">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`pd-size${size === s ? ' active' : ''}`}
                    onClick={() => {
                      setSize(s)
                      setSizeError(false)
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pd-qty-row">
              <span className="pd-label">Quantity</span>
              <div className="pd-stepper">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} strokeWidth={2} />
                </button>
                <span>{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                  <Plus size={14} strokeWidth={2} />
                </button>
              </div>
            </div>

            <button type="button" className="pd-add" onClick={handleAdd}>
              {justAdded ? (
                <>
                  <Check size={16} strokeWidth={2} /> Added to cart
                </>
              ) : (
                <>Add to Cart — {formatPrice(product.price * qty)}</>
              )}
            </button>

            <ul className="pd-details">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {related.length > 0 && (
        <section className="pd-related">
          <h2>You Might Also Like</h2>
          <div className="pd-related-grid">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80} className="pd-related-cell">
                <a
                  href={`/product/${p.handle}`}
                  className="pd-related-card"
                  onClick={go(`/product/${p.handle}`)}
                >
                  <div className="pd-related-img">
                    <img src={p.images[0]} alt={p.name} />
                  </div>
                  <div className="pd-related-info">
                    <span>{p.name}</span>
                    <span>{formatPrice(p.price)}</span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <a href="/" className="pd-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default ProductLanding
