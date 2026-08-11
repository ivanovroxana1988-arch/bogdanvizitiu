import type { Config } from 'tailwindcss'
export default {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{paper:'#FAF9F6',ink:'#182126',muted:'#53636B',blue:'#D7E6EE',link:'#315F78'},fontFamily:{sans:['var(--font-sans)'],serif:['var(--font-serif)']}}},plugins:[]} satisfies Config
