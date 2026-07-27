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

/**
 * A handful of pages, so a full router is overkill — this just
 * watches the path (including synthetic `popstate` events fired by
 * `navigate()` in router.ts) and swaps the top-level component.
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
  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
