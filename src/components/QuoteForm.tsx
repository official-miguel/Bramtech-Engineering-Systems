"use client";

import { useState, type FormEvent } from "react";
import { Arrow, Check, Phone } from "./Icons";
import { site, waLink } from "@/content/site";
import { track } from "@/lib/analytics";

export const installOptions = [
  "Solar installation",
  "Electrical and power",
  "CCTV and alarms",
  "Electric fence",
  "Sound system",
  "Machinery",
  "More than one system",
];
export const hireOptions = ["Sound system hire"];

type Mode = "quote" | "hire" | "compact";

const field =
  "min-h-12 w-full rounded-btn border border-sky bg-white px-3.5 py-3 text-navy placeholder:text-slate/70 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/40";
const label = "mb-1.5 block text-sm font-bold text-navy";
const err = "mt-1 text-sm font-semibold text-[#b3261e]";

/**
 * Quote, hire and compact (hero) enquiry form.
 * On submit it opens a prefilled WhatsApp message to the owner. Nothing is stored on a server.
 */
export function QuoteForm({
  mode = "quote",
  defaultService,
  dark = false,
  idPrefix = "q",
}: {
  mode?: Mode;
  defaultService?: string;
  dark?: boolean;
  idPrefix?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<string | null>(null);
  const hire = mode === "hire";

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    if (v("company")) return; // honeypot
    const next: Record<string, string> = {};
    if (v("name").length < 2) next.name = "Enter your name.";
    if (v("phone").replace(/\D/g, "").length < 9) next.phone = "Enter a phone number we can reach.";
    if (!hire && !v("service")) next.service = "Choose what you need.";
    if (hire) {
      if (!v("date")) next.date = "Choose the event date.";
      if (v("venue").length < 2) next.venue = "Enter the venue.";
    }
    setErrors(next);
    if (Object.keys(next).length) return;

    const lines = [
      hire ? "Hello Bramtech, I would like to hire sound equipment." : "Hello Bramtech, I would like a quote.",
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      hire ? "Need: Sound system hire" : `Need: ${v("service")}`,
    ];
    if (hire) {
      lines.push(`Event date: ${v("date")}`, `Venue: ${v("venue")}`);
      if (v("eventType")) lines.push(`Event type: ${v("eventType")}`);
      if (v("guests")) lines.push(`Expected guests: ${v("guests")}`);
    }
    if (v("message")) lines.push(`Message: ${v("message")}`);
    const url = waLink(lines.join("\n"));
    track(hire ? "hire_submit" : "quote_submit");
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const id = (n: string) => `${idPrefix}-${n}`;
  const lab = dark ? `${label} !text-white` : label;

  if (sent) {
    return (
      <div role="status" className="rounded-card border border-sky bg-white p-6 text-navy">
        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange text-navy">
          <Check className="h-6 w-6" />
        </span>
        <p className="font-heading text-xl">Almost done. Send it on WhatsApp.</p>
        <p className="mt-2 text-slate">
          WhatsApp should have opened with your details filled in. Press send there. If it did not open, use the button below.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={sent}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded-btn bg-orange px-5 font-bold text-navy"
          >
            Open WhatsApp
          </a>
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex min-h-12 items-center gap-2 rounded-btn border border-navy/25 px-5 font-bold"
          >
            <Phone className="h-4 w-4" /> Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4" aria-label={hire ? "Hire enquiry" : "Quote request"}>
      <div className="absolute -left-[9999px]" aria-hidden>
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor={id("name")} className={lab}>Name</label>
        <input id={id("name")} name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-e") : undefined} />
        {errors.name && <p id={id("name-e")} className={err}>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor={id("phone")} className={lab}>Phone or WhatsApp</label>
        <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-e") : undefined} />
        {errors.phone && <p id={id("phone-e")} className={err}>{errors.phone}</p>}
      </div>

      {!hire && (
        <div>
          <label htmlFor={id("service")} className={lab}>What do you need?</label>
          <select
            id={id("service")}
            name="service"
            defaultValue={defaultService ?? ""}
            className={field}
            aria-invalid={!!errors.service}
            aria-describedby={errors.service ? id("service-e") : undefined}
          >
            <option value="" disabled>Choose one</option>
            <optgroup label="Install a system">
              {installOptions.map((o) => <option key={o}>{o}</option>)}
            </optgroup>
            <optgroup label="Hire equipment">
              {hireOptions.map((o) => <option key={o}>{o}</option>)}
            </optgroup>
          </select>
          {errors.service && <p id={id("service-e")} className={err}>{errors.service}</p>}
        </div>
      )}

      {hire && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor={id("date")} className={lab}>Event date</label>
              <input id={id("date")} name="date" type="date" className={field} aria-invalid={!!errors.date} />
              {errors.date && <p className={err}>{errors.date}</p>}
            </div>
            <div>
              <label htmlFor={id("guests")} className={lab}>Expected guests</label>
              <input id={id("guests")} name="guests" inputMode="numeric" className={field} />
            </div>
          </div>
          <div>
            <label htmlFor={id("venue")} className={lab}>Venue</label>
            <input id={id("venue")} name="venue" className={field} aria-invalid={!!errors.venue} />
            {errors.venue && <p className={err}>{errors.venue}</p>}
          </div>
          <div>
            <label htmlFor={id("eventType")} className={lab}>Type of event</label>
            <select id={id("eventType")} name="eventType" defaultValue="" className={field}>
              <option value="">Choose one</option>
              <option>Church function</option>
              <option>School event</option>
              <option>Meeting or conference</option>
              <option>Wedding or party</option>
              <option>Other</option>
            </select>
          </div>
        </>
      )}

      {mode !== "compact" && (
        <div>
          <label htmlFor={id("message")} className={lab}>Message (optional)</label>
          <textarea id={id("message")} name="message" rows={3} className={field} />
        </div>
      )}

      <button
        type="submit"
        className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-btn bg-orange px-5 py-3 font-bold text-navy transition-colors hover:bg-[#ff8d3a]"
      >
        {hire ? "Send hire enquiry on WhatsApp" : mode === "compact" ? "Book on WhatsApp" : "Send quote request on WhatsApp"}
        <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>
      <p className={`text-center text-sm ${dark ? "text-white/70" : "text-slate"}`}>
        Or call{" "}
        <a href={`tel:${site.phoneTel}`} onClick={() => track("call_click")} className={`font-bold underline ${dark ? "text-white" : "text-navy"}`}>
          {site.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
