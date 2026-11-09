"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  rotate?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "section";
  amount?: number;
};

/** Fade and rise on enter, once. Reduced motion: simple fade. */
export function Reveal({ children, delay = 0, y = 28, rotate = 0, className, as = "div", amount = 0.2 }: Props) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y, rotate: reduce ? 0 : rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: reduce ? 0.3 : 0.8, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Staggered children container. Use <StaggerItem> inside. */
export function Stagger({ children, className, gap = 0.08 }: { children: ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, y = 26 }: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.3 : 0.75, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}
