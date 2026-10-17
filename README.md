# Alpha Narrative

Independent editorial journal at https://www.alphanarrative.pro.

## Publishing desk

Open `/admin` and sign in using the existing admin password. The Overview, Articles, and Advertising sections manage the journal. Articles use Culture, Money, Technology, and Ambition categories. Drafts stay unpublished; publishing an article or enabling a campaign takes effect after the production rebuild.

Article text supports paragraphs, section headings, and `[link text](https://example.com)` links. Advertisement placements are available on the homepage, article pages, and site footer. Placements are hidden until enabled and are labelled Advertisement when active. Direct sponsorship management is implemented; payments and advertising networks are not integrated.

## Development

Run `npm ci`, then `npm run dev`. Run `node scripts/test-journal.cjs` for journal validation, encryption, and API tests. Run `npm run build` for the production build and TypeScript checks.

## Storage and deployment

Journal content is managed through `content/journal.json`. Production saves use the repository content API and trigger the existing Vercel Git integration. Drafts and inactive campaigns are encrypted using the existing admin session secret. See ADMIN_SETUP.md for configuration and key retention details. Never commit credentials.

All ongoing work targets the existing Alpha Narrative domain. Earlier ChatGPT Sites copies are not updated.
