import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/medicina-stilului-de-viata");

export default function MedicinaStiluluiDeViataPage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/medicina-stilului-de-viata")} />;
}
