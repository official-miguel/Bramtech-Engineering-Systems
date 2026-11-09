import { site } from "@/content/site";

export type Review = {
  id: string;
  created_at: string;
  name: string;
  rating: number;
  service: string;
  location: string | null;
  body: string;
  owner_reply: string | null;
};

export const reviewServices = [
  "Solar",
  "Electrical",
  "CCTV and alarms",
  "Electric fence",
  "Sound installation",
  "Sound hire",
  "Machinery",
  "Other",
] as const;

/** Reviews of this rating and above are published on the site automatically. */
export const AUTO_PUBLISH_MIN = 3;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const reviewsConfigured = Boolean(url && key);

export function sbHeaders(extra?: Record<string, string>) {
  return { apikey: key!, Authorization: `Bearer ${key}`, "Content-Type": "application/json", ...extra };
}
export const sbUrl = (path: string) => `${url}/rest/v1/${path}`;

/** Approved reviews only. Returns [] when Supabase is not set up. */
export async function getReviews(limit = 50): Promise<Review[]> {
  if (!reviewsConfigured) return [];
  try {
    const res = await fetch(
      sbUrl(
        `reviews?select=id,created_at,name,rating,service,location,body,owner_reply&status=eq.approved&order=created_at.desc&limit=${limit}`,
      ),
      { headers: sbHeaders(), next: { tags: ["reviews"], revalidate: 300 } },
    );
    if (!res.ok) return [];
    return (await res.json()) as Review[];
  } catch {
    return [];
  }
}

export function summarize(reviews: Review[]) {
  const count = reviews.length;
  const avg = count ? reviews.reduce((s, r) => s + r.rating, 0) / count : 0;
  return { count, avg };
}

export const reviewWaText = (r: { name: string; rating: number; service: string; location?: string; body: string }) =>
  [
    `New Bramtech review (${r.rating}/5)`,
    `Name: ${r.name}`,
    `Service: ${r.service}`,
    r.location ? `Location: ${r.location}` : "",
    `Review: ${r.body}`,
  ]
    .filter(Boolean)
    .join("\n");

export const siteName = site.name;
