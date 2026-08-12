import Image from 'next/image'
import media from '@/content/media.json'
import type {Locale} from '@/lib/routes'
import styles from './concept-image.module.css'

type MediaKey = keyof typeof media.images
type ConceptKey = keyof typeof media.concepts
type EditorialImageProps = { asset?: MediaKey; kind?: 'portrait'|'event'|'workshop'|'insight'; className?: string; locale?: Locale }
type ConceptImageProps = { asset: ConceptKey; kind?: 'wide'|'editorial'|'insight'; className?: string; locale?: Locale }

const index: Record<MediaKey,string> = {hero:'01',portraitDark:'02',speaking:'03',workshop:'04',coaching:'05',candid:'06'}
const hasFirstPartyRights=(item:{status:string;rights_status:string})=>item.status==='approved'&&(item.rights_status==='owned'||item.rights_status==='permission'||item.rights_status==='approved-for-site-by-user')
const hasConceptRights=(item:{status:string;rights_status:string})=>item.status==='approved'&&(item.rights_status==='licensed'||item.rights_status==='permission'||item.rights_status==='owned')

const englishMediaAlt:Record<MediaKey,string>={
  hero:'Bogdan Vizitiu, portrait with arms crossed',
  portraitDark:'Portrait of Bogdan Vizitiu',
  speaking:'Bogdan Vizitiu on stage during a presentation',
  workshop:'Bogdan Vizitiu holding a microphone during a training session',
  coaching:'Editorial portrait of Bogdan Vizitiu',
  candid:'Bogdan Vizitiu at a café',
}

const englishConceptAlt:Record<ConceptKey,string>={
  workshopNotes:'Open notebook, writing tools, headphones and coffee on a wooden desk',
  architectureStair:'Modern spiral staircase shaped by light and shadow',
  planningDesk:'Hands holding an open notebook beside a laptop and coffee',
  insightsWorkspace:'Open notebook, writing tools, headphones and coffee on a wooden desk',
  networkingEditorial:'Editorial illustration of Bogdan Vizitiu in a networking conversation',
  livesEditorial:'Bogdan Vizitiu explaining the LIVES model at a flip chart',
  emotionsLearningEditorial:'Editorial scene about the connection between emotional state, attention and learning',
  mindfulnessAutopilotEditorial:'Bogdan Vizitiu standing still in a busy train station as people move around him',
  negotiationEditorial:'Two people in a negotiation conversation at a table with documents and notes',
}

export function EditorialImage({asset='hero',kind='portrait',className='',locale='ro'}:EditorialImageProps){
  const item=media.images[asset]
  const approved=hasFirstPartyRights(item)
  const alt=locale==='en'?englishMediaAlt[asset]:item.alt
  return <figure className={`editorial-image editorial-image--${kind} ${className}`} aria-label={approved?alt:undefined}>
    {approved?<Image src={item.src} alt={alt} fill priority={asset==='hero'} sizes={asset==='hero'?'(max-width: 900px) 100vw, 55vw':'(max-width: 900px) 100vw, 50vw'}/>:<div className="image-placeholder" aria-hidden="true"><span>BGV / IMAGE {index[asset]}</span><i/><span>{kind==='portrait'?'PORTRAIT 4:5':'EDITORIAL 3:2'}</span><small>ASSET PENDING</small></div>}
  </figure>
}

export function ConceptImage({asset,kind='wide',className='',locale='ro'}:ConceptImageProps){
  const item=media.concepts[asset]
  const approved=hasConceptRights(item)
  const alt=locale==='en'?englishConceptAlt[asset]:item.alt
  return <figure className={`${styles.conceptImage} ${styles[kind]} ${className}`}>
    {approved?<img src={item.src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer"/>:<div className={styles.placeholder} aria-hidden="true">Concept image unavailable</div>}
  </figure>
}

export const Portrait=({event=false,locale='ro'}:{event?:boolean;locale?:Locale})=><EditorialImage asset={event?'speaking':'hero'} kind={event?'event':'portrait'} locale={locale}/>
