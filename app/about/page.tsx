import {ArrowLink,Eyebrow} from '@/components/ui'
import {Portrait} from '@/components/portrait'
import {getLocale} from '@/lib/i18n'
import aboutCopy from '@/content/about-copy.json'

export const metadata={title:'Despre Bogdan'}

export default function About({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=aboutCopy[locale]

  return <>
    <section className="page-hero shell">
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className="page-hero-grid">
        <h1>{copy.titleLines.map(line=><span key={line} style={{display:'block'}}>{line}</span>)}</h1>
        <p>{copy.intro}</p>
      </div>
    </section>

    <section className="shell content-grid">
      <Portrait/>
      <div className="prose">
        {copy.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
        <p><strong>{copy.roleLine}</strong></p>
        <p>{copy.closing}</p>
        <div style={{marginTop:'36px'}}><ArrowLink href="/programs">{copy.cta}</ArrowLink></div>
      </div>
    </section>
  </>
}
