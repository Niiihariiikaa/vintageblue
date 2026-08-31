import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Menu, X, ShoppingBag, ChevronDown } from 'lucide-react'
import './Nav.css'
import { navigate } from './router'
import { useCart } from './cart'

const productLinks = [
  { label: 'Popular', to: '/shop/popular' },
  { label: 'New Drop', to: '/drop' },
  { label: 'Shirts', to: '/shop/shirts' },
  { label: 'Denims', to: '/shop/denims' },
  { label: 'Cargos', to: '/shop/cargos' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Unisex', to: '/shop/unisex' },
]

const allLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop Popular', to: '/shop/popular' },
  { label: 'Shirts', to: '/shop/shirts' },
  { label: 'Denims', to: '/shop/denims' },
  { label: 'Cargos', to: '/shop/cargos' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Unisex', to: '/shop/unisex' },
  { label: 'The Drop', to: '/drop' },
  { label: 'About Us', to: '/about' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'Contact Us', to: '/contact' },
  { label: 'Our Story', to: '/story' },
  { label: 'The Concept', to: '/concept' },
  { label: 'Heritage Denim', to: '/heritage' },
  { label: 'Winter Edit', to: '/winter' },
]

/**
 * The single shared top bar — logo left, a handful of primary links
 * centered (Home, a Products dropdown, About Us, Lookbook, Contact
 * Us), cart + a "more" trigger on the right. The trigger opens a
 * slide-out drawer listing every page on the site, so nothing becomes
 * unreachable just because the top bar itself stays short. On narrow
 * viewports the centered links hide and that same drawer becomes the
 * only way in, opened from a hamburger icon instead of the text link.
 */
function Nav() {
  const [open, setOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { count } = useCart()

  /* Toggled a few pixels into the scroll, not at 0, so the nav
   * doesn't flicker between states from momentum/bounce scrolling
   * right at the top of the page. */
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const go = (path: string) => (e: MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    setProductsOpen(false)
    navigate(path)
  }

  useEffect(() => {
    if (!productsOpen) return
    const onDocClick = (e: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setProductsOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [productsOpen])

  return (
    <>
      <header className={`gnav${scrolled ? ' gnav-scrolled' : ''}`}>
        <a href="/" className="gnav-logo" onClick={go('/')}>
          Vintage Blue
        </a>

        <nav className="gnav-links" aria-label="Primary">
          <a href="/" onClick={go('/')}>
            Home
          </a>

          <div className="gnav-dropdown" ref={dropdownRef}>
            <button
              type="button"
              className="gnav-dropdown-trigger"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((o) => !o)}
            >
              Products
              <ChevronDown size={13} strokeWidth={2} className={productsOpen ? 'open' : ''} />
            </button>

            <div className={`gnav-dropdown-panel${productsOpen ? ' open' : ''}`}>
              {productLinks.map((l) => (
                <a key={l.to} href={l.to} onClick={go(l.to)}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <a href="/about" onClick={go('/about')}>
            About Us
          </a>
          <a href="/lookbook" onClick={go('/lookbook')}>
            Lookbook
          </a>
          <a href="/contact" onClick={go('/contact')}>
            Contact Us
          </a>

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

      <div className="gnav-spacer" aria-hidden="true" />

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
