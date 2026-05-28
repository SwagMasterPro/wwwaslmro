import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/lifestyle-medicine-romania");

export default function LifestyleMedicineRomaniaPage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/lifestyle-medicine-romania")} />;
}
