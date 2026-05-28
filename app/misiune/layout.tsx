import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/misiune");

export default function MisiuneLayout({ children }: { children: ReactNode }) {
  return children;
}
