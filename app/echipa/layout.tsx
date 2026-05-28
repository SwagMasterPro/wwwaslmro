import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/echipa");

export default function EchipaLayout({ children }: { children: ReactNode }) {
  return children;
}
