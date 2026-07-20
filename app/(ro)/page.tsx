import { HomePage } from "@/components/home/HomePage";
import { generateHomeMetadata } from "@/lib/metadata-helpers";

export const metadata = generateHomeMetadata();

export default function RomanianHomePage() {
  return <HomePage locale="ro" />;
}
