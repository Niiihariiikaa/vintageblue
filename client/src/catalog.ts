import product1 from './assets/product1.png'
import product2 from './assets/product2.png'
import product3 from './assets/product3.png'
import product4 from './assets/product4.png'
import product5 from './assets/product5.png'
import heroFull from './assets/hero.png'
import heroBack from './assets/heroleft.png'
import heroPortrait from './assets/heroright.png'
import heroBlackFront from './assets/heromiddle.png'
import heroBlackBack from './assets/hero-right.png'
import shirt1a from './assets2/shirt1a.png'
import shirt1b from './assets2/shirt1b.png'

export type Category = 'men' | 'women' | 'unisex'
export type ColorFamily = 'Blues' | 'Browns' | 'Neutrals' | 'Greens'

export interface Product {
  id: string
  handle: string
  name: string
  price: number
  categories: Category[]
  popular?: boolean
  images: string[]
  description: string
  details: string[]
  sizes: string[]
  type: string
  color: string
  colorFamily: ColorFamily
  inStock: boolean
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL']
export const TYPES = ['Hoodie', 'Jacket', 'Trench', 'Overcoat', 'Shirt', 'Denim', 'Cargo']
export const COLOR_FAMILIES: ColorFamily[] = ['Blues', 'Browns', 'Neutrals', 'Greens']

/** Garment-type nav categories (`/shop/:slug`) that filter by `type` rather than gender. */
export const TYPE_SLUGS: Record<string, string> = {
  Shirt: 'shirts',
  Denim: 'denims',
  Cargo: 'cargos',
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    handle: 'urban-commuter',
    name: 'Urban Commuter',
    price: 160,
    categories: ['men', 'unisex'],
    popular: true,
    images: [product1],
    description:
      'A slouchy beanie, garment-dyed sweatshirt, and wide-leg denim, built for easy everyday layering when the temperature won’t make up its mind.',
    details: ['Garment-dyed cotton fleece', 'Relaxed, dropped-shoulder fit', 'Wide-leg denim, mid-wash'],
    sizes: SIZES,
    type: 'Hoodie',
    color: 'Charcoal Grey',
    colorFamily: 'Neutrals',
    inStock: true,
  },
  {
    id: '2',
    handle: 'charcoal-layer',
    name: 'Charcoal Layer',
    price: 185,
    categories: ['unisex'],
    images: [product2],
    description:
      'A boxy zip jacket paired with a compact duffel and tonal sunglasses — the kind of layer that quietly does the most work in an outfit.',
    details: ['Water-resistant shell', 'Boxy, cropped silhouette', 'Matching duffel included'],
    sizes: SIZES,
    type: 'Jacket',
    color: 'Charcoal',
    colorFamily: 'Neutrals',
    inStock: true,
  },
  {
    id: '3',
    handle: 'winter-trench',
    name: 'Winter Trench',
    price: 210,
    categories: ['women'],
    popular: true,
    images: [product3],
    description:
      'A relaxed wool trench worn open over a pleated mini, finished with tall boots for a look that moves easily from desk to dinner.',
    details: ['Brushed wool blend', 'Relaxed, unstructured cut', 'Falls just past the knee'],
    sizes: SIZES,
    type: 'Trench',
    color: 'Camel',
    colorFamily: 'Browns',
    inStock: true,
  },
  {
    id: '4',
    handle: 'soft-trench',
    name: 'Soft Trench',
    price: 260,
    categories: ['women'],
    images: [product4],
    description:
      'An oversized coat wrapped with a chunky scarf over a knit mini dress — deliberately soft, deliberately warm.',
    details: ['Brushed wool-blend coating', 'Oversized, relaxed fit', 'Scarf sold separately'],
    sizes: SIZES,
    type: 'Trench',
    color: 'Oatmeal',
    colorFamily: 'Neutrals',
    inStock: false,
  },
  {
    id: '5',
    handle: 'winter-city-layer',
    name: 'Winter City Layer',
    price: 300,
    categories: ['women'],
    popular: true,
    images: [product5],
    description:
      'A double-breasted overcoat layered over tailored separates, built for the coldest days without losing the silhouette.',
    details: ['Double-breasted wool overcoat', 'Fully lined', 'Tailored, structured shoulder'],
    sizes: SIZES,
    type: 'Overcoat',
    color: 'Navy',
    colorFamily: 'Blues',
    inStock: true,
  },
  {
    id: '6',
    handle: 'signature-hoodie-navy',
    name: 'Signature Hoodie — Navy',
    price: 128,
    categories: ['men', 'unisex'],
    popular: true,
    images: [heroFull, heroBack, heroPortrait],
    description:
      'Our signature oversized hoodie in brushed navy fleece, cut generously through the body and finished with a drawcord hood.',
    details: ['420gsm brushed cotton fleece', 'Oversized, dropped-shoulder fit', 'Kangaroo pocket, drawcord hood'],
    sizes: SIZES,
    type: 'Hoodie',
    color: 'Navy',
    colorFamily: 'Blues',
    inStock: true,
  },
  {
    id: '7',
    handle: 'signature-hoodie-black',
    name: 'Signature Hoodie — Black',
    price: 132,
    categories: ['men', 'unisex'],
    images: [heroBlackFront, heroBlackBack],
    description:
      'The same signature fit in soft-touch black fleece, paired here with wide-leg denim and a slouchy crossbody.',
    details: ['420gsm brushed cotton fleece', 'Oversized, dropped-shoulder fit', 'Kangaroo pocket, drawcord hood'],
    sizes: SIZES,
    type: 'Hoodie',
    color: 'Black',
    colorFamily: 'Neutrals',
    inStock: true,
  },

