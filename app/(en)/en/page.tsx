import { HomePage } from "@/components/home/HomePage";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/en");

export default function EnglishHomePage() {
  return <HomePage locale="en" />;
}
