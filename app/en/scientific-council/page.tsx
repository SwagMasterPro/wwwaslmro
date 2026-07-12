import { ScientificCouncilPageContent } from "@/components/governance/GovernancePages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en/scientific-council");

export default function EnglishScientificCouncilPage() {
  return <ScientificCouncilPageContent locale="en" />;
}
