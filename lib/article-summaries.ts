import {articles,readingTime,dateLabel} from './articles';
export const articleSummaries=articles.map(p=>({id:p.id,cat:p.cat,title:p.title,desc:p.desc,image:p.image,alt:p.photo.alt,date:dateLabel(p.publishedAt),time:readingTime(p),publishedAt:p.publishedAt}));
