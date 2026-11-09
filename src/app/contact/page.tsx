import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { Chat, Phone, Pin } from "@/components/Icons";
import { site, waLink, isSet } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact and free quote",
  description: "Call, WhatsApp or send a quote request to Bramtech. Free site survey. We reply the same day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" lines={["Tell us what", "you need."]} intro="Free site survey. Written quote. We reply the same day." />
      <section className="bg-cloud py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="text-2xl">Reach us directly</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a href={`tel:${site.phoneTel}`} className="flex min-h-12 items-center gap-3 font-bold hover:text-orange-text">
                  <Phone className="h-6 w-6 text-orange-text" /> {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={waLink("Hello Bramtech, I would like a quote.")} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-3 font-bold hover:text-orange-text">
                  <Chat className="h-6 w-6 text-orange-text" /> WhatsApp us
                </a>
              </li>
              {(isSet(site.address) || isSet(site.email)) && (
                <li className="flex items-start gap-3 text-slate">
                  <Pin className="mt-0.5 h-6 w-6 shrink-0 text-orange-text" />
                  <span>
                    {isSet(site.address) && site.address}
                    {isSet(site.address) && isSet(site.email) && <br />}
                    {isSet(site.email) && site.email}
                  </span>
                </li>
              )}
            </ul>
            {site.hours.some((h) => isSet(h.time)) && (
              <>
                <h3 className="mt-8 text-lg">Opening hours</h3>
                <ul className="mt-2 space-y-1 text-slate">
                  {site.hours
                    .filter((h) => isSet(h.time))
                    .map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.time}
                      </li>
                    ))}
                </ul>
              </>
            )}
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-card border border-sky bg-white p-6 shadow-soft lg:p-8">
              <h2 className="text-2xl">Quote request</h2>
              <p className="mb-5 mt-1 text-slate">Fill in the form. It opens WhatsApp with your details ready to send.</p>
              <QuoteForm idPrefix="contact" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
