import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("ritmul-circadian-de-ce-conteaza-ora-de-culcare");

export default function RitmulCircadianLayout({ children }: { children: ReactNode }) {
  return children;
}
