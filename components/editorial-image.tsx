import Image from 'next/image'
import media from '@/content/media.json'

type MediaKey = keyof typeof media.images
type Treatment = 'color' | 'monochrome' | 'warm'

type EditorialMediaProps = {
  mediaKey: MediaKey
  className?: string
  treatment?: Treatment
  objectPosition?: string
  priority?: boolean
  sizes?: string
  label: string
  crop: string
}

export function EditorialMedia({
  mediaKey,
  className = '',
  treatment = 'warm',
  objectPosition = '50% 50%',
  priority = false,
  sizes = '(max-width: 900px) 100vw, 55vw',
  label,
  crop,
}: EditorialMediaProps) {
  const asset = media.images[mediaKey]
  const approved = String(asset.status) === 'approved'

  return <figure className={`media-frame media-frame--${mediaKey} media-frame--${treatment} ${className}`}>
    {approved ? <Image
      src={asset.src}
      alt={asset.alt}
      fill
      priority={priority}
      sizes={sizes}
      style={{ objectPosition }}
    /> : <div className="media-placeholder" role="img" aria-label={`${label} — fotografie în așteptarea aprobării`}>
      <span className="media-placeholder__mark" aria-hidden="true">BGV / IMAGE</span>
      <span className="media-placeholder__rule" aria-hidden="true" />
      <span className="media-placeholder__label">{label}</span>
      <span className="media-placeholder__crop">Expected crop / {crop}</span>
    </div>}
  </figure>
}

export const HeroPortrait = () => <EditorialMedia mediaKey="hero" label="Hero portrait" crop="4:5" priority sizes="(max-width: 900px) 100vw, 58vw" />
export const EditorialPortrait = () => <EditorialMedia mediaKey="portraitDark" label="Editorial portrait" crop="4:5" treatment="monochrome" />
export const SpeakingImage = () => <EditorialMedia mediaKey="speaking" label="Speaking documentation" crop="3:2" treatment="color" sizes="(max-width: 900px) 100vw, 65vw" />
export const WorkshopImage = () => <EditorialMedia mediaKey="workshop" label="Workshop documentation" crop="16:9" treatment="warm" sizes="100vw" />
export const InsightImage = () => <EditorialMedia mediaKey="candid" label="Field notes image" crop="16:10" treatment="monochrome" />
