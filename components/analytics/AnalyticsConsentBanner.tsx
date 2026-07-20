"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAnalyticsConsent, setAnalyticsConsent } from "@/lib/analytics";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function AnalyticsConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (measurementId && !getAnalyticsConsent()) setVisible(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!visible) return null;

  const choose = (consent: "granted" | "denied") => {
    setAnalyticsConsent(consent);
    setVisible(false);
  };

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[1100] mx-auto max-w-xl rounded-2xl border border-[var(--color-primary-100)] bg-white p-5 shadow-2xl" role="dialog" aria-label="Preferințe cookie">
      <p className="font-semibold text-[var(--text-primary)]">Preferințe pentru analiza traficului</p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
        Cu acordul tău, folosim Google Analytics pentru a înțelege vizitele și traseul către înscrierea ASLM. Poți continua numai cu cookie-urile esențiale.
      </p>
      <div className="mt-3 text-sm"><Link href="/privacy" className="font-semibold text-[var(--color-primary-700)] hover:underline">Politica de confidențialitate</Link></div>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => choose("granted")} className="rounded-xl bg-[var(--color-primary-600)] px-4 py-2 font-semibold text-white hover:bg-[var(--color-primary-700)]">Accept analiza</button>
        <button type="button" onClick={() => choose("denied")} className="rounded-xl border border-[var(--border-primary)] px-4 py-2 font-semibold text-[var(--text-primary)] hover:bg-[var(--surface-secondary)]">Doar esențiale</button>
      </div>
    </aside>
  );
}
