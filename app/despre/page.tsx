"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Users,
  BookOpen,
  Award,
  Salad,
  Activity,
  Moon,
  Brain,
  Smile,
  ShieldCheck,
  Target,
  Globe,
  Sparkles,
  CheckCircle
} from "lucide-react";

/**
 * About Page - Despre ASLM
 */

const pillars = [
  { 
    icon: Salad, 
    title: "Alimentație Echilibrată", 
    description: "O dietă bazată preponderent pe plante, bogată în nutrienți, care previne și poate inversa bolile cronice.",
    color: "#40916C" 
  },
  { 
    icon: Activity, 
    title: "Activitate Fizică", 
    description: "Mișcare regulată adaptată fiecărui individ, esențială pentru sănătatea cardiovasculară și metabolică.",
    color: "#52B788" 
  },
  { 
    icon: Moon, 
    title: "Somn de Calitate", 
    description: "Odihna adecvată pentru recuperare, echilibrul hormonal și funcționarea optimă a sistemului imunitar.",
    color: "#2D6A4F" 
  },
  { 
    icon: Brain, 
    title: "Gestionarea Stresului", 
    description: "Tehnici de management al stresului pentru sănătatea mintală și prevenirea bolilor legate de stres.",
    color: "#C4725B" 
  },
  { 
    icon: Smile, 
    title: "Relații Sociale", 
    description: "Conexiuni sociale sănătoase și comunitate suportivă, esențiale pentru bunăstarea emoțională.",
    color: "#D4876E" 
  },
  { 
    icon: ShieldCheck, 
    title: "Evitare Substanțe Nocive", 
    description: "Abstinența de la tutun, alcool în exces și alte substanțe care dăunează sănătății.",
    color: "#1B4332" 
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Excelență",
    description: "Urmărim cele mai înalte standarde în educație și practică medicală"
  },
  {
    icon: Users,
    title: "Colaborare",
    description: "Promovăm lucrul în echipă și schimbul de cunoștințe între profesioniști"
  },
  {
    icon: BookOpen,
    title: "Educație Continuă",
    description: "Credem în învățarea pe tot parcursul vieții și actualizarea constantă"
  },
  {
    icon: Heart,
    title: "Compasiune",
    description: "Punem pacientul în centrul tuturor deciziilor terapeutice"
  }
];

export default function DespreNoi() {
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
              Despre ASLM
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Societatea Academică de Medicina Stilului de Viață
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Suntem o organizație dedicată promovării medicinei stilului de viață în 
              România, reunind profesioniști din sănătate pentru un viitor mai sănătos.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[var(--color-primary-600)]" />
              </div>
              <h2 className="text-title text-[var(--text-primary)] mb-4">Misiunea Noastră</h2>
              <p className="text-body leading-relaxed">
                ASLM își propune să promoveze medicina stilului de viață ca standard de 
                practică clinică în România. Contribuim activ la prevenirea și tratarea 
                bolilor cronice prin educație medicală continuă, cercetare științifică și 
                colaborare interdisciplinară.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Educarea profesioniștilor din sănătate",
                  "Promovarea cercetării în domeniu",
                  "Advocacy pentru politici de sănătate publică",
                  "Colaborare internațională"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card p-8 md:p-10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-accent-100)] flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-[var(--color-accent-600)]" />
              </div>
              <h2 className="text-title text-[var(--text-primary)] mb-4">Viziunea Noastră</h2>
              <p className="text-body leading-relaxed">
                Viziunea ASLM este dezvoltarea unui sistem de sănătate românesc în care 
                medicina stilului de viață este integrată în toate nivelurile de îngrijire 
                medicală, de la prevenție primară până la tratament și recuperare.
              </p>
              <p className="text-body leading-relaxed mt-4">
                Suntem de părere că fiecare cetățean trebuie să beneficieze de informații 
                și servicii care să susțină alegeri informate pentru un stil de viață sănătos, 
                iar profesioniștii din domeniul medical să fie pregătiți pentru consiliere 
                bazată pe dovezi științifice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is Lifestyle Medicine */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Fundament</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Cei Șase Piloni ai Medicinei Stilului de Viață
            </h2>
            <p className="text-subtitle max-w-3xl mx-auto">
              Medicina stilului de viață se bazează pe șase domenii fundamentale, 
              fiecare contribuind la prevenirea și tratarea bolilor cronice.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${pillar.color}15` }}
                >
                  <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-body-sm">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Principii</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Valorile Noastre
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {value.title}
                </h3>
                <p className="text-body-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statute Section */}
      <section id="statutul-aslm" className="section-lg surface-tertiary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <p className="text-overline mb-3">Document</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Statutul ASLM
            </h2>
            <p className="text-body max-w-2xl mx-auto mb-6">
              Consultați Statutul Societății Academice de Medicina Stilului de Viață pentru detalii complete despre organizare, membri și funcționare.
            </p>
            <a
              href="/documents/Statutul-ASLM.docx"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              style={{ backgroundColor: '#2D6A4F', color: '#FFFFFF' }}
            >
              <BookOpen className="w-5 h-5" />
              Descarcă Statutul ASLM
            </a>
          </motion.div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-overline mb-3">Afilieri</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Conexiuni Internaționale
            </h2>
            <p className="text-body max-w-2xl mx-auto">
              ASLM este afiliată la European Lifestyle Medicine Organization (ELMO) 
              și colaborează cu organizații internaționale pentru promovarea medicinii 
              stilului de viață la nivel global.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <div 
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl"
              style={{ backgroundColor: 'rgba(27, 67, 50, 0.1)' }}
            >
              <Award className="w-6 h-6 text-[var(--color-primary-700)]" />
              <span className="font-semibold text-[var(--text-primary)]">
                Membru afiliat ELMO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
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
            <h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Vrei să afli mai multe?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Contactează-ne pentru informații suplimentare sau pentru a te alătura comunității ASLM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/membri"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group"
                style={{ backgroundColor: '#FFFFFF', color: '#0f2b1d', fontWeight: 600 }}
              >
                Devino Membru
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:bg-white/10"
                style={{ backgroundColor: 'transparent', color: '#FFFFFF', fontWeight: 600, border: '2px solid #FFFFFF' }}
              >
                Contactează-ne
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
