import seo from '@/content/seo.json'

export const indexingApproved: boolean = Boolean(seo.indexingApproved)
export const canonicalOrigin: string | null = typeof seo.canonicalOrigin === 'string' ? seo.canonicalOrigin : null
