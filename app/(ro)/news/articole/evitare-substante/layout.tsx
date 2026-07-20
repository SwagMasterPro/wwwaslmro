import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("evitare-substante");

export default function EvitareSubstanteLayout({ children }: { children: ReactNode }) {
  return children;
}
