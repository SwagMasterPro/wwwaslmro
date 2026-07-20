"use client";

import Link from "next/link";
import { Globe2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { getCounterpartPath, type Locale } from "@/lib/localized-routes";

export default function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <Link
      href={getCounterpartPath(pathname)}
      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
      aria-label={locale === "ro" ? "Switch to English" : "Comută în română"}
    >
      <Globe2 className="w-4 h-4" />{locale === "ro" ? "EN" : "RO"}
    </Link>
  );
}
