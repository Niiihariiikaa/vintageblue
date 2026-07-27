/**
 * Thin wrapper around Shopify's Storefront GraphQL API. Configured via
 * SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN (see server/.env.example
 * for where those come from) — never the Admin API token, which must
 * stay out of anything that talks to a public storefront.
 */

const API_VERSION = '2025-01'

function storeDomain() {
  return process.env.SHOPIFY_STORE_DOMAIN
}

function storefrontToken() {
  return process.env.SHOPIFY_STOREFRONT_TOKEN
}

export function isShopifyConfigured(): boolean {
  return Boolean(storeDomain() && storefrontToken())
}

interface GraphQLError {
  message: string
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const domain = storeDomain()
  const token = storefrontToken()
  if (!domain || !token) {
    throw new Error(
      'Shopify is not configured — set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN in server/.env',
    )
  }

  const res = await fetch(`https://${domain}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!res.ok) {
    throw new Error(`Shopify Storefront API responded ${res.status} ${res.statusText}`)
  }

  const json = (await res.json()) as { data?: T; errors?: GraphQLError[] }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join('; '))
  }
  return json.data as T
}

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export interface ShopifyProduct {
  id: string
  handle: string
  title: string
  priceAmount: string
  currencyCode: string
  imageUrl: string | null
  /** Storefront cart lines need a variant id, not the product id. */
  firstVariantId: string | null
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        featuredImage { url altText }
        variants(first: 1) {
          nodes { id }
        }
      }
    }
  }
`

interface ProductsResponse {
  products: {
    nodes: {
      id: string
      handle: string
      title: string
      priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
      featuredImage: { url: string } | null
      variants: { nodes: { id: string }[] }
    }[]
  }
}

export async function getProducts(first = 12): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, { first })
  return data.products.nodes.map((p) => ({
    id: p.id,
    handle: p.handle,
    title: p.title,
    priceAmount: p.priceRange.minVariantPrice.amount,
    currencyCode: p.priceRange.minVariantPrice.currencyCode,
    imageUrl: p.featuredImage?.url ?? null,
    firstVariantId: p.variants.nodes[0]?.id ?? null,
  }))
}

/* ------------------------------------------------------------------ */
/* Cart                                                                 */
/* ------------------------------------------------------------------ */

export interface ShopifyCart {
  id: string
  checkoutUrl: string
  totalQuantity: number
}

const CART_CREATE_MUTATION = `
  mutation CartCreate($merchandiseId: ID!, $quantity: Int!) {
    cartCreate(input: { lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }] }) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`

const CART_LINES_ADD_MUTATION = `
  mutation CartLinesAdd($cartId: ID!, $merchandiseId: ID!, $quantity: Int!) {
    cartLinesAdd(cartId: $cartId, lines: [{ merchandiseId: $merchandiseId, quantity: $quantity }]) {
      cart { id checkoutUrl totalQuantity }
      userErrors { field message }
    }
  }
`

interface CartMutationResponse {
  cart: ShopifyCart
  userErrors: GraphQLError[]
}

export async function createCart(
  merchandiseId: string,
  quantity = 1,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: CartMutationResponse }>(
    CART_CREATE_MUTATION,
    { merchandiseId, quantity },
  )
  if (data.cartCreate.userErrors.length) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join('; '))
  }
  return data.cartCreate.cart
}

export async function addCartLine(
  cartId: string,
  merchandiseId: string,
  quantity = 1,
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationResponse }>(
    CART_LINES_ADD_MUTATION,
    { cartId, merchandiseId, quantity },
  )
  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(data.cartLinesAdd.userErrors.map((e) => e.message).join('; '))
  }
  return data.cartLinesAdd.cart
}
