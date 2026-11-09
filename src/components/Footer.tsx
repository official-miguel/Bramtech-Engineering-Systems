"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Logo } from "./Logo";
import { Badge } from "./ui";
import { services } from "@/content/services";
import { site, isPlaceholder, designer } from "@/content/site";
import { Arrow } from "./Icons";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);

  return (
    <footer ref={ref} id="contact" className="on-dark relative overflow-hidden bg-deep text-white/80">
      <div className="container-x grid gap-12 pb-16 pt-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-5 lg:pr-6">
          <Logo />
          <p className="max-w-xs leading-relaxed">
            We build and install power, security and sound systems. We also hire out sound equipment for events.
          </p>
          <ul className="flex flex-wrap gap-3 text-sm">
            {site.social.map((s) => (
              <li key={s.label}>
                {isPlaceholder(s.href) ? (
                  <span className="text-white/50">{s.label} [link]</span>
                ) : (
                  <a href={s.href} className="underline hover:text-orange" target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-heading text-lg text-white">Installation</h2>
            <Badge kind="install" />
          </div>
          <ul className="space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="inline-block py-1 hover:text-orange">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2">
            <h2 className="font-heading text-lg text-white">Hire</h2>
            <span className="inline-flex items-center rounded-full border border-hire-border bg-hire px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
              Hire
            </span>
          </div>
          <ul className="space-y-2">
            <li>
              <Link href="/hire" className="inline-block py-1 hover:text-orange">
                Sound system hire
              </Link>
            </li>
          </ul>
          <h2 className="mb-3 mt-8 font-heading text-lg text-white">Company</h2>
          <ul className="space-y-2">
            <li><Link href="/projects" className="inline-block py-1 hover:text-orange">Projects</Link></li>
            <li><Link href="/reviews" className="inline-block py-1 hover:text-orange">Reviews</Link></li>
            <li><Link href="/contact" className="inline-block py-1 hover:text-orange">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-heading text-lg text-white">Contact</h2>
          <address className="space-y-2 not-italic">
            <p>
              <a href={`tel:${site.phoneTel}`} className="inline-block py-1 font-bold text-white hover:text-orange">
                {site.phoneDisplay}
              </a>
            </p>
            <p>{site.email}</p>
            <p>{site.address}</p>
          </address>
          <h3 className="mb-2 mt-6 font-heading text-base text-white">Opening hours</h3>
          <ul className="space-y-1 text-sm">
            {site.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.time}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <motion.p
          style={reduce ? undefined : { y }}
          className="whitespace-nowrap text-center font-heading text-[19vw] font-extrabold leading-[0.8] tracking-tight text-white/[0.06]"
        >
          BRAMTECH
        </motion.p>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Kenya</p>
        </div>
      </div>      <div className="border-t border-white/10 bg-[#050d17]">
        <div className="container-x flex flex-col items-start justify-between gap-4 py-5 sm:flex-row sm:items-center">
          <p className="text-white/80">
            Designed &amp; developed by{" "}
            {designer.href ? (
              <a href={designer.href} target="_blank" rel="noopener noreferrer" className="font-bold text-[#22c55e] hover:underline">
                {designer.name}
              </a>
            ) : (
              <span className="font-bold text-[#22c55e]">{designer.name}</span>
            )}
          </p>
          {designer.href && (
            <a
              href={designer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-[#22c55e] px-5 text-sm font-semibold text-[#22c55e] transition-colors hover:bg-[#22c55e] hover:text-[#050d17]"
            >
              Need a website like this? Let&apos;s talk
              <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
