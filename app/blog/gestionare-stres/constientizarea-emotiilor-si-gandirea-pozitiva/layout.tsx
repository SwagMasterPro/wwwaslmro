import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("constientizarea-emotiilor-si-gandirea-pozitiva");

export default function ConstientizareaEmotiilorLayout({ children }: { children: ReactNode }) {
  return children;
}