  /* ---------------- Shirts ---------------- */
  {
    id: '8',
    handle: 'garment-dyed-overshirt',
    name: 'Garment-Dyed Overshirt',
    price: 145,
    categories: ['men', 'unisex'],
    popular: true,
    images: [shirt1a, shirt1b],
    description:
      'A relaxed, boxy overshirt in soft garment-dyed cotton twill — worn open as a light layer or buttoned up on its own, built to fade and soften with every wash.',
    details: [
      'Garment-dyed cotton twill',
      'Relaxed, boxy fit',
      'Single chest patch pocket',
      'Locker loop at the back yoke',
    ],
    sizes: SIZES,
    type: 'Shirt',
    color: 'Stone Taupe',
    colorFamily: 'Neutrals',
    inStock: true,
  },
  {
    id: '9',
    handle: 'studio-oxford-shirt',
    name: 'Studio Oxford Shirt',
    price: 120,
    categories: ['men', 'unisex'],
    images: [],
    description: 'Coming soon — a crisp cotton oxford cut for everyday wear.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Shirt',
    color: 'White',
    colorFamily: 'Neutrals',
    inStock: true,
  },
  {
    id: '10',
    handle: 'weekend-flannel-shirt',
    name: 'Weekend Flannel Shirt',
    price: 110,
    categories: ['men', 'unisex'],
    images: [],
    description: 'Coming soon — brushed flannel built for cold mornings.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Shirt',
    color: 'Rust Plaid',
    colorFamily: 'Browns',
    inStock: false,
  },
  {
    id: '11',
    handle: 'linen-camp-shirt',
    name: 'Linen Camp Shirt',
    price: 130,
    categories: ['unisex', 'women'],
    images: [],
    description: 'Coming soon — an open-collar camp shirt in washed linen.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Shirt',
    color: 'Sky Blue',
    colorFamily: 'Blues',
    inStock: true,
  },

  /* ---------------- Denims ---------------- */
  {
    id: '12',
    handle: 'raw-selvedge-jean',
    name: 'Raw Selvedge Jean',
    price: 175,
    categories: ['men'],
    images: [],
    description: 'Coming soon — deep indigo selvedge denim, unwashed.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Denim',
    color: 'Raw Indigo',
    colorFamily: 'Blues',
    inStock: true,
  },
  {
    id: '13',
    handle: 'washed-straight-jean',
    name: 'Washed Straight Jean',
    price: 155,
    categories: ['men', 'unisex'],
    images: [],
    description: 'Coming soon — a straight-leg cut in a mid-blue wash.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Denim',
    color: 'Mid Wash',
    colorFamily: 'Blues',
    inStock: true,
  },
  {
    id: '14',
    handle: 'wide-leg-denim',
    name: 'Wide-Leg Denim',
    price: 165,
    categories: ['women', 'unisex'],
    images: [],
    description: 'Coming soon — relaxed wide-leg denim with a high rise.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Denim',
    color: 'Light Wash',
    colorFamily: 'Blues',
    inStock: false,
  },

  /* ---------------- Cargos ---------------- */
  {
    id: '15',
    handle: 'black-ripstop-cargos',
    name: 'Black Ripstop Cargos',
    price: 175,
    categories: ['men', 'unisex'],
    images: [],
    description:
      'A convertible ripstop cargo with two detachable pockets, suspenders, and twelve more multipurpose pockets — built for movement, made to last.',
    details: [
      'Premium ripstop cotton blend',
      'Convertible cargo-to-shorts design',
      '2 detachable multipurpose pockets',
      'Adjustable suspenders included',
    ],
    sizes: SIZES,
    type: 'Cargo',
    color: 'Black',
    colorFamily: 'Neutrals',
    inStock: true,
  },
  {
    id: '16',
    handle: 'olive-utility-cargos',
    name: 'Olive Utility Cargos',
    price: 165,
    categories: ['men'],
    images: [],
    description: 'Coming soon — a straight-leg utility cargo in washed olive.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Cargo',
    color: 'Olive',
    colorFamily: 'Greens',
    inStock: true,
  },
  {
    id: '17',
    handle: 'stone-relaxed-cargos',
    name: 'Stone Relaxed Cargos',
    price: 160,
    categories: ['unisex', 'women'],
    images: [],
    description: 'Coming soon — a relaxed-fit cargo in warm stone twill.',
    details: ['Details coming soon'],
    sizes: SIZES,
    type: 'Cargo',
    color: 'Stone',
    colorFamily: 'Neutrals',
    inStock: true,
  },
]

export function getProductByHandle(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'popular') return PRODUCTS.filter((p) => p.popular)
  if (category === 'men' || category === 'women' || category === 'unisex') {
    return PRODUCTS.filter((p) => p.categories.includes(category))
  }
  const type = Object.keys(TYPE_SLUGS).find((t) => TYPE_SLUGS[t] === category)
  if (type) return PRODUCTS.filter((p) => p.type === type)
  return PRODUCTS
}

export function formatPrice(price: number): string {
  return `${price} $`
}
