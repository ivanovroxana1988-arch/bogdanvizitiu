import products from '@/content/products.json'
import insightItems from '@/content/insights.json'
import livesInsight from '@/content/insights/lives.json'
import emotionsLearningInsight from '@/content/insights/emotii-invatare.json'
import autopilotInsight from '@/content/insights/pilot-automat.json'
import negotiationEmotionsInsight from '@/content/insights/negociere-emotii.json'
import type {Locale} from '@/lib/i18n'

const allInsightItems=[
  insightItems[0],
  livesInsight,
  emotionsLearningInsight,
  autopilotInsight,
  negotiationEmotionsInsight,
  ...insightItems.slice(1),
]

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
  return allInsightItems.map((insight) => ({
    slug: insight.slug,
    status: insight.status,
    category: insight.category[locale],
    title: insight.title[locale],
    subtitle: insight.subtitle[locale],
    excerpt: insight.excerpt[locale],
    readTime: insight.readTime[locale],
    publishedAt: insight.publishedAt,
    intro: insight.intro[locale],
    sections: insight.sections[locale],
    closing: insight.closing[locale],
    cta: {
      title: insight.cta.title[locale],
      label: insight.cta.label[locale],
      href: insight.cta.href,
    },
    sourceNote: insight.sourceNote[locale],
    sources: insight.sources,
  }))
}

export function getPublishedInsights(locale: Locale) {
  return getInsights(locale).filter((insight) => insight.status === 'published')
}

export const programSlugs = products.map((product) => product.slug)
export const insightSlugs = allInsightItems.map((insight) => insight.slug)
export const publishedInsightSlugs = allInsightItems
  .filter((insight) => insight.status === 'published')
  .map((insight) => insight.slug)
