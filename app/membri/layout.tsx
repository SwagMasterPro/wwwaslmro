import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/membri");

export default function MembriLayout({ children }: { children: ReactNode }) {
  return children;
}
