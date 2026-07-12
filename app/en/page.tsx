import { HomePage } from "@/app/page";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en");

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
