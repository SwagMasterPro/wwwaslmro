import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/publicatii");

export default function PublicatiiLayout({ children }: { children: ReactNode }) {
  return children;
}
