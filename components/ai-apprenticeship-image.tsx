import Image from 'next/image'

export const aiApprenticeshipSlug = 'ai-is-breaking-the-apprenticeship-model'
export const aiApprenticeshipImage = '/images/editorial/ai-apprenticeship-mentoring.webp'

export function AiApprenticeshipImage({
  className,
  locale,
}: {
  className: string
  locale: 'ro' | 'en'
}) {
  return (
    <figure className={className}>
      <Image
        src={aiApprenticeshipImage}
        width={1672}
        height={941}
        sizes="(max-width: 900px) 100vw, 850px"
        alt={
          locale === 'ro'
            ? 'Ilustrație generată cu AI: o profesionistă la început de carieră învață alături de un mentor, în timp ce inteligența artificială preia sarcinile de rutină'
            : 'AI-generated illustration: an early-career professional learns alongside a mentor while artificial intelligence automates routine tasks'
        }
        style={{ display: 'block', width: '100%', height: 'auto' }}
        priority
      />
    </figure>
  )
}
