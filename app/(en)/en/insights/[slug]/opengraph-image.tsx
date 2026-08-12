import {ImageResponse} from 'next/og'
import {getPublishedInsights} from '@/lib/data'
export const alt='Bogdan Vizitiu — Insights'
export const size={width:1200,height:630}
export const contentType='image/png'
export default function OpenGraphImage({params}:{params:{slug:string}}){
  const insight=getPublishedInsights('en').find(item=>item.slug===params.slug)
  const title=insight?.title??'Insights'
  const category=insight?.category??'Bogdan Vizitiu'
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#d7e6ee',color:'#182126',padding:'72px 84px'}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:24,letterSpacing:2,textTransform:'uppercase'}}><span>BGV</span><span>{category}</span></div><div style={{display:'flex',maxWidth:980,fontFamily:'Georgia, serif',fontSize:68,lineHeight:1.02,letterSpacing:-2}}>{title}</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:24}}><span>Bogdan Vizitiu</span><span>bogdanvizitiu.com</span></div></div>,size)
}
