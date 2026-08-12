import type {Metadata} from 'next'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {JsonLd} from '@/components/json-ld'
import {EditorialImage} from '@/components/portrait'
import {getCopy,getLocale} from '@/lib/i18n'
import {localizePath} from '@/lib/routes'
import {buildPageMetadata,localizedUrl,SITE_URL} from '@/lib/seo'
import styles from '../commercial.module.css'

const relatedInsights=[
  {
    slug:'de-ce-unele-conversatii-manageriale-schimba-lucrurile',
    ro:'De ce unele conversații manageriale schimbă lucrurile, iar altele nu',
    en:'Why some management conversations change things and others do not',
  },
  {
    slug:'o-decizie-buna-incepe-inainte-sa-alegi',
    ro:'O decizie bună începe înainte să alegi',
    en:'A good decision starts before you choose',
  },
  {
    slug:'negocierea-nu-este-doar-despre-argumente',
    ro:'Negocierea nu este doar despre argumente. Este și despre emoții.',
    en:'Negotiation is not only about arguments. It is also about emotions.',
  },
]

export function generateMetadata({searchParams}:{searchParams?:{lang?:string}}):Metadata{
  const locale=getLocale(searchParams?.lang)
  return buildPageMetadata({
    title:locale==='ro'?'Programe corporate pentru leadership, negociere și echipe':'Corporate programs for leadership, negotiation and teams',
    description:locale==='ro'
      ?'Programe corporate pentru manageri și echipe, construite în jurul contextului real al organizației: leadership, negociere, colaborare și conversații dificile.'
      :'Corporate programs for managers and teams built around the organization’s real context: leadership, negotiation, collaboration and difficult conversations.',
    path:'/corporate',
    locale,
  })
}

export default function Corporate({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).corporate
  const canonical=localizedUrl('/corporate',locale)

  const heroTitle=locale==='ro'
    ?'Nu pornim de la curs. Pornim de la problema reală.'
    :'We do not start with the course. We start with the real problem.'
  const diagnosticItems=locale==='ro'
    ?copy.diagnosticItems.map(item=>item.replace('ce trebuie să facă oamenii diferit','ce vrem să facă oamenii diferit'))
    :copy.diagnosticItems
  const sectionText=locale==='ro'
    ?'Ce se întâmplă acum? Ce am vrea să se întâmple diferit? Cine este implicat? Ce a fost deja încercat? Abia apoi alegem dacă are sens un training, un workshop, facilitare, coaching sau o combinație între ele.'
    :copy.sectionText
  const processItems=locale==='ro'
    ?copy.processItems.map(item=>item.title==='Definim ce trebuie să fie diferit'
      ?{...item,title:'Definim ce vrem să fie diferit'}
      :item)
    :copy.processItems
  const ctaTitle=locale==='ro'
    ?'Ce vrei să funcționeze mai bine după intervenție?'
    :copy.ctaTitle

  const serviceJsonLd={
    '@context':'https://schema.org',
    '@type':'Service',
    '@id':`${canonical}#service`,
    name:locale==='ro'?'Programe corporate pentru leadership, negociere și echipe':'Corporate programs for leadership, negotiation and teams',
    description:copy.intro,
    url:canonical,
    provider:{'@id':`${SITE_URL}/#person`},
    serviceType:locale==='ro'?'Training, workshop, facilitare și coaching pentru organizații':'Training, workshops, facilitation and coaching for organizations',
    inLanguage:locale==='ro'?'ro-RO':'en',
  }

  return <div className={`${styles.page} balanced-commercial-page`}>
    <JsonLd data={serviceJsonLd}/>

    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{heroTitle}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.diagnostic}>
      <div className={styles.diagnosticInner}>
        <div>
          <Eyebrow>{copy.diagnosticEyebrow}</Eyebrow>
          <h2 className={styles.statementSmall}>{copy.diagnosticTitle}</h2>
        </div>
        <ul className={`${styles.diagnosticList} clean-diagnostic-list`}>
          {diagnosticItems.map(item=><li key={item}>{item}</li>)}
        </ul>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div><h2 className={styles.statement}>{copy.sectionTitle}</h2></div>
        <p className={styles.sectionIntro}>{sectionText}</p>
      </div>
      <div style={{maxWidth:'760px'}}>
        <EditorialImage asset="coaching" kind="portrait" locale={locale}/>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.processEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.processTitle}</h2>
        </div>
      </div>
      <div className={styles.processList}>
        {processItems.map(item=><article className={`${styles.processRow} clean-process-row`} key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.domainsEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.domainsTitle}</h2>
        </div>
      </div>
      <div className={styles.twoGrid}>
        {copy.blocks.map(block=><article className={styles.editorialCard} key={block.title}>
          <h3>{block.title}</h3>
          <p>{block.description}</p>
        </article>)}
      </div>
    </section>

    <section className={styles.practice}>
      <div className={styles.practiceInner}>
        <div><Eyebrow>{copy.formatsEyebrow}</Eyebrow></div>
        <div>
          <h2 className={styles.statementSmall}>{copy.formatsTitle}</h2>
          <div className={styles.themeList} style={{marginTop:'42px',borderTopColor:'#55554f'}}>
            {copy.formats.map(format=><div className={styles.themeItem} key={format}>{format}</div>)}
          </div>
        </div>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{locale==='ro'?'Din Insights':'From Insights'}</Eyebrow>
          <h2 className={styles.sectionTitle}>{locale==='ro'?'Idei despre conversații, decizii și negociere în munca reală.':'Ideas about conversations, decisions and negotiation in real work.'}</h2>
        </div>
      </div>
      <div className={styles.twoGrid}>
        {relatedInsights.map(item=><article className={styles.editorialCard} key={item.slug}>
          <ArrowLink href={localizePath(`/insights/${item.slug}`,locale)}>{locale==='ro'?item.ro:item.en}</ArrowLink>
        </article>)}
      </div>
    </section>

    <section className={styles.proof}>
      <div className={styles.proofInner}>
        <div><Eyebrow>{copy.proofEyebrow}</Eyebrow></div>
        <article className={styles.proofCard}>
          <h3>{copy.proofTitle}</h3>
          <p>{copy.proofText}</p>
          <ArrowLink href={localizePath('/despre',locale)}>{locale==='ro'?'Vezi parcursul lui Bogdan':'See Bogdan’s background'}</ArrowLink>
        </article>
      </div>
    </section>

    <section className={styles.cta}>
      <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
      <ArrowLink href={localizePath('/contact',locale)}>{copy.cta}</ArrowLink>
    </section>
  </div>
}
