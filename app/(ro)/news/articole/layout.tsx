import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/news/articole");

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
