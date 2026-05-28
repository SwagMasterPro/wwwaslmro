import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/blog");

export default function BlogLayout({ children }: { children: ReactNode }) {
  return children;
}
