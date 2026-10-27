"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input, Textarea } from "@/components/ui/Input";
import { companyMembershipPackages } from "@/data/membership-packages";
import { companyRequestSchema } from "@/lib/company-requests/model";

export default function CompanyRequestForm() {
  const search = useSearchParams();
  const requestedPackage = search.get("pachet");
  const [selection, setSelection] = useState<{ query: string | null; id: string } | null>(null);
  const defaultPackage = companyMembershipPackages.some(item => item.id === requestedPackage) ? requestedPackage! : "imm";
  const packageId = selection?.query === requestedPackage ? selection.id : defaultPackage;
  const [available, setAvailable] = useState<boolean | null>(null);
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [failure, setFailure] = useState("");
  const [reference, setReference] = useState("");
  const [submittedPackage, setSubmittedPackage] = useState("");
  const submissionId = useRef("");
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/company-requests", { cache: "no-store", signal: controller.signal })
      .then(async response => { if (!response.ok) throw new Error(); return response.json(); })
      .then(data => setAvailable(data.available === true))
      .catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  }, []);
  useEffect(() => { if (failure || reference) statusRef.current?.focus(); }, [failure, reference]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending || !available || reference) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    submissionId.current ||= crypto.randomUUID();
    const payload = { ...Object.fromEntries(values), packageId, privacyAcknowledged: values.get("privacyAcknowledged") === "on", submissionId: submissionId.current };
    const parsed = companyRequestSchema.safeParse(payload);
    setFailure(""); setErrors({});
    if (!parsed.success) {
      const fields = Object.fromEntries(parsed.error.issues.map(issue => [String(issue.path[0]), issue.message]));
      setErrors(fields);
      (form.elements.namedItem(Object.keys(fields)[0]) as HTMLElement | null)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/company-requests", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data), signal: AbortSignal.timeout(35_000),
      });
      const result = await response.json();
      if (!response.ok || !result.reference) {
        setErrors(result.fields || {});
        throw new Error(result.error || "Nu am putut confirma primirea solicitării. Contactează ASLM la contact@aslm.ro.");
      }
      setSubmittedPackage(packageId);
      setReference(result.reference);
    } catch (error) {
      setFailure(error instanceof Error && error.name === "Error" ? error.message : "Nu am putut confirma primirea solicitării. Datele sunt păstrate în formular. Reîncearcă sau contactează contact@aslm.ro.");
    } finally { setPending(false); }
  }

  const field = (name: string) => ({ name, id: `company-${name}`, error: errors[name] });
  return (
    <section id="inscriere" aria-labelledby="company-form-title" className="mt-16 scroll-mt-28 rounded-2xl border border-green-200 bg-green-50/40 p-5 md:p-10">
      <div className="max-w-3xl">
        <h2 id="company-form-title" className="font-heading text-3xl font-bold text-green-950">Solicită înscrierea companiei</h2>
        <p className="mt-4 leading-relaxed">Completează datele companiei și alege pachetul. Echipa ASLM va verifica solicitarea și te va contacta pentru pașii următori și, pentru pachetele cu cotizație, facturare. Parteneri Media este gratuit.</p>
        <p className="mt-3 text-sm text-[var(--text-secondary)]">Nu se efectuează o plată online. Trimiterea solicitării nu confirmă automat parteneriatul. Câmpurile marcate cu * sunt obligatorii.</p>
      </div>
      {available === null && <p className="mt-6" role="status">Se verifică disponibilitatea formularului…</p>}
      {available === false && <p className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4" role="status">Formularul este în curs de activare. Pentru înscriere, contactează ASLM la <a className="font-semibold underline" href="mailto:contact@aslm.ro">contact@aslm.ro</a> sau prin <Link className="font-semibold underline" href="/contact">pagina de contact</Link>.</p>}
      <div ref={statusRef} tabIndex={-1} className="scroll-mt-28 focus-visible:outline-2 focus-visible:outline-green-900">
        {reference && <div role="status" className="mt-6 rounded-lg border border-green-300 bg-green-50 p-5">
          <h3 className="text-xl font-semibold">Solicitarea a fost transmisă către ASLM.</h3>
          <p className="mt-2">Echipa ASLM te va contacta pentru verificare{submittedPackage === "media" ? ". Pachetul Media este gratuit." : " și facturare. Nu a fost efectuată o plată online."}</p>
          <p className="mt-3 break-all text-sm">Referință: {reference}</p>
        </div>}
        {failure && <p role="alert" className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4">{failure}</p>}
      </div>
      {!reference && <form onSubmit={submit} className="mt-8" aria-busy={pending}>
        <fieldset disabled={pending} className="min-w-0 space-y-8">
          <legend className="sr-only">Date pentru solicitarea de parteneriat</legend>
          <fieldset className="min-w-0">
            <legend className="mb-5 text-xl font-semibold text-green-950">Date companie</legend>
            <div className="grid gap-5 md:grid-cols-2">
              <Input {...field("companyName")} label="Nume companie" required maxLength={200} autoComplete="organization" />
              <Input {...field("cui")} label="CUI" required maxLength={32} />
              <Input {...field("website")} label="Site" placeholder="companie.ro" maxLength={250} autoComplete="url" inputMode="url" helperText="Opțional, dacă firma are un site." />
              <Input {...field("locality")} label="Oraș/Județ" required maxLength={160} autoComplete="address-level2" />
              <div className="md:col-span-2"><Textarea {...field("activity")} label="Scurtă descriere a activității firmei" required minLength={10} maxLength={2000} rows={4} /></div>
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-5 text-xl font-semibold text-green-950">Reprezentant</legend>
            <div className="grid gap-5 md:grid-cols-2">
              <Input {...field("representativeName")} label="Nume reprezentant" required maxLength={160} autoComplete="name" />
              <Input {...field("phone")} label="Telefon" type="tel" required minLength={7} maxLength={32} autoComplete="tel" />
              <Input {...field("email")} label="Email" type="email" required maxLength={254} autoComplete="email" />
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-5 text-xl font-semibold text-green-950">Pachet și cotizație anuală *</legend>
            <div className="grid gap-3 lg:grid-cols-3">
              {companyMembershipPackages.map(item => <label key={item.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 ${packageId === item.id ? "border-green-800 bg-white" : "border-green-200"}`}>
                <input type="radio" name="packageId" value={item.id} checked={packageId === item.id} onChange={() => setSelection({ query: requestedPackage, id: item.id })} required className="mt-1 h-5 w-5 shrink-0 accent-green-900 focus-visible:outline-2 focus-visible:outline-offset-4" />
                <span><span className="block font-semibold">{item.name}</span><span className="mt-1 block">{item.annualFeeRon ? `${item.annualFeeRon.toLocaleString("ro-RO")} RON / an` : "Gratuit"}</span></span>
              </label>)}
            </div>
            {errors.packageId && <p role="alert" className="mt-2 text-red-800">{errors.packageId}</p>}
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-5 text-xl font-semibold text-green-950">Date facturare</legend>
            <p className="mb-5 text-sm">Completează separat compania pentru facturare, chiar dacă datele coincid. Pentru Media nu se solicită plata unei cotizații.</p>
            <div className="grid gap-5 md:grid-cols-2">
              <Input {...field("billingCompanyName")} label="Nume companie pentru facturare" required maxLength={200} autoComplete="billing organization" />
              <Input {...field("billingCui")} label="CUI pentru facturare" required maxLength={32} />
            </div>
          </fieldset>
          <div className="hidden" aria-hidden="true"><label htmlFor="company-fax">Fax</label><input id="company-fax" name="fax" tabIndex={-1} autoComplete="off" /></div>
          <div>
            <label className="flex items-start gap-3">
              <input type="checkbox" name="privacyAcknowledged" required className="mt-1 h-5 w-5 shrink-0 accent-green-900 focus-visible:outline-2 focus-visible:outline-offset-4" aria-describedby={errors.privacyAcknowledged ? "company-privacy-error" : undefined} aria-invalid={Boolean(errors.privacyAcknowledged)} />
              <span>Am citit <Link className="font-semibold underline" href="/privacy" target="_blank" rel="noopener noreferrer">informarea privind prelucrarea datelor personale (filă nouă)</Link>. Datele sunt transmise echipei ASLM pentru gestionarea solicitării. *</span>
            </label>
            {errors.privacyAcknowledged && <p id="company-privacy-error" className="mt-2 text-red-800">{errors.privacyAcknowledged}</p>}
          </div>
          <button type="submit" disabled={!available || pending} className="min-h-12 rounded-lg bg-green-900 px-6 py-3 font-semibold text-white hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900 disabled:cursor-not-allowed disabled:opacity-50">{pending ? "Se trimite…" : "Trimite solicitarea de înscriere"}</button>
        </fieldset>
      </form>}
    </section>
  );
}
