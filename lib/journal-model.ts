export const categories=['Culture','Money','Technology','Ambition'] as const;
export type Category=typeof categories[number];
export const placements=['home','article','footer'] as const;
export type Article={id:string;title:string;cat:Category;desc:string;author:string;image:string;photo:{alt:string;credit:string;url:string};sections:[string,string][];published:boolean;featured:boolean;publishedAt:string;updatedAt:string};
export type Advertisement={id:string;placement:typeof placements[number];enabled:boolean;sponsor:string;title:string;description:string;image:string;url:string;cta:string};
export type Journal={articles:Article[];advertisements:Advertisement[]};
export function safeUrl(v:unknown,local=false):v is string{if(typeof v!=='string'||v.length>2000)return false;if(local&&/^\/(?!\/)[a-zA-Z0-9/_.-]+$/.test(v))return true;try{const u=new URL(v);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
const text=(v:unknown,max:number)=>typeof v==='string'&&v.length<=max;
export function validateJournal(value:unknown):value is Journal{
 if(!value||typeof value!=='object')return false;
 const j=value as Journal;if(!Array.isArray(j.articles)||j.articles.length>500||!Array.isArray(j.advertisements)||j.advertisements.length>20)return false;
 const ids=new Set<string>();for(const p of j.articles){
  if(!p||!text(p.id,100)||!p.id||!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id)||ids.has(p.id))return false;ids.add(p.id);
  if(!text(p.title,240)||!text(p.desc,600)||!text(p.author,120)||!categories.includes(p.cat)||typeof p.published!=='boolean'||typeof p.featured!=='boolean'||!text(p.image,2000)||(p.image&&!safeUrl(p.image,true)))return false;
  if(!p.photo||!text(p.photo.alt,500)||!text(p.photo.credit,160)||!text(p.photo.url,2000)||(p.photo.url&&!safeUrl(p.photo.url)))return false;
  if(!Array.isArray(p.sections)||p.sections.length>100||!p.sections.every(s=>Array.isArray(s)&&s.length===2&&text(s[0],300)&&text(s[1],30000)))return false;
  if(!text(p.publishedAt,30)||!text(p.updatedAt,30)||(p.publishedAt&&!Number.isFinite(Date.parse(p.publishedAt)))||(p.updatedAt&&!Number.isFinite(Date.parse(p.updatedAt))))return false;
  if(p.published&&(!p.title.trim()||!p.desc.trim()||!p.author.trim()||!p.image||!p.photo.alt.trim()||!p.publishedAt||!p.sections.some(s=>s[1].trim())))return false;
 }
 const adIds=new Set<string>();for(const a of j.advertisements){if(!a||!text(a.id,100)||!a.id||adIds.has(a.id)||!placements.includes(a.placement)||typeof a.enabled!=='boolean'||!text(a.sponsor,160)||!text(a.title,200)||!text(a.description,500)||!text(a.cta,80)||!text(a.image,2000)||(a.image&&!safeUrl(a.image,true))||!text(a.url,2000)||(a.url&&!safeUrl(a.url)))return false;adIds.add(a.id);if(a.enabled&&(!a.sponsor.trim()||!a.title.trim()||!a.cta.trim()||!safeUrl(a.url)))return false;}
 return true;
}
export function readingTime(p:Article){return Math.max(1,Math.ceil(p.sections.map(s=>s.join(' ')).join(' ').split(/\s+/).length/200));}
export function dateLabel(date:string){return date?new Date(date).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Africa/Lagos'}):'Draft';}
