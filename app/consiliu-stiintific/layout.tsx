import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/consiliu-stiintific");

export default function ConsiliuStiintificLayout({ children }: { children: ReactNode }) {
  return children;
}
