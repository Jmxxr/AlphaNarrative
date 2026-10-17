'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {articles,categories} from '../../lib/articles';
export default function JournalCards({topic,searchOpen=false}:{topic:string;searchOpen?:boolean}){
 const [selected,setSelected]=useState(topic);const [query,setQuery]=useState('');
 const filtered=articles.filter(p=>(selected==='All'||p.cat===selected)&&(p.title+' '+p.desc+' '+p.cat).toLowerCase().includes(query.toLowerCase()));
 return <section id="latest"><div className="section-head"><h2>Latest stories<span className="dot">.</span></h2><div className="filters" aria-label="Filter articles">{categories.map(c=><button key={c} aria-pressed={selected===c} onClick={()=>setSelected(c)}>{c}</button>)}</div></div><details open={searchOpen} style={{marginBottom:25}}><summary style={{cursor:'pointer',fontSize:12}}>Search the journal</summary><label htmlFor="journal-search" className="eyebrow" style={{display:'block',marginTop:18}}>Find your next read</label><input id="journal-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search stories, ideas, topics…" style={{width:'100%',padding:14,marginTop:10,border:'1px solid var(--line)',background:'transparent'}}/></details><div role="status" className="eyebrow" style={{marginBottom:18,color:'#777'}}>{filtered.length} {filtered.length===1?'story':'stories'}{selected!=='All'?' in '+selected:''}</div><div className="grid">{filtered.map(p=><Link className="card" key={p.id} href={'/stories/'+p.id}><div className="art"><Image src={'/journal/'+p.id+'.jpg'} alt={p.photo.alt} fill sizes="(max-width:500px) 88vw,(max-width:800px) 43vw,28vw"/></div><span className="tag">{p.cat}</span><h3>{p.title}</h3><p>{p.desc}</p><span className="meta">17 Oct 2026 &nbsp; · &nbsp; {p.time} min read &nbsp; ↗</span></Link>)}</div>{filtered.length===0&&<p className="empty">No stories found. Try another topic or search.</p>}</section>;
}
