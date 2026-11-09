import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" lines={["We could not", "find that page."]} intro="The page may have moved. Go back home or call us.">
      <div className="flex flex-wrap gap-3">
        <Button href="/">Back to home</Button>
        <Button href="/contact" variant="outline">Contact us</Button>
      </div>
    </PageHero>
  );
}
