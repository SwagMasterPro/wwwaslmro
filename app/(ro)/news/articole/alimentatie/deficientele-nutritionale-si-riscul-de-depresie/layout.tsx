import type { ReactNode } from "react";
import { generateArticleMetadataBySlug } from "@/lib/metadata-helpers";

export const metadata = generateArticleMetadataBySlug("deficientele-nutritionale-si-riscul-de-depresie");

export default function DeficienteleNutritionaleLayout({ children }: { children: ReactNode }) {
  return children;
}
