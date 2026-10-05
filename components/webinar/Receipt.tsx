"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { WEBINAR } from "@/lib/webinar/config";

type ReceiptKey = { id: string; token: string };
type Status = { option: "member" | "ticket" | "join"; status: "requested" | "awaiting_membership" | "pending" | "paid"; orderStatus: "creating" | "pending" | "paid" | "failed" | null; latePayment: boolean; reviewRequired: boolean; retryAllowed: boolean; membershipUrl?: string };
declare global { interface Window { Checkout?: { configure: (config: { session: { id: string } }) => void; showPaymentPage: () => void } } }

export default function Receipt() {
  const [key, setKey] = useState<ReceiptKey | null>(null), [status, setStatus] = useState<Status | null>(null), [error, setError] = useState(""), [busy, setBusy] = useState(false);
  const started = useRef(false);
  const update = useCallback(async (receipt: ReceiptKey) => {
    const response = await fetch("/api/webinar/status", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(receipt) });
    const data = await response.json(); if (!response.ok) throw new Error(data.error);
    setStatus(data); return data as Status;
  }, []);
  const pay = useCallback(async (receipt: ReceiptKey) => {
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/webinar/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(receipt) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (data.paid) { await update(receipt); setBusy(false); return; }
      if (!window.Checkout) await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = data.checkoutScript;
        script.setAttribute("data-error", "aslmWebinarCheckoutError");
        script.setAttribute("data-cancel", "aslmWebinarCheckoutCancel");
        script.onload = () => resolve(); script.onerror = () => reject(new Error("Pagina băncii nu a putut fi încărcată."));
        Object.assign(window, { aslmWebinarCheckoutError: () => { setBusy(false); setError("Plata nu a putut fi finalizată. Verificați statusul înainte de a reîncerca."); }, aslmWebinarCheckoutCancel: () => { setBusy(false); setError("Plata a fost întreruptă. Puteți reveni la plată după verificarea statusului."); } });
        document.head.appendChild(script);
      });
      if (!window.Checkout) throw new Error("Pagina băncii nu este disponibilă.");
      window.Checkout.configure({ session: { id: data.sessionId } }); window.Checkout.showPaymentPage();
    } catch (failure) { setError(failure instanceof Error ? failure.message : "Plata nu este disponibilă momentan."); setBusy(false); }
  }, [update]);
  useEffect(() => {
    // Restore browser storage in a cancellable callback after mounting.
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
      const saved = receipt;
      update(saved).then((data) => {
        if (fragment.get("join") === "1" && data.membershipUrl) window.location.assign(data.membershipUrl);
        else if (fragment.get("pay") === "1" && data.retryAllowed) void pay(saved);
      }).catch((failure) => setError(failure instanceof Error ? failure.message : "Confirmarea nu este disponibilă momentan."));
    }, 0);
    return () => window.clearTimeout(restore);
  }, [pay, update]);

  return <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
    <h1 className="text-3xl font-bold text-green-950">Confirmare Webinar ASLM</h1>
    {status && <>
      {status.reviewRequired && <p className="mt-5 rounded-xl bg-amber-50 p-4 text-amber-900">Au fost identificate mai multe plăți pentru această înscriere. ASLM va analiza situația și vă va contacta.</p>}
      <h2 aria-live="polite" className="mt-6 text-xl font-semibold">{status.status === "paid" ? "Plata este confirmată" : status.orderStatus === "failed" ? "Plata nu a fost finalizată" : status.option === "ticket" ? "Plata este în așteptare" : "Solicitarea a fost primită"}</h2>
      {status.orderStatus === "failed" && status.status !== "paid" && <p className="mt-4 text-gray-700">Banca a confirmat că această încercare a eșuat sau a fost anulată. Puteți reîncerca plata în perioada de înscriere.</p>}
      <p className="mt-4 leading-relaxed text-gray-700">{status.latePayment ? "Plata a fost primită după încheierea webinarului. Echipa ASLM va analiza situația și vă va contacta." : status.option === "member" ? "Echipa ASLM va verifica statutul de membru și va trimite separat, prin e-mail, datele contului pentru platforma de vizionare." : status.option === "join" ? "Completați formularul de membru și achitați cotizația categoriei folosind aceeași adresă de e-mail. ASLM va confirma calitatea de membru și va trimite contul de acces." : status.status === "paid" ? "Biletul de 100 RON este achitat. Echipa ASLM va trimite separat, prin e-mail, datele contului pentru platforma de vizionare." : "Înscrierea se confirmă după verificarea plății de către bancă. Revenirea pe această pagină nu confirmă singură plata."}</p>
      <p className="mt-4 text-gray-600">Vizionare: {WEBINAR.displayDates}. Accesul se încheie la 18 noiembrie, ora 00:00 (ora României). Înscrierile ulterioare datei de 19 octombrie beneficiază de perioada rămasă.</p>
      {status.membershipUrl && <a href={status.membershipUrl} className="mt-6 inline-flex rounded-xl bg-green-800 px-6 py-3 font-semibold text-white">Continuă la formularul de membru ASLM</a>}
      {status.retryAllowed && key && <Button className="mt-6" size="lg" isLoading={busy} onClick={() => void pay(key)}>Continuă la plata de 100 RON</Button>}
    </>}
    {error && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-800">{error}</p>}
    {!status && !error && <p className="mt-6" role="status">Se verifică solicitarea…</p>}
    {key && <button type="button" disabled={busy} onClick={() => { setError(""); void update(key).catch((failure) => setError(failure instanceof Error ? failure.message : "Verificarea nu este disponibilă.")); }} className="mt-6 block min-h-11 font-semibold text-green-800 underline">Verifică din nou statusul</button>}
    <p className="mt-6 text-sm text-gray-600">Asistență: <a href="mailto:contact@aslm.ro" className="font-semibold text-green-800 underline">contact@aslm.ro</a></p>
    <Link href="/webinar" className="mt-6 inline-block font-semibold text-green-800 underline">Înapoi la Webinar ASLM</Link>
  </div>;
}
