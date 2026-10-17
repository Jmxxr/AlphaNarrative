import type { Metadata } from 'next';
import {Navigation} from './components/Navigation';
import SiteFooter from './components/SiteFooter';
import Motion from './components/Motion';
import './journal.css';
import Advertisement from './components/Advertisement';
import SiteFrame from './components/SiteFrame';
export const metadata: Metadata = {
  metadataBase: new URL('https://www.alphanarrative.pro'),
  title: { default: 'Alpha Narrative — Culture, Money, Technology & Ambition', template: '%s | Alpha Narrative' },
  description: 'An independent journal exploring culture, money, technology, and ambition. Entertain the masses. Educate the interested. Empower the few.',
  applicationName: 'Alpha Narrative',
  alternates: {types: {'application/rss+xml':'/feed.xml'}},
  openGraph: { type: 'website', siteName: 'Alpha Narrative', locale: 'en_NG', images: ['/journal/attention.jpg'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.ico?v=alpha-original', apple: '/apple-icon.png' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
 return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><SiteFrame header={<Navigation/>} footer={<><Advertisement placement="footer"/><SiteFooter/></>}><Motion/>{children}</SiteFrame></body></html>;
}
