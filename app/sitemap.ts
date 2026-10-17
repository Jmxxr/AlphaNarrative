import type {MetadataRoute} from 'next';
import {articles,siteUrl} from '../lib/articles';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteUrl,changeFrequency:'weekly',priority:1},{url:siteUrl+'/about',changeFrequency:'monthly',priority:0.6},...articles.map(p=>({url:siteUrl+'/stories/'+p.id,lastModified:p.updatedAt||p.publishedAt,changeFrequency:'monthly' as const,priority:0.8}))];}
