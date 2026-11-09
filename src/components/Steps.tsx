"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { SectionHeading } from "./ui";

const steps = [
  { t: "Free site survey", d: "We visit, measure and listen. No charge." },
  { t: "Design and written quote", d: "You get a clear plan and a written price." },
  { t: "Installation by our own team", d: "Our people do the work, neat and tested." },
  { t: "Handover and aftercare", d: "We show you the system and stay reachable." },
];

export function Steps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [reached, setReached] = useState(reduce ? steps.length : 0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  useMotionValueEvent(p, "change", (v) => {
    setReached(Math.min(steps.length, Math.floor(v * (steps.length - 1) + 1.02)));
  });

  return (
    <section className="bg-white py-20 lg:py-28" aria-labelledby="steps-h">
      <div className="container-x">
        <div id="steps-h">
          <SectionHeading eyebrow="How it works" lines={["Four steps from", "call to handover."]} />
        </div>

        <div ref={ref} className="relative mt-14">
          {/* Desktop line */}
          <svg aria-hidden className="absolute left-[12.5%] top-7 hidden h-1 w-[75%] lg:block" viewBox="0 0 100 1" preserveAspectRatio="none">
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#DCE9F6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#FF7A1A" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : p }} />
          </svg>
          {/* Mobile line */}
          <svg aria-hidden className="absolute left-7 top-7 h-[calc(100%-4rem)] w-1 lg:hidden" viewBox="0 0 1 100" preserveAspectRatio="none">
            <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#DCE9F6" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <motion.line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#FF7A1A" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : p }} />
          </svg>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => {
              const on = i < reached;
              return (
                <li key={s.t} className="flex gap-5 lg:block lg:text-center">
                  <motion.span
                    animate={on ? { scale: [0.6, 1.15, 1], opacity: 1 } : { scale: 0.85, opacity: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-heading text-xl lg:mx-auto ${
                      on ? "bg-orange text-navy" : "bg-sky text-slate"
                    }`}
                  >
                    {i + 1}
                  </motion.span>
                  <div className="lg:mt-5">
                    <h3 className="text-xl text-navy">{s.t}</h3>
                    <p className="mt-2 text-slate lg:mx-auto lg:max-w-[16rem]">{s.d}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
