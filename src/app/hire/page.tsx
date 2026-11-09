import type { Metadata } from "next";
import { HireSection } from "@/components/HireSection";
import { ProjectGallery } from "@/components/ProjectGallery";
import { QuoteBand } from "@/components/QuoteBand";
import { SectionHeading } from "@/components/ui";
import { hireProjects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Sound system hire for events",
  description:
    "Sound system hire in Kenya for events, church functions, school events and meetings. Speakers, amplifiers, mixers and DJ equipment, set up and run by our team.",
  alternates: { canonical: "/hire" },
};

export default function HirePage() {
  return (
    <>
      <HireSection page />
      <section className="bg-white py-16 lg:py-24">
        <div className="container-x">
          <div className="mb-10">
            <SectionHeading eyebrow="Event photos" lines={["Our sound,", "at events."]} />
          </div>
          <ProjectGallery items={hireProjects} filters={false} />
        </div>
      </section>
      <QuoteBand />
    </>
  );
}
