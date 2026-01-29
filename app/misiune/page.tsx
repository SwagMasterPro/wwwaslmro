"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Target,
  Globe,
  Heart,
  Lightbulb,
  Users,
  BookOpen,
  TrendingUp
} from "lucide-react";

/**
 * Mission Page - ASLM NGO Website
 */

const objectives = [
  {
    icon: BookOpen,
    title: "Educație Medicală",
    description: "Promovarea educației continue în medicina stilului de viață pentru profesioniștii din sănătate."
  },
  {
    icon: TrendingUp,
    title: "Cercetare",
    description: "Sprijinirea și publicarea cercetărilor în domeniul medicinei stilului de viață."
  },
  {
    icon: Users,
    title: "Colaborare",
    description: "Dezvoltarea parteneriatelor cu organizații naționale și internaționale din domeniu."
  },
  {
    icon: Lightbulb,
    title: "Advocacy",
    description: "Promovarea politicilor de sănătate publică bazate pe prevenție și stil de viață."
  }
];

export default function MisiunePage() {
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
              Scop și Direcție
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Misiune & Viziune
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Descoperă ce ne motivează și care sunt obiectivele pe care le urmărim 
              pentru transformarea sănătății în România.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-[var(--color-primary-600)]" />
              </div>
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                Misiunea Noastră
              </h2>
              <div className="space-y-4 text-body">
                <p>
                  ASLM își propune să <strong>promoveze medicina stilului de viață</strong> ca 
                  standard de practică clinică în România, contribuind activ la 
                  prevenirea și tratarea bolilor cronice.
                </p>
                <p>
                  Realizăm acest lucru prin:
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    "Educație medicală continuă de înaltă calitate",
                    "Sprijinirea cercetării în domeniul MSV",
                    "Dezvoltarea de ghiduri și protocoale clinice",
                    "Colaborare interdisciplinară și internațională"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-[var(--color-primary-600)]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-elevated p-8 md:p-10"
              style={{ backgroundColor: '#1B4332' }}
            >
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'rgba(116, 198, 157, 0.2)' }}>
                <Globe className="w-7 h-7" style={{ color: '#74C69D' }} />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-white mb-4">
                Viziunea Noastră
              </h3>
              <p className="leading-relaxed mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Viziunea ASLM este dezvoltarea unui sistem de sănătate românesc în care 
                medicina stilului de viață este integrată în toate nivelurile de îngrijire 
                medicală, de la prevenție primară până la tratament și recuperare.
              </p>
              <p className="leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Suntem de părere că fiecare cetățean trebuie să beneficieze de informații 
                și servicii care să susțină alegeri informate pentru un stil de viață sănătos, 
                iar profesioniștii din domeniul medical să fie pregătiți pentru consiliere 
                bazată pe dovezi științifice.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Obiective</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Ce ne propunem
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {objectives.map((objective, index) => (
              <motion.div
                key={objective.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <objective.icon className="w-7 h-7 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {objective.title}
                </h3>
                <p className="text-body-sm">
                  {objective.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Principii</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Valorile ASLM
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Excelență Profesională",
                description: "Urmărim cele mai înalte standarde în educație și practică medicală, bazate pe dovezi științifice."
              },
              {
                title: "Integritate",
                description: "Acționăm cu onestitate și transparență în toate activitățile noastre."
              },
              {
                title: "Colaborare",
                description: "Promovăm lucrul în echipă și schimbul de cunoștințe între profesioniști."
              },
              {
                title: "Compasiune",
                description: "Punem pacientul în centrul tuturor deciziilor terapeutice."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 card"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[var(--color-primary-600)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-body-sm">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
              Împărtășești viziunea noastră?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Alătură-te comunității ASLM și contribuie la transformarea sănătății în România.
            </p>
            <Link
              href="/membri"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group"
              style={{ backgroundColor: '#FFFFFF', color: '#0f2b1d', fontWeight: 600 }}
            >
              Devino Membru
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
