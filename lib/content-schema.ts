export type Localized<T> = {ro:T;en:T}
export type RightsStatus = 'owned'|'permission'|'approved-for-site-by-user'|'licensed'|'embed-only'|'unknown'

export interface ProductRecord {
  slug:string
  title:Localized<string>
  type:string
  status:string
  proof?:string[]
  [key:string]:unknown
}

export interface CourseProductRecord extends ProductRecord {
  description:Localized<string>
  detail:Localized<string>
  recognitionTitle:Localized<string>
  recognitionItems:Localized<string[]>
  forWhomTitle:Localized<string>
  forWhomText:Localized<string>
  notForTitle:Localized<string>
  notForText:Localized<string>
  problemTitle:Localized<string>
  problemText:Localized<string>
  outcomesTitle:Localized<string>
  outcomes:Localized<string[]>
  learnTitle:Localized<string>
  topics:Localized<string[]>
  formatTitle:Localized<string>
  formatText:Localized<string>
  ctaTitle:Localized<string>
  dates:string[]
  price:string|number|null
}

export interface AssetRecord {
  src:string
  alt:string
  usage:string
  status:string
  rights_status:RightsStatus
  source:string
  [key:string]:unknown
}

export interface AppearanceRecord {
  id:string
  title:string
  type:string
  status:string
  rights_status:RightsStatus
  external_url?:string
  published_at?:string
  source_ref?:string
  [key:string]:unknown
}

export interface MediaCollection {
  images:Record<string,AssetRecord>
  concepts:Record<string,AssetRecord>
  appearances:AppearanceRecord[]
  editorialNote?:string
}

export interface TestimonialRecord {
  quote:string
  person_name:string
  role_company?:string
  permission:boolean
  status?:string
  [key:string]:unknown
}

export interface TestimonialsCollection {
  items:TestimonialRecord[]
  editorialNote?:string
}

export interface PostRecord {
  slug:string
  status:string
  title:Localized<string>
  [key:string]:unknown
}

export interface ProfileRecord {
  name:string
  status:string
  roles:string[]
  expertise:string[]
  biography:string|null
  credentials:unknown[]
  socialLinks:unknown[]
  [key:string]:unknown
}

function isRecord(value:unknown):value is Record<string,unknown>{
  return typeof value==='object'&&value!==null&&!Array.isArray(value)
}

function fail(collection:string,path:string,message:string):never{
  throw new Error(`[content:${collection}] ${path}: ${message}`)
}

function requireRecord(value:unknown,collection:string,path:string){
  if(!isRecord(value))fail(collection,path,'expected object')
  return value
}

function requireString(value:unknown,collection:string,path:string){
  if(typeof value!=='string'||value.trim()==='')fail(collection,path,'expected non-empty string')
  return value
}

function requireBoolean(value:unknown,collection:string,path:string){
  if(typeof value!=='boolean')fail(collection,path,'expected boolean')
  return value
}

function requireStringArray(value:unknown,collection:string,path:string){
  if(!Array.isArray(value)||value.some(item=>typeof item!=='string'))fail(collection,path,'expected string[]')
  return value as string[]
}

function isLocalizedString(value:unknown):value is Localized<string>{
  return isRecord(value)&&typeof value.ro==='string'&&value.ro.trim()!==''&&typeof value.en==='string'&&value.en.trim()!==''
}

function isLocalizedStringArray(value:unknown):value is Localized<string[]>{
  return isRecord(value)&&Array.isArray(value.ro)&&value.ro.every(item=>typeof item==='string')&&Array.isArray(value.en)&&value.en.every(item=>typeof item==='string')
}

function requireLocalizedString(value:unknown,collection:string,path:string){
  if(!isLocalizedString(value))fail(collection,path,'expected {ro:string,en:string}')
  return value
}

const allowedRights = new Set<RightsStatus>(['owned','permission','approved-for-site-by-user','licensed','embed-only','unknown'])

export function canPublishStatus(status:string){
  return status==='published'||status==='validated'||status==='approved'
}

export function validateProductCollection(input:unknown,collection='products'):ProductRecord[]{
  if(!Array.isArray(input))fail(collection,'root','expected array')
  const slugs=new Set<string>()
  return input.map((raw,index)=>{
    const record=requireRecord(raw,collection,`[${index}]`)
    const slug=requireString(record.slug,collection,`[${index}].slug`)
    if(slugs.has(slug))fail(collection,`[${index}].slug`,`duplicate slug ${slug}`)
    slugs.add(slug)
    requireLocalizedString(record.title,collection,`[${index}].title`)
    requireString(record.type,collection,`[${index}].type`)
    requireString(record.status,collection,`[${index}].status`)
    if(record.proof!==undefined)requireStringArray(record.proof,collection,`[${index}].proof`)
    return record as ProductRecord
  })
}

const courseStringFields=['description','detail','recognitionTitle','forWhomTitle','forWhomText','notForTitle','notForText','problemTitle','problemText','outcomesTitle','learnTitle','formatTitle','formatText','ctaTitle'] as const
const courseListFields=['recognitionItems','outcomes','topics'] as const

export function isPublishableCourseProduct(product:ProductRecord):product is CourseProductRecord{
  if(product.type!=='open-course'||!canPublishStatus(product.status))return false
  if(!courseStringFields.every(field=>isLocalizedString(product[field])))return false
  if(!courseListFields.every(field=>isLocalizedStringArray(product[field])))return false
  if(!Array.isArray(product.dates)||product.dates.some(item=>typeof item!=='string'))return false
  if(!(product.price===null||typeof product.price==='string'||typeof product.price==='number'))return false
  return true
}

