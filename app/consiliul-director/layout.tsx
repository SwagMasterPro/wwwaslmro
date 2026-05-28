import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/consiliul-director");

export default function ConsiliulDirectorLayout({ children }: { children: ReactNode }) {
  return children;
}
