-- Run once in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 60),
  rating int not null check (rating between 1 and 5),
  service text not null,
  location text,
  body text not null check (char_length(body) between 20 and 600),
  -- 3, 4 and 5 star reviews are set to 'approved' by the API. Others stay 'pending' (WhatsApp only).
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  ip_hash text,
  owner_reply text
);

create index if not exists reviews_status_created_idx on public.reviews (status, created_at desc);

alter table public.reviews enable row level security;

-- Public can read approved reviews only. Inserts go through the server (service role).
drop policy if exists "read approved reviews" on public.reviews;
create policy "read approved reviews" on public.reviews
  for select using (status = 'approved');
-- No public insert, update or delete policies. The API route uses the service role key.
-- To hide or reply to a review, edit the row in the Supabase Table Editor (set status or owner_reply).
