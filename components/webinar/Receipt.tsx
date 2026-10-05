"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WEBINAR } from "@/lib/webinar/config";

type ReceiptKey = { id: string; token: string };
type Status = { option: "member"; status: "requested" };

export default function Receipt() {
  const [key, setKey] = useState<ReceiptKey | null>(null), [status, setStatus] = useState<Status | null>(null), [error, setError] = useState(""), [busy, setBusy] = useState(false);
  const started = useRef(false);
  const update = useCallback(async (receipt: ReceiptKey) => {
    setBusy(true);
    try {
      const response = await fetch("/api/webinar/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(receipt) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      setStatus(data);
    } finally { setBusy(false); }
  }, []);
  useEffect(() => {
    const restore = window.setTimeout(() => {
      if (started.current) return; started.current = true;
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      let receipt: ReceiptKey | null = null;
      if (fragment.get("id") && fragment.get("token")) receipt = { id: fragment.get("id")!, token: fragment.get("token")! };
      else { try { receipt = JSON.parse(sessionStorage.getItem("aslm-webinar-receipt") || "null"); } catch { /* Use the emailed receipt link. */ } }
      if (!receipt || !/^[a-f0-9-]{36}$/.test(receipt.id) || !/^[a-f0-9]{64}$/.test(receipt.token)) { setError("Deschideți linkul de confirmare primit prin e-mail pentru a vedea solicitarea."); return; }
      try { sessionStorage.setItem("aslm-webinar-receipt", JSON.stringify(receipt)); } catch { /* Receipt remains in component state. */ }
      window.history.replaceState(null, "", window.location.pathname);
      setKey(receipt);
      void update(receipt).catch((failure) => setError(failure instanceof Error ? failure.message : "Confirmarea nu este disponibilă momentan."));
    }, 0);
    return () => window.clearTimeout(restore);
  }, [update]);

  return <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
    <h1 className="text-3xl font-bold text-green-950">Confirmare Webinar ASLM</h1>
    {status && <>
      <h2 aria-live="polite" className="mt-6 text-xl font-semibold">Solicitarea a fost primită</h2>
      <p className="mt-4 leading-relaxed text-gray-700">Echipa ASLM va verifica statutul de membru și va trimite separat, prin e-mail, datele contului pentru platforma de vizionare, începând cu 19 octombrie, după confirmare.</p>
      <p className="mt-4 text-gray-600">Vizionare: {WEBINAR.displayDates}. Accesul se încheie la 18 noiembrie, ora 00:00 (ora României). Înscrierile ulterioare datei de 19 octombrie beneficiază de perioada rămasă.</p>
    </>}
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
    {!status && !error && <p className="mt-6" role="status">Se verifică solicitarea…</p>}
    {key && <button type="button" disabled={busy} onClick={() => { setError(""); void update(key).catch((failure) => setError(failure instanceof Error ? failure.message : "Verificarea nu este disponibilă.")); }} className="mt-6 block min-h-11 font-semibold text-green-800 underline">Verifică din nou statusul</button>}
    <p className="mt-6 text-sm text-gray-600">Asistență: <a href="mailto:contact@aslm.ro" className="font-semibold text-green-800 underline">contact@aslm.ro</a></p>
    <Link href="/webinar" className="mt-6 inline-block font-semibold text-green-800 underline">Înapoi la Webinar ASLM</Link>
  </div>;
}
