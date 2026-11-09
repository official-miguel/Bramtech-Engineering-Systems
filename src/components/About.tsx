import { SectionHeading } from "./ui";
import { MaskImage } from "./MaskImage";
import { ParallaxImage } from "./ParallaxImage";
import { Reveal } from "./Reveal";
import { team } from "@/content/projects";
import { site } from "@/content/site";

export function About() {
  return (
    <section id="about" className="bg-cloud py-20 lg:py-28" aria-labelledby="about-h">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <MaskImage img={team.ceo} aspect="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 92vw" />
          <div className="absolute -bottom-6 left-4 z-10 rounded-card border-l-4 border-orange bg-white px-5 py-3 shadow-soft sm:left-6">
            <p className="font-heading text-lg text-navy">{site.ceo.name}</p>
            <p className="text-sm text-slate">{site.ceo.title}</p>
          </div>
          <div className="absolute -right-8 -top-3 hidden w-1/3 lg:block">
            <ParallaxImage img={team.site} aspect="aspect-[3/4]" sizes="14vw" />
          </div>
        </div>
        <div>
          <div id="about-h">
            <SectionHeading eyebrow="About us" lines={["A team that", "does the work itself."]} />
          </div>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate">
            {site.about.map((p, i) => (
              <Reveal key={i} delay={i * 0.08} y={16}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
