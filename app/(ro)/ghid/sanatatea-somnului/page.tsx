import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/ghid/sanatatea-somnului");

export default function SanatateaSomnuluiGuidePage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/ghid/sanatatea-somnului")} />;
}
