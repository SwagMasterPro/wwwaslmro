"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  Crown,
  Globe,
  GraduationCap,
  Heart,
  Mail,
  Sparkles,
  Star,
  Stethoscope,
  Users,
} from "lucide-react";
import FAQSection from "@/components/seo/FAQSection";
import { MEMBERSHIP_JOIN_URL, type Locale } from "@/lib/localized-routes";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/structured-data";

type Localized = Record<Locale, string>;

type MembershipCategory = {
  id: string;
  icon: typeof Stethoscope;
  name: Localized;
  tagline: Localized;
  price: Localized;
  period: Localized;
  audience: Localized;
  features: Record<Locale, string[]>;
  note: Localized;
  highlighted?: boolean;
  color: "primary" | "accent" | "neutral" | "gold";
};

const benefits = [
  {
    icon: GraduationCap,
    title: { ro: "Educație Continuă", en: "Continuing Education" },
    description: {
      ro: "Acces la cursuri online, webinarii și materiale educaționale de specialitate în medicina stilului de viață.",
      en: "Access to online courses, webinars and specialist educational resources in lifestyle medicine.",
    },
  },
  {
    icon: Users,
    title: { ro: "Comunitate Profesională", en: "Professional Community" },
    description: {
      ro: "Networking cu specialiști din domeniul medicinei stilului de viață din România și internațional.",
      en: "Networking with lifestyle medicine professionals from Romania and abroad.",
    },
  },
  {
    icon: BookOpen,
    title: { ro: "Publicații & Resurse", en: "Publications & Resources" },
    description: {
      ro: "Acces la revista Lifestyle Medicine Romania Review (LMRR) și resurse științifice actualizate.",
      en: "Access to Lifestyle Medicine Romania Review (LMRR) and updated scientific resources.",
    },
  },
  {
    icon: Award,
    title: { ro: "Recunoaștere profesională", en: "Professional Recognition" },
    description: {
      ro: "Oportunități de perfecționare și specializare în medicina stilului de viață și credite EMC pentru evenimente.",
      en: "Professional development opportunities in lifestyle medicine and CME/EMC credits for eligible events.",
    },
  },
  {
    icon: Calendar,
    title: { ro: "Evenimente Exclusive", en: "Dedicated Events" },
    description: {
      ro: "Tarife preferențiale și acces prioritar la congrese, conferințe și workshop-uri organizate de ASLM.",
      en: "Preferential rates and priority access to ASLM congresses, conferences and workshops.",
    },
  },
  {
    icon: Globe,
    title: { ro: "Impact profesional și social", en: "Professional and Social Impact" },
    description: {
      ro: "Posibilitatea de a contribui activ la inițiative și programe naționale care promovează medicina stilului de viață și prevenția bolilor cronice.",
      en: "Opportunities to contribute to national initiatives promoting lifestyle medicine and chronic disease prevention.",
    },
  },
];

