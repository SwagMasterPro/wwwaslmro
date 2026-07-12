import Link from "next/link";
import Script from "next/script";
import { CheckCircle2 } from "lucide-react";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
import { generateOrganizationSchema, generateWebPageSchema } from "@/lib/structured-data";

export const metadata = generateStaticPageMetadata("/revizie-medicala");

const reviewStandards = [
  "Conținutul este redactat pentru educație medicală și prevenție, nu pentru diagnostic sau tratament individual.",
  "Afirmațiile medicale importante trebuie susținute de surse credibile, precum organizații medicale, ghiduri clinice sau instituții de sănătate publică.",
  "Materialele sunt actualizate când apar informații relevante, schimbări de evenimente sau clarificări ale surselor.",
  "Articolele și ghidurile semnalează când este nevoie de evaluare medicală sau psihologică specializată.",
];

export default function MedicalReviewPage() {
  const breadcrumbs = [
    { name: "Acasă", path: "/" },
    { name: "Revizie medicală", path: "/revizie-medicala" },
  ];

  return (
    <main className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default text-center">
          <p className="text-overline text-[var(--color-primary-300)] mb-3">
            E-E-A-T ASLM
          </p>
          <h1 className="text-display text-white mb-6">
            Procesul editorial și de revizie medicală ASLM
          </h1>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto" style={{ color: "rgba(255,255,255,0.86)" }}>
            ASLM publică materiale educaționale despre medicina stilului de viață,
            prevenție și sănătate publică, cu revizie științifică realizată prin
            Consiliul Științific ASLM.
          </p>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-default">
          <div className="max-w-4xl mx-auto grid gap-8">
            <div className="rounded-lg bg-[var(--surface-secondary)] border border-[var(--color-primary-100)] p-6 md:p-8">
              <h2 className="text-title text-[var(--text-primary)] mb-4">
                Conținut educațional, nu diagnostic
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Informațiile ASLM nu înlocuiesc consultația medicală, evaluarea
                psihologică, diagnosticul, tratamentul sau recomandările personalizate.
                Persoanele cu simptome persistente, boli cronice sau tratamente în curs
                trebuie să discute deciziile medicale cu profesioniști calificați.
              </p>
            </div>

            <div>
              <h2 className="text-title text-[var(--text-primary)] mb-5">
                Standard de citare și actualizare
              </h2>
              <div className="grid gap-4">
                {reviewStandards.map((standard) => (
                  <div key={standard} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-600)] mt-1 flex-shrink-0" />
                    <p className="text-[var(--text-secondary)] leading-relaxed">{standard}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[var(--text-secondary)] leading-relaxed">
                standard de citare ASLM: preferăm surse primare, instituții publice de
                sănătate, societăți medicale și publicații științifice, cu linkuri
                vizibile pe pagină acolo unde citarea este relevantă pentru cititor.
              </p>
            </div>

            <div className="rounded-lg bg-white border border-[var(--color-primary-100)] p-6 md:p-8">
              <h2 className="text-title text-[var(--text-primary)] mb-4">
                Cine revizuiește conținutul
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-5">
                Revizia editorială și științifică este atribuită Consiliului Științific
                ASLM până când ASLM aprobă public revizori nominali la nivel de articol.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/consiliu-stiintific"
                  className="inline-flex justify-center rounded-xl px-5 py-3 font-semibold text-white bg-[var(--color-primary-600)]"
                >
                  Vezi Consiliul Științific ASLM
                </Link>
                <Link
                  href="/medicina-stilului-de-viata"
                  className="inline-flex justify-center rounded-xl px-5 py-3 font-semibold border border-[var(--color-primary-200)] text-[var(--color-primary-700)]"
                >
                  Ghidul principal ASLM
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="review-policy-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema(
              "https://www.aslm.ro/revizie-medicala",
              "Procesul editorial și de revizie medicală ASLM",
              "Procesul editorial ASLM, standardul de citare, revizia medicală și limitele conținutului educațional.",
              breadcrumbs,
            ),
            generateOrganizationSchema(),
          ]),
        }}
      />
    </main>
  );
}
