"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, HeartHandshake, MonitorPlay, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WEBINAR } from "@/lib/webinar/config";

type Available = { registrationEnabled: boolean; closed: boolean };

export default function RegistrationForm() {
  const router = useRouter();
  const [ready, setReady] = useState<Available | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string[]>>({});
  const errorRef = useRef<HTMLParagraphElement>(null);
  const submissionKey = useRef("");
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/webinar/availability", { cache: "no-store", signal: controller.signal }).then((r) => { if (!r.ok) throw new Error(); return r.json(); }).then(setReady).catch(() => { if (!controller.signal.aborted) setReady({ registrationEnabled: false, closed: false }); });
    return () => controller.abort();
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError(""); setFields({});
    const data = new FormData(event.currentTarget);
    submissionKey.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/webinar/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: data.get("name"), email: data.get("email"), phone: data.get("phone"), option: "member", acceptedTerms: data.get("terms") === "on", website: data.get("website"), submissionKey: submissionKey.current }) });
      const result = await response.json();
      if (!response.ok) { setFields(result.fields || {}); throw new Error(result.error); }
      const receipt = { id: result.id, token: result.token };
      try { sessionStorage.setItem("aslm-webinar-receipt", JSON.stringify(receipt)); } catch { /* The fragment carries the receipt when storage is unavailable. */ }
      router.push(`/webinar/confirmare#${new URLSearchParams(receipt)}`);
    } catch (failure) {
      setError(failure instanceof Error && failure.message ? failure.message : "Solicitarea nu a putut fi trimisă. Vă rugăm să reîncercați.");
      setLoading(false);
    }
  }

  return (
    <div id="inscriere" className="scroll-mt-28">
      <h2 className="mb-6 text-2xl font-semibold text-[var(--text-primary)]">Participă la Webinar ASLM</h2>
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        <div className="flex flex-col rounded-2xl border-2 border-green-700 bg-green-50 p-6">
          <Users className="mb-5 h-7 w-7 text-green-800" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900">Sunt membru ASLM</h3>
          <p className="mt-5 text-3xl font-bold tracking-tight text-green-900">Gratuit</p>
          <p className="mt-5 leading-relaxed text-gray-700">Completează formularul de mai jos. Echipa ASLM va verifica statutul de membru înainte de a trimite contul de acces.</p>
          <a href="#formular-membru" className="mt-auto inline-flex min-h-12 items-center gap-2 pt-6 font-semibold text-green-800 underline">Înscrie-te acum! <ArrowRight className="h-5 w-5" aria-hidden="true" /></a>
        </div>
        <div className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-6">
          <HeartHandshake className="mb-5 h-7 w-7 text-green-800" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900">Devino membru ASLM</h3>
          <p className="mt-5 text-3xl font-bold tracking-tight text-green-900">Webinar inclus</p>
          <p className="mt-5 leading-relaxed text-gray-700">Devino membru prin formularul ASLM, unde poți achita cotizația anuală a categoriei tale. După înscrierea ca membru, revino aici și solicită accesul la webinar folosind aceeași adresă de e-mail.</p>
          <a href={WEBINAR.membershipUrl} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green-700">Devino membru ASLM <ArrowRight className="h-5 w-5" aria-hidden="true" /></a>
        </div>
        <div className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-6">
          <MonitorPlay className="mb-5 h-7 w-7 text-green-800" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-gray-900">Particip doar la webinar</h3>
          <p className="mt-5 text-3xl font-bold tracking-tight text-green-900">100 RON</p>
          <p className="mt-5 leading-relaxed text-gray-700">Acces la webinar fără înscriere ca membru ASLM. Această opțiune va fi disponibilă pe membership.aslm.ro, unde se va face și plata. Echipa ASLM va confirma plata și va trimite separat datele de acces prin e-mail.</p>
          <p className="mt-4 text-sm font-medium text-gray-600">Opțiune în pregătire pe site-ul de înscrieri.</p>
          <a href={WEBINAR.membershipUrl} className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-800 px-6 py-3 font-semibold text-white hover:bg-green-900 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green-700">Vezi opțiunile de înscriere <ArrowRight className="h-5 w-5" aria-hidden="true" /></a>
        </div>
      </div>

      <form onSubmit={submit} id="formular-membru" aria-label="Înscriere gratuită pentru membrii ASLM" className="grid scroll-mt-28 gap-8 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">Înscriere pentru membrii ASLM</h3>
          <p className="mt-4 leading-relaxed text-gray-600">Folosește adresa de e-mail din formularul de membru ASLM. Contul pentru platforma de vizionare va fi trimis separat, prin e-mail, de echipa ASLM, după verificarea calității de membru.</p>
          <p className="mt-4 leading-relaxed text-gray-600">Înregistrarea este disponibilă {WEBINAR.displayDates}. Dacă vă înscrieți după 19 octombrie, puteți viziona webinarul în perioada rămasă.</p>
          <p className="mt-5 text-sm text-gray-600">Întrebări? <a className="font-semibold text-green-800 underline" href="mailto:contact@aslm.ro">contact@aslm.ro</a></p>
        </div>
        <div className="space-y-5">
          <Input name="name" id="webinar-name" label="Nume complet" autoComplete="name" required minLength={3} maxLength={150} error={fields.name?.[0]} />
          <Input name="email" id="webinar-email" label="Adresă de e-mail" type="email" autoComplete="email" required maxLength={254} error={fields.email?.[0]} />
          <Input name="phone" id="webinar-phone" label="Telefon (opțional)" type="tel" autoComplete="tel" maxLength={30} error={fields.phone?.[0]} />
          <div className="hidden" aria-hidden="true"><label htmlFor="webinar-website">Website</label><input name="website" id="webinar-website" tabIndex={-1} autoComplete="off" defaultValue="" /></div>
          <label className="flex items-start gap-3 text-sm leading-relaxed text-gray-700"><input name="terms" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-green-800" /> <span>Accept <Link href="/webinar#conditii" className="font-semibold text-green-800 underline">condițiile de participare</Link> și am citit <Link href="/privacy" className="font-semibold text-green-800 underline">politica de confidențialitate</Link>.</span></label>
          {error && <p ref={errorRef} id="webinar-form-error" tabIndex={-1} role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">{error}</p>}
          <p role="status" className="text-sm text-gray-600">{ready?.closed ? "Perioada de înscriere s-a încheiat." : !ready ? "Se verifică disponibilitatea înscrierilor…" : !ready.registrationEnabled ? "Înscrierile la webinar se deschid în curând. Înscrierea ca membru ASLM este disponibilă prin linkul de mai sus." : ""}</p>
          <Button size="lg" fullWidth disabled={!ready?.registrationEnabled} isLoading={loading} type="submit" rightIcon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}>Trimite solicitarea de înscriere</Button>
        </div>
      </form>
    </div>
  );
}
