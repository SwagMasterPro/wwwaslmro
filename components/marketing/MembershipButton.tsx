"use client";

import { openMembershipDialog } from "@/components/marketing/membership-dialog-events";
import { trackMembershipEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/localized-routes";

export default function MembershipButton({ locale, className = "" }: { locale: Locale; className?: string }) {
  const buttonClassName = `inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl shadow-sm bg-red-600 text-white hover:bg-red-700 ${className}`;

  if (locale === "ro") {
    return (
      <a
        href="/membri"
        onClick={() => trackMembershipEvent("view_membership", { source: "header" })}
        className={buttonClassName}
      >
        Alătură-te
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        trackMembershipEvent("view_membership", { source: "header" });
        openMembershipDialog();
      }}
      className={buttonClassName}
    >
      Join ASLM
    </button>
  );
}
