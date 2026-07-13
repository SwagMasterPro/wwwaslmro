"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import { ArrowRight, Award, BookOpen, GraduationCap, Users } from "lucide-react";
import { activeYAslmStudents } from "@/data/y-aslm";
import {
  executiveCouncilMembers,
  honoraryPresidents,
  president,
  scientificCouncilMembers,
  sortedGeneralAssemblyMembers,
  textForLocale,
  type GovernancePerson,
} from "@/data/governance";
import { MEMBERSHIP_JOIN_URL, STATUTE_EN_URL, type Locale } from "@/lib/localized-routes";
import { generateWebPageSchema, getAbsoluteUrl } from "@/lib/structured-data";

function initials(name: string): string {
  return name
    .replace("†", "")
    .split(" ")
    .filter((part) => part.length > 2)
    .slice(0, 3)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function MemberCard({
  member,
  index,
  locale,
  showRole = false,
}: {
  member: GovernancePerson;
  index: number;
  locale: Locale;
  showRole?: boolean;
}) {
  const role = showRole ? textForLocale(member.role, locale) : undefined;
  const shortBio = member.shortBio?.[locale];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="card overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-square bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] relative overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.displayName}
            fill
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover object-top transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)]">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <span className="font-heading text-2xl font-bold text-white">{initials(member.displayName)}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 text-center bg-white">
        <h3 className="font-semibold text-[var(--text-primary)] text-lg">{member.displayName}</h3>
        {role && <p className="text-sm text-[var(--color-primary-600)] font-medium mt-1">{role}</p>}
        {member.orcid && (
          <a
            href={member.orcid}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex text-sm font-semibold text-[var(--color-primary-700)] hover:underline"
          >
            ORCID
          </a>
        )}
        {shortBio && <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{shortBio}</p>}
        {member.profilePath && (
          <Link
            href={member.profilePath}
            className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-primary-700)] hover:underline"
          >
            {locale === "ro" ? "Profil expert" : "Expert profile"}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

