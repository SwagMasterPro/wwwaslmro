import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("cum-activitatile-in-aer-liber-reduc-stresul");

export default function ActivitatiAerLiberLayout({ children }: { children: ReactNode }) {
  return children;
}
