import { useState, type MouseEvent } from 'react'
import { ArrowRight, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import './ShopTheLook.css'
import { navigate } from './router'
import { Reveal } from './motion'
import { getProductByHandle, formatPrice } from './catalog'
import { useCart } from './cart'
import model1 from './assets2/Model1.png'
import model1Shirt from './assets2/model1-shirt.png'
import model1Jeans from './assets2/model1-jeans.png'
import model2 from './assets2/model2.png'
import model2Shirt from './assets2/model2-shirt.png'
import model2Jeans from './assets2/model2-jeans.png'

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

interface LookItem {
  img: string
  label: string
  handle: string
  /* Where this garment's leader line runs, in the SVG overlay's own
     200x300 space: `from` is the outer end beside the card, `to` the
     point on the garment. Per-look, because the two models don't stand
     in exactly the same place in frame. */
  line: { x1: number; y1: number; x2: number; y2: number }
}

/* Both looks, one at a time behind the slider. Each is the same
   composition: the top garment's card upper-left, the bottom garment's
   card slightly lower on the right, so neither leader line has to
   cross the body. */
const anatomyLooks: {
  title: string
  /* Short styling notes shown under the title — what makes the look
     work, piece by piece. */
  notes: string[]
  model: string
  modelAlt: string
  top: LookItem
  bottom: LookItem
}[] = [
  {
    title: 'Corduroy shirt in washed sand, worn open over relaxed denim.',
    notes: [
      'Corduroy softens and lightens a shade with every wash.',
      'Wide-leg denim cut for a relaxed, uncropped break at the ankle.',
      'Layers just as easily over a plain tee on warmer days.',
    ],
    model: model1,
    modelAlt: 'Model wearing a tan corduroy shirt and wide-leg jeans',
    top: {
      img: model1Shirt,
      label: 'The Shirt',
      handle: 'garment-dyed-overshirt',
      line: { x1: -24, y1: 74, x2: 112, y2: 66 },
    },
    bottom: {
      img: model1Jeans,
      label: 'The Denim',
      handle: 'wide-leg-denim',
      line: { x1: 224, y1: 200, x2: 116, y2: 178 },
    },
  },
  {
    title: 'Shearling-collar trucker layered over black wash denim.',
    notes: [
      'Sherpa collar detaches for warmer weeks in between seasons.',
      'Black wash denim holds its tone longer than a standard rinse.',
      'Finished throughout in matte, tarnish-resistant hardware.',
    ],
    model: model2,
    modelAlt: 'Model wearing a shearling-collar corduroy trucker jacket and black jeans',
    top: {
      img: model2Shirt,
      label: 'The Jacket',
      handle: 'charcoal-layer',
      line: { x1: -24, y1: 76, x2: 80, y2: 79 },
    },
    bottom: {
      img: model2Jeans,
      label: 'The Denim',
      handle: 'raw-selvedge-jean',
      line: { x1: 224, y1: 200, x2: 118, y2: 178 },
    },
  },
]

/**
 * One of the two garment cards the leader lines point at. Compact on
 * purpose — it sits beside the model rather than in the page flow, so
 * it carries only what you need to decide: the piece, its price, and a
 * one-tap add with its own confirmation state.
 */
function LookCard({ item }: { item: LookItem }) {
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
    <div className="stl-detail-card">
      <a href={`/product/${product.handle}`} className="stl-detail-img" onClick={go(`/product/${product.handle}`)}>
        <span className="stl-detail-tag">{item.label}</span>
        <img src={item.img} alt={product.name} />
      </a>

      <div className="stl-detail-body">
        <a
          href={`/product/${product.handle}`}
          className="stl-detail-name"
          onClick={go(`/product/${product.handle}`)}
        >
          {product.name}
        </a>

        <div className="stl-detail-footer">
          <span className="stl-detail-price">{formatPrice(product.price)}</span>
          <button
            type="button"
            className={`stl-detail-add${added ? ' added' : ''}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={12} strokeWidth={2.4} /> Added
              </>
            ) : (
              <>
                <Plus size={12} strokeWidth={2.4} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * The strip under a look that totals it and adds both pieces at once —
 * the "complete the look" row every shop-the-look module ends on. Uses
 * size M like the individual card buttons do, and says so once added,
 * so nobody is surprised by the size in their bag.
 */
function LookTotal({ items }: { items: LookItem[] }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const products = items
    .map((i) => getProductByHandle(i.handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
  const total = products.reduce((sum, p) => sum + p.price, 0)

  const handleAdd = () => {
    products.forEach((p) => addItem(p.handle, 'M', 1))
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2400)
  }

  return (
    <div className="stl-look-total">
      <div className="stl-look-total-info">
        <span className="stl-look-total-label">Complete the look</span>
        <span className="stl-look-total-sum">
          {products.length} pieces <i aria-hidden="true">·</i> {formatPrice(total)}
        </span>
      </div>

      <button
        type="button"
        className={`stl-look-total-add${added ? ' added' : ''}`}
        onClick={handleAdd}
      >
        {added ? (
          <>
            <Check size={14} strokeWidth={2.2} /> Both added · size M
          </>
        ) : (
          <>
            Add both to bag <ArrowRight size={15} strokeWidth={1.8} />
          </>
        )}
      </button>
    </div>
  )
}

/**
 * Shop the look: one outfit at a time on the model, with a card for
 * each garment joined to it by a leader line, arrows to step between
 * looks, and a total with an add-both button underneath. Renders only
 * the module itself, so whichever page hosts it supplies the heading.
 */
function ShopTheLook() {
  const [look, setLook] = useState(0)
  const active = anatomyLooks[look]

  const prevLook = () => setLook((i) => (i - 1 + anatomyLooks.length) % anatomyLooks.length)
  const nextLook = () => setLook((i) => (i + 1) % anatomyLooks.length)

  return (
    <div className="stl-anatomy">
      {/* Carousel header: which look, what it is, and the arrows —
          sitting on the composition's own edges so the module
          reads as one aligned block rather than loose parts. */}
      <div className="stl-look-bar">
        <div className="stl-look-meta">
          <span className="stl-look-count">
            Look {String(look + 1).padStart(2, '0')}
            <em> / {String(anatomyLooks.length).padStart(2, '0')}</em>
          </span>
          <p className="stl-look-title">{active.title}</p>
          <ul className="stl-look-notes">
            {active.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>

        <div className="stl-look-nav">
          <button type="button" aria-label="Previous look" onClick={prevLook}>
            <ChevronLeft size={18} strokeWidth={1.6} />
          </button>
          <button type="button" aria-label="Next look" onClick={nextLook}>
            <ChevronRight size={18} strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {/* One reveal drives the whole composition, and the stagger
          lives in CSS delays off its `.in` class. Two independent
          observers would not do: the lower card would cross the
          threshold — and slide in — before the upper one every
          time you scroll down. Keying it on `look` replays the
          sequence when you switch looks, so the arrows redraw
          with the new garments. */}
      <Reveal variant="fade" key={`look-${look}`} className="stl-anatomy-cell">
        <div className="stl-anatomy-stage">
          <img className="stl-anatomy-model" src={active.model} alt={active.modelAlt} />

          <svg
            className="stl-anatomy-lines"
            viewBox="0 0 200 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line className="stl-line-l" {...active.top.line} />
            <circle className="stl-halo stl-dot-l" cx={active.top.line.x2} cy={active.top.line.y2} r="6" />
            <circle className="stl-dot-l" cx={active.top.line.x2} cy={active.top.line.y2} r="2.6" />
            <line className="stl-line-r" {...active.bottom.line} />
            <circle
              className="stl-halo stl-dot-r"
              cx={active.bottom.line.x2}
              cy={active.bottom.line.y2}
              r="6"
            />
            <circle
              className="stl-dot-r"
              cx={active.bottom.line.x2}
              cy={active.bottom.line.y2}
              r="2.6"
            />
          </svg>

          {/* Upper-left card first, lower-right one after it. */}
          <div className="stl-detail-cell stl-detail-cell-l">
            <LookCard item={active.top} />
          </div>

          <div className="stl-detail-cell stl-detail-cell-r">
            <LookCard item={active.bottom} />
          </div>
        </div>
      </Reveal>

      {/* Distinct key prefixes: these two are siblings, and sharing a bare
          `look` key made React keep the old composition on screen
          beside the new one when switching looks. */}
      <LookTotal key={`total-${look}`} items={[active.top, active.bottom]} />
    </div>
  )
}

export default ShopTheLook
