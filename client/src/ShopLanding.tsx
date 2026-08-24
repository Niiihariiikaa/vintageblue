import { useMemo, useState, type MouseEvent } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import './ShopLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import {
  getProductsByCategory,
  formatPrice,
  SIZES,
  TYPES,
  COLOR_FAMILIES,
  type ColorFamily,
} from './catalog'

const tabs: { label: string; slug: string }[] = [
  { label: 'Popular', slug: 'popular' },
  { label: 'Men', slug: 'men' },
  { label: 'Unisex', slug: 'unisex' },
]

const titles: Record<string, string> = {
  popular: 'Popular Right Now',
  men: 'Menswear',
  women: 'Womenswear',
  unisex: 'Unisex Edit',
}

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
]

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

function ShopLanding({ category }: { category: string }) {
  const baseProducts = getProductsByCategory(category)
  const title = titles[category] ?? 'Shop All'

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('featured')
  const [types, setTypes] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<ColorFamily[]>([])
  const [inStockOnly, setInStockOnly] = useState(false)
  const [outOfStockOnly, setOutOfStockOnly] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const searched = useMemo(
    () => baseProducts.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())),
    [baseProducts, query],
  )

  const filtered = useMemo(() => {
    return searched.filter((p) => {
      if (types.length > 0 && !types.includes(p.type)) return false
      if (sizes.length > 0 && !sizes.some((s) => p.sizes.includes(s))) return false
      if (colors.length > 0 && !colors.includes(p.colorFamily)) return false
      if (inStockOnly && !p.inStock) return false
      if (outOfStockOnly && p.inStock) return false
      return true
    })
  }, [searched, types, sizes, colors, inStockOnly, outOfStockOnly])

  const products = useMemo(() => {
    const list = [...filtered]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'name-asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sort === 'name-desc') list.sort((a, b) => b.name.localeCompare(a.name))
    return list
  }, [filtered, sort])

  const countFor = {
    type: (t: string) => searched.filter((p) => p.type === t).length,
    size: (s: string) => searched.filter((p) => p.sizes.includes(s)).length,
    color: (c: ColorFamily) => searched.filter((p) => p.colorFamily === c).length,
    inStock: searched.filter((p) => p.inStock).length,
    outOfStock: searched.filter((p) => !p.inStock).length,
  }

  const activeFilters: { label: string; onRemove: () => void }[] = [
    ...types.map((t) => ({ label: t, onRemove: () => setTypes(toggle(types, t)) })),
    ...sizes.map((s) => ({ label: `Size ${s}`, onRemove: () => setSizes(toggle(sizes, s)) })),
    ...colors.map((c) => ({ label: c, onRemove: () => setColors(toggle(colors, c)) })),
    ...(inStockOnly ? [{ label: 'In stock', onRemove: () => setInStockOnly(false) }] : []),
    ...(outOfStockOnly ? [{ label: 'Out of stock', onRemove: () => setOutOfStockOnly(false) }] : []),
  ]

  function clearAll() {
    setTypes([])
    setSizes([])
    setColors([])
    setInStockOnly(false)
    setOutOfStockOnly(false)
  }

  const filterGroups = (
    <>
      <div className="sh-filter-group">
        <h3>Availability</h3>
        <label className="sh-filter-row">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
          />
          <span>In stock</span>
          <em>{countFor.inStock}</em>
        </label>
        <label className="sh-filter-row">
          <input
            type="checkbox"
            checked={outOfStockOnly}
            onChange={(e) => setOutOfStockOnly(e.target.checked)}
          />
          <span>Out of stock</span>
          <em>{countFor.outOfStock}</em>
        </label>
      </div>

      <div className="sh-filter-group">
        <h3>Type</h3>
        {TYPES.map((t) => (
          <label key={t} className="sh-filter-row">
            <input
              type="checkbox"
              checked={types.includes(t)}
              onChange={() => setTypes(toggle(types, t))}
            />
            <span>{t}</span>
            <em>{countFor.type(t)}</em>
          </label>
        ))}
      </div>

      <div className="sh-filter-group">
        <h3>Size</h3>
        {SIZES.map((s) => (
          <label key={s} className="sh-filter-row">
            <input
              type="checkbox"
              checked={sizes.includes(s)}
              onChange={() => setSizes(toggle(sizes, s))}
            />
            <span>{s}</span>
            <em>{countFor.size(s)}</em>
          </label>
        ))}
      </div>

      <div className="sh-filter-group">
        <h3>Color</h3>
        {COLOR_FAMILIES.map((c) => (
          <label key={c} className="sh-filter-row">
            <input
              type="checkbox"
              checked={colors.includes(c)}
              onChange={() => setColors(toggle(colors, c))}
            />
            <span>{c}</span>
            <em>{countFor.color(c)}</em>
          </label>
        ))}
      </div>

      {activeFilters.length > 0 && (
        <button type="button" className="sh-clear-all" onClick={clearAll}>
          Remove all
        </button>
      )}
    </>
  )

  return (
    <div className="sh-page">
      <Nav />

      <nav className="sh-tabs" aria-label="Shop by category">
        {tabs.map((t) => (
          <a
            key={t.slug}
            href={`/shop/${t.slug}`}
            className={`sh-tab${t.slug === category ? ' active' : ''}`}
            onClick={go(`/shop/${t.slug}`)}
          >
            {t.label}
          </a>
        ))}
      </nav>

      <Reveal className="sh-heading-cell">
        <div className="sh-heading">
          <h1>{title}</h1>

          <div className="sh-controls">
            <label className="sh-search">
              <Search size={14} strokeWidth={1.8} />
              <input
                type="text"
                placeholder="Search…"
                aria-label="Search products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <label className="sh-sort">
              <span>Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="sh-filter-btn"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal size={14} strokeWidth={1.8} />
              Filters
              {activeFilters.length > 0 && <em>{activeFilters.length}</em>}
            </button>
          </div>
        </div>

        <p className="sh-count">{products.length} products</p>

        {activeFilters.length > 0 && (
          <div className="sh-active-filters">
            {activeFilters.map((f) => (
              <button key={f.label} type="button" className="sh-active-chip" onClick={f.onRemove}>
                {f.label} <X size={12} strokeWidth={2} />
              </button>
            ))}
            <button type="button" className="sh-clear-all-inline" onClick={clearAll}>
              Remove all
            </button>
          </div>
        )}
      </Reveal>

      <div className="sh-layout">
        <aside className="sh-sidebar">{filterGroups}</aside>

        <div className="sh-grid">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70} className="sh-card-cell">
              <a href={`/product/${p.handle}`} className="sh-card" onClick={go(`/product/${p.handle}`)}>
                <div className="sh-card-img">
                  <img src={p.images[0]} alt={p.name} />
                  {p.popular && <span className="sh-badge">Popular</span>}
                  {!p.inStock && <span className="sh-badge sh-badge-out">Sold Out</span>}
                </div>
                <div className="sh-card-info">
                  <span>{p.name}</span>
                  <span>{formatPrice(p.price)}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      {products.length === 0 && (
        <p className="sh-empty">Nothing matches those filters — try clearing a few.</p>
      )}

      <div
        className={`sh-drawer-overlay${filtersOpen ? ' open' : ''}`}
        onClick={() => setFiltersOpen(false)}
        aria-hidden={!filtersOpen}
      >
        <div className="sh-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="sh-drawer-head">
            <h2>Filters</h2>
            <button type="button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}>
              <X size={20} strokeWidth={1.8} />
            </button>
          </div>
          {filterGroups}
          <button type="button" className="sh-drawer-apply" onClick={() => setFiltersOpen(false)}>
            Show {products.length} products
          </button>
        </div>
      </div>

      <a href="/" className="sh-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default ShopLanding
