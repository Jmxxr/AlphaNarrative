import {journal} from '../../lib/articles';
export default function Advertisement({placement}:{placement:'home'|'article'|'footer'}){
 const ads=journal.advertisements.filter(a=>a.enabled&&a.placement===placement);
 return ads.map(a=><aside className="ad-placement" key={a.id} aria-label="Advertisement"><span className="eyebrow">Advertisement · {a.sponsor}</span><a href={a.url} target="_blank" rel="sponsored noopener noreferrer" className="ad-content">{a.image&&/* eslint-disable-next-line @next/next/no-img-element */<img src={a.image} alt={a.title} loading="lazy"/>}<div><h2>{a.title}</h2><p>{a.description}</p><span className="read">{a.cta} ↗</span></div></a></aside>);
}
