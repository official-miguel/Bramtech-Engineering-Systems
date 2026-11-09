"use client";

import Link from "next/link";
import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { Arrow } from "./Icons";
import { Reveal } from "./Reveal";
import { SplitLines } from "./SplitLines";
import { track } from "@/lib/analytics";

type Variant = "orange" | "outline" | "navy" | "ghost-dark" | "light";

const variants: Record<Variant, string> = {
  orange: "bg-orange text-navy hover:bg-[#ff8d3a]",
  outline: "border border-white/40 text-white hover:bg-white/10",
  navy: "bg-navy text-white hover:bg-deep",
  "ghost-dark": "border border-navy/25 text-navy hover:bg-navy/5",
  light: "bg-white text-navy hover:bg-cloud",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  external?: boolean;
  className?: string;
  event?: string;
  magnetic?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "orange",
  arrow = true,
  external,
  className = "",
  event,
  magnetic = true,
  onClick,
}: ButtonProps) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-btn px-5 py-3 text-[0.95rem] font-bold transition-colors ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  const handle = () => {
    if (event) track(event);
    onClick?.();
  };
  const el =
    external || href.startsWith("http") || href.startsWith("tel:") ? (
      <a
        href={href}
        className={cls}
        onClick={handle}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    ) : (
      <Link href={href} className={cls} onClick={handle}>
        {inner}
      </Link>
    );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Magnetic hover, desktop pointer only. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const move = (e: PointerEvent) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={move}
      onPointerLeave={leave}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}

export function Badge({ kind, children }: { kind: "install" | "hire"; children?: ReactNode }) {
  return kind === "install" ? (
    <span className="inline-flex items-center rounded-full bg-orange px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
      {children ?? "Installation"}
    </span>
  ) : (
    <span className="inline-flex items-center rounded-full bg-navy px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
      {children ?? "Hire"}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  lines,
  intro,
  dark,
  as = "h2",
  className = "",
}: {
  eyebrow: string;
  lines: string[];
  intro?: string;
  dark?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <Reveal y={14}>
        <p className={`mb-3 text-sm font-bold uppercase tracking-[0.14em] ${dark ? "text-orange" : "text-orange-text"}`}>
          {eyebrow}
        </p>
      </Reveal>
      <SplitLines as={as} lines={lines} className={`h-section ${dark ? "text-white" : "text-navy"}`} />
      {intro && (
        <Reveal delay={0.15} y={16}>
          <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${dark ? "text-white/75" : "text-slate"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
