import type { ReactNode } from "react";
import { SplitLines } from "./SplitLines";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  lines,
  intro,
  badge,
  children,
}: {
  eyebrow: string;
  lines: string[];
  intro?: string;
  badge?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy py-14 text-white lg:py-20">
      <div aria-hidden className="orb pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-orange/15 blur-3xl" />
      <div className="container-x relative">
        {badge && <div className="mb-4">{badge}</div>}
        <Reveal y={12}>
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-orange">{eyebrow}</p>
        </Reveal>
        <SplitLines as="h1" immediate lines={lines} className="h-display max-w-4xl" />
        {intro && (
          <Reveal delay={0.3} y={16}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>
          </Reveal>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
