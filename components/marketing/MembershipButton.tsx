"use client";

import { openMembershipDialog } from "@/components/marketing/membership-dialog-events";
import type { Locale } from "@/lib/localized-routes";

export default function MembershipButton({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <button
      type="button"
      onClick={openMembershipDialog}
      className={`inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl shadow-sm bg-red-600 text-white hover:bg-red-700 ${className}`}
    >
      {locale === "ro" ? "Înscrie-te" : "Join ASLM"}
    </button>
  );
}
