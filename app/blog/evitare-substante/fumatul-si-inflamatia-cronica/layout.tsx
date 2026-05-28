import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("fumatul-si-inflamatia-cronica");

export default function FumatulInflamatiaLayout({ children }: { children: ReactNode }) {
  return children;
}
