import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/ghid/alimentatie-sanatoasa");

export default function AlimentatieSanatoasaGuidePage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/ghid/alimentatie-sanatoasa")} />;
}
