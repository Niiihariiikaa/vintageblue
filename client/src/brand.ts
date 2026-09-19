/**
 * Studio contact details and service area, in one place. The homepage
 * map, the contact page and the about page all show some of these, and
 * keeping three hand-typed copies is how an address on a map ends up
 * disagreeing with the one on the contact form.
 */
export const STUDIO = {
  name: 'Vintage Blue Jeanswear',
  street: 'Industrial Area A',
  city: 'Ludhiana, Punjab',
  email: 'hello@vintageblue.in',
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  hours: '10am – 6pm IST',
}

/* The map is searched by area rather than by business name: an area
   always resolves to a sensible pin, a name only does once the listing
   exists on the map provider's side. */
const mapsQuery = encodeURIComponent(`${STUDIO.street}, ${STUDIO.city}, India`)

export const STUDIO_MAP_EMBED = `https://www.google.com/maps?q=${mapsQuery}&z=14&output=embed`
export const STUDIO_DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

export const SERVICE_REGIONS = [
  'Punjab',
  'J&K',
  'Himachal Pradesh',
  'Uttarakhand',
  'W. Uttar Pradesh',
  'Rajasthan',
  'Jharkhand',
  'Bihar',
]
