import type { MouseEvent } from 'react'
import { Search } from 'lucide-react'
import './ShopLanding.css'
import { navigate } from './router'
import { Reveal } from './motion'
import Nav from './Nav'
import { getProductsByCategory, formatPrice } from './catalog'

const tabs: { label: string; slug: string }[] = [
  { label: 'Popular', slug: 'popular' },
  { label: 'Men', slug: 'men' },
  { label: 'Women', slug: 'women' },
  { label: 'Unisex', slug: 'unisex' },
]

const titles: Record<string, string> = {
  popular: 'Popular Right Now',
  men: 'Menswear',
  women: 'Womenswear',
  unisex: 'Unisex Edit',
}

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function ShopLanding({ category }: { category: string }) {
  const products = getProductsByCategory(category)
  const title = titles[category] ?? 'Shop All'

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
        <label className="sh-search">
          <Search size={14} strokeWidth={1.8} />
          <input type="text" placeholder="Search…" aria-label="Search products" />
        </label>
      </nav>

      <Reveal className="sh-heading-cell">
        <div className="sh-heading">
          <h1>{title}</h1>
          <p>{products.length} styles</p>
        </div>
      </Reveal>

      <div className="sh-grid">
        {products.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 70} className="sh-card-cell">
            <a href={`/product/${p.handle}`} className="sh-card" onClick={go(`/product/${p.handle}`)}>
              <div className="sh-card-img">
                <img src={p.images[0]} alt={p.name} />
                {p.popular && <span className="sh-badge">Popular</span>}
              </div>
              <div className="sh-card-info">
                <span>{p.name}</span>
                <span>{formatPrice(p.price)}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {products.length === 0 && (
        <p className="sh-empty">Nothing here yet — check back for the next drop.</p>
      )}

      <a href="/" className="sh-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default ShopLanding
