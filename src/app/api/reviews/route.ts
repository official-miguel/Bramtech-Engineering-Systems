import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHash } from "node:crypto";
import { z } from "zod";
import { AUTO_PUBLISH_MIN, reviewServices, reviewsConfigured, sbHeaders, sbUrl } from "@/lib/reviews";

const schema = z.object({
  name: z.string().trim().min(2).max(60),
  rating: z.number().int().min(1).max(5),
  service: z.enum(reviewServices),
  location: z.string().trim().max(60).optional().or(z.literal("")),
  body: z
    .string()
    .trim()
    .min(20)
    .max(600)
    .refine((v) => !/(https?:\/\/|www\.|\.[a-z]{2,}\/)/i.test(v), "Links are not allowed."),
  consent: z.literal(true),
  website: z.string().max(0).optional(), // honeypot
  elapsed: z.number().min(3000), // ms between form open and submit
  token: z.string().optional(), // Turnstile
});

const DAILY_LIMIT = 3;

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the form and try again." }, { status: 422 });
  }
  const d = parsed.data;

  // Optional Turnstile
  if (process.env.TURNSTILE_SECRET_KEY) {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: d.token ?? "" }),
    });
    const out = (await r.json()) as { success?: boolean };
    if (!out.success) return NextResponse.json({ ok: false, error: "Verification failed." }, { status: 400 });
  }

  const publish = d.rating >= AUTO_PUBLISH_MIN;

  // Without Supabase, the WhatsApp message still reaches the owner. Nothing is published.
  if (!reviewsConfigured) {
    return NextResponse.json({ ok: true, published: false, stored: false });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const ipHash = createHash("sha256")
    .update(ip + (process.env.IP_HASH_SALT ?? ""))
    .digest("hex")
    .slice(0, 32);

  // Rate limit: 3 per IP hash per day
  const since = new Date(Date.now() - 24 * 3600 * 1000).toISOString();
  const countRes = await fetch(sbUrl(`reviews?select=id&ip_hash=eq.${ipHash}&created_at=gte.${since}`), {
    headers: sbHeaders({ Prefer: "count=exact", Range: "0-0" }),
  });
  const total = Number(countRes.headers.get("content-range")?.split("/")[1] ?? 0);
  if (total >= DAILY_LIMIT) {
    return NextResponse.json({ ok: false, error: "Too many reviews today. Please try again tomorrow." }, { status: 429 });
  }

  const ins = await fetch(sbUrl("reviews"), {
    method: "POST",
    headers: sbHeaders({ Prefer: "return=minimal" }),
    body: JSON.stringify({
      name: d.name,
      rating: d.rating,
      service: d.service,
      location: d.location || null,
      body: d.body,
      status: publish ? "approved" : "pending",
      ip_hash: ipHash,
    }),
  });
  if (!ins.ok) {
    return NextResponse.json({ ok: false, error: "Could not save your review. Please try again." }, { status: 502 });
  }
  if (publish) revalidateTag("reviews");
  return NextResponse.json({ ok: true, published: publish, stored: true });
}
