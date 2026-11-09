import { Hero } from "@/components/Hero";
import { ChooserCards } from "@/components/ChooserCards";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { ProjectGallery } from "@/components/ProjectGallery";
import { HireSection } from "@/components/HireSection";
import { MachinerySection } from "@/components/MachinerySection";
import { About } from "@/components/About";
import { Steps } from "@/components/Steps";
import { Reviews } from "@/components/Reviews";
import { QuoteBand } from "@/components/QuoteBand";
import { SectionHeading } from "@/components/ui";
import { featured, projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <ChooserCards />
      <ServicesShowcase />
      <section id="projects" className="bg-white py-20 lg:py-28" aria-labelledby="projects-h">
        <div className="container-x">
          <div id="projects-h" className="mb-10">
            <SectionHeading
              eyebrow="Projects"
              lines={["Real work,", "on real sites."]}
              intro="Photos from our own jobs. Tap any photo to see it full size."
            />
          </div>
          <ProjectGallery items={projects} preview={featured} showAllLink />
        </div>
      </section>
      <HireSection />
      <MachinerySection />
      <About />
      <Steps />
      <Reviews />
      <QuoteBand />
    </>
  );
}
