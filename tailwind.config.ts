import type { Config } from 'tailwindcss'
export default {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{paper:'#F3EFE7',ink:'#171717',muted:'#6F6A61',olive:'#414638'},fontFamily:{sans:['var(--font-sans)'],serif:['var(--font-serif)']}}},plugins:[]} satisfies Config
