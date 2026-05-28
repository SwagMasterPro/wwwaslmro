import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("gestionare-stres");

export default function GestionareStresLayout({ children }: { children: ReactNode }) {
  return children;
}
