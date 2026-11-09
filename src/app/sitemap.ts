import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = ["", "/projects", "/hire", "/reviews", "/contact"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: now,
    priority: p === "" ? 1 : 0.8,
  }));
  const svc = services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, priority: 0.9 }));
  return [...base, ...svc];
}
