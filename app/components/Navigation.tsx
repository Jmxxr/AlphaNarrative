"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [["Services", "/services"], ["Work", "/work"], ["Process", "/process"], ["About", "/about"]];

export function Navigation() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Alpha Narrative home"><Image src="/brand/alpha-narrative-logo.png" alt="Alpha Narrative" width={186} height={112} priority /></Link>
      <nav aria-label="Primary navigation">{links.map(([label, href]) => <Link key={href} className={path === href ? "active" : ""} href={href}>{label}</Link>)}</nav>
      <Link className="header-cta" href="/contact">Start a project <span>↗</span></Link>
      <button className={`menu-button${open ? " open" : ""}`} onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}><i /><i /></button>
    </header>
    <div className={`menu-panel${open ? " open" : ""}`} aria-hidden={!open}>
      <nav>{links.map(([label, href], i) => <Link key={href} href={href} onClick={() => setOpen(false)}><small>0{i + 1}</small>{label}<span>↗</span></Link>)}<Link href="/contact" onClick={() => setOpen(false)}><small>05</small>Contact<span>↗</span></Link></nav>
      <div><a href="mailto:alphanarrativepro@gmail.com">alphanarrativepro@gmail.com</a><span>Port Harcourt · Working worldwide</span></div>
    </div>
  </>;
}
