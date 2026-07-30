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

export type Category = 'men' | 'women' | 'unisex'

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
}

export const SIZES = ['XS', 'S', 'M', 'L', 'XL']

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
  return PRODUCTS
}

export function formatPrice(price: number): string {
  return `${price} $`
}
