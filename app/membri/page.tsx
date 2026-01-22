"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import {
  ArrowRight,
  Users,
  BookOpen,
  Award,
  GraduationCap,
  Calendar,
  Globe,
  CheckCircle,
  Star,
  Sparkles,
  Stethoscope,
  Heart,
  Building2,
  Crown,
  UserCheck,
  BadgeCheck,
  Mail
} from "lucide-react";

/**
 * Members Page - ASLM NGO Website
 * Updated with 5 membership categories:
 * - Membri afiliați
 * - Membri asociați PF
 * - Membri asociați PJ
 * - Membri titulari
 * - Membri de onoare
 */

const membershipBenefits = [
  {
    icon: GraduationCap,
    title: "Educație Continuă",
    description: "Acces la cursuri online, webinarii și materiale educaționale de specialitate în medicina stilului de viață.",
  },
  {
    icon: Users,
    title: "Comunitate Profesională",
    description: "Networking cu specialiști din domeniul medicinii stilului de viață din România și internațional.",
  },
  {
    icon: BookOpen,
    title: "Publicații & Resurse",
    description: "Acces la revista Lifestyle Medicine Romania Review (LMRR) și resurse științifice actualizate.",
  },
  {
    icon: Award,
    title: "Certificări",
    description: "Oportunități de certificare în medicina stilului de viață și credite EMC pentru evenimente.",
  },
  {
    icon: Calendar,
    title: "Evenimente Exclusive",
    description: "Tarife preferențiale și acces prioritar la congrese, conferințe și workshop-uri organizate de ASLM.",
  },
  {
    icon: Globe,
    title: "Reprezentare",
    description: "Fii parte din vocea comunității medicale care promovează medicina stilului de viață în România.",
  },
];

const membershipCategories = [
  {
    id: "afiliati",
    icon: Stethoscope,
    name: "Membri Afiliați",
    tagline: "Pentru profesioniștii din sănătate",
    price: "400",
    period: "RON / an",
    audience: "Categorie adresată profesioniștilor din domeniul sănătății (medici, farmaciști, nutriționiști & dieteticieni, psihologi, biologi, biochimiști, instructori fitness, etc).",
    requirements: "Calitatea de membru afiliat se dobândește prin completarea formularului online de adeziune și achitarea taxei.",
    features: [
      "Acces la resurse educaționale",
      "Participare la evenimente ASLM",
      "Acces la revista LMRR",
      "Certificat de membru",
      "Reduceri la congrese",
      "Drept de a fi ales la propunerea CD"
    ],
    note: "Membrii afiliați nu sunt îndreptățiți să voteze în AGA în primii 2 ani. După 2 ani de activitate, pot deveni membri titulari.",
    highlighted: true,
    color: "primary"
  },
  {
    id: "asociati-pf",
    icon: Heart,
    name: "Membri Asociați PF",
    tagline: "Pentru persoane fizice pasionate",
    price: "200",
    period: "RON / an",
    audience: "Categorie adresată persoanelor fizice (public larg), pasionate de principiile Medicinei Stilului de Viață (MSV).",
    requirements: "Calitatea de membru asociat PF se dobândește prin completarea formularului online de adeziune și achitarea taxei.",
    features: [
      "Acces la resurse educaționale de bază",
      "Participare la evenimente",
      "Acces la revista LMRR",
      "Certificat de membru",
      "Drept de a fi ales în Departamente ASLM"
    ],
    note: "Membrii asociați PF nu sunt îndreptățiți să voteze în AGA.",
    highlighted: false,
    color: "accent"
  },
  {
    id: "asociati-pj",
    icon: Building2,
    name: "Membri Asociați PJ",
    tagline: "Pentru companii și organizații",
    price: "Contact",
    period: "",
    audience: "Categorie adresată persoanelor juridice, firme care prin activitatea lor curentă sau prin diferite proiecte și programe (inclusiv CSR), susțin promovarea unui stil de viață sănătos.",
    requirements: "Calitatea de membru asociat PJ se dobândește prin completarea formularului online de adeziune și achitarea taxei.",
    features: [
      "Parteneriat strategic cu ASLM",
      "Vizibilitate în evenimentele ASLM",
      "Acces la rețeaua de membri profesioniști",
      "Oportunități de sponsorizare",
      "Rapoarte anuale de activitate",
      "Logo pe materialele ASLM"
    ],
    note: "Cotizația se stabilește în funcție de mărimea companiei: mici (CA < 1 mil €), mijlocii (CA 1-5 mil €), mari (CA > 5 mil €).",
    highlighted: false,
    color: "neutral"
  },
  {
    id: "titulari",
    icon: BadgeCheck,
    name: "Membri Titulari",
    tagline: "Pentru membri cu vechime",
    price: "400",
    period: "RON / an",
    audience: "Categorie adresată membrilor afiliați cu o vechime de cel puțin 2 ani în ASLM și care au contribuit la promovarea societății.",
    requirements: "Calitatea de membru titular se dobândește automat după 2 ani de activitate ca membru afiliat.",
    features: [
      "Toate beneficiile membrilor afiliați",
      "Drept de vot în AGA",
      "Drept de a fi ales în toate structurile ASLM",
      "Participare la luarea deciziilor strategice",
      "Acces la resurse premium",
      "Prioritate la evenimente"
    ],
    note: "Membrii titulari au drepturi depline în AGA și pot fi aleși în orice structură ASLM.",
    highlighted: true,
    color: "primary"
  },
  {
    id: "onoare",
    icon: Crown,
    name: "Membri de Onoare",
    tagline: "Lideri de opinie în medicină",
    price: "Scutit",
    period: "de cotizație",
    audience: "Categorie dedicată liderilor de opinie din sfera medicală, personalități cu contribuții științifice semnificative în comunitatea medicală.",
    requirements: "Calitatea de membru de onoare se dobândește prin primirea invitației din partea Consiliului Director (CD).",
    features: [
      "Toate beneficiile membrilor titulari",
      "Drept de vot și de a fi ales în AGA",
      "Recunoaștere oficială ASLM",
      "Invitații speciale la evenimente",
      "Menționare pe site-ul oficial",
      "Scutit de cotizație anuală"
    ],
    note: "Acordat prin invitație exclusivă din partea Consiliului Director.",
    highlighted: false,
    color: "gold"
  }
];

