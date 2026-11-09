import { site } from "@/content/site";
import { services, type Service } from "@/content/services";

export function localBusiness(rating?: { avg: number; count: number }) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: site.name,
    url: site.url,
    telephone: site.phoneTel,
    image: `${site.url}/images/solar/team-installing-inverter.jpg`,
    address: { "@type": "PostalAddress", addressCountry: "KE", addressLocality: site.city, streetAddress: site.address },
    areaServed: site.areasServed,
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
    ...(rating && rating.count >= 3
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.avg.toFixed(1),
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    provider: { "@type": "LocalBusiness", name: site.name, telephone: site.phoneTel },
    areaServed: { "@type": "Country", name: "Kenya" },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
