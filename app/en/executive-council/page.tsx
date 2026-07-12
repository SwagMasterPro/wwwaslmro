import { ExecutiveCouncilPageContent } from "@/components/governance/GovernancePages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en/executive-council");

export default function EnglishExecutiveCouncilPage() {
  return <ExecutiveCouncilPageContent locale="en" />;
}
