import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/ghid/gestionare-stres");

export default function GestionareStresGuidePage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/ghid/gestionare-stres")} />;
}
