import { useState, type MouseEvent } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import './Nav.css'
import { navigate } from './router'
import { useCart } from './cart'

const primaryLinks = [
  { label: 'Shirts', to: '/shop/shirts' },
  { label: 'Denims', to: '/shop/denims' },
  { label: 'Cargos', to: '/shop/cargos' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Unisex', to: '/shop/unisex' },
  { label: 'The Drop', to: '/drop' },
  { label: 'About Us', to: '/about' },
]

const allLinks = [
  { label: 'Shop Popular', to: '/shop/popular' },
  { label: 'Shirts', to: '/shop/shirts' },
  { label: 'Denims', to: '/shop/denims' },
  { label: 'Cargos', to: '/shop/cargos' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Unisex', to: '/shop/unisex' },
  { label: 'The Drop', to: '/drop' },
  { label: 'Our Story', to: '/story' },
  { label: 'About Us', to: '/about' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'The Concept', to: '/concept' },
  { label: 'Heritage Denim', to: '/heritage' },
  { label: 'Winter Edit', to: '/winter' },
]

/**
 * The single shared top bar — logo left, a handful of primary links
 * centered, cart + a "more" trigger on the right. The trigger opens a
 * slide-out drawer listing every page on the site, so nothing becomes
 * unreachable just because the top bar itself stays short. On narrow
 * viewports the centered links hide and that same drawer becomes the
 * only way in, opened from a hamburger icon instead of the text link.
 */
function Nav() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()

  const go = (path: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    navigate(path)
  }

  return (
    <>
      <header className="gnav">
        <a href="/" className="gnav-logo" onClick={go('/')}>
          Vintage Blue
        </a>

        <nav className="gnav-links" aria-label="Primary">
          {primaryLinks.map((l) => (
            <a key={l.to} href={l.to} onClick={go(l.to)}>
              {l.label}
            </a>
          ))}
          <button type="button" className="gnav-more" onClick={() => setOpen(true)}>
            More
          </button>
        </nav>

        <div className="gnav-actions">
          <a
            href="/cart"
            className="gnav-cart"
            aria-label={`Cart, ${count} items`}
            onClick={go('/cart')}
          >
            {count > 0 && <span className="gnav-cart-count">{count}</span>}
            <ShoppingBag size={20} strokeWidth={1.6} />
          </a>

          <button className="gnav-menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
            <Menu size={20} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      <div
        className={`gnav-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav className="gnav-drawer" aria-label="All pages" onClick={(e) => e.stopPropagation()}>
          <button className="gnav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={22} strokeWidth={1.6} />
          </button>

          <ul>
            {allLinks.map((l) => (
              <li key={l.to}>
                <a href={l.to} onClick={go(l.to)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="/cart" className="gnav-drawer-cart" onClick={go('/cart')}>
            View Cart {count > 0 && `(${count})`}
          </a>
        </nav>
      </div>
    </>
  )
}

export default Nav
