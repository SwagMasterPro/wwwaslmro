import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/y-aslm");

export default function YAslmLayout({ children }: { children: ReactNode }) {
  return children;
}
