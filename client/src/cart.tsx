import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { PRODUCTS } from './catalog'

export interface CartLine {
  handle: string
  size: string
  quantity: number
}

interface CartContextValue {
  lines: CartLine[]
  addItem: (handle: string, size: string, quantity?: number) => void
  removeItem: (handle: string, size: string) => void
  setQuantity: (handle: string, size: string, quantity: number) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'vintageblue-cart'

function readStoredLines(): CartLine[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

/**
 * Cart state lives in localStorage rather than the Shopify server —
 * that way add-to-cart works immediately in the demo, whether or not
 * a real store is connected yet. The cart page attempts a real
 * Shopify checkout handoff first and falls back to a plain summary
 * when the server reports it isn't configured (see CartLanding.tsx).
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStoredLines)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const addItem = (handle: string, size: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.handle === handle && l.size === size)
      if (existing) {
        return prev.map((l) =>
          l.handle === handle && l.size === size ? { ...l, quantity: l.quantity + quantity } : l,
        )
      }
      return [...prev, { handle, size, quantity }]
    })
  }

  const removeItem = (handle: string, size: string) => {
    setLines((prev) => prev.filter((l) => !(l.handle === handle && l.size === size)))
  }

  const setQuantity = (handle: string, size: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.handle === handle && l.size === size))
        : prev.map((l) => (l.handle === handle && l.size === size ? { ...l, quantity } : l)),
    )
  }

  const clear = () => setLines([])

  const count = lines.reduce((sum, l) => sum + l.quantity, 0)
  const subtotal = lines.reduce((sum, l) => {
    const product = PRODUCTS.find((p) => p.handle === l.handle)
    return sum + (product ? product.price * l.quantity : 0)
  }, 0)

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, setQuantity, clear, count, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
