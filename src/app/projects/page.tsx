import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { QuoteBand } from "@/components/QuoteBand";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Photos from Bramtech installations: solar, electrical, CCTV, electric fence, sound and machinery.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        lines={["Our work,", "photo by photo."]}
        intro="Real photos from our own sites. Filter by service and tap a photo to open it."
      />
      <section className="bg-white py-14 lg:py-20">
        <div className="container-x">
          <ProjectGallery items={projects} />
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
