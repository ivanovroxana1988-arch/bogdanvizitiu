type BrandLogoProps={
  className?:string
  variant?:'mark'|'lockup'
  tone?:'dark'|'light'
}

export function BrandLogo({className,variant='mark',tone='dark'}:BrandLogoProps){
  const ink=tone==='light'?'#FAF9F6':'#28343D'
  const blue=tone==='light'?'#9CC5EA':'#78A6D3'

  if(variant==='lockup'){
    return <svg className={className} viewBox="0 0 620 242" role="img" aria-label="Bogdan George Vizitiu">
      <g transform="translate(188 2)">
        <text x="0" y="105" fill={ink} fontFamily="Georgia, 'Times New Roman', serif" fontSize="104" fontWeight="400">B</text>
        <text x="72" y="120" fill={blue} fontFamily="Georgia, 'Times New Roman', serif" fontSize="96" fontWeight="400">G</text>
        <path d="M132 88 C151 76 170 64 188 54 C196 50 200 52 198 65 L185 116 C182 128 185 132 193 119 L258 18" fill="none" stroke={blue} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <line x1="255" y1="157" x2="299" y2="157" stroke={blue} strokeWidth="2"/>
      <circle cx="310" cy="157" r="2.5" fill={blue}/>
      <line x1="321" y1="157" x2="365" y2="157" stroke={blue} strokeWidth="2"/>
      <text x="310" y="198" textAnchor="middle" fill={ink} fontFamily="Arial, Helvetica, sans-serif" fontSize="20" letterSpacing="9">BOGDAN GEORGE VIZITIU</text>
      <text x="310" y="230" textAnchor="middle" fill={blue} fontFamily="Arial, Helvetica, sans-serif" fontSize="12" letterSpacing="5">PSIHOLOGIE • LEADERSHIP • STRATEGIE</text>
    </svg>
  }

  return <svg className={className} viewBox="0 0 250 132" aria-hidden="true" focusable="false">
    <text x="4" y="96" fill={ink} fontFamily="Georgia, 'Times New Roman', serif" fontSize="112" fontWeight="400">B</text>
    <text x="80" y="112" fill={blue} fontFamily="Georgia, 'Times New Roman', serif" fontSize="102" fontWeight="400">G</text>
    <path d="M145 80 C165 68 184 55 201 47 C209 43 213 46 211 59 L198 112 C195 124 198 128 206 115 L246 25" fill="none" stroke={blue} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
}
