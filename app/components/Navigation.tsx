"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [["Services","/services"],["Work","/work"],["Process","/process"],["About","/about"]];
export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <header className="new-header page-shell"><Link className="new-logo" href="/" onClick={() => setOpen(false)} aria-label="Alpha Narrative home"><span>AN</span><b>ALPHA NARRATIVE</b></Link><nav aria-label="Main navigation" className={open ? "is-open" : ""}>{links.map(([label, href]) => <Link key={href} href={href} aria-current={pathname===href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}<Link className="mobile-contact" href="/contact" onClick={() => setOpen(false)}>Let's talk ↗</Link></nav><Link className="nav-contact" href="/contact">Let's talk ↗</Link><button className="nav-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button></header>;
}
