import SeoGrowthPage from "@/components/seo/SeoGrowthPage";
import { getSeoGrowthPage } from "@/data/seo-growth-pages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/evenimente/credite-emc");

export default function CrediteEmcPage() {
  return <SeoGrowthPage page={getSeoGrowthPage("/evenimente/credite-emc")} />;
}
