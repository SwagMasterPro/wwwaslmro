import MembershipPackagesPage from "@/components/membership/MembershipPackagesPage";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/parteneri-companii");

export default function CompanyPartnersPage() {
  return <MembershipPackagesPage audience="companies" />;
}
