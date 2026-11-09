import { Button } from "./ui";
import { Reveal } from "./Reveal";
import { SplitLines } from "./SplitLines";
import { site, waLink } from "@/content/site";

export function QuoteBand() {
  return (
    <section className="bg-orange py-16 text-navy lg:py-20" aria-label="Get a quote">
      <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <SplitLines
            lines={["Tell us what you need.", "We reply the same day."]}
            className="text-3xl sm:text-4xl lg:text-5xl"
          />
        </div>
        <Reveal className="flex flex-wrap gap-3">
          <Button href="/contact" variant="navy" event="quote_click_band">Get a free quote</Button>
          <Button href={waLink("Hello Bramtech, I would like a quote.")} variant="light" event="whatsapp_click">
            WhatsApp us
          </Button>
          <Button href={`tel:${site.phoneTel}`} variant="ghost-dark" arrow={false} event="call_click">
            Call {site.phoneDisplay}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