function Hero({
  overline,
  title,
  description,
}: {
  overline: string;
  title: string;
  description: string;
}) {
  return (
    <section className="mesh-hero section-lg">
      <div className="container-default">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-overline text-[var(--color-primary-300)] mb-3 block">{overline}</span>
          <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            {title}
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.85)" }}>
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function MembershipCta({ locale }: { locale: Locale }) {
  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "#0f2b1d" }}>
      <div className="container-default text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
            {locale === "ro" ? "Vrei să faci parte din comunitatea ASLM?" : "Want to join the ASLM community?"}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#D1D5DB" }}>
            {locale === "ro"
              ? "Devino membru ASLM și contribuie la dezvoltarea medicinei stilului de viață în România."
              : "Join ASLM and contribute to the development of lifestyle medicine in Romania."}
          </p>
          <a
            href={MEMBERSHIP_JOIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group bg-white text-[#0f2b1d] font-semibold"
          >
            {locale === "ro" ? "Înscrie-te" : "Join ASLM"}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function ScientificCouncilPageContent({ locale }: { locale: Locale }) {
  const copy = {
    ro: {
      overline: "Despre ASLM",
      title: "Consiliu Științific",
      description:
        "Consiliul Științific al ASLM reunește experți de renume din domeniul medicinei stilului de viață, care ghidează direcțiile de cercetare și asigură excelența academică a activităților societății.",
      president: "Președinte ASLM",
      honorary: "Președinți de onoare",
      members: "Membrii Consiliului Științific",
      membersDescription:
        "Echipa de profesori universitari, conferențiari și cercetători care asigură fundamentul științific al activităților ASLM în domeniul medicinei stilului de viață.",
      schemaName: "Consiliu Științific ASLM",
      schemaDescription:
        "Consiliul Științific ASLM reunește experți în medicina stilului de viață și susține direcția academică a societății.",
      breadcrumb: "Consiliu Științific",
    },
    en: {
      overline: "About ASLM",
      title: "Scientific Council",
      description:
        "The ASLM Scientific Council brings together recognized experts in lifestyle medicine who guide research priorities and support the academic quality of the society's work.",
      president: "ASLM President",
      honorary: "Honorary Presidents",
      members: "Scientific Council Members",
      membersDescription:
        "University professors, researchers and senior professionals who support the scientific foundation of ASLM activities in lifestyle medicine.",
      schemaName: "ASLM Scientific Council",
      schemaDescription:
        "The ASLM Scientific Council brings together lifestyle medicine experts and supports the academic direction of the society.",
      breadcrumb: "Scientific Council",
    },
  }[locale];

  const path = locale === "ro" ? "/consiliu-stiintific" : "/en/scientific-council";

  return (
    <div className="pt-20">
      <Hero overline={copy.overline} title={copy.title} description={copy.description} />

      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.president}</h2>
          </motion.div>
          <div className="flex justify-center">
            <div className="w-64">
              <MemberCard member={president} index={0} locale={locale} showRole />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 surface-secondary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <Award className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.honorary}</h2>
          </motion.div>
          <div className="flex flex-col items-center gap-2">
            {honoraryPresidents.map((member, index) => (
              <motion.p
                key={member.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-lg font-semibold text-[var(--text-primary)] text-center"
              >
                {member.displayName}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.members}</h2>
            <p className="text-subtitle max-w-3xl mx-auto">{copy.membersDescription}</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {scientificCouncilMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      <MembershipCta locale={locale} />

      <Script
        id={`scientific-council-structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(getAbsoluteUrl(path), copy.schemaName, copy.schemaDescription, [
              { name: locale === "ro" ? "Acasă" : "Home", path: locale === "ro" ? "/" : "/en" },
              { name: copy.breadcrumb, path },
            ]),
          ),
        }}
      />
    </div>
  );
}

export function ExecutiveCouncilPageContent({ locale }: { locale: Locale }) {
  const copy = {
    ro: {
      overline: "Despre ASLM",
      title: "Consiliu Executiv",
      description:
        "Consiliul Executiv al ASLM asigură conducerea operațională a societății, coordonând activitățile și proiectele strategice ale organizației.",
      members: "Membrii Consiliului Executiv",
      membersDescription:
        "Echipa de conducere a ASLM, responsabilă de implementarea strategiei și coordonarea activităților societății.",
      studentTeam: "Echipa Y-ASLM",
      studentTeamDescription:
        "Studenții implicați în promovarea medicinei stilului de viață și în dezvoltarea comunității ASLM.",
      studentTeamAriaLabel: "Studenții implicați în promovarea medicinei stilului de viață",
      schemaName: "Consiliu Executiv ASLM",
      schemaDescription:
        "Consiliul Executiv ASLM coordonează activitățile operaționale și proiectele strategice ale societății.",
      breadcrumb: "Consiliu Executiv",
    },
    en: {
      overline: "About ASLM",
      title: "Executive Council",
      description:
        "The ASLM Executive Council provides operational leadership for the society, coordinating activities and strategic projects.",
      members: "Executive Council Members",
      membersDescription:
        "The ASLM leadership team responsible for strategy implementation and coordination of the society's work.",
      studentTeam: "Y-ASLM Student Team",
      studentTeamDescription:
        "Students involved in promoting lifestyle medicine and developing the ASLM community.",
      studentTeamAriaLabel: "Students involved in promoting lifestyle medicine",
      schemaName: "ASLM Executive Council",
      schemaDescription:
        "The ASLM Executive Council coordinates the society's operations and strategic projects.",
      breadcrumb: "Executive Council",
    },
  }[locale];

  const path = locale === "ro" ? "/consiliu-executiv" : "/en/executive-council";

  return (
    <div className="pt-20">
      <Hero overline={copy.overline} title={copy.title} description={copy.description} />
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <Users className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.members}</h2>
            <p className="text-subtitle max-w-3xl mx-auto">{copy.membersDescription}</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {executiveCouncilMembers.map((member, index) => (
              <MemberCard key={member.id} member={member} index={index} locale={locale} showRole />
            ))}
          </div>
        </div>
      </section>
      <section className="section-lg surface-secondary" aria-labelledby={`y-aslm-team-${locale}`}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 id={`y-aslm-team-${locale}`} className="text-headline text-[var(--text-primary)] mb-4">
              {copy.studentTeam}
            </h2>
            <p className="text-subtitle max-w-3xl mx-auto">{copy.studentTeamDescription}</p>
          </motion.div>
          <ul
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
            aria-label={copy.studentTeamAriaLabel}
          >
            {activeYAslmStudents.map((student, index) => (
              <motion.li
                key={student}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.24) }}
                className="card-elevated px-5 py-4 text-body text-[var(--text-primary)]"
              >
                {student}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
      <MembershipCta locale={locale} />
      <Script
        id={`executive-council-structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(getAbsoluteUrl(path), copy.schemaName, copy.schemaDescription, [
              { name: locale === "ro" ? "Acasă" : "Home", path: locale === "ro" ? "/" : "/en" },
              { name: copy.breadcrumb, path },
            ]),
          ),
        }}
      />
    </div>
  );
}

export function GeneralAssemblyPageContent({ locale }: { locale: Locale }) {
  const copy = {
    ro: {
      overline: "Membri ASLM",
      title: "Adunarea Generală",
      description:
        "Lista publică actualizată a membrilor Adunării Generale ASLM, afișată alfabetic după nume.",
      heading: "Lista membrilor",
      emptyTitle: "Lista este în curs de actualizare",
      emptyBody:
        "Pentru publicare este necesar rosterul aprobat de client, cu minimum nume și oraș pentru fiecare membru. Nu publicăm nume sau orașe neconfirmate.",
      requirementsTitle: "Formatul datelor necesare",
      requirements:
        "Public: nume și oraș, afișate alfabetic. Pentru profiluri extinse, ASLM poate solicita separat fotografie, ORCID și scurtă biografie.",
      number: "Nr.",
      name: "Nume",
      city: "Localitate / județ, țară",
      schemaName: "Adunarea Generală ASLM",
      schemaDescription: "Lista actualizată a membrilor Adunării Generale ASLM, afișată alfabetic după nume.",
      breadcrumb: "Adunarea Generală",
    },
    en: {
      overline: "ASLM Members",
      title: "General Assembly",
      description:
        "The updated public list of ASLM General Assembly members, shown alphabetically by name.",
      heading: "Member list",
      emptyTitle: "The list is being updated",
      emptyBody:
        "Publication requires the approved client roster with at least name and city for each member. Unconfirmed names or cities will not be published.",
      requirementsTitle: "Required data format",
      requirements:
        "Public list: name and city, sorted alphabetically. For extended profiles, ASLM may separately request a photo, ORCID and short bio.",
      number: "No.",
      name: "Name",
      city: "City / county, country",
      schemaName: "ASLM General Assembly",
      schemaDescription: "The updated ASLM General Assembly member list, shown alphabetically by name.",
      breadcrumb: "General Assembly",
    },
  }[locale];

  const path = locale === "ro" ? "/adunarea-generala" : "/en/general-assembly";

  return (
    <div className="pt-20">
      <Hero overline={copy.overline} title={copy.title} description={copy.description} />
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <Users className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.heading}</h2>
          </motion.div>

          {sortedGeneralAssemblyMembers.length > 0 ? (
            <div className="overflow-x-auto card-elevated">
              <table className="w-full min-w-[620px]">
                <thead>
                  <tr className="border-b border-[var(--border-primary)]">
                    <th className="w-20 text-left py-4 px-5 font-semibold text-[var(--text-primary)]">{copy.number}</th>
                    <th className="text-left py-4 px-5 font-semibold text-[var(--text-primary)]">{copy.name}</th>
                    <th className="text-left py-4 px-5 font-semibold text-[var(--text-primary)]">{copy.city}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedGeneralAssemblyMembers.map((member, index) => (
                    <tr key={`${member.displayName}-${member.city}`} className="border-b border-[var(--border-primary)] last:border-0">
                      <td className="w-20 py-4 px-5 text-[var(--text-primary)] tabular-nums">{index + 1}</td>
                      <td className="py-4 px-5 text-[var(--text-primary)] font-medium">{member.displayName}</td>
                      <td className="py-4 px-5 text-[var(--text-primary)]">{member.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="card-elevated p-8">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{copy.emptyTitle}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{copy.emptyBody}</p>
              </div>
              <div className="card-elevated p-8">
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{copy.requirementsTitle}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{copy.requirements}</p>
              </div>
            </div>
          )}
        </div>
      </section>
      <Script
        id={`general-assembly-structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(getAbsoluteUrl(path), copy.schemaName, copy.schemaDescription, [
              { name: locale === "ro" ? "Acasă" : "Home", path: locale === "ro" ? "/" : "/en" },
              { name: copy.breadcrumb, path },
            ]),
          ),
        }}
      />
    </div>
  );
}

export function EnglishIndexPageContent() {
  const cards = [
    {
      href: "/en/membership",
      title: "Membership",
      description: "Explore ASLM membership categories, benefits and the joining process.",
      icon: Users,
    },
    {
      href: "/en/scientific-council",
      title: "Scientific Council",
      description: "Meet the experts supporting ASLM's scientific and academic direction.",
      icon: GraduationCap,
    },
    {
      href: "/en/executive-council",
      title: "Executive Council",
      description: "See the leadership team coordinating ASLM operations and strategic projects.",
      icon: BookOpen,
    },
    {
      href: "/en/general-assembly",
      title: "General Assembly",
      description: "Public member roster structure for the ASLM General Assembly.",
      icon: Award,
    },
  ];

  return (
    <div className="pt-20">
      <Hero
        overline="ASLM in English"
        title="Academic Society of Lifestyle Medicine"
        description="English entry point for ASLM membership and governance information."
      />
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="card p-6"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{card.title}</h2>
                <p className="text-body-sm mb-5">{card.description}</p>
                <Link href={card.href} className="inline-flex items-center gap-2 font-semibold text-[var(--color-primary-700)]">
                  Open page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-lg surface-tertiary">
        <div className="container-default text-center">
          <p className="text-overline mb-3">Document</p>
          <h2 className="text-headline text-[var(--text-primary)] mb-4">ASLM Statute</h2>
          <p className="text-body max-w-2xl mx-auto mb-8">
            Read the English extracts from the ASLM Statute, including the society&apos;s organization, membership and governance provisions.
          </p>
          <a
            href={STATUTE_EN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-xl bg-[var(--color-primary-700)] px-5 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-800)]"
          >
            Open the ASLM Statute (extracts)
          </a>
        </div>
      </section>
    </div>
  );
}
