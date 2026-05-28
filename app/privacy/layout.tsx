import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/privacy");

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return children;
}
