import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("stresul-cronic-si-riscul-cardiovascular");

export default function StresulCronicLayout({ children }: { children: ReactNode }) {
  return children;
}
