import { GeneralAssemblyPageContent } from "@/components/governance/GovernancePages";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en/general-assembly");

export default function EnglishGeneralAssemblyPage() {
  return <GeneralAssemblyPageContent locale="en" />;
}
