"use client";

import { useEffect } from "react";
import { trackMembershipEvent } from "@/lib/analytics";

export default function MembershipViewTracker() {
  useEffect(() => {
    trackMembershipEvent("view_membership", { source: "membership_page", locale: "ro" });
  }, []);

  return null;
}
