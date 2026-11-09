"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "./Reveal";

type Props = {
  lines: string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** Animate on mount (hero) instead of on scroll. */
  immediate?: boolean;
  stagger?: number;
};

/**
 * Line-by-line mask reveal. Each line is its own clipped container and slides up.
 * Lines are fixed in content so there is no layout shift and no text measuring.
 */
export function SplitLines({ lines, as = "h2", className, delay = 0, immediate, stagger = 0.08 }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.4 } };
  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={lines.join(" ")}
    >
      {lines.map((line, i) => (
        <span key={i} aria-hidden className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              hidden: reduce ? { opacity: 0 } : { y: "110%" },
              show: reduce ? { opacity: 1 } : { y: "0%", transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