const categories: MembershipCategory[] = [
  {
    id: "afiliati",
    icon: Stethoscope,
    name: { ro: "Membri Afiliați", en: "Affiliate Members" },
    tagline: { ro: "Pentru profesioniștii din sănătate", en: "For healthcare professionals" },
    price: { ro: "400", en: "400" },
    period: { ro: "RON / an", en: "RON / year" },
    audience: {
      ro: "Categorie adresată profesioniștilor din domeniul sănătății (medici, farmaciști, nutriționiști & dieteticieni, psihologi, biologi, biochimiști, instructori fitness, etc).",
      en: "For healthcare professionals such as physicians, pharmacists, nutritionists and dietitians, psychologists, biologists, biochemists and fitness instructors.",
    },
    features: {
      ro: ["Acces la resurse educaționale", "Participare la evenimente ASLM", "Acces la revista LMRR", "Certificat de membru", "Reduceri la congrese", "Drept de a fi ales la propunerea CD"],
      en: ["Educational resources", "Participation in ASLM events", "Access to LMRR", "Membership certificate", "Congress discounts", "Eligibility for nomination by the council"],
    },
    note: {
      ro: "Membrii afiliați nu sunt îndreptățiți să voteze în AGA în primii 2 ani. După 2 ani de activitate, pot deveni membri titulari.",
      en: "Affiliate members do not vote in the General Assembly during the first 2 years. After 2 years of activity, they may become full members.",
    },
    highlighted: true,
    color: "primary",
  },
  {
    id: "titulari",
    icon: BadgeCheck,
    name: { ro: "Membri Titulari", en: "Full Members" },
    tagline: { ro: "Pentru membri cu vechime", en: "For experienced members" },
    price: { ro: "400", en: "400" },
    period: { ro: "RON / an", en: "RON / year" },
    audience: {
      ro: "Categorie adresată membrilor afiliați cu o vechime de cel puțin 2 ani în ASLM și care au contribuit la promovarea societății.",
      en: "For affiliate members with at least 2 years in ASLM who have contributed to promoting the society.",
    },
    features: {
      ro: ["Toate beneficiile membrilor afiliați", "Drept de vot în AGA", "Drept de a fi ales în toate structurile ASLM", "Participare la luarea deciziilor strategice", "Acces la resurse premium", "Prioritate la evenimente"],
      en: ["All affiliate member benefits", "Voting rights in the General Assembly", "Eligibility for all ASLM structures", "Participation in strategic decisions", "Premium resources", "Event priority"],
    },
    note: {
      ro: "Membrii titulari au dreptul de a vota și de a fi aleși în AGA, în toate structurile ASLM.",
      en: "Full members may vote and be elected within the General Assembly and ASLM structures.",
    },
    highlighted: true,
    color: "primary",
  },
  {
    id: "asociati-pf",
    icon: Heart,
    name: { ro: "Membri Asociați PF", en: "Associate Members - Individuals" },
    tagline: { ro: "Pentru persoane fizice pasionate", en: "For interested individuals" },
    price: { ro: "300", en: "300" },
    period: { ro: "RON / an", en: "RON / year" },
    audience: {
      ro: "Categorie adresată persoanelor fizice (public larg), pasionate de principiile Medicinei Stilului de Viață (MSV).",
      en: "For individuals interested in the principles of lifestyle medicine.",
    },
    features: {
      ro: ["Acces la resurse educaționale de bază", "Participare la evenimente", "Acces la revista LMRR", "Certificat de membru", "Drept de a fi ales în Departamente ASLM"],
      en: ["Basic educational resources", "Participation in events", "Access to LMRR", "Membership certificate", "Eligibility for ASLM departments"],
    },
    note: {
      ro: "Membrii asociați PF nu sunt îndreptățiți să voteze în AGA.",
      en: "Individual associate members do not vote in the General Assembly.",
    },
    color: "accent",
  },
  {
    id: "asociati-pj",
    icon: Building2,
    name: { ro: "Membri Asociați PJ", en: "Associate Members - Organizations" },
    tagline: { ro: "Pentru companii și organizații", en: "For companies and organizations" },
    price: { ro: "Contact", en: "Contact" },
    period: { ro: "", en: "" },
    audience: {
      ro: "Categorie adresată persoanelor juridice, firme care prin activitatea lor curentă sau prin diferite proiecte și programe susțin promovarea unui stil de viață sănătos.",
      en: "For legal entities and organizations that support healthy lifestyle promotion through their activity, projects or CSR programs.",
    },
    features: {
      ro: ["Parteneriat strategic cu ASLM", "Vizibilitate în evenimentele ASLM", "Acces la rețeaua de membri profesioniști", "Oportunități de sponsorizare", "Rapoarte anuale de activitate", "Logo pe materialele ASLM"],
      en: ["Strategic partnership with ASLM", "Visibility at ASLM events", "Professional member network access", "Sponsorship opportunities", "Annual activity reports", "Logo on ASLM materials"],
    },
    note: {
      ro: "Cotizația se stabilește în funcție de mărimea companiei: mici, mijlocii sau mari.",
      en: "The annual fee is set according to organization size.",
    },
    color: "neutral",
  },
  {
    id: "onoare",
    icon: Crown,
    name: { ro: "Membri de Onoare", en: "Honorary Members" },
    tagline: { ro: "Lideri de opinie în medicină", en: "Recognized medical opinion leaders" },
    price: { ro: "Scutit", en: "Exempt" },
    period: { ro: "de cotizație", en: "from annual fee" },
    audience: {
      ro: "Categorie dedicată liderilor de opinie din sfera medicală, personalități cu contribuții științifice semnificative în comunitatea medicală.",
      en: "For medical opinion leaders and personalities with significant scientific contributions to the medical community.",
    },
    features: {
      ro: ["Toate beneficiile membrilor titulari", "Drept de vot și de a fi ales în AGA", "Recunoaștere oficială ASLM", "Invitații speciale la evenimente", "Menționare pe site-ul oficial", "Scutit de cotizație anuală"],
      en: ["All full member benefits", "Voting and eligibility rights", "Official ASLM recognition", "Special event invitations", "Mention on the official site", "Exempt from annual fee"],
    },
    note: {
      ro: "Acordat prin invitație exclusivă din partea Consiliului Executiv.",
      en: "Granted by invitation from the Executive Council.",
    },
    color: "gold",
  },
];

