import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { experts, getExpertBySlug } from "@/data/experts";
import { generatePageMetadata } from "@/lib/metadata-helpers";
import { generatePersonSchema, getAbsoluteUrl } from "@/lib/structured-data";

type ExpertPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return experts.map((expert) => ({ slug: expert.slug }));
}

export async function generateMetadata({ params }: ExpertPageProps): Promise<Metadata> {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) {
    return {};
  }

  return generatePageMetadata(
    expert.name,
    `${expert.name} - ${expert.role} în cadrul ${expert.affiliation}. Profil expert ASLM pentru medicina stilului de viață.`,
    expert.profilePath,
    ["expert ASLM", expert.name, "medicina stilului de viață"],
    expert.image,
  );
}

export default async function ExpertPage({ params }: ExpertPageProps) {
  const { slug } = await params;
  const expert = getExpertBySlug(slug);
  if (!expert) {
    notFound();
  }

  return (
    <main className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <div className="max-w-4xl mx-auto grid md:grid-cols-[220px_1fr] gap-8 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10">
              {expert.image ? (
                <Image
                  src={expert.image}
                  alt={expert.name}
                  fill
                  className="object-cover object-top"
                  sizes="220px"
                />
              ) : null}
            </div>
            <div>
              <p className="text-overline text-[var(--color-primary-300)] mb-3">
                Expert ASLM
              </p>
              <h1 className="text-display text-white mb-4">{expert.name}</h1>
              <p className="text-lg font-semibold mb-3" style={{ color: "rgba(255,255,255,0.9)" }}>
                {expert.role}
              </p>
              <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
                {expert.affiliation}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-default">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-title text-[var(--text-primary)] mb-4">
              Rol în ecosistemul ASLM
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              {expert.shortBio?.ro ??
                "Acest profil susține transparența editorială și semnalele E-E-A-T ale conținutului ASLM. Datele sunt limitate la informațiile publice prezente pe site-ul ASLM și pot fi extinse când organizația aprobă biografii detaliate pentru fiecare expert."}
            </p>
            {expert.orcid && (
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                ORCID:{" "}
                <a
                  href={expert.orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-primary-700)] hover:underline"
                >
                  {expert.orcid}
                </a>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/consiliu-stiintific"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white bg-[var(--color-primary-600)]"
              >
                Consiliul Științific
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/revizie-medicala"
                className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-[var(--color-primary-200)] text-[var(--color-primary-700)]"
              >
                Proces editorial ASLM
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Script
        id="expert-person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generatePersonSchema({
              name: expert.name,
              url: getAbsoluteUrl(expert.profilePath),
              image: expert.image ? getAbsoluteUrl(expert.image) : undefined,
              jobTitle: expert.role,
              affiliation: expert.affiliation,
              sameAs: expert.orcid ? [expert.orcid] : undefined,
            }),
          ),
        }}
      />
    </main>
  );
}
