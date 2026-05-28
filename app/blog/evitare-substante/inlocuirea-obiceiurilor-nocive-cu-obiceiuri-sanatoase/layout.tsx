import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase");

export default function InlocuireaObiceiurilorLayout({ children }: { children: ReactNode }) {
  return children;
}
