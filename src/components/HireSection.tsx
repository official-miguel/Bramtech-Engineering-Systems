import Link from "next/link";
import { Badge, SectionHeading } from "./ui";
import { MaskImage } from "./MaskImage";
import { ParallaxImage } from "./ParallaxImage";
import { QuoteForm } from "./QuoteForm";
import { Reveal } from "./Reveal";
import { Check } from "./Icons";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

const items = ["Speakers", "Amplifiers", "Mixers", "DJ equipment"];

export function HireSection({ page = false }: { page?: boolean }) {
  const a = getProject("sound-line-array");
  const b = getProject("sound-school-event");
  const c = getProject("sound-dj");
  const d = getProject("sound-stacks");
  return (
    <section id="hire" className="on-dark bg-navy py-20 text-white lg:py-28" aria-labelledby="hire-h">
      <div className="container-x">
        <div className="mb-3">
          <Badge kind="hire" />
        </div>
        <div id="hire-h">
          <SectionHeading
            dark
            as={page ? "h1" : "h2"}
            eyebrow="Sound hire"
            lines={["Sound for your event.", "Set up and run by us."]}
            intro="We bring the equipment and our team sets it up and runs it. For church functions, school events and meetings."
          />
        </div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <MaskImage img={a} aspect="aspect-[3/4]" sizes="(min-width:1024px) 30vw, 46vw" />
              <div className="grid gap-3 sm:gap-4">
                <ParallaxImage img={b} aspect="aspect-[4/3]" sizes="(min-width:1024px) 20vw, 46vw" />
                <MaskImage img={d} aspect="aspect-[4/3]" from="right" sizes="(min-width:1024px) 20vw, 46vw" />
              </div>
            </div>

            <Reveal className="mt-8">
              <h3 className="text-xl">What you can hire</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {items.map((i) => (
                  <li key={i} className="flex items-center gap-2 text-white/90">
                    <Check className="h-5 w-5 text-orange" /> {i}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-white/60">Equipment list to be confirmed: {site.hireEquipment.join(", ")}.</p>
              <p className="mt-6 rounded-card border border-white/15 p-4 text-white/85">
                Hire is for events and short-term use. Looking for a permanent system?{" "}
                <Link href="/services/sound-installation" className="font-bold text-orange underline">
                  See sound installation.
                </Link>
              </p>
            </Reveal>
            {!page && (
              <div className="mt-6 hidden lg:block">
                <MaskImage img={c} aspect="aspect-[16/9]" sizes="40vw" from="left" />
              </div>
            )}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-card border border-hire-border bg-hire p-6 text-navy shadow-soft lg:p-8">
              <h3 className="font-heading text-2xl">Hire enquiry</h3>
              <p className="mb-5 mt-1 text-navy/75">Tell us the date and venue. We reply the same day.</p>
              <QuoteForm mode="hire" idPrefix={page ? "hirep" : "hire"} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
