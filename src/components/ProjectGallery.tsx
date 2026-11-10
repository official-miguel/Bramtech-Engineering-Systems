"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { categories, projects, type Category, type Project } from "@/content/projects";
import { Photo } from "./Photo";
import { Lightbox } from "./Lightbox";
import { Arrow } from "./Icons";
import { EASE } from "./Reveal";

type Props = {
  items?: Project[];
  /** Shown for the "All" filter instead of everything (landing page preview). */
  preview?: Project[];
  limit?: number;
  showAllLink?: boolean;
  filters?: boolean;
};

export function ProjectGallery({ items = projects, preview, limit, showAllLink, filters = true }: Props) {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<"All" | Category>("All");
  const [open, setOpen] = useState<number | null>(null);
  const prefix = useId();

  const list = useMemo(() => {
    const f = cat === "All" ? (preview ?? items) : items.filter((p) => p.category === cat);
    const max = limit ?? (preview ? 12 : undefined);
    return max ? f.slice(0, max) : f;
  }, [cat, items, preview, limit]);

  const available = categories.filter((c) => c === "All" || items.some((p) => p.category === c));

  return (
    <div>
      {filters && (
        <div role="group" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
          {available.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-full border px-5 text-sm font-bold transition-colors ${
                cat === c ? "border-orange bg-orange text-navy" : "border-sky bg-white text-navy hover:border-navy/40"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.ul
        layout={!reduce}
        className="grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] md:grid-cols-3 lg:grid-cols-4 lg:gap-4"
      >
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.li
              key={p.id}
              layout={!reduce}
              initial={{ opacity: 0, y: reduce ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              exit={{ opacity: 0, scale: reduce ? 1 : 0.92 }}
              transition={{ duration: 0.6, ease: EASE, delay: Math.min(i % 4, 3) * 0.06 }}
              className={p.orientation === "portrait" ? "row-span-2" : "col-span-2"}
            >
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${p.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-card bg-sky text-left"
              >
                <motion.div layoutId={reduce ? undefined : `${prefix}-${p.id}`} className="absolute inset-0">
                  <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]">
                    <Photo img={p} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" />
                  </div>
                </motion.div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {showAllLink && (
        <div className="mt-10 text-center">
          <Link
            href="/projects"
            className="group inline-flex min-h-12 items-center gap-2 rounded-btn border border-navy/25 px-6 font-bold hover:bg-navy/5"
          >
            See all projects <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}

      <AnimatePresence>
        {open !== null && list[open] && (
          <Lightbox items={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} layoutPrefix={prefix} />
        )}
      </AnimatePresence>
    </div>
  );
}
