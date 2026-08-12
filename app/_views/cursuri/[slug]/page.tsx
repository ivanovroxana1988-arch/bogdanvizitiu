import type {Metadata} from 'next'
import {notFound} from 'next/navigation'
import {getPrograms,programSlugs} from '@/lib/data'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'
import {localizePath} from '@/lib/routes'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../../commercial.module.css'

const relatedInsightByProgram:Record<string,{slug:string;ro:string;en:string}>={
  'arta-negocierii':{
    slug:'negocierea-nu-este-doar-despre-argumente',
    ro:'Negocierea nu este doar despre argumente. Este și despre emoții.',
    en:'Negotiation is not only about arguments. It is also about emotions.',
  },
  'networking':{
    slug:'networkingul-nu-incepe-cu-schimbul-de-contacte',
    ro:'Networkingul nu începe cu schimbul de contacte',
    en:'Networking does not start with exchanging contacts',
  },
}

function seoTitle(slug:string,locale:'ro'|'en',fallback:string){
  if(locale==='ro'){
    if(slug==='arta-negocierii')return 'Curs de negociere pentru profesioniști'
    if(slug==='networking')return 'Curs de networking profesional'
  }
  if(slug==='arta-negocierii')return 'Negotiation course for professionals'
  if(slug==='networking')return 'Professional networking course'
  return fallback
}

function pageHeading(slug:string,locale:'ro'|'en',fallback:string){
  if(locale==='ro'){
    if(slug==='arta-negocierii')return 'Curs de negociere: Negotiation & Influence'
    if(slug==='networking')return 'Curs de networking profesional'
  }
  if(slug==='arta-negocierii')return 'Negotiation course: Negotiation & Influence'
  if(slug==='networking')return 'Professional networking course'
  return fallback
}

function seoDescription(slug:string,locale:'ro'|'en',fallback:string){
  if(locale==='ro'){
    if(slug==='arta-negocierii')return 'Curs de negociere pentru manageri, antreprenori, oameni de vânzări și profesioniști care vor să pregătească mai clar interesele, alternativele și concesiile.'
    if(slug==='networking')return 'Curs de networking profesional pentru manageri, antreprenori, specialiști și oameni de vânzări care vor să construiască relații relevante și follow-up cu context.'
  }
  if(slug==='arta-negocierii')return 'Negotiation course for managers, entrepreneurs, salespeople and professionals who want clearer interests, alternatives and choices under pressure.'
  if(slug==='networking')return 'Professional networking course for managers, entrepreneurs, specialists and salespeople who want relevant relationships and better follow-up.'
  return fallback
}

export function generateStaticParams(){
  return programSlugs.map(slug=>({slug}))
}

export function generateMetadata({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const program=getPrograms(locale).find(item=>item.slug===params.slug)
  const fallbackTitle=program?.title??(locale==='ro'?'Curs':'Program')
  const fallbackDescription=program?.description??''
  return buildPageMetadata({
    title:seoTitle(params.slug,locale,fallbackTitle),
    description:seoDescription(params.slug,locale,fallbackDescription),
    path:`/cursuri/${params.slug}`,
    locale,
  })
}

export default function Program({params,searchParams}:{params:{slug:string};searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programDetail
  const program=getPrograms(locale).find(item=>item.slug===params.slug)
  if(!program)notFound()
  const relatedInsight=relatedInsightByProgram[program.slug]

  return <div className={`${styles.page} balanced-commercial-page`}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{pageHeading(program.slug,locale,program.title)}</h1>
        <p className={styles.heroIntro}>{program.detail}</p>
      </div>
    </section>

    <section className={styles.diagnostic}>
      <div className={styles.diagnosticInner}>
        <div>
          <Eyebrow>{copy.recognitionEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{program.recognitionTitle}</h2>
        </div>
        <ul className={`${styles.diagnosticList} clean-diagnostic-list`}>
          {program.recognitionItems.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.fitGrid}>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.forWhomEyebrow}</Eyebrow>
          <h3>{program.forWhomTitle}</h3>
          <p>{program.forWhomText}</p>
        </article>
        <article className={styles.fitBlock}>
          <Eyebrow>{copy.notForEyebrow}</Eyebrow>
          <h3>{program.notForTitle}</h3>
          <p>{program.notForText}</p>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.problemEyebrow}</Eyebrow>
          <h2 className={styles.statement}>{program.problemTitle}</h2>
        </div>
        <p className={styles.sectionIntro}>{program.problemText}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.outcomesEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{program.outcomesTitle}</h2>
        </div>
      </div>
      <ul className={styles.outcomeList}>
        {program.outcomes.map(item=><li key={item}>{item}</li>)}
      </ul>
    </section>

    <section className={styles.practice}>
      <div className={styles.practiceInner}>
        <div><Eyebrow>{copy.formatEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{program.formatTitle}</h2>
          <p>{program.formatText}</p>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.learnEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{program.learnTitle}</h2>
        </div>
      </div>
      <div className={styles.themeList}>
        {program.topics.map(topic=><div className={styles.themeItem} key={topic}>{topic}</div>)}
      </div>
    </section>

    <section className={styles.proof}>
      <div className={styles.proofInner}>
        <div><Eyebrow>{copy.instructorEyebrow}</Eyebrow></div>
        <article className={styles.proofCard}>
          <h3>{copy.instructorTitle}</h3>
          <p>{copy.instructorText}</p>
        </article>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.practical}>
        <div><Eyebrow>{copy.faqEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{copy.faqTitle}</h2>
          <p className={styles.sectionIntro} style={{marginTop:'28px'}}>{copy.faqText}</p>
        </div>
      </div>
    </section>

    {relatedInsight&&<section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{locale==='ro'?'Din Insights':'From Insights'}</Eyebrow>
          <h2 className={styles.sectionTitle}>{locale==='ro'?'Aprofundează tema înainte de curs.':'Explore the topic before the course.'}</h2>
        </div>
      </div>
      <ArrowLink href={localizePath(`/insights/${relatedInsight.slug}`,locale)}>
        {locale==='ro'?relatedInsight.ro:relatedInsight.en}
      </ArrowLink>
    </section>}

    <section className={styles.cta}>
      <Eyebrow>{copy.ctaEyebrow}</Eyebrow>
      <h2 className={styles.ctaTitle}>{program.ctaTitle}</h2>
      <ArrowLink href={localizePath('/contact',locale)}>{copy.cta}</ArrowLink>
    </section>
  </div>
}
