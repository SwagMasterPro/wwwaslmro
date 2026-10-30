"use client";

import { trackMembershipEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/localized-routes";

export default function MembershipButton({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <a
      href={locale === "ro" ? "/membri" : "/en/membership"}
      onClick={() => trackMembershipEvent("view_membership", { source: "header" })}
      className={`inline-flex items-center whitespace-nowrap px-5 py-2.5 text-sm font-bold rounded-xl shadow-sm bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 ${className}`}
    >
      {locale === "ro" ? "Alătură-te" : "Join ASLM"}
    </a>
  );
}
