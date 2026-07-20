import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/terms");

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
