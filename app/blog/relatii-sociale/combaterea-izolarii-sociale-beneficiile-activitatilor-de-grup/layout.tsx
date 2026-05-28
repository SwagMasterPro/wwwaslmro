import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("combaterea-izolarii-sociale-beneficiile-activitatilor-de-grup");

export default function CombatereaIzolariiLayout({ children }: { children: ReactNode }) {
  return children;
}
