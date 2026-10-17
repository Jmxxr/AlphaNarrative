import data from '../content/articles.json';
export const articles = data;
export type Article = typeof articles[number];
export const categories = ['All', 'Culture', 'Money', 'Technology', 'Ambition'] as const;
export const siteUrl = 'https://www.alphanarrative.pro';
