import Receipt from "@/components/webinar/Receipt";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
export const metadata = { ...generateStaticPageMetadata("/webinar/confirmare"), robots: { index: false, follow: false }, referrer: "no-referrer" as const };
export default function WebinarReceiptPage() { return <div className="min-h-[70vh] bg-gray-50 px-4 pb-16 pt-32"><Receipt /></div>; }
