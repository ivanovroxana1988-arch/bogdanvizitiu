'use client'
import Link from 'next/link'; import {useState} from 'react'
const links=[['About','/about'],['Programs','/programs'],['Corporate','/corporate'],['Insights','/insights'],['Speaking','/speaking'],['Contact','/contact']]
export function Header(){const [open,setOpen]=useState(false);return <header className="header"><div className="shell nav"><Link href="/" className="logo" aria-label="Bogdan Vizitiu home">BGV.</Link><button className="menu" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="navigation">Menu</button><nav id="navigation" className={open?'open':''} aria-label="Main navigation">{links.map(([l,h])=><Link onClick={()=>setOpen(false)} key={h} href={h}>{l}</Link>)}<Link className="nav-cta" href="/programs">View Programs</Link></nav></div></header>}
