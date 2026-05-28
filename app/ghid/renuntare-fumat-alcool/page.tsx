import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/ghid/renuntare-fumat-alcool");

export default function RenuntareFumatAlcoolGuidePage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/ghid/renuntare-fumat-alcool")} />;
}
