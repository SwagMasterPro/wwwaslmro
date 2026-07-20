"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MEMBERSHIP_DIALOG_OPEN_EVENT } from "@/components/marketing/membership-dialog-events";

const MembershipPopup = dynamic(() => import("@/components/marketing/MembershipPopup"), {
  ssr: false,
});

/** Keeps the dialog bundle off the critical path until a user asks to open it. */
export default function MembershipPopupLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const loadDialog = () => setShouldLoad(true);
    window.addEventListener(MEMBERSHIP_DIALOG_OPEN_EVENT, loadDialog);
    return () => window.removeEventListener(MEMBERSHIP_DIALOG_OPEN_EVENT, loadDialog);
  }, []);

  return shouldLoad ? <MembershipPopup initialOpen /> : null;
}
