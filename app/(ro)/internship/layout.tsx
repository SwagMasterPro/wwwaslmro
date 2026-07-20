import type { ReactNode } from "react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";

export const metadata = generateStaticPageMetadata("/internship");

export default function InternshipLayout({ children }: { children: ReactNode }) {
  return children;
}
