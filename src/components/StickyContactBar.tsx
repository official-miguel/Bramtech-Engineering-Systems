"use client";

import { Chat, Phone } from "./Icons";
import { site, waLink } from "@/content/site";
import { track } from "@/lib/analytics";

export function StickyContactBar() {
  const wa = waLink("Hello Bramtech, I would like a quote.");
  return (
    <>
      {/* Phones */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid h-[76px] grid-cols-2 gap-2 bg-deep p-2 shadow-[0_-8px_24px_rgb(0_0_0/0.25)] md:hidden">
        <a
          href={`tel:${site.phoneTel}`}
          onClick={() => track("call_click")}
          className="flex items-center justify-center gap-2 rounded-btn border border-white/30 text-base font-bold text-white"
        >
          <Phone className="h-5 w-5" /> Call
        </a>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click")}
          className="flex items-center justify-center gap-2 rounded-btn bg-orange text-base font-bold text-navy"
        >
          <Chat className="h-5 w-5" /> WhatsApp us
        </a>
      </div>
      {/* Desktop floating WhatsApp */}
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click")}
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden h-14 items-center gap-2 rounded-full bg-orange px-5 font-bold text-navy shadow-xl transition-transform hover:-translate-y-0.5 md:flex"
      >
        <Chat className="h-6 w-6" /> WhatsApp us
      </a>
    </>
  );
}
