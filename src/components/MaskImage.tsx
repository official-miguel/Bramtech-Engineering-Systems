"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Img } from "@/content/projects";
import { Photo } from "./Photo";
import { EASE } from "./Reveal";

type Props = {
  img: Img;
  sizes: string;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-[4/5]". Reserves space. */
  aspect?: string;
  priority?: boolean;
  from?: "bottom" | "left" | "right";
};

/**
 * Clip-path wipe plus scale-down from 1.15, triggered at 20% visible, once.
 * The observer sits on an unclipped wrapper, because a fully clipped element never reports as visible.
 */
export function MaskImage({ img, sizes, className = "", aspect = "aspect-[4/5]", priority, from = "bottom" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const shown = useInView(ref, { once: true, amount: 0.2 });
  const hidden =
    from === "left" ? "inset(0 100% 0 0)" : from === "right" ? "inset(0 0 0 100%)" : "inset(100% 0 0 0)";
  return (
    <div ref={ref} className={`relative ${aspect} ${className}`}>
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-card bg-sky"
        initial={false}
        animate={reduce ? { opacity: shown ? 1 : 0 } : { clipPath: shown ? "inset(0 0 0 0)" : hidden }}
        transition={{ duration: reduce ? 0.3 : 1.1, ease: EASE }}
      >
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ scale: reduce || shown ? 1 : 1.15 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <Photo img={img} sizes={sizes} priority={priority} />
        </motion.div>
      </motion.div>
    </div>
  );
}
