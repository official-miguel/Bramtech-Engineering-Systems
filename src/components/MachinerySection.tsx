import Link from "next/link";
import { Badge, SectionHeading } from "./ui";
import { MaskImage } from "./MaskImage";
import { Reveal } from "./Reveal";
import { Arrow } from "./Icons";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";

export function MachinerySection() {
  return (
    <section id="machinery" className="bg-white py-20 lg:py-28" aria-labelledby="mach-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-3">
            <Badge kind="install" />
          </div>
          <div id="mach-h">
            <SectionHeading eyebrow="Machinery" lines={["Machines installed,", "wired and running."]} />
          </div>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate">
              Installation, wiring and commissioning of industrial machines. We handle motors, gearboxes and control panels, then test the machine before handover.
            </p>
            {site.machineTypes.length > 0 && (
              <p className="mt-4 text-sm text-slate">Machine types we work on: {site.machineTypes.join(", ")}</p>
            )}
            <Link href="/services/machinery" className="group mt-6 inline-flex min-h-12 items-center gap-2 font-bold text-orange-text">
              See machinery installation <Arrow className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <MaskImage img={getProject("machinery-mixer")} aspect="aspect-[3/4]" sizes="(min-width:1024px) 25vw, 46vw" />
          <MaskImage img={getProject("machinery-testing-panel")} aspect="aspect-[3/4]" from="right" sizes="(min-width:1024px) 25vw, 46vw" className="mt-8" />
        </div>
      </div>
    </section>
  );
}
