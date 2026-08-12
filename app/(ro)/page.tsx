import HomeView,{generateMetadata as createMetadata} from '@/app/_views/home/page'
export function generateMetadata(){return createMetadata({searchParams:{lang:'ro'}})}
export default function Home(){return <HomeView searchParams={{lang:'ro'}}/>}
