import type {Metadata} from 'next';
import {notFound,redirect} from 'next/navigation';
import JournalCards from '../../components/JournalCards';
import {articleSummaries} from '../../../lib/article-summaries';
const topics={culture:['Culture','The stories, habits, and ideas shaping the way we live.'],money:['Money','A closer look at value, work, status, and the choices money brings.'],technology:['Technology','The tools changing our lives, explained with curiosity and perspective.'],ambition:['Ambition','On making progress, building a life, and becoming who you want to be.']};
function get(slug:string){return topics[slug as keyof typeof topics];}
export const dynamicParams=false;
export function generateStaticParams(){return Object.keys(topics).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=get(slug);return t?{title:t[0],description:t[1],alternates:{canonical:'/category/'+slug}}:{};}
export default async function Category({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug==='ambition')redirect('/ambition');const t=get(slug);if(!t)notFound();return <><section className="page-intro" data-hero><span className="eyebrow">Explore / {t[0]}</span><h1>{t[0]}</h1><p>{t[1]}</p></section><JournalCards topic={t[0]} articles={articleSummaries} heading={'Stories on '+t[0].toLowerCase()}/></>;}
