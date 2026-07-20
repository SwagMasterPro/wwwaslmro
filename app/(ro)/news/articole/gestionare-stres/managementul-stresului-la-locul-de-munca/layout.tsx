import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("managementul-stresului-la-locul-de-munca");

export default function ManagementulStresuluiLayout({ children }: { children: ReactNode }) {
  return children;
}
