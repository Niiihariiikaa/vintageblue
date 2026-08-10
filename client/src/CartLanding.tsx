import { useState, type MouseEvent } from 'react'
import { Minus, Plus, X, ShoppingBag } from 'lucide-react'
import './CartLanding.css'
import { navigate } from './router'
import Nav from './Nav'
import { useCart } from './cart'
import { getProductByHandle, formatPrice } from './catalog'

function go(path: string) {
  return (e: MouseEvent) => {
    e.preventDefault()
    navigate(path)
  }
}

function orderNumber() {
  return `VB-${Math.floor(100000 + Math.random() * 900000)}`
}

function CartLanding() {
  const { lines, setQuantity, removeItem, subtotal, clear, count } = useCart()
  const [placed, setPlaced] = useState<string | null>(null)

  const handleCheckout = () => {
    setPlaced(orderNumber())
    clear()
  }

  return (
    <div className="ct-page">
      <Nav />

      {placed ? (
        <div className="ct-confirm">
          <span className="ct-confirm-icon">
            <ShoppingBag size={28} strokeWidth={1.4} />
          </span>
          <h1>Thank you.</h1>
          <p>
            Order <strong>{placed}</strong> is confirmed — a receipt would land in your inbox here.
            This is a demo checkout, so nothing was actually charged.
          </p>
          <a href="/shop/popular" className="ct-btn-solid" onClick={go('/shop/popular')}>
            Keep Browsing
          </a>
        </div>
      ) : lines.length === 0 ? (
        <div className="ct-empty">
          <ShoppingBag size={32} strokeWidth={1.3} />
          <h1>Your cart is empty.</h1>
          <p>Find something you'll actually wear on repeat.</p>
          <a href="/shop/popular" className="ct-btn-solid" onClick={go('/shop/popular')}>
            Shop Popular
          </a>
        </div>
      ) : (
        <section className="ct-main">
          <ul className="ct-lines">
            {lines.map((line) => {
              const product = getProductByHandle(line.handle)
              if (!product) return null
              return (
                <li key={`${line.handle}-${line.size}`} className="ct-line">
                  <a
                    href={`/product/${product.handle}`}
                    className="ct-line-img"
                    onClick={go(`/product/${product.handle}`)}
                  >
                    <img src={product.images[0]} alt={product.name} />
                  </a>
                  <div className="ct-line-info">
                    <a
                      href={`/product/${product.handle}`}
                      onClick={go(`/product/${product.handle}`)}
                    >
                      {product.name}
                    </a>
                    <span className="ct-line-size">Size {line.size}</span>
                    <span className="ct-line-price">{formatPrice(product.price)}</span>
                  </div>
                  <div className="ct-line-qty">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQuantity(line.handle, line.size, line.quantity - 1)}
                    >
                      <Minus size={13} strokeWidth={2} />
                    </button>
                    <span>{line.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQuantity(line.handle, line.size, line.quantity + 1)}
                    >
                      <Plus size={13} strokeWidth={2} />
                    </button>
                  </div>
                  <span className="ct-line-total">{formatPrice(product.price * line.quantity)}</span>
                  <button
                    type="button"
                    className="ct-line-remove"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeItem(line.handle, line.size)}
                  >
                    <X size={16} strokeWidth={1.8} />
                  </button>
                </li>
              )
            })}
          </ul>

          <aside className="ct-summary">
            <h2>Order Summary</h2>
            <div className="ct-summary-row">
              <span>Subtotal ({count} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="ct-summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="ct-summary-row ct-summary-total">
              <span>Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <button type="button" className="ct-btn-solid ct-checkout" onClick={handleCheckout}>
              Checkout
            </button>
          </aside>
        </section>
      )}

      <a href="/" className="ct-back" onClick={go('/')}>
        ← Back to the full site
      </a>
    </div>
  )
}

export default CartLanding
