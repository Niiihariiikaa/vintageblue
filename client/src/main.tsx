import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'
import '@fontsource/montserrat/700.css'
import './index.css'
import App from './App.tsx'
import DropLanding from './DropLanding.tsx'
import StoryLanding from './StoryLanding.tsx'
import LookbookLanding from './LookbookLanding.tsx'
import ShopLanding from './ShopLanding.tsx'
import ProductLanding from './ProductLanding.tsx'
import CartLanding from './CartLanding.tsx'
import ConceptLanding from './ConceptLanding.tsx'
import HeritageLanding from './HeritageLanding.tsx'
import AboutLanding from './AboutLanding.tsx'
import ContactLanding from './ContactLanding.tsx'
import { CartProvider } from './cart.tsx'

/**
 * A handful of pages, so a full router is overkill — this just
 * watches the path (including synthetic `popstate` events fired by
 * `navigate()` in router.ts) and swaps the top-level component.
 * `/shop/:category` and `/product/:handle` are matched by prefix
 * rather than pulling in a routing library for two dynamic segments.
 */
function Router() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path === '/drop') return <DropLanding />
  if (path === '/story') return <StoryLanding />
  if (path === '/lookbook') return <LookbookLanding />
  if (path === '/cart') return <CartLanding />
  if (path === '/concept') return <ConceptLanding />
  if (path === '/about') return <AboutLanding />
  if (path === '/contact') return <ContactLanding />
  if (path === '/winter') return <App />
  if (path.startsWith('/shop/')) return <ShopLanding category={path.slice('/shop/'.length)} />
  if (path.startsWith('/product/')) return <ProductLanding handle={path.slice('/product/'.length)} />
  return <HeritageLanding />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <Router />
    </CartProvider>
  </StrictMode>,
)
