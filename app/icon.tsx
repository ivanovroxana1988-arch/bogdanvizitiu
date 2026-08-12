import {ImageResponse} from 'next/og'

export const size={width:64,height:64}
export const contentType='image/png'

export default function Icon(){
  return new ImageResponse(
    <div style={{
      width:'100%',
      height:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      background:'#FAF9F6',
      position:'relative',
      fontFamily:'Georgia, serif',
    }}>
      <span style={{position:'absolute',left:8,top:7,color:'#28343D',fontSize:40,lineHeight:1}}>B</span>
      <span style={{position:'absolute',left:27,top:19,color:'#78A6D3',fontSize:31,lineHeight:1}}>G</span>
      <span style={{position:'absolute',left:43,top:17,color:'#78A6D3',fontSize:35,lineHeight:1,fontStyle:'italic'}}>V</span>
    </div>,
    {...size},
  )
}
