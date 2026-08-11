import productsJson from '@/content/products.json'
import type { Locale, LocalizedProduct } from './schemas'
import { assertProducts, isPublicStatus } from './schemas'

assertProducts(productsJson)

export type PublicProduct = Omit<LocalizedProduct, 'locales'> & LocalizedProduct['locales']['ro']

function localize(product: LocalizedProduct, locale: Locale): PublicProduct {
  const { locales, ...shared } = product
  return { ...shared, ...locales[locale] }
}

export function getPublicProducts(locale: Locale) {
  return productsJson.filter((product) => isPublicStatus(product.status)).map((product) => localize(product, locale))
}

export function getPublicProduct(slug: string, locale: Locale) {
  const product = productsJson.find((item) => item.slug === slug && isPublicStatus(item.status))
  return product ? localize(product, locale) : undefined
}
