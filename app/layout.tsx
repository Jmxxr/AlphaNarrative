import type { Metadata } from 'next';
import Link from 'next/link';
import './journal.css';
export const metadata: Metadata = {
  metadataBase: new URL('https://www.alphanarrative.pro'),
  title: { default: 'Alpha Narrative — Culture, Money, Technology & Ambition', template: '%s | Alpha Narrative' },
  description: 'An independent journal exploring culture, money, technology, and ambition. Entertain the masses. Educate the interested. Empower the few.',
  applicationName: 'Alpha Narrative',
  openGraph: { type: 'website', siteName: 'Alpha Narrative', locale: 'en_NG', images: ['/journal/attention.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/journal-mark.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><div className="wrap"><header><div className="top"><span>AN INDEPENDENT JOURNAL FOR CURIOUS MINDS</span><span>CULTURE · MONEY · TECHNOLOGY · AMBITION</span></div><div className="mast"><Link className="logo" href="/">Alpha Narrative<span className="dot">.</span></Link><div className="motto">Entertain the masses. Educate the interested.<br/>Empower the few.</div></div><nav className="nav" aria-label="Main navigation"><Link href="/#latest">The Latest</Link>{['Culture','Money','Technology','Ambition'].map(c=><Link key={c} href={'/?topic='+c+'#latest'}>{c}</Link>)}<Link href="/about">Our philosophy ↗</Link><Link className="search-toggle" href="/?search=1#latest">Search ⌕</Link></nav></header><main id="main-content">{children}</main><footer className="footer"><Link className="foot-logo" href="/">Alpha Narrative<span className="dot">.</span></Link><span>Entertain. Educate. Empower.</span><span>© 2026 Alpha Narrative · <Link href="/about">About the journal</Link></span></footer></div></body></html>;
}
