# Alpha Narrative case studies

The public site works with the initial projects in `content/projects.json`. The admin page is at `/admin`. It stays disabled until the following server environment variables are set in the Vercel project:

- `ADMIN_PASSWORD`: a unique passphrase of at least 16 characters. Do not commit it.
- `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters. Rotating it signs out all existing sessions.
- `GITHUB_CONTENT_TOKEN`: a fine-grained GitHub token scoped only to `Jmxxr/AlphaNarrative` with **Contents: Read and write**. The editor commits changes to `main`; Vercel's Git integration can then publish the changes.
- The WhatsApp CTA is currently configured for the agency number supplied by the owner: `09047094204` (international format `2349047094204`).
- `RESEND_API_KEY`: the contact form's email key. Verify sender and recipient configuration for live mail delivery.

Add the variables to the **Production** environment in Vercel, redeploy, and sign in at `/admin` on the production domain. Saving projects and uploading images is blocked on previews because those actions commit to the production `main` branch. Image uploads accept actual PNG, JPEG or WebP content under 4 MB and save it to `public/projects`. The editor supports cover images, galleries, video embeds, descriptions, user journeys, drafts and homepage features.

The AETHER video is the existing Scrimba embed from an earlier version of this site. Its storefront currently uses sample product content; present it as a product showcase rather than reporting unverified client results.

Admin sessions expire 15 minutes after sign-in, and the cookie is a browser-session cookie. The editor shows saved cover and gallery previews from each project's stored URLs. An empty file picker after reloading does not mean that its saved image is gone.

## Rate limiting on Vercel

Set up a Vercel Firewall rate limit for POST requests to `/api/admin/session` and `/api/contact`. Use request path and method as conditions, count by IP, and respond with HTTP 429. Publish the rule in the Vercel dashboard. For Hobby (one rate limit rule per project), use a single rule with two OR condition groups: `(path equals /api/admin/session AND method equals POST) OR (path equals /api/contact AND method equals POST)`, with 5 requests per IP per 10 minutes. On Pro, two separate rules allow different thresholds for each endpoint. Check existing rules before adding one; do not remove unrelated protections. Rate limit counters are per region.
