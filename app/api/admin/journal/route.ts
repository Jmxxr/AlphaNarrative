import {NextResponse} from 'next/server';
import {isAdmin} from '../../../../lib/admin-auth';
import {openJournal,sealJournal} from '../../../../lib/journal-storage';
import {validateJournal} from '../../../../lib/journal-model';
const endpoint='https://api.github.com/repos/Jmxxr/AlphaNarrative/contents/content/journal.json';
function headers(){return {Authorization:`Bearer ${process.env.GITHUB_CONTENT_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'};}
export async function GET(){
 if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
 try{const r=await fetch(endpoint+'?ref=main',{headers:headers(),cache:'no-store'});if(!r.ok)throw Error('Could not load the latest journal. Try again.');const data=await r.json();const journal=openJournal(JSON.parse(Buffer.from(data.content,'base64').toString('utf8')));if(!validateJournal(journal))throw Error('The journal content needs attention.');return NextResponse.json({journal,sha:data.sha},{headers:{'Cache-Control':'no-store'}});}catch(e){return NextResponse.json({error:e instanceof Error?e.message:'Could not load journal.'},{status:502});}
}
export async function PUT(request:Request){
 if(!await isAdmin())return NextResponse.json({error:'Unauthorized'},{status:401});
 if(process.env.VERCEL_ENV!=='production')return NextResponse.json({error:'Save on alphanarrative.pro. Preview sites cannot publish.'},{status:403});
 if(new URL(request.url).origin!==request.headers.get('origin'))return NextResponse.json({error:'Invalid origin.'},{status:403});
 const raw=await request.text();if(raw.length>2_000_000)return NextResponse.json({error:'Journal exceeds the save limit.'},{status:413});
 let body;try{body=JSON.parse(raw);}catch{return NextResponse.json({error:'Invalid journal data.'},{status:400});}
 if(!validateJournal(body.journal)||typeof body.sha!=='string'||! /^[a-f0-9]{40}$/.test(body.sha))return NextResponse.json({error:'Check article addresses, required publishing fields, and advertisement links. Each article address must be unique.'},{status:400});
 try{const r=await fetch(endpoint,{method:'PUT',headers:headers(),cache:'no-store',body:JSON.stringify({message:'Update Alpha Narrative journal',content:Buffer.from(JSON.stringify(sealJournal(body.journal),null,2)+'\n').toString('base64'),sha:body.sha,branch:'main'})});if(!r.ok)return NextResponse.json({error:r.status===409||r.status===422?'A newer version was saved elsewhere. Copy your unsaved work, then reload the latest journal.':'Could not save the journal. Your changes remain in this editor.'},{status:r.status===409||r.status===422?409:502});const result=await r.json();return NextResponse.json({ok:true,sha:result.content.sha,message:'Saved. Published articles and enabled advertisements will appear after the site rebuilds, usually within a minute.'});}catch{return NextResponse.json({error:'Connection failed. Your changes remain in this editor.'},{status:502});}
}
