import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import { SeoGrowthPage as SeoGrowthPageData } from "@/data/seo-growth-pages";
import {
  generateFAQSchema,
  generateMedicalWebPageSchema,
  generateWebPageSchema,
  getAbsoluteUrl,
} from "@/lib/structured-data";
import RelatedResources from "@/components/seo/RelatedResources";

type SeoGrowthPageProps = {
  page: SeoGrowthPageData;
};

export default function SeoGrowthPage({ page }: SeoGrowthPageProps) {
  const breadcrumbs = [
    { name: "Acasă", path: "/" },
    { name: page.title, path: page.path },
  ];
  const isMedicalPage =
    page.path === "/medicina-stilului-de-viata" || page.path.startsWith("/ghid/");

  return (
    <main className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-overline text-[var(--color-primary-300)] mb-3 block">
              {page.eyebrow}
            </span>
            <h1
              className="text-display text-white mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 3.5rem)" }}
            >
              {page.title}
            </h1>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.86)" }}>
              {page.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={page.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: "#FFFFFF", color: "#1B4332" }}
              >
                {page.primaryCta.label}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={page.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{
                  backgroundColor: "transparent",
                  color: "#FFFFFF",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                {page.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {page.directAnswer && (
        <section className="section-md surface-primary">
          <div className="container-default">
            <div className="max-w-4xl mx-auto rounded-lg p-6 md:p-8 border border-[var(--color-primary-100)] bg-[var(--surface-secondary)]">
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-overline mb-2">Răspuns direct</p>
                  <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
                    {page.directAnswer}
                  </p>
                  {(page.lastUpdated || page.reviewedBy) && (
                    <div className="flex flex-wrap gap-3 mt-5 text-sm">
                      {page.lastUpdated && (
                        <span className="px-3 py-1 rounded-full bg-white font-semibold text-[var(--color-primary-700)]">
                          {`Last updated: ${page.lastUpdated}`}
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-white font-semibold text-[var(--text-secondary)]">
                        Autor: Echipa editorială ASLM
                      </span>
                      {page.reviewedBy && (
                        <span className="px-3 py-1 rounded-full bg-white font-semibold text-[var(--text-secondary)]">
                          {`Revizuit de: ${page.reviewedBy}`}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 mt-4 text-sm">
                    <Link href="/revizie-medicala" className="font-semibold text-[var(--color-primary-700)] hover:underline">
                      Proces editorial ASLM
                    </Link>
                    <Link href="/consiliu-stiintific" className="font-semibold text-[var(--color-primary-700)] hover:underline">
                      Consiliul Științific ASLM
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-lg surface-primary">
        <div className="container-default">
          <div className="max-w-4xl mx-auto grid gap-8">
            <div className="grid md:grid-cols-3 gap-4">
              {page.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-lg p-5 bg-[var(--surface-secondary)] border border-[var(--color-primary-100)]"
                >
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-primary-600)] mb-3" />
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            <article className="prose prose-lg max-w-none">
              {page.comparisonRows && (
                <section className="mb-10">
                  <h2 className="text-title text-[var(--text-primary)] mb-4">
                    Medicina stilului de viață vs medicina preventivă
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-[var(--color-primary-100)]">
                    <table className="w-full text-left bg-white">
                      <thead className="bg-[var(--surface-secondary)]">
                        <tr>
                          <th className="p-4">Criteriu</th>
                          <th className="p-4">Medicina stilului de viață</th>
                          <th className="p-4">Medicina preventivă</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page.comparisonRows.map((row) => (
                          <tr key={row.criteriu} className="border-t border-[var(--color-primary-100)]">
                            <td className="p-4 font-semibold">{row.criteriu}</td>
                            <td className="p-4">{row.lifestyleMedicine}</td>
                            <td className="p-4">{row.preventiveMedicine}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}
              {page.sections.map((section) => (
                <section key={section.heading} className="mb-10">
                  <h2 className="text-title text-[var(--text-primary)] mb-4">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-body mb-4">
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="space-y-3 mt-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-[var(--text-secondary)]">
                          <span className="w-2 h-2 rounded-full bg-[var(--color-primary-600)] mt-3 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </article>

            {page.relatedResources && (
              <RelatedResources resources={page.relatedResources} />
            )}
          </div>
        </div>
      </section>

      <section className="section-lg surface-secondary">
        <div className="container-default">
          <div className="max-w-4xl mx-auto">
            <p className="text-overline mb-3">FAQ</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-8">
              Întrebări frecvente
            </h2>
            <div className="grid gap-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="rounded-lg bg-white p-6 border border-[var(--color-primary-100)]">
                  <summary className="font-semibold text-[var(--text-primary)] cursor-pointer">
                    {faq.question}
                  </summary>
                  <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-md surface-primary">
        <div className="container-default">
          <div className="max-w-4xl mx-auto">
            <p className="text-overline mb-3">Referințe</p>
            <ul className="grid md:grid-cols-2 gap-3">
              {page.references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--color-primary-700)] font-semibold hover:underline"
                  >
                    {reference.label}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            isMedicalPage
              ? generateMedicalWebPageSchema(
                  getAbsoluteUrl(page.path),
                  page.title,
                  page.description,
                  breadcrumbs,
                  undefined,
                  page.medicalAudience,
                )
              : generateWebPageSchema(
                  getAbsoluteUrl(page.path),
                  page.title,
                  page.description,
                  breadcrumbs,
                ),
            generateFAQSchema(page.faqs),
          ]),
        }}
      />
    </main>
  );
}
