import products from '@/content/products.json'
import insightItems from '@/content/insights.json'
import type {Locale} from '@/lib/i18n'

export function getPrograms(locale: Locale) {
  return products.map((product) => ({
    slug: product.slug,
    title: product.title[locale],
    description: product.description[locale],
    detail: product.detail[locale],
    recognitionTitle: product.recognitionTitle[locale],
    recognitionItems: product.recognitionItems[locale],
    forWhomTitle: product.forWhomTitle[locale],
    forWhomText: product.forWhomText[locale],
    notForTitle: product.notForTitle[locale],
    notForText: product.notForText[locale],
    problemTitle: product.problemTitle[locale],
    problemText: product.problemText[locale],
    outcomesTitle: product.outcomesTitle[locale],
    outcomes: product.outcomes[locale],
    learnTitle: product.learnTitle[locale],
    topics: product.topics[locale],
    formatTitle: product.formatTitle[locale],
    formatText: product.formatText[locale],
    ctaTitle: product.ctaTitle[locale],
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
