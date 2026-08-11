import {ImageResponse} from 'next/og'

export const alt='Bogdan Vizitiu — Leadership, Negociere, Relații profesionale'
export const size={width:1200,height:630}
export const contentType='image/png'

export default function TwitterImage(){
  return new ImageResponse(
    <div style={{
      width:'100%',
      height:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      background:'#FAF9F6',
      color:'#1B1B1B',
      padding:'72px 80px',
      fontFamily:'Arial, sans-serif',
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',fontSize:34,fontWeight:700,letterSpacing:-1}}>BGV<span style={{color:'#315F78'}}>.</span></div>
        <div style={{fontSize:22,color:'#315F78'}}>bogdanvizitiu.com</div>
      </div>
      <div style={{display:'flex',flexDirection:'column',maxWidth:930}}>
        <div style={{fontSize:78,lineHeight:1.02,fontWeight:700,letterSpacing:-3}}>Bogdan Vizitiu</div>
        <div style={{width:110,height:6,background:'#8FC7E8',margin:'30px 0 28px'}} />
        <div style={{fontSize:36,lineHeight:1.2,color:'#404040'}}>Leadership · Negociere · Relații profesionale</div>
      </div>
      <div style={{fontSize:22,color:'#6B6B6B'}}>Claritate înainte de viteză.</div>
    </div>,
    {...size},
  )
}
