# What the owner can still add

Nothing on the live site shows a `[bracket]` placeholder. Items that are not filled in are simply hidden. Add them in `src/content/site.ts` and they appear automatically.

| Item | Appears in | Status |
| --- | --- | --- |
| Email | Footer, contact page | Hidden until set |
| Address and town | Footer, contact page, search listing | Hidden until set |
| Opening hours | Footer, contact page | Hidden until set |
| Social links (Facebook, Instagram, TikTok) | Footer | Hidden until set |
| Areas served | Search listing data | Defaults to "Kenya" |
| Machine types | Machinery section | Hidden until set |
| Hire equipment list | Sound hire section | Hidden until set |
| Project location and year (per photo) | Photo viewer | Empty by default. Fill in `src/content/projects.ts` |
| Company history, years in business, numbers | About section | Not added. The About text is plain. Add real facts only |

## Confirm with the owner

- Phone `0722 257 244` is confirmed and used everywhere. Note: the photo `felicity-wall-battery-inverter.jpg` has `0723 607 683` handwritten on a board label. Retake or remove that photo if you do not want visitors to see the other number.
- Trust strip: "Own installation team", "Written warranty", "Free site survey". Remove any you cannot back up (`trust` in `site.ts`).
- CEO: Eng. Raphael Kang'ara, Chief Executive Officer.

## Environment (`.env.local` and Vercel)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Real domain (sitemap, canonical links, share cards) |
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SALT` | Stores posted reviews |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional analytics |
| Turnstile keys | Optional spam check |