function validateAssetMap(input:unknown,collection:string,path:string){
  const root=requireRecord(input,collection,path)
  const output:Record<string,AssetRecord>={}
  for(const [key,raw] of Object.entries(root)){
    const item=requireRecord(raw,collection,`${path}.${key}`)
    requireString(item.src,collection,`${path}.${key}.src`)
    requireString(item.alt,collection,`${path}.${key}.alt`)
    requireString(item.usage,collection,`${path}.${key}.usage`)
    requireString(item.status,collection,`${path}.${key}.status`)
    const rights=requireString(item.rights_status,collection,`${path}.${key}.rights_status`) as RightsStatus
    if(!allowedRights.has(rights))fail(collection,`${path}.${key}.rights_status`,`unsupported rights status ${rights}`)
    requireString(item.source,collection,`${path}.${key}.source`)
    output[key]=item as AssetRecord
  }
  return output
}

export function validateMediaCollection(input:unknown,collection='media'):MediaCollection{
  const root=requireRecord(input,collection,'root')
  const images=validateAssetMap(root.images,collection,'images')
  const concepts=validateAssetMap(root.concepts,collection,'concepts')
  if(!Array.isArray(root.appearances))fail(collection,'appearances','expected array')
  const ids=new Set<string>()
  const appearances=root.appearances.map((raw,index)=>{
    const item=requireRecord(raw,collection,`appearances[${index}]`)
    const id=requireString(item.id,collection,`appearances[${index}].id`)
    if(ids.has(id))fail(collection,`appearances[${index}].id`,`duplicate id ${id}`)
    ids.add(id)
    requireString(item.title,collection,`appearances[${index}].title`)
    requireString(item.type,collection,`appearances[${index}].type`)
    requireString(item.status,collection,`appearances[${index}].status`)
    const rights=requireString(item.rights_status,collection,`appearances[${index}].rights_status`) as RightsStatus
    if(!allowedRights.has(rights))fail(collection,`appearances[${index}].rights_status`,`unsupported rights status ${rights}`)
    if(item.external_url!==undefined)requireString(item.external_url,collection,`appearances[${index}].external_url`)
    return item as AppearanceRecord
  })
  return {images,concepts,appearances,editorialNote:typeof root.editorialNote==='string'?root.editorialNote:undefined}
}

export function validateTestimonials(input:unknown,collection='testimonials'):TestimonialsCollection{
  const root=requireRecord(input,collection,'root')
  if(!Array.isArray(root.items))fail(collection,'items','expected array')
  const items=root.items.map((raw,index)=>{
    const item=requireRecord(raw,collection,`items[${index}]`)
    requireString(item.quote,collection,`items[${index}].quote`)
    requireString(item.person_name,collection,`items[${index}].person_name`)
    requireBoolean(item.permission,collection,`items[${index}].permission`)
    if(item.role_company!==undefined)requireString(item.role_company,collection,`items[${index}].role_company`)
    return item as TestimonialRecord
  })
  return {items,editorialNote:typeof root.editorialNote==='string'?root.editorialNote:undefined}
}

export function validatePosts(input:unknown,collection='posts'):PostRecord[]{
  if(!Array.isArray(input))fail(collection,'root','expected array')
  return input.map((raw,index)=>{
    const item=requireRecord(raw,collection,`[${index}]`)
    requireString(item.slug,collection,`[${index}].slug`)
    requireString(item.status,collection,`[${index}].status`)
    requireLocalizedString(item.title,collection,`[${index}].title`)
    return item as PostRecord
  })
}

export function validateProfile(input:unknown,collection='profile'):ProfileRecord{
  const root=requireRecord(input,collection,'root')
  requireString(root.name,collection,'name')
  requireString(root.status,collection,'status')
  requireStringArray(root.roles,collection,'roles')
  requireStringArray(root.expertise,collection,'expertise')
  if(!(root.biography===null||typeof root.biography==='string'))fail(collection,'biography','expected string|null')
  if(!Array.isArray(root.credentials))fail(collection,'credentials','expected array')
  if(!Array.isArray(root.socialLinks))fail(collection,'socialLinks','expected array')
  return root as ProfileRecord
}

export function validateLocalizedRoot(input:unknown,collection:string){
  const root=requireRecord(input,collection,'root')
  requireRecord(root.ro,collection,'ro')
  requireRecord(root.en,collection,'en')
  return root as {ro:Record<string,unknown>;en:Record<string,unknown>}
}

export function canPublishAsset(asset:AssetRecord){
  const rightsOk=asset.rights_status==='owned'||asset.rights_status==='permission'||asset.rights_status==='approved-for-site-by-user'||asset.rights_status==='licensed'
  return asset.status==='approved'&&rightsOk
}

export function canPublishAppearance(item:AppearanceRecord){
  const statusOk=item.status==='verified'||item.status==='approved'||item.status==='published'
  const rightsOk=item.rights_status==='embed-only'||item.rights_status==='permission'||item.rights_status==='owned'
  return statusOk&&rightsOk&&Boolean(item.external_url)
}

export function canPublishTestimonial(item:TestimonialRecord){
  return item.permission===true&&(item.status===undefined||canPublishStatus(item.status))
}
