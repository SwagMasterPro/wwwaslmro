import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/despre");

export default function DespreLayout({ children }: { children: ReactNode }) {
  return children;
}
