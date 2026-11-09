# Placeholders for the owner

Everything in `[square brackets]` on the site is a placeholder. Edit them in the files below.

## `src/content/site.ts`

| Item | Where it shows |
| --- | --- |
| Phone number `0722 257 244` (confirm) | Top bar, footer, contact, call buttons |
| Email `[info@yourdomain.co.ke]` | Footer, contact page |
| Address and town | Footer, contact page, search listing data |
| Areas served | Search listing data (JSON-LD) |
| Opening hours | Footer, contact page |
| CEO title (name is set: Raphael Kang'ara) | About section |
| Company story (3 paragraphs) | About section |
| Social links (Facebook, Instagram, TikTok) | Footer |
| Trust strip: "Own installation team", "Written warranty", "Free site survey" | Hero. Remove any claim you cannot back up |
| Machine types | Machinery section |
| Hire equipment list | Sound hire section and `/hire` |

## `src/content/projects.ts`

Each project has `location: "[Location]"` and `year: "[Year]"`. Replace per photo (shown in the lightbox).

## `.env.local` (copy from `.env.example`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your real domain (sitemap, canonical links, share cards) |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Stores posted reviews |
| `IP_HASH_SALT` | Any random text |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional analytics |
| Turnstile keys | Optional spam check |

## Other

- Logo: `public/images/logo/bramtech-logo.png` (supplied). To swap, replace the file or edit `src/components/Logo.tsx`.
- Photos not in the pack: before and after pairs (the slider is in `src/components/BeforeAfter.tsx`), the commissioning video still and control panel still 1.
- No reviews, client names, statistics, certifications, prices or years in business are invented. Add them only when real.
