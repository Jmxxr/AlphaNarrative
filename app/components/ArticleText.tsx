import {Fragment} from 'react';
import {safeUrl} from '../../lib/journal-model';
export default function ArticleText({text}:{text:string}){
 return text.split(/\n\s*\n/).filter(Boolean).map((paragraph,i)=>{const parts=[];let last=0;const regex=/\[([^\]]+)\]\((https:\/\/[^)\s]+)\)/g;for(const match of paragraph.matchAll(regex)){parts.push(paragraph.slice(last,match.index));parts.push(safeUrl(match[2])?<a key={match.index} href={match[2]} target="_blank" rel="nofollow noopener noreferrer">{match[1]}</a>:match[0]);last=match.index!+match[0].length;}parts.push(paragraph.slice(last));return <p key={i} style={{whiteSpace:'pre-wrap'}}>{parts.map((part,n)=><Fragment key={n}>{part}</Fragment>)}</p>;});
}
