import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("rolul-alimentatiei-in-prevenirea-bolilor");

export default function RolulAlimentatieiLayout({ children }: { children: ReactNode }) {
  return children;
}
