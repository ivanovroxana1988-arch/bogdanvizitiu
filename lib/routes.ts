export type Locale='ro'|'en'

const roToEn:Record<string,string>={
  '/':'/en',
  '/despre':'/en/about',
  '/cursuri':'/en/programs',
  '/coaching':'/en/coaching',
  '/corporate':'/en/corporate',
  '/media':'/en/speaking',
  '/insights':'/en/insights',
  '/resurse':'/en/resources',
  '/contact':'/en/contact',
  '/confidentialitate':'/en/privacy',
  '/termeni':'/en/terms',
}

const legacyEnglishToRomanian:Record<string,string>={
  '/about':'/despre',
  '/programs':'/cursuri',
  '/speaking':'/media',
  '/privacy':'/confidentialitate',
  '/terms':'/termeni',
}

const programSlugRoToEn:Record<string,string>={
  'networking':'networking',
  'arta-negocierii':'negotiation-influence',
}

const insightSlugRoToEn:Record<string,string>={
  'networkingul-nu-incepe-cu-schimbul-de-contacte':'networking-does-not-start-with-exchanging-contacts',
  'de-la-unde-sunt-la-ce-fac-mai-departe-modelul-lives':'from-where-i-am-to-what-i-do-next-lives-model',
  'nu-invatam-doar-cu-mintea':'we-do-not-learn-with-the-mind-alone',
  'cat-din-viata-traim-pe-pilot-automat':'how-much-of-life-do-we-live-on-autopilot',
  'negocierea-nu-este-doar-despre-argumente':'negotiation-is-not-just-about-arguments',
  'de-ce-unele-conversatii-manageriale-schimba-lucrurile':'why-some-management-conversations-change-things',
  'stii-ce-ai-de-facut-de-ce-nu-faci':'you-know-what-to-do-why-are-you-not-doing-it',
  'o-decizie-buna-incepe-inainte-sa-alegi':'a-good-decision-starts-before-you-choose',
  'coaching-sau-consultanta-de-ce-ai-nevoie-de-fapt':'coaching-or-consulting-what-do-you-actually-need',
}

const enToRo=Object.fromEntries(Object.entries(roToEn).map(([ro,en])=>[en,ro])) as Record<string,string>
const programSlugEnToRo=Object.fromEntries(Object.entries(programSlugRoToEn).map(([ro,en])=>[en,ro])) as Record<string,string>
const insightSlugEnToRo=Object.fromEntries(Object.entries(insightSlugRoToEn).map(([ro,en])=>[en,ro])) as Record<string,string>

export function toEnglishProgramSlug(slug:string){return programSlugRoToEn[slug]??slug}
export function toRomanianProgramSlug(slug:string){return programSlugEnToRo[slug]??slug}
export function toEnglishInsightSlug(slug:string){return insightSlugRoToEn[slug]??slug}
export function toRomanianInsightSlug(slug:string){return insightSlugEnToRo[slug]??slug}

export function localeFromPathname(pathname:string):Locale{
  return pathname==='/en'||pathname.startsWith('/en/')?'en':'ro'
}

function normalizeRomanianSource(pathname:string){
  if(localeFromPathname(pathname)==='en')return toRomanian(pathname)
  if(legacyEnglishToRomanian[pathname])return legacyEnglishToRomanian[pathname]
  if(pathname.startsWith('/programs/')){
    return `/cursuri/${toRomanianProgramSlug(pathname.slice('/programs/'.length))}`
  }
  return pathname
}

function toEnglish(pathname:string){
  if(localeFromPathname(pathname)==='en')return pathname
  if(roToEn[pathname])return roToEn[pathname]
  if(pathname.startsWith('/cursuri/'))return `/en/programs/${toEnglishProgramSlug(pathname.slice('/cursuri/'.length))}`
  if(pathname.startsWith('/insights/'))return `/en/insights/${toEnglishInsightSlug(pathname.slice('/insights/'.length))}`
  return pathname==='/'?'/en':`/en${pathname}`
}

function toRomanian(pathname:string){
  if(localeFromPathname(pathname)==='ro')return pathname
  if(enToRo[pathname])return enToRo[pathname]
  if(pathname.startsWith('/en/programs/'))return `/cursuri/${toRomanianProgramSlug(pathname.slice('/en/programs/'.length))}`
  if(pathname.startsWith('/en/insights/'))return `/insights/${toRomanianInsightSlug(pathname.slice('/en/insights/'.length))}`
  const withoutPrefix=pathname.slice(3)
  return withoutPrefix||'/'
}

export function localizePath(pathname:string,locale:Locale){
  const canonicalRomanianPath=normalizeRomanianSource(pathname)
  return locale==='en'?toEnglish(canonicalRomanianPath):canonicalRomanianPath
}
