import Link from "next/link";
export function Footer() {
  return <footer className="new-footer page-shell"><div><Link href="/" className="new-logo"><span>AN</span><b>ALPHA NARRATIVE</b></Link><p>Software. People. Progress.</p></div><nav aria-label="Footer navigation"><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></nav><div className="footer-meta"><span>© 2026 Alpha Narrative</span><span>Port Harcourt, Nigeria</span><a href="mailto:alphanarrativepro@gmail.com">Email us ↗</a></div></footer>;
}
