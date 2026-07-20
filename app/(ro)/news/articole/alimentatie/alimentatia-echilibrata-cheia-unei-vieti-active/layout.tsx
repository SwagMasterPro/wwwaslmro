import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("alimentatia-echilibrata-cheia-unei-vieti-active");

export default function AlimentatiaEchilibrataLayout({ children }: { children: ReactNode }) {
  return children;
}
