import Link from "next/link";
import { Photo } from "./Photo";
import { Arrow, icons } from "./Icons";
import { imgOf } from "@/content/projects";
import type { Service } from "@/content/services";

export function ServiceCard({ s, sizes = "(min-width:1024px) 33vw, (min-width:640px) 50vw, 92vw" }: { s: Service; sizes?: string }) {
  const Icon = icons[s.icon];
  const img = imgOf(s.image, s.imageAlt, s.position);
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-sky bg-white shadow-soft transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sky">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Photo img={img} sizes={sizes} />
        </div>
        <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange text-navy">
          <Icon className="h-6 w-6" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl text-navy">{s.title}</h3>
        <p className="mt-2 flex-1 text-slate">{s.short}</p>
        <span className="mt-4 inline-flex items-center gap-2 font-bold text-orange-text">
          Learn more <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