const faqs = {
  ro: [
    {
      question: "Care sunt categoriile de membri ASLM?",
      answer: "ASLM oferă 5 categorii de membri: <strong>Membri Afiliați</strong>, <strong>Membri Asociați PF</strong>, <strong>Membri Asociați PJ</strong>, <strong>Membri Titulari</strong> și <strong>Membri de Onoare</strong>.",
    },
    {
      question: "Ce documente sunt necesare pentru înscriere?",
      answer: "Înscrierea se face prin formularul online. În funcție de categorie, ASLM poate solicita date profesionale, oraș, fotografie, ORCID și o scurtă biografie pentru profilurile care urmează să fie publicate.",
    },
    {
      question: "Primesc certificat de membru ASLM?",
      answer: "Da, membrii ASLM primesc certificat oficial de membru, conform categoriei aprobate.",
    },
    {
      question: "Cum se publică lista membrilor Adunării Generale?",
      answer: "Lista publică va afișa doar numele și orașul, în ordine alfabetică, după ce ASLM aprobă rosterul final.",
    },
  ],
  en: [
    {
      question: "What membership categories does ASLM offer?",
      answer: "ASLM offers 5 categories: <strong>Affiliate Members</strong>, <strong>Associate Members - Individuals</strong>, <strong>Associate Members - Organizations</strong>, <strong>Full Members</strong> and <strong>Honorary Members</strong>.",
    },
    {
      question: "What information is needed for joining?",
      answer: "Joining is handled through the online form. Depending on the category, ASLM may request professional details, city, photo, ORCID and a short bio for profiles that will be published.",
    },
    {
      question: "Do members receive an ASLM certificate?",
      answer: "Yes. ASLM members receive an official membership certificate according to their approved category.",
    },
    {
      question: "How is the General Assembly member list published?",
      answer: "The public list will show only name and city, sorted alphabetically, after ASLM approves the final roster.",
    },
  ],
};

function CategoryButton({ label }: { label: string }) {
  return (
    <a
      href={MEMBERSHIP_JOIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-800)]"
    >
      {label}
    </a>
  );
}

