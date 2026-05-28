import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/ghid/activitate-fizica");

export default function ActivitateFizicaGuidePage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/ghid/activitate-fizica")} />;
}