export default function MembriiPage() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-overline text-[var(--color-primary-300)] mb-3 block">
              Alătură-te comunității
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Devino Membru ASLM
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Fii parte din comunitatea de profesioniști și pasionați care transformă 
              medicina românească prin abordarea stilului de viață.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Avantaje</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Beneficiile Membrilor ASLM
            </h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto">
              Indiferent de categoria de membru, vei avea acces la resurse valoroase pentru dezvoltarea ta
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membershipBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 group hover:border-[var(--color-primary-300)] transition-colors"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center group-hover:bg-[var(--color-primary-600)] transition-colors duration-300">
                  <benefit.icon className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
                  {benefit.title}
                </h3>
                <p className="text-body-sm">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Categories */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Categorii de Membri</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Alege tipul de membru potrivit pentru tine
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              ASLM oferă 5 categorii de membri, adaptate diferitelor profiluri și nevoi
            </p>
          </motion.div>

          {/* Main Categories - Afiliați & Titulari */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {membershipCategories.filter(c => c.id === 'afiliati' || c.id === 'titulari').map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated p-8 relative ring-2 ring-[var(--color-primary-500)]"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary-600)] text-white">
                    <Star className="w-3 h-3" />
                    {category.id === 'afiliati' ? 'Recomandat' : 'Drepturi depline'}
                  </span>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[var(--color-primary-600)] font-medium">
                      {category.tagline}
                    </p>
                  </div>
                </div>
                
                <p className="text-body-sm mb-4">{category.audience}</p>
                
                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-[var(--border-primary)]">
                  <span className="text-4xl font-bold text-[var(--color-primary-700)]">{category.price}</span>
                  <span className="text-[var(--text-tertiary)]">{category.period}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {category.note && (
                  <p className="text-xs text-[var(--text-tertiary)] italic mb-6 p-3 rounded-lg bg-[var(--surface-tertiary)]">
                    {category.note}
                  </p>
                )}
                
                <Link
                  href="/contact"
                  className="block w-full text-center px-6 py-3 rounded-xl font-semibold transition-all bg-[var(--color-primary-700)] text-white hover:bg-[var(--color-primary-800)]"
                >
                  Solicită înscriere
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Secondary Categories */}
          <div className="grid md:grid-cols-3 gap-6">
            {membershipCategories.filter(c => c.id === 'asociati-pf' || c.id === 'asociati-pj' || c.id === 'onoare').map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: category.id === 'onoare' ? '#FEF3C7' : 
                                       category.id === 'asociati-pf' ? 'var(--color-accent-100)' : 
                                       'var(--color-neutral-100)'
                    }}
                  >
                    <category.icon 
                      className="w-6 h-6" 
                      style={{ 
                        color: category.id === 'onoare' ? '#B45309' : 
                               category.id === 'asociati-pf' ? 'var(--color-accent-600)' : 
                               'var(--color-neutral-600)'
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                      {category.name}
                    </h3>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {category.tagline}
                    </p>
                  </div>
                </div>
                
                <p className="text-body-sm mb-4">{category.audience}</p>
                
                <div className="flex items-baseline gap-1 mb-4 pb-4 border-b border-[var(--border-primary)]">
                  <span className="text-2xl font-bold text-[var(--text-primary)]">{category.price}</span>
                  {category.period && <span className="text-sm text-[var(--text-tertiary)]">{category.period}</span>}
                </div>
                
                <ul className="space-y-2 mb-4">
                  {category.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-[var(--color-primary-500)] mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {category.note && (
                  <p className="text-xs text-[var(--text-tertiary)] italic mb-4">
                    {category.note}
                  </p>
                )}
                
                <Link
                  href="/contact"
                  className="block w-full text-center px-4 py-2 rounded-lg font-medium transition-all text-sm bg-[var(--color-primary-100)] text-[var(--color-primary-800)] hover:bg-[var(--color-primary-200)]"
                >
                  {category.id === 'asociati-pj' ? 'Contactează-ne' : 'Solicită înscriere'}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Comparație</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Drepturi per Categorie
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto"
          >
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b-2 border-[var(--border-primary)]">
                  <th className="text-left py-4 px-4 font-semibold text-[var(--text-primary)]">Drept</th>
                  <th className="text-center py-4 px-2 font-semibold text-[var(--text-primary)] text-sm">Afiliați</th>
                  <th className="text-center py-4 px-2 font-semibold text-[var(--text-primary)] text-sm">Asociați PF</th>
                  <th className="text-center py-4 px-2 font-semibold text-[var(--text-primary)] text-sm">Asociați PJ</th>
                  <th className="text-center py-4 px-2 font-semibold text-[var(--text-primary)] text-sm">Titulari</th>
                  <th className="text-center py-4 px-2 font-semibold text-[var(--text-primary)] text-sm">De Onoare</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { right: "Acces resurse educaționale", values: [true, true, true, true, true] },
                  { right: "Participare evenimente", values: [true, true, true, true, true] },
                  { right: "Acces revista LMRR", values: [true, true, true, true, true] },
                  { right: "Certificat de membru", values: [true, true, true, true, true] },
                  { right: "Drept de a fi ales", values: ["CD", "Dept.", "-", "Toate", "Toate"] },
                  { right: "Drept de vot în AGA", values: ["După 2 ani", "-", "-", true, true] },
                  { right: "Cotizație anuală", values: ["400 RON", "200 RON", "Contact", "400 RON", "Scutit"] },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-[var(--border-primary)]">
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)]">{row.right}</td>
                    {row.values.map((value, i) => (
                      <td key={i} className="py-3 px-2 text-center">
                        {value === true ? (
                          <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mx-auto" />
                        ) : value === false || value === "-" ? (
                          <span className="text-[var(--text-tertiary)]">—</span>
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

      {/* How to Join */}
      <section className="section-lg surface-secondary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Proces</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Cum devii membru?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Alege categoria",
                description: "Selectează tipul de membru potrivit profilului tău."
              },
              {
                step: "2",
                title: "Completează formularul",
                description: "Trimite-ne datele tale prin formularul online de adeziune."
              },
              {
                step: "3",
                title: "Achită cotizația",
                description: "Efectuează plata cotizației anuale pentru categoria aleasă."
              },
              {
                step: "4",
                title: "Bine ai venit!",
                description: "Primești certificatul și accesul la toate beneficiile."
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-600)] flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-body-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section 
        className="py-20 md:py-24"
        style={{ backgroundColor: '#0f2b1d' }}
      >
        <div className="container-default text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-10 h-10 mx-auto mb-6" style={{ color: '#74C69D' }} />
            <h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Pregătit să faci diferența?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Contactează-ne pentru a începe procesul de înscriere și a deveni parte din comunitatea ASLM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group"
                style={{ backgroundColor: '#FFFFFF', color: '#0f2b1d', fontWeight: 600 }}
              >
                Contactează-ne
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="mailto:contact@aslm.ro"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:bg-white/10"
                style={{ backgroundColor: 'transparent', color: '#FFFFFF', fontWeight: 600, border: '2px solid #FFFFFF' }}
              >
                <Mail className="w-5 h-5" />
                contact@aslm.ro
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
