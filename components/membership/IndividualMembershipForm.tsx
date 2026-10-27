"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackMembershipEvent } from "@/lib/analytics";
import { getMembershipResizeHeight } from "@/lib/membership-embed";
import styles from "./MembershipPackagesPage.module.css";

type MembershipMeasureRequest = { type: "aslm:membership-form:measure" };

function requestMeasurement(iframe: HTMLIFrameElement | null) {
  const request: MembershipMeasureRequest = { type: "aslm:membership-form:measure" };
  iframe?.contentWindow?.postMessage(request, "https://membership.aslm.ro");
}

export default function IndividualMembershipForm({ url, embedded }: { url: string; embedded: boolean }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);

  useEffect(() => {
    if (!embedded) return;

    const handleMessage = (event: MessageEvent<unknown>) => {
      const nextHeight = getMembershipResizeHeight(event, iframeRef.current?.contentWindow ?? null);
      if (nextHeight !== null) setHeight(nextHeight);
    };

    window.addEventListener("message", handleMessage);
    requestMeasurement(iframeRef.current);
    return () => window.removeEventListener("message", handleMessage);
  }, [embedded, url]);

  return (
    <>
      {embedded && (
        <iframe
          ref={iframeRef}
          src={url}
          title="Formular de înscriere în ASLM"
          className="mt-7 block w-full border-0"
          style={{ height }}
          onLoad={() => requestMeasurement(iframeRef.current)}
        />
      )}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.joinLink}
        onClick={() => trackMembershipEvent("begin_membership", { source: embedded ? "membership_registration_fallback" : "membership_registration" })}
      >
        {embedded ? "Deschide formularul într-o filă nouă" : "Completează formularul de înscriere"}
        <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
      {!embedded && <p className={styles.externalNote}>Formularul se deschide pe membership.aslm.ro într-o filă nouă.</p>}
    </>
  );
}
