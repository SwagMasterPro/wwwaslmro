import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("alimentatie");

export default function AlimentatieLayout({ children }: { children: ReactNode }) {
  return children;
}
