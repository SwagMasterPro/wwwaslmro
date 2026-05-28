import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("calitate-somn");

export default function CalitateSomnLayout({ children }: { children: ReactNode }) {
  return children;
}
