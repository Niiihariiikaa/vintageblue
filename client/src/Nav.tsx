import { useState, type MouseEvent } from 'react'
import { Menu, X, ShoppingBag } from 'lucide-react'
import './Nav.css'
import { navigate } from './router'
import { useCart } from './cart'

const links = [
  { label: 'Shop Popular', to: '/shop/popular' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Women', to: '/shop/women' },
  { label: 'Unisex', to: '/shop/unisex' },
  { label: 'The Drop', to: '/drop' },
  { label: 'Our Story', to: '/story' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'The Concept', to: '/concept' },
  { label: 'Heritage Denim', to: '/heritage' },
]

/**
 * The single shared top bar — logo, cart, and a slide-out drawer with
 * every page in the site. Every page renders this instead of its own
 * bespoke top bar, so branding/cart/navigation stay consistent while
 * each page is still free to add its own secondary bar underneath
 * (filter chips, category tabs, a deck-style meta row, etc.).
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
        <button className="gnav-menu-btn" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu size={20} strokeWidth={1.6} />
        </button>

        <a href="/" className="gnav-logo" onClick={go('/')}>
          Vintage Blue
        </a>

        <a
          href="/cart"
          className="gnav-cart"
          aria-label={`Cart, ${count} items`}
          onClick={go('/cart')}
        >
          {count > 0 && <span className="gnav-cart-count">{count}</span>}
          <ShoppingBag size={20} strokeWidth={1.6} />
        </a>
      </header>

      <div
        className={`gnav-overlay${open ? ' open' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >
        <nav className="gnav-drawer" aria-label="Primary" onClick={(e) => e.stopPropagation()}>
          <button className="gnav-close" aria-label="Close menu" onClick={() => setOpen(false)}>
            <X size={22} strokeWidth={1.6} />
          </button>

          <ul>
            {links.map((l) => (
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
