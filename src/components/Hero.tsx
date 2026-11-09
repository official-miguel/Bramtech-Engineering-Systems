"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui";
import { Photo } from "./Photo";
import { SplitLines } from "./SplitLines";
import { QuoteForm } from "./QuoteForm";
import { Check } from "./Icons";
import { EASE } from "./Reveal";
import { team } from "@/content/projects";
import { site } from "@/content/site";

const installChips = ["Solar", "Electrical", "CCTV and alarms", "Electric fence", "Sound", "Machinery"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0px", "-70px"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="on-dark relative overflow-hidden bg-navy text-white">
      <motion.div aria-hidden style={reduce ? undefined : { y: orbY }} className="pointer-events-none absolute inset-0">
        <div className="orb absolute -left-24 top-10 h-80 w-80 rounded-full bg-orange/20 blur-3xl" />
        <div className="orb absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky/10 blur-3xl [animation-delay:-6s]" />
      </motion.div>

      <div className="container-x relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <SplitLines
            as="h1"
            immediate
            delay={0.1}
            lines={["One team for your", "power, security", "and sound."]}
            className="h-display"
          />
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            We build and install it all, and we hire out sound equipment for events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button href="/contact" event="quote_click_hero">Get a free quote</Button>
            <Button href="/projects" variant="outline">See our projects</Button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.9 } } }}
            className="mt-9 space-y-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 rounded-full bg-orange px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                We install
              </span>
              {installChips.map((c) => (
                <motion.span
                  key={c}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/90"
                >
                  {c}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 rounded-full border border-hire-border bg-hire px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-navy">
                We hire out
              </span>
              <motion.span
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/90"
              >
                Sound equipment
              </motion.span>
            </div>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <motion.div
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-card bg-deep sm:aspect-[5/5] lg:aspect-[4/5]"
          >
            <motion.div
              className="absolute inset-x-0 -inset-y-[6%]"
              style={reduce ? undefined : { y: photoY }}
              initial={{ scale: reduce ? 1 : 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: EASE }}
            >
              <Photo img={team.hero} priority sizes="(min-width:1024px) 40vw, 92vw" />
            </motion.div>
          </motion.div>

          <motion.div
            style={reduce ? undefined : { y: cardY }}
            className="relative z-10 -mt-16 ml-auto w-[92%] sm:w-[78%] lg:absolute lg:-bottom-10 lg:-left-16 lg:mt-0 lg:w-[19rem]"
          >
            <div className="rounded-card bg-white p-5 text-navy shadow-2xl">
              <p className="font-heading text-xl">Book a free site visit</p>
              <p className="mb-4 mt-1 text-sm text-slate">We reply the same day.</p>
              <QuoteForm mode="compact" idPrefix="hero" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-deep/60">
        <ul className="container-x flex flex-wrap gap-x-8 gap-y-2 py-4 text-sm font-semibold text-white/90">
          {site.trust.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-orange" /> {t}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
