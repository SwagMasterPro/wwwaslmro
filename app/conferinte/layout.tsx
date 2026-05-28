import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/conferinte");

export default function ConferinteLayout({ children }: { children: ReactNode }) {
  return children;
}
