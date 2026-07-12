"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isEnglishPath } from "@/lib/localized-routes";

export default function LocaleDocument() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = isEnglishPath(pathname) ? "en" : "ro";
  }, [pathname]);

  return null;
}
