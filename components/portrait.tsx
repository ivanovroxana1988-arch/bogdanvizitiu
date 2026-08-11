import Image from 'next/image'
import media from '@/content/media.json'
import styles from './concept-image.module.css'

type MediaKey = keyof typeof media.images
type ConceptKey = keyof typeof media.concepts
type EditorialImageProps = { asset?: MediaKey; kind?: 'portrait'|'event'|'workshop'|'insight'; className?: string }
type ConceptImageProps = { asset: ConceptKey; kind?: 'wide'|'editorial'|'insight'; className?: string }

const index: Record<MediaKey,string> = {hero:'01',portraitDark:'02',speaking:'03',workshop:'04',coaching:'05',candid:'06'}

/** Renders approved first-party photography, or a deliberately abstract editorial asset marker. */
export function EditorialImage({asset='hero',kind='portrait',className=''}:EditorialImageProps){
  const item=media.images[asset]
  const approved=item.status==='approved'
  return <figure className={`editorial-image editorial-image--${kind} ${className}`} aria-label={approved?item.alt:undefined}>
    {approved?<Image src={item.src} alt={item.alt} fill priority={asset==='hero'} sizes={asset==='hero'?'(max-width: 900px) 100vw, 55vw':'(max-width: 900px) 100vw, 50vw'}/>:<div className="image-placeholder" aria-hidden="true"><span>BGV / IMAGE {index[asset]}</span><i/><span>{kind==='portrait'?'PORTRAIT 4:5':'EDITORIAL 3:2'}</span><small>ASSET PENDING</small></div>}
  </figure>
}

/**
 * Renders licensed conceptual photography only as context or atmosphere.
 * These images must never be presented as Bogdan, his clients, or his real events.
 */
export function ConceptImage({asset,kind='wide',className=''}:ConceptImageProps){
  const item=media.concepts[asset]
  const approved=item.status==='approved' && item.rights_status==='licensed'

  return <figure className={`${styles.conceptImage} ${styles[kind]} ${className}`}>
    {approved
      ? <img src={item.src} alt={item.alt} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>
      : <div className={styles.placeholder} aria-hidden="true">Concept image unavailable</div>}
  </figure>
}

export const Portrait=({event=false}:{event?:boolean})=><EditorialImage asset={event?'speaking':'hero'} kind={event?'event':'portrait'}/>
