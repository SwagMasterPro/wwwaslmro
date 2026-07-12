import { EnglishIndexPageContent } from "@/components/governance/GovernancePages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en");

export default function EnglishHomePage() {
  return <EnglishIndexPageContent />;
}
