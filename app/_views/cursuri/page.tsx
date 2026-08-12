import type {Metadata} from 'next'
import {CourseCatalog} from '@/components/course-catalog'
import {ArrowLink,Eyebrow} from '@/components/ui'
import {getPrograms} from '@/lib/data'
import {getCopy,getLocale} from '@/lib/i18n'
import {buildPageMetadata} from '@/lib/seo'
import styles from '../commercial.module.css'

type SearchParams={
  lang?:string
  categorie?:string
  category?:string
}

export function generateMetadata({searchParams}:{searchParams?:SearchParams}):Metadata{
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  return buildPageMetadata({
    title:locale==='ro'?'Cursuri':'Open programs',
    description:copy.intro,
    path:'/cursuri',
    locale,
  })
}

export default function Programs({searchParams}:{searchParams?:SearchParams}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).programs
  const programs=getPrograms(locale)
  const initialCategory=locale==='ro'?searchParams?.categorie:searchParams?.category

  return <div className={styles.page}>
    <section className={styles.hero}>
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <div className={styles.heroGrid}>
        <h1>{copy.title}</h1>
        <p className={styles.heroIntro}>{copy.intro}</p>
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div>
          <Eyebrow>{copy.choiceEyebrow}</Eyebrow>
          <h2 className={styles.sectionTitle}>{copy.choiceTitle}</h2>
        </div>
      </div>
      <CourseCatalog
        locale={locale}
        programs={programs}
        initialCategory={initialCategory}
        viewProgramLabel={copy.viewProgram}
      />
    </section>

    <section className={styles.cta}>
      <Eyebrow>{locale==='ro'?'Pentru organizații':'For organizations'}</Eyebrow>
      <h2 className={styles.ctaTitle}>{copy.tailoredTitle}</h2>
      <p className={styles.sectionIntro} style={{maxWidth:'640px',marginBottom:'34px'}}>{copy.tailoredText}</p>
      <ArrowLink href="/corporate">{copy.tailoredCta}</ArrowLink>
    </section>
  </div>
}
