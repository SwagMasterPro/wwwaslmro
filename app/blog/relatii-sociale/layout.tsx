import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("relatii-sociale");

export default function RelatiiSocialeLayout({ children }: { children: ReactNode }) {
  return children;
}
