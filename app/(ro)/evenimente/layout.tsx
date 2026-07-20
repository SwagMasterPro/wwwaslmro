import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/evenimente");

export default function EvenimenteLayout({ children }: { children: ReactNode }) {
  return children;
}