function CategoryCard({
  category,
  locale,
  index,
  compact = false,
}: {
  category: MembershipCategory;
  locale: Locale;
  index: number;
  compact?: boolean;
}) {
  const Icon = category.icon;
  const isGold = category.color === "gold";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`${compact ? "card p-6" : "card-elevated p-8"} relative ${category.highlighted ? "ring-2 ring-[var(--color-primary-500)]" : ""}`}
    >
      {category.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary-600)] text-white">
            <Star className="w-3 h-3" />
            {category.id === "afiliati" ? (locale === "ro" ? "Recomandat" : "Recommended") : locale === "ro" ? "Drepturi de vot" : "Voting rights"}
          </span>
        </div>
      )}
      <div className="flex items-start gap-4 mb-6">
        <div
          className={`${compact ? "w-12 h-12 rounded-xl" : "w-14 h-14 rounded-2xl"} flex items-center justify-center flex-shrink-0`}
          style={{
            backgroundColor: isGold ? "#FEF3C7" : category.color === "accent" ? "var(--color-accent-100)" : "var(--color-primary-100)",
          }}
        >
          <Icon
            className={`${compact ? "w-6 h-6" : "w-7 h-7"}`}
            style={{ color: isGold ? "#B45309" : category.color === "accent" ? "var(--color-accent-600)" : "var(--color-primary-600)" }}
          />
        </div>
        <div>
          <h3 className={`${compact ? "text-lg" : "text-xl"} font-semibold text-[var(--text-primary)]`}>{category.name[locale]}</h3>
          <p className="text-sm text-[var(--color-primary-600)] font-medium">{category.tagline[locale]}</p>
        </div>
      </div>
      <p className="text-body-sm mb-4">{category.audience[locale]}</p>
      <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[var(--border-primary)]">
        <span className={`${compact ? "text-2xl" : "text-4xl"} font-bold text-[var(--color-primary-700)]`}>{category.price[locale]}</span>
        {category.period[locale] && <span className="text-[var(--text-tertiary)]">{category.period[locale]}</span>}
      </div>
      <ul className="space-y-3 mb-6">
        {category.features[locale].slice(0, compact ? 4 : 6).map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
            <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <p className="text-xs text-[var(--text-tertiary)] italic mb-6 p-3 rounded-lg bg-[var(--surface-tertiary)]">
        {category.note[locale]}
      </p>
      {category.id === "asociati-pj" ? (
        <Link
          href="/contact"
          className="block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all bg-[var(--color-primary-100)] text-[var(--color-primary-800)] hover:bg-[var(--color-primary-200)]"
        >
          {locale === "ro" ? "Contactează-ne" : "Contact us"}
        </Link>
      ) : (
        <CategoryButton label={locale === "ro" ? "Solicită înscriere" : "Apply to join"} />
      )}
    </motion.div>
  );
}

