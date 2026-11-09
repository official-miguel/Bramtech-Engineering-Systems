"use client";

import { motion, useReducedMotion } from "motion/react";
import { Star } from "./Icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./ui";
import { ReviewForm } from "./ReviewForm";
import type { Review } from "@/lib/reviews";

export function Stars({ n, size = "h-5 w-5" }: { n: number; size?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex text-orange" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: reduce ? 1 : 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.3 }}
        >
          <Star filled={i <= n} className={size} />
        </motion.span>
      ))}
    </span>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <article className="flex h-full w-[320px] shrink-0 flex-col rounded-card border border-sky bg-white p-5 shadow-soft sm:w-[360px]">
      <Stars n={r.rating} />
      <p className="mt-3 flex-1 leading-relaxed text-navy">{r.body}</p>
      <p className="mt-4 text-sm font-bold text-navy">
        {r.name}
        <span className="font-normal text-slate">
          {" "}
          · {r.service}
          {r.location ? ` · ${r.location}` : ""}
        </span>
      </p>
      {r.owner_reply && (
        <div className="mt-4 ml-3 border-l-4 border-orange pl-3 text-sm">
          <p className="font-bold text-orange-text">Reply from Bramtech</p>
          <p className="text-slate">{r.owner_reply}</p>
        </div>
      )}
    </article>
  );
}

export function ReviewsView({ reviews, avg, count, full }: { reviews: Review[]; avg: number; count: number; full: boolean }) {
  const hasMarquee = reviews.length >= 4 && !full;
  return (
    <section id="reviews" className="bg-cloud py-20 lg:py-28" aria-labelledby="reviews-h">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div id="reviews-h">
            <SectionHeading
              eyebrow="Reviews"
              as={full ? "h1" : "h2"}
              lines={count ? ["What our clients say."] : ["Be the first to", "review Bramtech."]}
              intro={count ? undefined : "Worked with us? Tell others how it went. It takes one minute."}
            />
          </div>
          {count > 0 && (
            <Reveal className="flex items-center gap-3">
              <span className="font-heading text-5xl text-navy">{avg.toFixed(1)}</span>
              <span>
                <Stars n={Math.round(avg)} />
                <span className="block text-sm text-slate">
                  {count} review{count > 1 ? "s" : ""}
                </span>
              </span>
            </Reveal>
          )}
        </div>
      </div>

      {count > 0 &&
        (hasMarquee ? (
          <>
            <div className="marquee mt-10 hidden overflow-hidden md:block" aria-label="Client reviews">
              <div className="marquee-track flex gap-5 py-2">
                {[...reviews, ...reviews].map((r, i) => (
                  <div key={`${r.id}-${i}`} aria-hidden={i >= reviews.length ? true : undefined}>
                    <Card r={r} />
                  </div>
                ))}
              </div>
            </div>
            <div className="container-x mt-10 grid gap-4 md:hidden">
              {reviews.slice(0, 6).map((r) => (
                <div key={r.id} className="[&>article]:w-full">
                  <Card r={r} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="container-x mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r) => (
              <div key={r.id} className="[&>article]:w-full">
                <Card r={r} />
              </div>
            ))}
          </div>
        ))}

      <div className="container-x mt-14 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <h3 className="font-heading text-2xl text-navy">Write a review</h3>
          <p className="mt-3 max-w-md text-slate">
            Tell us what we installed, how the team worked and how the system performs. Your name and review may be shown on this site.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ReviewForm />
        </Reveal>
      </div>
    </section>
  );
}
