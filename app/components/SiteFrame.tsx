'use client';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
export default function SiteFrame({children,header,footer}:{children:React.ReactNode;header:React.ReactNode;footer:React.ReactNode}){const admin=usePathname().startsWith('/admin');return <div className={'wrap'+(admin?' desk-shell':'')}>{admin?<header className="desk-site-header"><Link className="logo" href="/">Alpha Narrative</Link><span className="eyebrow">Publishing workspace</span></header>:header}<main id="main-content">{children}</main>{admin?<footer className="desk-site-footer">Alpha Narrative · Entertain. Educate. Empower.</footer>:footer}</div>;}
