import { useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import {
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  Banknote,
  RotateCcw,
  Shirt,
  Truck,
} from 'lucide-react'
import './ProductLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import { useCart } from './cart'
import {
  getProductByHandle,
  PRODUCTS,
  formatPrice,
  CATEGORY_LABELS,
  type Product,
} from './catalog'

const FREE_SHIPPING_OVER = 2999
const FAVOURITES_KEY = 'vb:favourites'

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

/* The line sheets carry a size *run* rather than a measurement chart,
   so the guide reports the garment's own spec instead of inventing
   chest/length figures nobody has measured. */
function specRows(product: Product): { label: string; value: string }[] {
  const waist = /^\d+$/.test(product.sizes[0])
  return [
    { label: 'Style no.', value: product.styleNo },
    { label: 'Fit', value: product.fit },
    { label: 'Fabric', value: product.material },
    ...(product.lining ? [{ label: 'Lining', value: product.lining }] : []),
    {
      label: waist ? 'Waist sizes' : 'Sizes',
      value: `${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}${
        waist ? ' in' : ''
      }`,
    },
  ]
}

type AccordionKey = 'fit' | 'materials' | 'delivery' | 'size-guide'

/**
 * Other colourways of the same garment, the way a retail PDP shows
 * them: a swatch row of sibling products. The line sheets group every
 * colourway under one style family, so that field is the relationship —
 * no second hand-maintained list, and no guessing from handle strings
 * (which breaks the moment a colour is two words, like "Off-White").
 */
function colourways(product: Product): Product[] {
  const family = PRODUCTS.filter((p) => p.type === product.type)
  return family.length > 1 ? family : [product]
}

function readFavourites(): string[] {
  try {
    const raw = window.localStorage.getItem(FAVOURITES_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((h): h is string => typeof h === 'string') : []
  } catch {
    return []
  }
}

function ProductLanding({ handle }: { handle: string }) {
  const product = getProductByHandle(handle)
  const { addItem } = useCart()

  const [size, setSize] = useState<string | null>(null)
  const [justAdded, setJustAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [openSection, setOpenSection] = useState<AccordionKey | null>('fit')
  const [favourite, setFavourite] = useState(false)
  const [delivery] = useState(estimatedDelivery)
  const sizeGuideRef = useRef<HTMLDivElement>(null)

  /* Reset the picked size when navigating between products — the router
     keeps this component mounted, so without it an M chosen on one
     garment silently carries over to the next. */
  useEffect(() => {
    setSize(null)
    setSizeError(false)
    setJustAdded(false)
    setOpenSection('fit')
    window.scrollTo(0, 0)
  }, [handle])

  useEffect(() => {
    setFavourite(readFavourites().includes(handle))
  }, [handle])

  const related = useMemo(
    () =>
      product
        ? PRODUCTS.filter(
            (p) => p.id !== product.id && p.categories.some((c) => product.categories.includes(c)),
          ).slice(0, 4)
        : [],
    [product],
  )

  if (!product) {
    return (
      <div className="pd-page">
        <Nav />
        <div className="pd-notfound">
          <h1>We couldn't find that piece.</h1>
          <a href="/shop/all" className="pd-btn-solid" onClick={go('/shop/all')}>
            Back to shop
          </a>
        </div>
      </div>
    )
  }

  const categorySlug = product.categories[0] ?? 'all'
  const categoryLabel = CATEGORY_LABELS[categorySlug] ?? 'Shop'
  const family = colourways(product)

  const toggleSection = (key: AccordionKey) => {
    setOpenSection((prev) => (prev === key ? null : key))
  }

  const openSizeGuide = () => {
    setOpenSection('size-guide')
    window.setTimeout(() => {
      sizeGuideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 60)
  }

  const toggleFavourite = () => {
    const next = !favourite
    setFavourite(next)
    try {
      const list = readFavourites().filter((h) => h !== handle)
      if (next) list.push(handle)
      window.localStorage.setItem(FAVOURITES_KEY, JSON.stringify(list))
    } catch {
      /* Private browsing or blocked storage — the button still toggles
         for this visit, it just won't be remembered. */
    }
  }

  const handleAdd = () => {
    if (!size) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem(product.handle, size, 1)
    setJustAdded(true)
    window.setTimeout(() => setJustAdded(false), 2200)
  }

  const accordion = (key: AccordionKey, title: string, body: ReactNode) => (
    <div className="pd-acc-item" ref={key === 'size-guide' ? sizeGuideRef : undefined}>
      <button
        type="button"
        className="pd-acc-trigger"
        aria-expanded={openSection === key}
        onClick={() => toggleSection(key)}
      >
        {title}
        <ChevronDown size={16} strokeWidth={1.6} className={openSection === key ? 'open' : ''} />
      </button>
      {openSection === key && <div className="pd-acc-body">{body}</div>}
    </div>
  )

  return (
    <div className="pd-page">
      <Nav />

      <nav className="pd-crumbs" aria-label="Breadcrumb">
        <a href="/" onClick={go('/')}>
          Home
        </a>
        <ChevronRight size={12} strokeWidth={1.6} aria-hidden="true" />
        <a href={`/shop/${categorySlug}`} onClick={go(`/shop/${categorySlug}`)}>
          {categoryLabel}
        </a>
        <ChevronRight size={12} strokeWidth={1.6} aria-hidden="true" />
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="pd-layout">
        {/* ---------------- Media ---------------- */}
        <div className={`pd-media${product.images.length < 2 ? ' pd-media-single' : ''}`}>
          {product.images.length > 0 ? (
            product.images.map((img, i) => (
              <div className="pd-shot" key={img}>
                <img src={img} alt={`${product.name}, view ${i + 1}`} />
              </div>
            ))
          ) : (
            <div className="pd-shot pd-shot-empty">
              <Shirt size={44} strokeWidth={0.9} />
              <span>Photography coming soon</span>
            </div>
          )}
        </div>

        {/* ---------------- Buy panel ---------------- */}
        <aside className="pd-panel">
          {product.popular && <span className="pd-flag">Bestseller</span>}

          <h1 className="pd-name">{product.name}</h1>

          <p className="pd-price">{formatPrice(product.price)}</p>
          <p className="pd-price-note">Price incl. of all taxes</p>

          <div className="pd-block">
            <p className="pd-block-label">
              Colour: <strong>{product.color}</strong>
            </p>
            <div className="pd-swatches">
              {family.map((p) => {
                const current = p.handle === product.handle
                return (
                  <a
                    key={p.handle}
                    href={`/product/${p.handle}`}
                    className={`pd-swatch${current ? ' active' : ''}`}
                    aria-label={p.color}
                    aria-current={current ? 'true' : undefined}
                    title={p.color}
                    onClick={go(`/product/${p.handle}`)}
                  >
                    {p.images.length > 0 ? (
                      <img src={p.images[0]} alt="" />
                    ) : (
                      <span className="pd-swatch-empty" />
                    )}
                  </a>
                )
              })}
            </div>
          </div>

          <div className="pd-block">
            <div className="pd-block-head">
              <p className="pd-block-label">Select size</p>
              <button type="button" className="pd-guide-link" onClick={openSizeGuide}>
                Size guide
              </button>
            </div>

            <div className="pd-size-row">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`pd-size${size === s ? ' active' : ''}`}
                  disabled={!product.inStock}
                  onClick={() => {
                    setSize(s)
                    setSizeError(false)
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {sizeError && <p className="pd-size-error">Please select a size first.</p>}
          </div>

          <div className="pd-actions">
            <button
              type="button"
              className="pd-add"
              disabled={!product.inStock}
              onClick={handleAdd}
            >
              {!product.inStock ? (
                'Sold out'
              ) : justAdded ? (
                <>
                  <Check size={15} strokeWidth={2} /> Added to bag
                </>
              ) : (
                'Add to bag'
              )}
            </button>

            <button
              type="button"
              className={`pd-fav${favourite ? ' active' : ''}`}
              aria-pressed={favourite}
              aria-label={favourite ? 'Saved to favourites' : 'Save to favourites'}
              onClick={toggleFavourite}
            >
              <Heart size={17} strokeWidth={1.7} fill={favourite ? 'currentColor' : 'none'} />
            </button>
          </div>

          <ul className="pd-service">
            <li>
              <Truck size={15} strokeWidth={1.5} />
              <span>
                Free delivery over {formatPrice(FREE_SHIPPING_OVER)} · arrives{' '}
                <strong>{delivery}</strong>
              </span>
            </li>
            <li>
              <RotateCcw size={15} strokeWidth={1.5} />
              <span>Free returns within 30 days, unworn and tagged</span>
            </li>
            <li>
              <Banknote size={15} strokeWidth={1.5} />
              <span>Cash on delivery available</span>
            </li>
          </ul>

          <div className="pd-acc">
            {accordion(
              'fit',
              'Description & fit',
              <>
                <p>{product.description}</p>
                <ul className="pd-bullets">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <p className="pd-meta">
                  {product.type} · {product.tags.join(' · ')}
                </p>
              </>,
            )}

            {accordion(
              'materials',
              'Materials & care',
              <>
                <p>
                  {product.material}
                  {product.lining ? `, lined in ${product.lining.toLowerCase()}. ` : '. '}
                  Cut and sewn at our own workshop in Mayapuri, New Delhi.
                </p>
                <ul className="pd-bullets">
                  <li>Machine wash cold, inside out, with like colours</li>
                  <li>Do not bleach or tumble dry</li>
                  <li>Warm iron on the reverse</li>
                </ul>
              </>,
            )}

            {accordion(
              'delivery',
              'Delivery & payment',
              <>
                <p>
                  Packed within 24 hours and shipped from Delhi. Tracking is emailed the
                  moment it leaves us.
                </p>
                <p>
                  Free standard delivery on orders over {formatPrice(FREE_SHIPPING_OVER)}. Cards,
                  UPI, net banking and cash on delivery all accepted.
                </p>
              </>,
            )}

            {accordion(
              'size-guide',
              'Size & spec',
              <>
                <table className="pd-size-table">
                  <tbody>
                    {specRows(product).map((row) => (
                      <tr key={row.label}>
                        <td>{row.label}</td>
                        <td>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="pd-meta">
                  This style runs {product.sizes.join(' · ')}. Between sizes? Take the
                  larger — every fit here is cut generously.
                </p>
              </>,
            )}
          </div>

          <p className="pd-artno">Style no. {product.styleNo}</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="pd-related">
          <h2>You might also like</h2>
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
    </div>
  )
}

export default ProductLanding
