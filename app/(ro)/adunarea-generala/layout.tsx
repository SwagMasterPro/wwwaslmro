import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/adunarea-generala");

export default function AdunareaGeneralaLayout({ children }: { children: ReactNode }) {
  return children;
}
