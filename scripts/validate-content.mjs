import { readFileSync } from 'node:fs'

const products = JSON.parse(readFileSync(new URL('../content/products.json', import.meta.url), 'utf8'))
const allowedStatuses = new Set(['draft','needs-confirmation','validated','approved','published'])
const allowedPillars = new Set(['Leadership & Teams','Negotiation & Sales','Networking & Influence','Career & Personal Performance'])
const slugs = new Set()

for (const product of products) {
  if (!product.slug || slugs.has(product.slug)) throw new Error(`Invalid or duplicate slug: ${product.slug}`)
  slugs.add(product.slug)
  if (!allowedStatuses.has(product.status)) throw new Error(`Invalid status for ${product.slug}`)
  if (!product.pillars?.every((pillar) => allowedPillars.has(pillar))) throw new Error(`Invalid pillar for ${product.slug}`)
  for (const locale of ['ro','en']) {
    if (!product.locales?.[locale]?.title || !product.locales?.[locale]?.cta) throw new Error(`Missing ${locale} content for ${product.slug}`)
  }
  if (['approved','published'].includes(product.status) && (!product.locales.ro.description || !product.locales.en.description)) {
    throw new Error(`Public product ${product.slug} is incomplete`)
  }
}

console.log(`Validated ${products.length} product records; ${products.filter((item)=>['approved','published'].includes(item.status)).length} are public.`)
