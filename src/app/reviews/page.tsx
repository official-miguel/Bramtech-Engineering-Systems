import type { Metadata } from "next";
import { Reviews } from "@/components/Reviews";
import { JsonLd } from "@/components/JsonLd";
import { getReviews, summarize } from "@/lib/reviews";
import { localBusiness } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Client reviews",
  description: "Read reviews from Bramtech clients, or write your own.",
  alternates: { canonical: "/reviews" },
};

export default async function ReviewsPage() {
  const { avg, count } = summarize(await getReviews());
  return (
    <>
      {/* AggregateRating is added only with 3 or more approved reviews */}
      {count >= 3 && <JsonLd data={localBusiness({ avg, count })} />}
      <Reviews full />
    </>
  );
}
