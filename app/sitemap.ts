import type {MetadataRoute} from 'next';
import {articles,siteUrl} from '../lib/articles';
export default function sitemap():MetadataRoute.Sitemap{return [{url:siteUrl,changeFrequency:'weekly',priority:1},...['/journal','/about','/contact','/advertise','/editorial-policy','/privacy','/category/culture','/category/money','/category/technology','/category/ambition'].map(path=>({url:siteUrl+path,changeFrequency:'monthly' as const,priority:0.6})),...articles.map(p=>({url:siteUrl+'/stories/'+p.id,lastModified:p.updatedAt||p.publishedAt,changeFrequency:'monthly' as const,priority:0.8}))];}
