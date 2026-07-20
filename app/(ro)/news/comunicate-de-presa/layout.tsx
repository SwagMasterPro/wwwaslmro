import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/news/comunicate-de-presa");

export default function PressReleasesLayout({ children }: { children: ReactNode }) {
  return children;
}
