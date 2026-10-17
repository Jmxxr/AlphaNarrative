import Link from 'next/link';
export default function NotFound(){return <section className="empty not-found"><span className="eyebrow">404 / A wrong turn</span><h1>This story<br/>isn’t here.</h1><p>The link may have changed, or the story may no longer be published.</p><Link className="button button-dark" href="/journal">Explore the journal </Link></section>;}
