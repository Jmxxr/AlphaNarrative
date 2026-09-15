import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return <footer className="site-footer page-shell">
    <div className="footer-top"><Image src="/brand/alpha-narrative-logo.png" alt="Alpha Narrative" width={230} height={139} /><p>Strategy × Technology × Execution</p></div>
    <div className="footer-grid"><div><small>Explore</small><Link href="/services">Services</Link><Link href="/work">Work</Link><Link href="/process">Process</Link><Link href="/about">About</Link></div><div><small>Connect</small><a href="mailto:alphanarrativepro@gmail.com">Email</a><a href="https://github.com/Jmxxr" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/john-michael1" target="_blank" rel="noreferrer">LinkedIn ↗</a></div><p>Engineering useful intelligence for ambitious businesses in Africa and beyond.</p></div>
    <div className="footer-bottom"><span>© 2026 ALPHA NARRATIVE</span><span>PORT HARCOURT · NIGERIA</span><Link href="/">BACK TO TOP ↑</Link></div>
  </footer>;
}
