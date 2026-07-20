import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("importanta-relatiilor-sociale-la-varstnici");

export default function RelatiiSocialeVarstniciLayout({ children }: { children: ReactNode }) {
  return children;
}
