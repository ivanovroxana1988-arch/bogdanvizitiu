import {PageHero} from '@/components/ui'
import business from '@/content/business.json'
import legalCopy from '@/content/legal-copy.json'
import {getLocale} from '@/lib/i18n'

export default function Privacy({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=legalCopy[locale].privacy
  const authorityLabel=locale==='ro'?'Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)':'Romanian National Supervisory Authority for Personal Data Processing (ANSPDCP)'

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell prose">
      <p><strong>{locale==='ro'?'Ultima actualizare':'Last updated'}:</strong> {copy.updated}</p>

      <div style={{margin:'48px 0'}}>
        <h2>{locale==='ro'?'Datele operatorului':'Controller details'}</h2>
        <p><strong>{business.legalName}</strong><br/>
          CUI / Tax ID: {business.taxId}<br/>
          {locale==='ro'?'Registrul Comerțului':'Trade Register'}: {business.tradeRegister}<br/>
          EUID: {business.euid}<br/>
          {business.registeredOffice}<br/>
          <a href={`mailto:${business.email}`}>{business.email}</a><br/>
          <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a>
        </p>
      </div>

      {copy.sections.map(section=><div key={section.title} style={{margin:'52px 0'}}>
        <h2>{section.title}</h2>
        {section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
        {section.bullets.length>0&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}
      </div>)}

      <div style={{margin:'52px 0'}}>
        <h2>{locale==='ro'?'Plângeri și întrebări':'Complaints and questions'}</h2>
        <p>{locale==='ro'?'Pentru orice întrebare privind datele personale sau pentru exercitarea drepturilor, scrie la':'For questions about personal data or to exercise your rights, write to'} <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        <p>{locale==='ro'?'Dacă consideri că prelucrarea datelor tale încalcă legislația aplicabilă, poți depune o plângere la':'If you believe that the processing of your data breaches applicable law, you may lodge a complaint with the'} <a href="https://www.dataprotection.ro/" target="_blank" rel="noopener noreferrer">{authorityLabel}</a>.</p>
      </div>
    </section>
  </>
}
