import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("tehnici-pentru-renuntarea-la-tutun-si-alcool");

export default function RenuntareTutunAlcoolLayout({ children }: { children: ReactNode }) {
  return children;
}
