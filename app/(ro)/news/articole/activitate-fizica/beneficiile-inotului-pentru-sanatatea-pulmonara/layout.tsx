import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("beneficiile-inotului-pentru-sanatatea-pulmonara");

export default function BeneficiileInotuluiLayout({ children }: { children: ReactNode }) {
  return children;
}
