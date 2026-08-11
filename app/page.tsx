import { Homepage } from '@/components/homepage'
import { getPublicProducts } from '@/lib/content/load-content'
export default function Home(){return <Homepage locale="ro" products={getPublicProducts('ro')} />}
