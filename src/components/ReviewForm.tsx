"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, Chat, Star } from "./Icons";
import { AUTO_PUBLISH_MIN, reviewServices, reviewWaText } from "@/lib/reviews";
import { waLink } from "@/content/site";
import { track } from "@/lib/analytics";

const field =
  "min-h-12 w-full rounded-btn border border-sky bg-white px-3.5 py-3 text-navy focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40";
const label = "mb-1.5 block text-sm font-bold text-navy";
const err = "mt-1 text-sm font-semibold text-[#b3261e]";

const TURNSTILE = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, o: { sitekey: string; callback: (t: string) => void }) => void };
  }
}

export function ReviewForm() {
  const reduce = useReducedMotion();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { published: boolean; wa: string }>(null);
  const [serverError, setServerError] = useState("");
  const [token, setToken] = useState("");
  const opened = useRef(Date.now());
  const tsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!TURNSTILE || !tsRef.current) return;
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    s.async = true;
    s.onload = () => window.turnstile?.render(tsRef.current!, { sitekey: TURNSTILE, callback: setToken });
    document.head.appendChild(s);
  }, []);

  const onStarKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setRating((r) => Math.min(5, r + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setRating((r) => Math.max(1, r - 1));
    }
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    if (v("name").length < 2) next.name = "Enter your name.";
    if (!rating) next.rating = "Choose a star rating.";
    if (!v("service")) next.service = "Choose the service you used.";
    if (v("body").length < 20) next.body = "Write at least 20 characters.";
    if (v("body").length > 600) next.body = "Keep it under 600 characters.";
    if (/(https?:\/\/|www\.)/i.test(v("body"))) next.body = "Links are not allowed.";
    if (!f.get("consent")) next.consent = "Please tick the box to continue.";
    setErrors(next);
    setServerError("");
    if (Object.keys(next).length) return;

    const payload = {
      name: v("name"),
      rating,
      service: v("service"),
      location: v("location"),
      body: v("body"),
      consent: true,
      website: v("website"),
      elapsed: Date.now() - opened.current,
      token,
    };
    setBusy(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const out = (await res.json()) as { ok: boolean; published?: boolean; error?: string };
      if (!res.ok || !out.ok) {
        setServerError(out.error ?? "Something went wrong. Please try again.");
        return;
      }
      track("review_submit");
      setDone({ published: !!out.published, wa: waLink(reviewWaText(payload)) });
    } catch {
      setServerError("No connection. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-card border border-sky bg-white p-7 text-navy"
      >
        <motion.span
          initial={{ scale: reduce ? 1 : 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.1 }}
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange"
        >
          <Check className="h-7 w-7" />
        </motion.span>
        <p className="font-heading text-2xl">Thank you.</p>
        <p className="mt-2 text-slate">
          {done.published
            ? "Your review is now live on this page."
            : "Your feedback has gone to our team. We will contact you to put things right."}
        </p>
        <a
          href={done.wa}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-btn bg-orange px-5 font-bold text-navy"
        >
          <Chat className="h-5 w-5" /> Also send it to Bramtech on WhatsApp
        </a>
      </motion.div>
    );
  }

  const shown = hover || rating;
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 rounded-card border border-sky bg-white p-6 text-navy shadow-soft" aria-label="Write a review">
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-name" className={label}>Name</label>
          <input id="rv-name" name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {errors.name && <p className={err}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="rv-location" className={label}>Town (optional)</label>
          <input id="rv-location" name="location" className={field} />
        </div>
      </div>

      <fieldset>
        <legend className={label}>Your rating</legend>
        <div
          role="radiogroup"
          aria-label="Star rating"
          className="flex gap-1"
          onMouseLeave={() => setHover(0)}
          onKeyDown={onStarKey}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              tabIndex={rating === n || (!rating && n === 1) ? 0 : -1}
              onClick={() => setRating(n)}
              onMouseEnter={() => setHover(n)}
              className={`flex h-11 w-11 items-center justify-center rounded-md transition-transform hover:scale-110 ${n <= shown ? "text-orange" : "text-sky"}`}
            >
              <Star filled={n <= shown} className="h-8 w-8" />
            </button>
          ))}
        </div>
        {errors.rating && <p className={err}>{errors.rating}</p>}
      </fieldset>

      <div>
        <label htmlFor="rv-service" className={label}>Service used</label>
        <select id="rv-service" name="service" defaultValue="" className={field} aria-invalid={!!errors.service}>
          <option value="" disabled>Choose one</option>
          {reviewServices.map((s) => <option key={s}>{s}</option>)}
        </select>
        {errors.service && <p className={err}>{errors.service}</p>}
      </div>

      <div>
        <label htmlFor="rv-body" className={label}>Your review</label>
        <textarea id="rv-body" name="body" rows={5} maxLength={600} className={field} aria-invalid={!!errors.body} aria-describedby="rv-hint" />
        <p id="rv-hint" className="mt-1 text-sm text-slate">20 to 600 characters. No links.</p>
        {errors.body && <p className={err}>{errors.body}</p>}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[#ff7a1a]" />
          <span>I agree my name and review may be shown on this website.</span>
        </label>
        {errors.consent && <p className={err}>{errors.consent}</p>}
      </div>

      {TURNSTILE && <div ref={tsRef} />}
      {serverError && <p role="alert" className={err}>{serverError}</p>}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-btn bg-orange px-5 py-3 font-bold text-navy transition-colors hover:bg-[#ff8d3a] disabled:opacity-60"
      >
        {busy ? "Sending..." : "Submit review"}
      </button>
      <p className="text-xs text-slate">
        Reviews of {AUTO_PUBLISH_MIN} stars and above appear on the site straight away. Every review also goes to our team.
      </p>
    </form>
  );
}
