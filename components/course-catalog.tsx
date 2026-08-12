'use client'

import {useMemo,useState} from 'react'
import {ConceptImage} from '@/components/portrait'
import {ArrowLink} from '@/components/ui'
import type {Locale} from '@/lib/i18n'
import styles from './course-catalog.module.css'

type Program={
  slug:string
  title:string
  description:string
}

type CategoryKey='networking'|'negotiation'|'other'
type ConceptAsset='networkingEditorial'|'negotiationEditorial'

type CatalogMeta={
  category:CategoryKey
  label:{ro:string;en:string}
  image?:ConceptAsset
}

const catalogMeta:Record<string,CatalogMeta>={
  networking:{
    category:'networking',
    label:{ro:'Networking & relații',en:'Networking & relationships'},
    image:'networkingEditorial',
  },
  'arta-negocierii':{
    category:'negotiation',
    label:{ro:'Negociere & influență',en:'Negotiation & influence'},
    image:'negotiationEditorial',
  },
}

const fallbackMeta:CatalogMeta={
  category:'other',
  label:{ro:'Alte programe',en:'Other programs'},
}

function getMeta(program:Program){
  return catalogMeta[program.slug]??fallbackMeta
}

export function CourseCatalog({
  locale,
  programs,
  initialCategory,
  viewProgramLabel,
}:{
  locale:Locale
  programs:Program[]
  initialCategory?:string
  viewProgramLabel:string
}){
  const categories=useMemo(()=>{
    const seen=new Set<CategoryKey>()
    return programs.reduce<Array<{key:CategoryKey;label:string}>>((items,program)=>{
      const meta=getMeta(program)
      if(seen.has(meta.category))return items
      seen.add(meta.category)
      items.push({key:meta.category,label:meta.label[locale]})
      return items
    },[])
  },[locale,programs])

  const hasInitialCategory=categories.some(category=>category.key===initialCategory)
  const [activeCategory,setActiveCategory]=useState<CategoryKey|'all'>(
    hasInitialCategory?initialCategory as CategoryKey:'all',
  )

  const filteredPrograms=activeCategory==='all'
    ?programs
    :programs.filter(program=>getMeta(program).category===activeCategory)

  const selectCategory=(category:CategoryKey|'all')=>{
    setActiveCategory(category)
    if(typeof window==='undefined')return

    const url=new URL(window.location.href)
    const queryKey=locale==='ro'?'categorie':'category'
    if(category==='all')url.searchParams.delete(queryKey)
    else url.searchParams.set(queryKey,category)
    window.history.replaceState(window.history.state,'',`${url.pathname}${url.search}${url.hash}`)
  }

  return <div className={styles.catalog}>
    <div className={styles.filterRail}>
      <div className={styles.filters} role="toolbar" aria-label={locale==='ro'?'Filtrează cursurile':'Filter programs'}>
        <button
          className={`${styles.filterButton} ${activeCategory==='all'?styles.filterButtonActive:''}`}
          type="button"
          aria-pressed={activeCategory==='all'}
          onClick={()=>selectCategory('all')}
        >
          {locale==='ro'?'Toate':'All'}
        </button>
        {categories.map(category=><button
          className={`${styles.filterButton} ${activeCategory===category.key?styles.filterButtonActive:''}`}
          type="button"
          aria-pressed={activeCategory===category.key}
          onClick={()=>selectCategory(category.key)}
          key={category.key}
        >
          {category.label}
        </button>)}
      </div>
      <span className="sr-only" aria-live="polite">
        {locale==='ro'
          ?`${filteredPrograms.length} programe afișate`
          :`${filteredPrograms.length} programs shown`}
      </span>
    </div>

    <div className={styles.grid}>
      {filteredPrograms.map(program=>{
        const meta=getMeta(program)
        return <article className={styles.card} key={program.slug}>
          {meta.image?<ConceptImage asset={meta.image} kind="wide" locale={locale}/>:null}
          <div className={styles.cardBody}>
            <div className={styles.cardMeta}>
              <span>{meta.label[locale]}</span>
              <span>{locale==='ro'?'Program deschis':'Open program'}</span>
            </div>
            <h3>{program.title}</h3>
            <p>{program.description}</p>
            <ArrowLink className={styles.cardLink} href={`/cursuri/${program.slug}`}>
              {viewProgramLabel}
            </ArrowLink>
          </div>
        </article>
      })}
    </div>
  </div>
}
