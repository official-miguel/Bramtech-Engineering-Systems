"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { services } from "@/content/services";
import { imgOf } from "@/content/projects";
import { Photo } from "./Photo";
import { ServiceCard } from "./ServiceCard";
import { Arrow, icons } from "./Icons";
import { Badge, SectionHeading } from "./ui";
import { Stagger, StaggerItem } from "./Reveal";

/** Desktop: pinned horizontal showcase. Mobile and reduced motion: normal vertical grid. */
export function ServicesShowcase() {
  const reduce = useReducedMotion();
  return (
    <section id="installation" className="bg-cloud" aria-labelledby="services-h">
      <div className="container-x pt-20 lg:pt-28">
        <div className="mb-3 flex items-center gap-3">
          <Badge kind="install" />
        </div>
        <div id="services-h">
          <SectionHeading
            eyebrow="Installation"
            lines={["Systems we build", "and install."]}
            intro="Six services. One team. Every job starts with a free site survey."
          />
        </div>
      </div>

      {/* Grid: mobile, tablet and reduced motion */}
      <div className={`container-x py-12 ${reduce ? "" : "lg:hidden"}`}>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <StaggerItem key={s.slug}>
              <ServiceCard s={s} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {!reduce && <Pinned />}
    </section>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(services.length - 1) * 38}%`]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(services.length - 1, Math.max(0, Math.round(v * (services.length - 1)))));
  });

  return (
    <div ref={ref} className="relative hidden lg:block" style={{ height: `${services.length * 70}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.ol style={{ x }} className="flex gap-8 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-[30vw]">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            const on = i === active;
            return (
              <li key={s.slug} className="w-[34vw] max-w-[30rem] shrink-0">
                <Link
                  href={`/services/${s.slug}`}
                  className={`group block overflow-hidden rounded-card border bg-white shadow-soft transition-all duration-500 ${
                    on ? "scale-100 border-orange opacity-100" : "scale-[0.92] border-sky opacity-70"
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-sky">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ scale: on ? 1.04 : 1.12, opacity: on ? 1 : 0.8 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Photo img={imgOf(s.image, s.imageAlt, s.position)} sizes="34vw" />
                    </motion.div>
                    <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange text-navy">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white">
                      {String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl text-navy">{s.title}</h3>
                    <p className="mt-2 text-slate">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-bold text-orange-text">
                      Learn more <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </motion.ol>
        <div className="container-x mt-8 flex gap-2" aria-hidden>
          {services.map((s, i) => (
            <span key={s.slug} className={`h-1 flex-1 rounded-full transition-colors ${i <= active ? "bg-orange" : "bg-sky"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
