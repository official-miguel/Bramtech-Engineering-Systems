import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, getService } from "@/content/services";
import { getProject, imgOf } from "@/content/projects";
import { PageHero } from "@/components/PageHero";
import { Badge } from "@/components/ui";
import { ParallaxImage } from "@/components/ParallaxImage";
import { ProjectGallery } from "@/components/ProjectGallery";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/Icons";
import { faqSchema, serviceSchema } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { images: [{ url: s.image, alt: s.imageAlt }] },
  };
}

export default async function ServicePage({ params }: Params) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const gallery = s.gallery.map(getProject);
  const hero = imgOf(s.image, s.imageAlt, s.position);
  const others = services.filter((o) => o.slug !== s.slug);

  const approach =
    "We work in the same order on every job: free site survey, written quote, installation by our own team, then handover and aftercare. You deal with one team from the first call to the final test.";

  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <JsonLd data={faqSchema(s.faqs)} />
      <PageHero eyebrow="Installation" badge={<Badge kind="install" />} lines={[s.title]} intro={s.short} />

      <section className="bg-white py-16 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="space-y-4 text-lg leading-relaxed text-slate">
              {[...s.intro, approach].map((p, i) => (
                <Reveal key={i} y={16} delay={i * 0.05}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-8">
              <h2 className="text-2xl">What we install</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {s.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-orange-text" /> {i}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <ParallaxImage img={hero} aspect="aspect-[4/5]" sizes="(min-width:1024px) 40vw, 92vw" priority />
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-cloud py-16 lg:py-24">
          <div className="container-x">
            <h2 className="mb-8 text-3xl">Our {s.title.toLowerCase()} work</h2>
            <ProjectGallery items={gallery} filters={false} />
          </div>
        </section>
      )}

      <section className="bg-white py-16 lg:py-24" aria-labelledby="faq-h">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="faq-h" className="text-3xl">Common questions</h2>
            <Stagger className="mt-6 space-y-3">
              {s.faqs.map((f) => (
                <StaggerItem key={f.q}>
                  <details className="group rounded-card border border-sky p-4 open:bg-cloud">
                    <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-4 font-bold">
                      {f.q}
                      <span aria-hidden className="text-orange-text transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-2 text-slate">{f.a}</p>
                  </details>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal>
            <div className="rounded-card border border-sky bg-white p-6 shadow-soft lg:p-8">
              <h2 className="text-2xl">Get a free quote</h2>
              <p className="mb-5 mt-1 text-slate">We reply the same day.</p>
              <QuoteForm idPrefix={`svc-${s.slug}`} defaultService={defaultFor(s.slug)} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cloud py-14">
        <div className="container-x">
          <h2 className="text-2xl">Other installation services</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/services/${o.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-sky bg-white px-5 font-bold hover:border-orange">
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function defaultFor(slug: string) {
  return (
    {
      solar: "Solar installation",
      electrical: "Electrical and power",
      cctv: "CCTV and alarms",
      "electric-fence": "Electric fence",
      "sound-installation": "Sound system",
      machinery: "Machinery",
    } as Record<string, string>
  )[slug];
}
