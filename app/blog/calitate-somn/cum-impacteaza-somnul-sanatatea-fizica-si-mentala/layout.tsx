import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("cum-impacteaza-somnul-sanatatea-fizica-si-mentala");

export default function SomnulSanatateaFizicaMentalaLayout({ children }: { children: ReactNode }) {
  return children;
}
