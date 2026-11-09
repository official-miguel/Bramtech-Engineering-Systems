import { getReviews, summarize } from "@/lib/reviews";
import { ReviewsView } from "./ReviewsView";

/** Server component: reads approved reviews, then renders the animated view. */
export async function Reviews({ full = false }: { full?: boolean }) {
  const reviews = await getReviews();
  const { avg, count } = summarize(reviews);
  return <ReviewsView reviews={reviews} avg={avg} count={count} full={full} />;
}
