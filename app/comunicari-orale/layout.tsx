import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/comunicari-orale");

export default function ComunicariOraleLayout({ children }: { children: ReactNode }) {
  return children;
}
