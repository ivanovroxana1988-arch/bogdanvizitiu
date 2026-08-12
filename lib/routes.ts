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

const enToRo=Object.fromEntries(Object.entries(roToEn).map(([ro,en])=>[en,ro])) as Record<string,string>

export function localeFromPathname(pathname:string):Locale{
  return pathname==='/en'||pathname.startsWith('/en/')?'en':'ro'
}

function toEnglish(pathname:string){
  if(localeFromPathname(pathname)==='en')return pathname
  if(roToEn[pathname])return roToEn[pathname]
  if(pathname.startsWith('/cursuri/'))return `/en/programs/${pathname.slice('/cursuri/'.length)}`
  if(pathname.startsWith('/insights/'))return `/en/insights/${pathname.slice('/insights/'.length)}`
  return pathname==='/'?'/en':`/en${pathname}`
}

function toRomanian(pathname:string){
  if(localeFromPathname(pathname)==='ro')return pathname
  if(enToRo[pathname])return enToRo[pathname]
  if(pathname.startsWith('/en/programs/'))return `/cursuri/${pathname.slice('/en/programs/'.length)}`
  if(pathname.startsWith('/en/insights/'))return `/insights/${pathname.slice('/en/insights/'.length)}`
  const withoutPrefix=pathname.slice(3)
  return withoutPrefix||'/'
}

export function localizePath(pathname:string,locale:Locale){
  return locale==='en'?toEnglish(pathname):toRomanian(pathname)
}
