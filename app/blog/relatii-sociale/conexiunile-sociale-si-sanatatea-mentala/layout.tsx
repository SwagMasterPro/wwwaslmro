import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("conexiunile-sociale-si-sanatatea-mentala");

export default function ConexiunileSocialeLayout({ children }: { children: ReactNode }) {
  return children;
}
