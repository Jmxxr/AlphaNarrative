import {createCipheriv,createDecipheriv,createHash,randomBytes} from 'node:crypto';
import type {Journal} from './journal-model';
export type StoredJournal=Journal&{privateContent?:string};
function key(){const secret=process.env.ADMIN_SESSION_SECRET;if(!secret||secret.length<32)throw Error('Admin encryption is not configured.');return createHash('sha256').update('alpha-journal-v1:'+secret).digest();}
export function sealJournal(journal:Journal):StoredJournal{
 const privateData={articles:journal.articles.filter(p=>!p.published),advertisements:journal.advertisements.filter(a=>!a.enabled)};
 const iv=randomBytes(12);const cipher=createCipheriv('aes-256-gcm',key(),iv);const content=Buffer.concat([cipher.update(JSON.stringify(privateData),'utf8'),cipher.final()]);
 return {articles:journal.articles.filter(p=>p.published),advertisements:journal.advertisements.filter(a=>a.enabled),privateContent:['v1',iv.toString('base64'),cipher.getAuthTag().toString('base64'),content.toString('base64')].join('.')};
}
export function openJournal(stored:StoredJournal):Journal{
 if(!stored.privateContent)return {articles:stored.articles,advertisements:stored.advertisements};
 try{const [version,iv,tag,content]=stored.privateContent.split('.');if(version!=='v1')throw Error('Unknown format');const decipher=createDecipheriv('aes-256-gcm',key(),Buffer.from(iv,'base64'));decipher.setAuthTag(Buffer.from(tag,'base64'));const data=JSON.parse(Buffer.concat([decipher.update(Buffer.from(content,'base64')),decipher.final()]).toString('utf8'));return {articles:[...stored.articles,...data.articles],advertisements:[...stored.advertisements,...data.advertisements]};}catch{throw Error('Private journal content could not be opened. Check the existing admin encryption configuration before saving.');}
}
