"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, CreditCard, HeartHandshake, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WEBINAR, type WebinarOption } from "@/lib/webinar/config";

const choices = [
  { option: "member" as const, icon: Users, title: "Sunt membru ASLM", price: "Gratuit", suffix: "pentru membri confirmați", detail: "Înscrieți-vă acum. Echipa ASLM va verifica statutul de membru înainte de a trimite contul de acces." },
  { option: "ticket" as const, icon: CreditCard, title: "Particip doar la webinar", price: "100 RON", suffix: "plată unică", detail: "Acces la înregistrarea webinarului în perioada anunțată, fără înscriere ca membru ASLM." },
  { option: "join" as const, icon: HeartHandshake, title: "Devino membru ASLM", price: "300 / 400 RON", suffix: "cotizație anuală, în funcție de categorie", detail: "300 RON pentru membri asociați persoane fizice; 400 RON pentru membri afiliați sau titulari eligibili. Webinar inclus după confirmarea calității de membru." },
];
type Available = { registrationEnabled: boolean; checkoutEnabled: boolean; closed: boolean };

export default function RegistrationForm() {
  const router = useRouter();
  const [option, setOption] = useState<WebinarOption | "">("");
  const [ready, setReady] = useState<Available | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submissionKey = useRef("");
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/webinar/availability", { cache: "no-store", signal: controller.signal }).then((r) => { if (!r.ok) throw new Error(); return r.json(); }).then(setReady).catch(() => { if (!controller.signal.aborted) setReady({ registrationEnabled: false, checkoutEnabled: false, closed: false }); });
    return () => controller.abort();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!option) { setError("Alegeți o opțiune de înscriere."); document.getElementById("webinar-options")?.focus(); return; }
    setLoading(true); setError(""); setFields({});
    const data = new FormData(event.currentTarget);
    submissionKey.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/webinar/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), phone: data.get("phone"), option, acceptedTerms: data.get("terms") === "on", website: data.get("website"), submissionKey: submissionKey.current }) });
      const result = await response.json();
      if (!response.ok) { setFields(result.fields || {}); throw new Error(result.error); }
      const receipt = { id: result.id, token: result.token };
      try { sessionStorage.setItem("aslm-webinar-receipt", JSON.stringify(receipt)); } catch { /* The fragment still carries the receipt when session storage is unavailable. */ }
      const fragment = new URLSearchParams({ ...receipt, ...(result.nextAction === "payment" ? { pay: "1" } : {}), ...(result.nextAction === "membership" ? { join: "1" } : {}) });
      router.push(`/webinar/confirmare#${fragment}`);
    } catch (failure) {
      setError(failure instanceof Error && failure.message ? failure.message : "Solicitarea nu a putut fi trimisă. Vă rugăm să reîncercați.");
      setLoading(false);
    }
  }

  const enabled = ready?.registrationEnabled && (option !== "ticket" || ready.checkoutEnabled);
  return (
    <form onSubmit={submit} id="inscriere" className="scroll-mt-28" aria-label="Înscriere la Webinar ASLM">
      <fieldset id="webinar-options" tabIndex={-1} className="mb-10 rounded-xl focus-visible:outline-2 focus-visible:outline-green-700">
        <legend className="mb-6 text-2xl font-semibold text-[var(--text-primary)]">Alegeți cum participați</legend>
        <div className="grid gap-5 lg:grid-cols-3">
          {choices.map((choice) => {
            const Icon = choice.icon, selected = option === choice.option;
            return (
              <label key={choice.option} className={`relative flex cursor-pointer flex-col rounded-2xl border-2 p-6 transition-colors focus-within:ring-4 focus-within:ring-green-200 ${selected ? "border-green-700 bg-green-50" : "border-gray-200 bg-white hover:border-green-500"}`}>
                <div className="mb-5 flex items-center justify-between">
                  <Icon className="h-7 w-7 text-green-800" aria-hidden="true" />
                  <input type="radio" name="option" value={choice.option} aria-labelledby={`webinar-choice-${choice.option} webinar-price-${choice.option}`} aria-describedby={`webinar-detail-${choice.option}`} checked={selected} onChange={() => { setOption(choice.option); setError(""); }} className="h-5 w-5 accent-green-800" required />
                </div>
                <span id={`webinar-choice-${choice.option}`} className="text-xl font-semibold text-gray-900">{choice.title}</span>
                <span id={`webinar-price-${choice.option}`} className="mt-5 text-3xl font-bold tracking-tight text-green-900">{choice.price}</span>
                <span className="mt-2 min-h-10 text-sm text-gray-600">{choice.suffix}</span>
                <span id={`webinar-detail-${choice.option}`} className="mt-5 text-base leading-relaxed text-gray-700">{choice.detail}</span>
                <span className="mt-auto flex items-center gap-2 pt-6 font-semibold text-green-800"><Check className="h-5 w-5" aria-hidden="true" />{selected ? "Opțiune selectată" : choice.option === "member" ? "Înscrie-te acum!" : "Selectează opțiunea"}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Datele de înscriere</h2>
          <p className="mt-4 leading-relaxed text-gray-600">Contul pentru platforma de vizionare va fi trimis separat, prin e-mail, de echipa ASLM, după confirmarea înscrierii.</p>
          <p className="mt-4 leading-relaxed text-gray-600">Înregistrarea este disponibilă {WEBINAR.displayDates}. Dacă vă înscrieți după 19 octombrie, puteți viziona webinarul în perioada rămasă.</p>
          {option === "join" && <p className="mt-5 rounded-xl bg-green-50 p-4 font-medium text-green-900">După trimiterea solicitării, continuați la formularul de membru ASLM. Folosiți aceeași adresă de e-mail în ambele formulare.</p>}
          <p className="mt-5 text-sm text-gray-600">Întrebări? <a className="font-semibold text-green-800 underline" href="mailto:contact@aslm.ro">contact@aslm.ro</a></p>
        </div>
        <div className="space-y-5">
          <Input name="name" id="webinar-name" label="Nume complet" autoComplete="name" required minLength={3} maxLength={150} error={fields.name?.[0]} />
          <Input name="email" id="webinar-email" label="Adresă de e-mail" type="email" autoComplete="email" required maxLength={254} error={fields.email?.[0]} />
          <Input name="phone" id="webinar-phone" label="Telefon (opțional)" type="tel" autoComplete="tel" maxLength={30} error={fields.phone?.[0]} />
          <div className="hidden" aria-hidden="true"><label htmlFor="webinar-website">Website</label><input name="website" id="webinar-website" tabIndex={-1} autoComplete="off" defaultValue="" /></div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"><input name="terms" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-green-800" /> <span>Accept <Link href="/webinar#conditii" className="font-semibold text-green-800 underline">condițiile de participare</Link> și am citit <Link href="/privacy" className="font-semibold text-green-800 underline">politica de confidențialitate</Link>.</span></label>
          {error && <p ref={errorRef} id="webinar-form-error" tabIndex={-1} role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
          <p role="status" className="text-sm text-gray-600">{ready?.closed ? "Perioada de înscriere s-a încheiat." : !ready ? "Se verifică disponibilitatea înscrierilor…" : !ready.registrationEnabled ? "Înscrierile se deschid în curând." : option === "ticket" && !ready.checkoutEnabled ? "Plata online pentru bilet se deschide în curând." : ""}</p>
          <Button size="lg" fullWidth disabled={!enabled} isLoading={loading} type="submit" rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}>
            {option === "ticket" ? "Continuă la plata de 100 RON" : option === "join" ? "Continuă la înscrierea ca membru" : "Trimite solicitarea de înscriere"}
          </Button>
        </div>
      </div>
    </form>
  );
}
