export type Locale = 'ro' | 'en'
export type PublicationStatus = 'draft' | 'needs-confirmation' | 'validated' | 'approved' | 'published'

export type LocalizedProduct = {
  slug: string
  category: string
  pillars: string[]
  status: PublicationStatus
  proofSources: string[]
  locales: Record<Locale, { title: string; description: string | null; cta: string }>
  dates: string[]
  price: number | null
}

const publicStatuses: PublicationStatus[] = ['approved', 'published']
export const isPublicStatus = (status: PublicationStatus) => publicStatuses.includes(status)

export function assertProducts(value: unknown): asserts value is LocalizedProduct[] {
  if (!Array.isArray(value)) throw new Error('products.json must contain an array')
  const slugs = new Set<string>()
  for (const item of value) {
    if (!item || typeof item !== 'object') throw new Error('Invalid product record')
    const product = item as Partial<LocalizedProduct>
    if (!product.slug || slugs.has(product.slug)) throw new Error(`Invalid or duplicate product slug: ${product.slug ?? 'missing'}`)
    slugs.add(product.slug)
    if (!product.locales?.ro?.title || !product.locales?.en?.title) throw new Error(`Product ${product.slug} requires RO and EN titles`)
    if (!product.status || !['draft','needs-confirmation','validated','approved','published'].includes(product.status)) throw new Error(`Product ${product.slug} has an invalid status`)
  }
}
