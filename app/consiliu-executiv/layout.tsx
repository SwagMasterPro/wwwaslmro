import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/consiliu-executiv");

export default function ConsiliuExecutivLayout({ children }: { children: ReactNode }) {
  return children;
}
