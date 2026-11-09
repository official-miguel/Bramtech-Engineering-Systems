# Bramtech Engineering Systems website

Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis. Deploys to Vercel.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production check: `npm run build && npm start`.

## How enquiries work

- **Quote and hire forms** open a prefilled WhatsApp message to the owner (`254722257244`). Nothing is stored.
- **Reviews** are sent through `/api/reviews`. Reviews of **3 stars and above are published on the site automatically**. 1 and 2 star reviews are not published. After submitting, the visitor gets a button that sends the review to Bramtech on WhatsApp, so the owner sees every review.
- There is **no admin page**. To hide a review or add an owner reply, open the `reviews` table in the Supabase Table Editor and change `status` to `rejected`, or fill in `owner_reply`.
- Spam protection: honeypot field, minimum time to submit, no links in text, 3 reviews per visitor per day, optional Cloudflare Turnstile.

## Set up reviews (Supabase)

The site works without this. Reviews just show "Be the first to review Bramtech".

1. Create a Supabase project.
2. In the SQL editor, run `supabase/schema.sql`.
3. In `.env.local` (and Vercel), set `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `IP_HASH_SALT`.
4. The service role key is server only. Never prefix it with `NEXT_PUBLIC_`.

## Edit content

All text and data is in `src/content`:

- `site.ts`: phone, email, address, hours, CEO, story, social links.
- `services.ts`: the six service pages, FAQs and meta text.
- `projects.ts`: the photo gallery.

List every placeholder in `PLACEHOLDERS.md`.

### Add a project photo

1. Put the image in `public/images/<folder>/`.
2. Run `node scripts/blur.mjs` (creates the blur placeholder and size data).
3. Add an entry to `src/content/projects.ts` with `id`, `title`, `category`, `image`, `alt`, `position` (the `object-position` that keeps people and equipment in frame). Orientation is read from the image.

## Animation

Reusable pieces in `src/components`: `Reveal`, `SplitLines`, `MaskImage`, `ParallaxImage`, `ScrollProgress`, `SmoothScroll`. Easing is `cubic-bezier(0.22, 1, 0.36, 1)`. Only transform and opacity animate (plus clip-path wipes). With `prefers-reduced-motion`, smooth scroll is off and animations become simple fades.

## Deploy to Vercel

1. Push the repo to GitHub and import it in Vercel.
2. Add the environment variables from `.env.example`.
3. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
4. Deploy.

## Notes

- Do not run two Next.js processes in this folder at once. They fight over `.next`. Set `NEXT_DIST_DIR=.next-check` to build into another folder.
- Lighthouse and device testing should be run on the deployed site.
