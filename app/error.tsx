'use client';
import Link from 'next/link';
export default function ErrorPage({reset}:{reset:()=>void}){return <section className="empty"><h1>A brief interruption.</h1><p>We could not open this page. Please try again.</p><button className="button button-dark" onClick={reset}>Try again ↗</button><Link className="text-link" href="/journal">Back to the journal</Link></section>;}