export default function MembershipPageContent({ locale }: { locale: Locale }) {
  const copy = {
    ro: {
      overline: "Alătură-te comunității",
      title: "Devino Membru ASLM",
      description: "Fii parte din comunitatea de profesioniști și pasionați care transformă medicina românească prin abordarea stilului de viață.",
      benefitsOverline: "Avantaje",
      benefitsTitle: "Beneficiile Membrilor ASLM",
      benefitsSubtitle: "Indiferent de categoria de membru, vei avea acces la resurse valoroase pentru dezvoltarea ta.",
      categoriesOverline: "Categorii de Membri",
      categoriesTitle: "Alege tipul de membru potrivit pentru tine",
      categoriesSubtitle: "ASLM oferă 5 categorii de membri, adaptate diferitelor profiluri și nevoi.",
      dataTitle: "Date utile pentru profilurile publice",
      dataBody: "Pentru actualizarea listelor și profilurilor, ASLM poate solicita fotografie, ORCID și o scurtă biografie. Lista Adunării Generale va afișa public doar nume și oraș, alfabetic.",
      rightsOverline: "Structură",
      rightsTitle: "Drepturi per categorie",
      processOverline: "Proces",
      processTitle: "Cum devii membru?",
      faqTitle: "Întrebări Frecvente despre Calitatea de Membru",
      faqSubtitle: "Răspunsuri la cele mai comune întrebări despre înscrierea și beneficiile membrilor ASLM.",
      finalTitle: "Pregătit să faci diferența?",
      finalBody: "Completează formularul de înscriere și devino parte din comunitatea ASLM.",
      join: "Înscrie-te",
      path: "/membri",
      schemaName: "Devino Membru ASLM",
      schemaDescription: "Descoperă categoriile de membri ASLM, beneficiile și procesul de înscriere.",
    },
    en: {
      overline: "Join the community",
      title: "Become an ASLM Member",
      description: "Be part of the professional community supporting lifestyle medicine in Romania.",
      benefitsOverline: "Benefits",
      benefitsTitle: "ASLM Member Benefits",
      benefitsSubtitle: "Every membership category gives access to resources that support professional development.",
      categoriesOverline: "Membership Categories",
      categoriesTitle: "Choose the right membership type",
      categoriesSubtitle: "ASLM offers 5 membership categories adapted to different profiles and needs.",
      dataTitle: "Useful data for public profiles",
      dataBody: "For list and profile updates, ASLM may request a photo, ORCID and a short bio. The General Assembly list will publicly show only name and city, sorted alphabetically.",
      rightsOverline: "Structure",
      rightsTitle: "Rights by category",
      processOverline: "Process",
      processTitle: "How to become a member",
      faqTitle: "Membership FAQ",
      faqSubtitle: "Answers to common questions about joining ASLM and member benefits.",
      finalTitle: "Ready to contribute?",
      finalBody: "Complete the membership form and become part of the ASLM community.",
      join: "Join ASLM",
      path: "/en/membership",
      schemaName: "Become an ASLM Member",
      schemaDescription: "Explore ASLM membership categories, benefits and the joining process.",
    },
  }[locale];

  const mainCategories = categories.filter((category) => category.id === "afiliati" || category.id === "titulari");
  const secondaryCategories = categories.filter((category) => !mainCategories.includes(category));
  const currentFaqs = faqs[locale];
  const process = locale === "ro"
    ? [
        ["1", "Alege categoria", "Selectează tipul de membru potrivit profilului tău."],
        ["2", "Completează formularul", "Trimite datele prin formularul online de înscriere."],
        ["3", "Achită cotizația", "Efectuează plata cotizației anuale conform categoriei."],
        ["4", "Bine ai venit!", "Primești confirmarea și accesul la beneficiile ASLM."],
      ]
    : [
        ["1", "Choose category", "Select the membership type that fits your profile."],
        ["2", "Complete the form", "Submit your details through the online membership form."],
        ["3", "Pay the fee", "Pay the annual fee for your approved category."],
        ["4", "Welcome", "Receive confirmation and access to ASLM benefits."],
      ];

  return (
    <div className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
            <span className="text-overline text-[var(--color-primary-300)] mb-3 block">{copy.overline}</span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              {copy.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "rgba(255, 255, 255, 0.85)" }}>{copy.description}</p>
          </motion.div>
        </div>
      </section>

      <section id="beneficii" className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <p className="text-overline mb-3">{copy.benefitsOverline}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.benefitsTitle}</h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto">{copy.benefitsSubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div key={benefit.title[locale]} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="card p-6 group hover:border-[var(--color-primary-300)] transition-colors">
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center group-hover:bg-[var(--color-primary-600)] transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">{benefit.title[locale]}</h3>
                <p className="text-body-sm">{benefit.description[locale]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="categorii" className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <p className="text-overline mb-3">{copy.categoriesOverline}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.categoriesTitle}</h2>
            <p className="text-subtitle max-w-2xl mx-auto">{copy.categoriesSubtitle}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {mainCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} locale={locale} index={index} />
            ))}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {secondaryCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} locale={locale} index={index} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-default">
          <div className="card-elevated p-8 md:p-10 text-center max-w-3xl mx-auto">
            <Sparkles className="w-9 h-9 mx-auto mb-4 text-[var(--color-primary-600)]" />
            <h2 className="text-title text-[var(--text-primary)] mb-4">{copy.dataTitle}</h2>
            <p className="text-body mb-6">{copy.dataBody}</p>
            <a
              href={MEMBERSHIP_JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group bg-[var(--color-primary-600)] text-white font-semibold hover:bg-[var(--color-primary-700)]"
            >
              {copy.join}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <p className="text-overline mb-3">{copy.rightsOverline}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.rightsTitle}</h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-[var(--border-primary)]">
                  {(locale === "ro"
                    ? ["Drept", "Afiliați", "Asociați PF", "Asociați PJ", "Titulari", "De Onoare"]
                    : ["Right", "Affiliate", "Associate IND", "Associate ORG", "Full", "Honorary"]
                  ).map((heading) => (
                    <th key={heading} className="text-left first:text-left text-center py-4 px-4 font-semibold text-[var(--text-primary)] text-sm">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(locale === "ro"
                  ? [
                      ["Acces resurse educaționale", true, true, true, true, true],
                      ["Participare evenimente", true, true, true, true, true],
                      ["Acces revista LMRR", true, true, true, true, true],
                      ["Certificat de membru", true, true, true, true, true],
                      ["Drept de vot în AGA", "După 2 ani", "-", "-", true, true],
                      ["Cotizație anuală", "400 RON", "300 RON", "Contact", "400 RON", "Scutit"],
                    ]
                  : [
                      ["Educational resources", true, true, true, true, true],
                      ["Event participation", true, true, true, true, true],
                      ["LMRR access", true, true, true, true, true],
                      ["Membership certificate", true, true, true, true, true],
                      ["General Assembly vote", "After 2 years", "-", "-", true, true],
                      ["Annual fee", "400 RON", "300 RON", "Contact", "400 RON", "Exempt"],
                    ]
                ).map((row) => (
                  <tr key={String(row[0])} className="border-b border-[var(--border-primary)]">
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">{row[0]}</td>
                    {row.slice(1).map((value, index) => (
                      <td key={index} className="py-3 px-2 text-center">
                        {value === true ? (
                          <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mx-auto" />
                        ) : value === "-" ? (
                          <span className="text-[var(--text-tertiary)]">-</span>
                        ) : (
                          <span className="text-xs text-[var(--text-secondary)]">{value}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="section-lg surface-secondary">
        <div className="container-default">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <p className="text-overline mb-3">{copy.processOverline}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">{copy.processTitle}</h2>
          </motion.div>
          <div className="grid md:grid-cols-4 gap-6">
            {process.map(([step, title, description], index) => (
              <motion.div key={step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.08 }} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{step}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-body-sm">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title={copy.faqTitle} subtitle={copy.faqSubtitle} faqs={currentFaqs} />

      <section className="py-20 md:py-24" style={{ backgroundColor: "#0f2b1d" }}>
        <div className="container-default text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6" style={{ color: "#FFFFFF" }}>{copy.finalTitle}</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ color: "#D1D5DB" }}>{copy.finalBody}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href={MEMBERSHIP_JOIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group bg-white text-[#0f2b1d] font-semibold">
                {copy.join}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="mailto:contact@aslm.ro" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:bg-white/10" style={{ backgroundColor: "transparent", color: "#FFFFFF", fontWeight: 600, border: "2px solid #FFFFFF" }}>
                <Mail className="w-5 h-5" />
                contact@aslm.ro
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Script
        id={`membership-structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateFAQSchema(currentFaqs),
            generateWebPageSchema(`https://www.aslm.ro${copy.path}`, copy.schemaName, copy.schemaDescription, [
              { name: locale === "ro" ? "Acasă" : "Home", path: locale === "ro" ? "/" : "/en" },
              { name: locale === "ro" ? "Membri" : "Membership", path: copy.path },
            ]),
          ]),
        }}
      />
    </div>
  );
}
