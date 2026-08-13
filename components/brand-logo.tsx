type BrandLogoProps = {
  className?: string
  variant?: 'mark' | 'lockup'
  tone?: 'dark' | 'light'
}

export function BrandLogo({ className, variant = 'mark', tone = 'dark' }: BrandLogoProps) {
  const ink = tone === 'light' ? '#FAF9F6' : '#2E3942'
  const blue = tone === 'light' ? '#A8CBE8' : '#78A6D3'
  const serif = "var(--font-serif), Georgia, 'Times New Roman', serif"

  if (variant === 'lockup') {
    return (
      <svg
        className={className}
        viewBox="0 0 620 270"
        width="390"
        height="170"
        role="img"
        aria-label="Bogdan George Vizitiu"
      >
        <g transform="translate(126 2)">
          <text x="0" y="112" fill={ink} fontFamily={serif} fontSize="122" fontWeight="400">
            B
          </text>
          <text x="84" y="140" fill={blue} fontFamily={serif} fontSize="112" fontWeight="400">
            G
          </text>
          <path
            d="M164 111 L245 63 C255 57 266 53 271 60 C276 68 272 83 269 97 L250 177 C247 190 251 197 258 184 L374 12"
            fill="none"
            stroke={blue}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M374 12 L360 19 L368 30 Z" fill={blue} />
        </g>

        <line x1="233" y1="199" x2="292" y2="199" stroke={blue} strokeWidth="2" />
        <circle cx="310" cy="199" r="2.5" fill={blue} />
        <line x1="328" y1="199" x2="387" y2="199" stroke={blue} strokeWidth="2" />

        <text
          x="310"
          y="248"
          textAnchor="middle"
          fill={ink}
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="19"
          fontWeight="400"
          letterSpacing="9"
        >
          BOGDAN GEORGE VIZITIU
        </text>
      </svg>
    )
  }

  return (
    <svg
      className={className}
      viewBox="0 0 260 145"
      width="118"
      height="66"
      aria-hidden="true"
      focusable="false"
    >
      <text x="3" y="105" fill={ink} fontFamily={serif} fontSize="112" fontWeight="400">
        B
      </text>
      <text x="75" y="128" fill={blue} fontFamily={serif} fontSize="102" fontWeight="400">
        G
      </text>
      <path
        d="M143 97 L186 70 C194 65 202 61 206 66 C210 72 207 84 205 94 L194 127 C191 137 194 141 200 131 L253 18"
        fill="none"
        stroke={blue}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M253 18 L241 24 L249 34 Z" fill={blue} />
    </svg>
  )
}
