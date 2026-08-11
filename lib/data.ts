import products from '@/content/products.json'
import insightItems from '@/content/insights.json'
import type {Locale} from '@/lib/i18n'

export function getPrograms(locale: Locale) {
  return products.map((product) => ({
    slug: product.slug,
    title: product.title[locale],
    description: product.description[locale],
    detail: product.detail[locale],
    topics: product.topics[locale],
    proof: product.proof,
  }))
}

export function getInsights(locale: Locale) {
  return insightItems.map((insight) => ({
    slug: insight.slug,
    status: insight.status,
    category: insight.category[locale],
    title: insight.title[locale],
    excerpt: insight.excerpt[locale],
  }))
}

export const programSlugs = products.map((product) => product.slug)
export const insightSlugs = insightItems.map((insight) => insight.slug)
