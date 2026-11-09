"use client";

import { motion, useReducedMotion } from "motion/react";
import { Badge, Button } from "./ui";
import { Bolt, Speaker } from "./Icons";
import { EASE } from "./Reveal";

export function ChooserCards() {
  const reduce = useReducedMotion();
  const card = (rot: number, delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 60, rotate: reduce ? 0 : rot },
    whileInView: { opacity: 1, y: 0, rotate: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 1, ease: EASE, delay },
  });
  return (
    <section className="bg-white py-16 lg:py-24" aria-label="Install or hire">
      <div className="container-x grid gap-6 md:grid-cols-2">
        <motion.div {...card(-2.5, 0)} className="on-dark flex flex-col rounded-card bg-navy p-7 text-white shadow-soft lg:p-10">
          <div className="flex items-center justify-between">
            <Badge kind="install" />
            <Bolt className="h-8 w-8 text-orange" />
          </div>
          <h2 className="mt-6 text-3xl lg:text-4xl">Installation</h2>
          <p className="mt-3 text-lg text-white/80">We build and install systems for your property.</p>
          <p className="mt-5 text-sm text-white/70">
            <strong className="text-white">Best for:</strong> homes, shops, schools, churches and factories that need a permanent system.
          </p>
          <div className="mt-8">
            <Button href="/#installation">See installation services</Button>
          </div>
        </motion.div>

        <motion.div
          {...card(2.5, 0.12)}
          className="glow-hover flex flex-col rounded-card border border-hire-border bg-hire p-7 text-navy shadow-soft lg:p-10"
        >
          <div className="flex items-center justify-between">
            <Badge kind="hire" />
            <Speaker className="h-8 w-8 text-navy" />
          </div>
          <h2 className="mt-6 text-3xl lg:text-4xl">Hire</h2>
          <p className="mt-3 text-lg text-navy/80">We hire out sound equipment for your event.</p>
          <p className="mt-5 text-sm text-navy/75">
            <strong className="text-navy">Best for:</strong> church functions, school events, meetings and parties.
          </p>
          <div className="mt-8">
            <Button href="/hire" variant="navy">See sound hire</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
