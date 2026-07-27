/**
 * Minimal client-side navigation helper — this app has exactly two
 * pages, so a full router dependency isn't warranted. `main.tsx`
 * listens for `popstate` and re-renders; this pushes a history entry
 * and re-dispatches `popstate` so in-app links skip a full reload.
 */
export function navigate(path: string) {
  if (window.location.pathname === path) return
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
