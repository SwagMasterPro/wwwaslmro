import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("somnul-fragmentat-si-inflamatia-sistemica");

export default function SomnulFragmentatLayout({ children }: { children: ReactNode }) {
  return children;
}
