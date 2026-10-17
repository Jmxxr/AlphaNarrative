import data from '../content/journal.json';
import type {Journal} from './journal-model';
export {readingTime,dateLabel} from './journal-model';
export const journal=data as Journal;
export const articles=journal.articles.filter(p=>p.published).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt));
export const categories=['All','Culture','Money','Technology','Ambition'] as const;
export const siteUrl='https://www.alphanarrative.pro';
