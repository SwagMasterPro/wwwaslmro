import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CompanyRequestForm from "@/components/membership/CompanyRequestForm";
import { ArrowRight, Check } from "lucide-react";
import MembershipJoinLink from "@/components/marketing/MembershipJoinLink";
import MembershipViewTracker from "@/components/membership/MembershipViewTracker";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { companyMembershipPackages, individualMembershipPackages, membershipDuration } from "@/data/membership-packages";
import { generateWebPageSchema } from "@/lib/structured-data";
import styles from "./MembershipPackagesPage.module.css";

export default function MembershipPackagesPage({ audience }: { audience: "individuals" | "companies" }) {
  const isCompany = audience === "companies";
  const packages = isCompany ? companyMembershipPackages : individualMembershipPackages;
  const title = isCompany ? "Beneficii parteneri companii" : "Beneficii membri ASLM";
  const path = isCompany ? "/parteneri-companii" : "/membri";
  const description = isCompany
    ? "Alege pachetul de parteneriat potrivit pentru compania ta. Descoperă oportunitățile de colaborare și vizibilitate oferite de ASLM."
    : "Alege pachetul de membership care ți se potrivește!";

  return (
    <div className="pt-24 pb-20 md:pt-32">
      {!isCompany && <MembershipViewTracker />}
      <div className="container-default">
        <Image
          src={`/images/membership/${isCompany ? "parteneri-aslm" : "membri-aslm"}.webp`}
          alt={`Academic Society of Lifestyle Medicine — ${isCompany ? "Parteneri ASLM Companii" : "Membri ASLM"}`}
          width={isCompany ? 2160 : 2164}
          height={isCompany ? 336 : 333}
          sizes="(max-width: 1280px) 100vw, 1280px"
          preload
          className={styles.banner}
        />
        <header className="max-w-4xl pb-8 md:pb-10">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-green-950 sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">{description}</p>
          <Link href={isCompany ? "/membri" : "/parteneri-companii"} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-green-900 underline decoration-green-300 underline-offset-4 hover:decoration-green-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900">
            {isCompany ? "Vezi pachetele pentru membri ASLM" : "Reprezinți o companie? Vezi pachetele de parteneriat"}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </header>

        <section id="beneficii" aria-label={title} className="scroll-mt-28">
          <div className={styles.packages}>
            <div className={styles.rowLabels} aria-hidden="true">
              <div className={styles.categoryLabel}>Categorie</div>
              <div className={styles.rowLabel}>Adresabilitate</div>
              <div className={styles.rowLabel}>Cotizație</div>
              <div className={styles.rowLabel}>Beneficii</div>
            </div>
            {packages.map((item) => (
              <article key={item.id} aria-labelledby={`package-${item.id}`} className={styles.package}>
                <header className={styles.heading}>
                  <h2 id={`package-${item.id}`} className={styles.packageName}>
                    {item.headingAccent ? <>Parteneri ASLM <span className={styles.headingAccent}>{item.headingAccent}</span></> : item.name}
                  </h2>
                  {item.audienceSummary && <p className={styles.audienceSummary}>{item.audienceSummary}</p>}
                </header>
                <div className={styles.cell}>
                  <h3 className={styles.label}>Adresabilitate</h3>
                  <p className={styles.audience}>{item.audience}</p>
                </div>
                <div className={`${styles.cell} ${styles.feeCell}`}>
                  <h3 className={styles.label}>Cotizație</h3>
                  <p className={styles.fee}>
                    {item.annualFeeRon === 0 ? "Gratuit" : <>{item.annualFeeRon.toLocaleString("ro-RO")} <span>RON / an</span></>}
                  </p>
                  <p className={styles.duration}>{membershipDuration}</p>
                </div>
                <div className={styles.cell}>
                  <h3 className={styles.label}>Beneficii</h3>
                  <ul className={styles.benefits}>
                    {item.benefits.map((benefit) => (
                      <li key={benefit}>
                        <Check className="mt-1 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        {isCompany ? (
          <>
            <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">Trimite solicitarea prin formularul de mai jos. ASLM te va contacta pentru verificare și, dacă este cazul, facturare.</p>
            <Suspense fallback={<p id="inscriere" className="mt-12">Se încarcă formularul. Pentru înscriere, contactează contact@aslm.ro.</p>}><CompanyRequestForm /></Suspense>
          </>
        ) : (
          <section id="inscriere" aria-labelledby="inscriere-title" className={styles.registration}>
            <h2 id="inscriere-title" className={styles.registrationTitle}>ÎNSCRIERE ÎN ASLM</h2>
            <p className={styles.registrationSubtitle}>Societatea Academică de Medicina Stilului de Viață</p>
            <div className={styles.paymentNotes}>
              <p>Calitatea de membru ASLM este activă un an de zile din momentul aderării ca membru.</p>
              <p><strong>Taxa de membru</strong> se achită conform facturii proforme primite prin e-mail după completarea formularului.</p>
              <p>Dacă achitați prin transfer bancar (OP), copia dovezii plății împreună cu datele dvs. trebuie trimisă prin email la adresa: <a href="mailto:contact@aslm.ro">contact@aslm.ro</a>.</p>
              <p>Dacă achitați cu cardul, nu este necesară trimiterea dovezii plății, aceasta este înregistrată automat.</p>
            </div>
            <MembershipJoinLink source="membership_registration" className={styles.joinLink}>
              Completează formularul de înscriere
              <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
            </MembershipJoinLink>
            <p className={styles.externalNote}>Formularul se deschide pe membership.aslm.ro într-o filă nouă.</p>
          </section>
        )}
      </div>
      <JsonLdScript id={`membership-packages-${audience}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema(`https://www.aslm.ro${path}`, title, description, [{ name: "Acasă", path: "/" }, { name: title, path }])) }} />
    </div>
  );
}
