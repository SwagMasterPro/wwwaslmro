import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/contact");

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
