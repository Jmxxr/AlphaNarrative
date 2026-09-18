# Alpha Narrative case studies

The public site works with the initial projects in `content/projects.json`. The admin page is at `/admin`. It stays disabled until the following server environment variables are set in the Vercel project:

- `ADMIN_PASSWORD`: a unique passphrase of at least 16 characters. Do not commit it.
- `ADMIN_SESSION_SECRET`: a random secret of at least 32 characters. Rotating it signs out all existing sessions.
- `GITHUB_CONTENT_TOKEN`: a fine-grained GitHub token scoped only to `Jmxxr/AlphaNarrative` with **Contents: Read and write**. The editor commits changes to `main`; Vercel's Git integration can then publish the changes.
- `ALPHA_WHATSAPP_NUMBER`: the agency's WhatsApp number in international format, digits only, for example `234...`. Do not use a client's number.
- `RESEND_API_KEY`: the contact form's email key. Verify sender and recipient configuration for live mail delivery.

Add the variables to the production and preview environments in Vercel, redeploy, and sign in at `/admin`. Image uploads accept actual PNG, JPEG or WebP content under 4 MB and save it to `public/projects`. The editor supports cover images, galleries, video embeds, descriptions, user journeys, drafts and homepage features.

The AETHER video is the existing Scrimba embed from an earlier version of this site. Its storefront currently uses sample product content; present it as a product showcase rather than reporting unverified client results.
