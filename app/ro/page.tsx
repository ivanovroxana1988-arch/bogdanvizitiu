import type { Metadata } from 'next'
import { ArrowLink, Eyebrow } from '@/components/ui'
import { Portrait } from '@/components/portrait'
import profile from '@/content/profile.json'
import products from '@/content/products.json'

export const metadata: Metadata = {
  title: 'Bogdan Vizitiu',
  description: 'Leadership, negociere, networking și performanță profesională.',
  alternates: { canonical: '/ro', languages: { en: '/', ro: '/ro' } },
}

export default function RomanianHome() {
  return <>
    <section className="hero shell"><div className="hero-grid"><div className="hero-copy">
      <Eyebrow>Bogdan Vizitiu</Eyebrow>
      <h1>Bogdan<br/>Vizitiu.</h1>
      <p className="lead">Coaching, training și facilitare pentru oameni și organizații.</p>
      <div className="actions"><ArrowLink href="/ro/cursuri">Vezi cursurile</ArrowLink><a className="text-link" href="/ro/despre">Despre Bogdan</a></div>
    </div><Portrait/></div></section>

    <section className="areas shell"><Eyebrow>Domenii de lucru</Eyebrow><div className="area-grid">
      {profile.expertise.map((area, index) => <article className="area" key={area}><span className="num">0{index + 1}</span><h3>{area}</h3></article>)}
    </div></section>

    <section className="programs shell"><div className="section-head"><div><Eyebrow>Cursuri deschise</Eyebrow><h2 className="section-title">Cursuri</h2></div></div>
      {products.map((product, index) => <article className="program-row" key={product.slug}><span>0{index + 1}</span><h3>{product.title}</h3><p>{product.pillars.join(' · ')}</p><ArrowLink href={`/ro/cursuri/${product.slug}`}>{product.cta}</ArrowLink></article>)}
    </section>

    <section className="dark"><div className="shell corporate-grid"><div className="corporate-title"><Eyebrow>Pentru organizații</Eyebrow><h2>Învățare construită<br/>în jurul realității.</h2></div><div className="corporate-copy"><p>Programele corporate vor fi publicate după confirmarea formatelor și a informațiilor.</p><ArrowLink href="/ro/corporate">Corporate</ArrowLink></div></div></section>
    <section className="contact-band shell"><h2>Hai să discutăm.</h2><div className="contact-bottom"><p>Coaching · Cursuri · Corporate</p><ArrowLink href="/ro/contact">Contact</ArrowLink></div></section>
  </>
}
