import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("tehnici-de-automotivare-pentru-antrenamente");

export default function TehniciAutomotivareLayout({ children }: { children: ReactNode }) {
  return children;
}
