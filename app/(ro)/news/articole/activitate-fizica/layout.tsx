import type { ReactNode } from "react";
import { generateCategoryMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateCategoryMetadataBySlug("activitate-fizica");

export default function ActivitateFizicaLayout({ children }: { children: ReactNode }) {
  return children;
}
