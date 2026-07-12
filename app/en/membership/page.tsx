import MembershipPageContent from "@/components/membership/MembershipPageContent";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en/membership");

export default function EnglishMembershipPage() {
  return <MembershipPageContent locale="en" />;
}
