import type {Metadata} from 'next';
import JournalCards from '../components/JournalCards';
import {articleSummaries} from '../../lib/article-summaries';
export const metadata:Metadata={title:'The Journal',description:'Explore every Alpha Narrative story on culture, money, technology and ambition.',alternates:{canonical:'/journal'}};
export default async function Journal({searchParams}:{searchParams:Promise<{q?:string;topic?:string;search?:string}>}){const q=await searchParams;return <><section className="page-intro" data-hero><span className="eyebrow">An open mind starts here</span><h1>The Journal</h1><p>Stories to spend time with. Ideas to take away.</p></section><JournalCards key={(q.q||'')+(q.topic||'')+(q.search||'')} searchOpen={q.search==='1'} articles={articleSummaries} initialQuery={q.q||''} topic={q.topic||'All'} heading="Explore every story"/></>;}
