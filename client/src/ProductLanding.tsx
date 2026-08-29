import { useState, type MouseEvent } from 'react'
import { Minus, Plus, Check, ChevronDown, Truck, Banknote, Shirt } from 'lucide-react'
import './ProductLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import { useCart } from './cart'
import { getProductByHandle, PRODUCTS, formatPrice, TYPE_SLUGS } from './catalog'

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function estimatedDelivery(): string {
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
  const start = new Date()
  start.setDate(start.getDate() + 4)
  const end = new Date()
  end.setDate(end.getDate() + 6)
  return `${fmt(start)} – ${fmt(end)}`
}

const sizeGuide: { size: string; chest: string; length: string; waist: string }[] = [
  { size: 'XS', chest: '36"', length: '26"', waist: '28"' },
  { size: 'S', chest: '38"', length: '27"', waist: '30"' },
  { size: 'M', chest: '40"', length: '28"', waist: '32"' },
  { size: 'L', chest: '42"', length: '29"', waist: '34"' },
  { size: 'XL', chest: '44"', length: '30"', waist: '36"' },
]

type AccordionKey = 'details' | 'shipping' | 'size-guide'

function ProductLanding({ handle }: { handle: string }) {
  const product = getProductByHandle(handle)
  const { addItem } = useCart()

  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState<AccordionKey | null>('details')
  const [delivery] = useState(estimatedDelivery)

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

  const categorySlug = TYPE_SLUGS[product.type] ?? product.categories[0]
  const categoryLabel = TYPE_SLUGS[product.type] ? product.type + 's' : product.categories[0]

  const toggleSection = (key: AccordionKey) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

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
        href={`/shop/${categorySlug}`}
        className="pd-breadcrumb"
        onClick={go(`/shop/${categorySlug}`)}
      >
        ← Back to {categoryLabel}
      </a>

      <section className="pd-main">
        <div className="pd-gallery">
          <div className="pd-gallery-main">
            {product.images.length > 0 ? (
              <img src={product.images[activeImg]} alt={product.name} />
            ) : (
              <div className="pd-gallery-placeholder">
                <Shirt size={48} strokeWidth={1} />
                <span>Photography coming soon</span>
              </div>
            )}
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

            <div className="pd-delivery">
              <span>
                <Truck size={15} strokeWidth={1.6} />
                Estimated delivery <strong>{delivery}</strong>
              </span>
              <span>
                <Banknote size={15} strokeWidth={1.6} />
                Cash on delivery available
              </span>
            </div>

            <div className="pd-accordion">
              <div className="pd-accordion-item">
                <button
                  type="button"
                  className="pd-accordion-trigger"
                  aria-expanded={openSection === 'details'}
                  onClick={() => toggleSection('details')}
                >
                  Details &amp; Description
                  <ChevronDown
                    size={16}
                    strokeWidth={1.8}
                    className={openSection === 'details' ? 'open' : ''}
                  />
                </button>
                {openSection === 'details' && (
                  <div className="pd-accordion-body">
                    <p>{product.description}</p>
                    <ul className="pd-details">
                      {product.details.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pd-accordion-item">
                <button
                  type="button"
                  className="pd-accordion-trigger"
                  aria-expanded={openSection === 'shipping'}
                  onClick={() => toggleSection('shipping')}
                >
                  Shipping
                  <ChevronDown
                    size={16}
                    strokeWidth={1.8}
                    className={openSection === 'shipping' ? 'open' : ''}
                  />
                </button>
                {openSection === 'shipping' && (
                  <div className="pd-accordion-body">
                    <p>Packed within 24 hours and shipped from our studio. Tracking is emailed as soon as it ships.</p>
                    <p>Free standard shipping on orders over {formatPrice(200)}. Returns accepted within 30 days, unworn and tagged.</p>
                  </div>
                )}
              </div>

              <div className="pd-accordion-item">
                <button
                  type="button"
                  className="pd-accordion-trigger"
                  aria-expanded={openSection === 'size-guide'}
                  onClick={() => toggleSection('size-guide')}
                >
                  Size Guide
                  <ChevronDown
                    size={16}
                    strokeWidth={1.8}
                    className={openSection === 'size-guide' ? 'open' : ''}
                  />
                </button>
                {openSection === 'size-guide' && (
                  <div className="pd-accordion-body">
                    <table className="pd-size-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest</th>
                          <th>Length</th>
                          <th>Waist</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide.map((row) => (
                          <tr key={row.size}>
                            <td>{row.size}</td>
                            <td>{row.chest}</td>
                            <td>{row.length}</td>
                            <td>{row.waist}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
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
                    {p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.name} />
                    ) : (
                      <div className="pd-related-placeholder">
                        <Shirt size={22} strokeWidth={1.1} />
                      </div>
                    )}
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
