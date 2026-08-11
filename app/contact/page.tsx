import {PageHero} from '@/components/ui'
import {getCopy,getLocale} from '@/lib/i18n'

export const metadata={title:'Contact'}

export default function Contact({searchParams}:{searchParams?:{lang?:string}}){
  const locale=getLocale(searchParams?.lang)
  const copy=getCopy(locale).contact

  return <>
    <PageHero eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro}/>
    <section className="shell"><form className="contact-form">
      <label>{copy.name}<input name="name" autoComplete="name" required/></label>
      <label>{copy.email}<input name="email" type="email" autoComplete="email" required/></label>
      <label>{copy.interest}<input name="interest" placeholder={copy.interestPlaceholder}/></label>
      <label>{copy.message}<textarea name="message" required/></label>
      <button type="submit">{copy.submit} →</button>
    </form></section>
  </>
}
