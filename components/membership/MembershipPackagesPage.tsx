import Link from "next/link";
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
  const title = isCompany ? "Parteneri companii" : "Membri ASLM";
  const path = isCompany ? "/parteneri-companii" : "/membri";
  const description = isCompany
    ? "Compară pachetele de parteneriat pentru companii și organizații media: adresabilitate, cotizație și beneficii."
    : "Compară cele trei pachete de membru ASLM: adresabilitate, cotizație și beneficii pentru un an.";
  const actionClass = "inline-flex min-h-12 w-full items-center justify-between gap-3 rounded-lg bg-green-900 px-5 py-3 text-base font-semibold !text-white transition-colors hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900";

  return (
    <div className="pt-24 pb-20 md:pt-32">
      {!isCompany && <MembershipViewTracker />}
      <div className="container-default">
        <header className="max-w-3xl pb-10 md:pb-14">
          <p className="mb-4 text-sm font-semibold tracking-wide text-green-800">Societatea Academică de Medicina Stilului de Viață</p>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-green-950 md:text-6xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">{description}</p>
          <Link href={isCompany ? "/membri" : "/parteneri-companii"} className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-green-900 underline decoration-green-300 underline-offset-4 hover:decoration-green-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-900">
            {isCompany ? "Vezi pachetele pentru membri ASLM" : "Reprezinți o companie? Vezi pachetele de parteneriat"}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </header>

        <section id="beneficii" aria-label={`Pachete ${title}`} className="scroll-mt-28">
          <div className={styles.packages}>
            {packages.map((item) => (
              <article key={item.id} aria-labelledby={`package-${item.id}`} className={styles.package}>
                <header className={styles.heading}>
                  <p className="mb-3 text-sm font-medium text-green-800">{membershipDuration}</p>
                  <h2 id={`package-${item.id}`} className="font-heading text-2xl font-bold leading-tight text-green-950">{item.name}</h2>
                </header>
                <div className={styles.cell}>
                  <h3 className={styles.label}>Cotizație</h3>
                  <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight text-green-950">
                    {item.annualFeeRon === 0 ? "Gratuit" : <>{item.annualFeeRon.toLocaleString("ro-RO")} <span className="text-base font-medium tracking-normal">RON / an</span></>}
                  </p>
                </div>
                <div className={styles.cell}>
                  <h3 className={styles.label}>Adresabilitate</h3>
                  <p className="mt-3 leading-relaxed text-[var(--text-secondary)]">{item.audience}</p>
                </div>
                <div className={styles.cell}>
                  <h3 className={styles.label}>Beneficii</h3>
                  <ul className="mt-5 space-y-4">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3 leading-relaxed text-[var(--text-secondary)]">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-green-800" aria-hidden="true" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.action}>
                  {isCompany ? (
                    <Link href="/contact" className={actionClass} aria-label={`Contactează ASLM pentru înscriere — ${item.name}`}>
                      Contactează ASLM pentru înscriere
                      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </Link>
                  ) : (
                    <MembershipJoinLink source={`membership_category_${item.id}`} className={actionClass} aria-label={`Înscriere — ${item.name}`}>
                      Înscriere
                      <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                    </MembershipJoinLink>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <p className="mt-8 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {isCompany ? "Pentru înscrierea companiei, contactează echipa ASLM și menționează pachetul ales." : "Înscrierea și plata cotizației se fac prin formularul de pe membership.aslm.ro."}
        </p>
      </div>
      <JsonLdScript id={`membership-packages-${audience}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema(`https://www.aslm.ro${path}`, title, description, [{ name: "Acasă", path: "/" }, { name: title, path }])) }} />
    </div>
  );
}
