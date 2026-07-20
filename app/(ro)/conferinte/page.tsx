"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Script from "next/script";
import { ArrowLeft, Presentation, Clock, Calendar, Users, Award, CheckCircle } from "lucide-react";
import { generateWebPageSchema } from "@/lib/structured-data";

/**
 * Conferences Page - Conferințe
 */

export default function ConferintePage() {
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
            <Presentation className="w-12 h-12 mx-auto mb-4" style={{ color: '#74C69D' }} />
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Conferințe ASLM 2026 — arhivă
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Retrospectiva formatului și a contribuțiilor științifice din cadrul ediției 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8">
              {/* Intro */}
              <div className="card p-8 bg-[var(--color-primary-50)]">
                <p className="text-body mb-4">
                  Conferințele au abordat <strong>teme de interes major</strong> pentru medicina stilului
                  de viață, structurate în jurul principalilor piloni ai acestei discipline: <strong>nutriția 
                  echilibrată, activitatea fizică, somnul de calitate, gestionarea stresului, relațiile sociale 
                  sănătoase și evitarea substanțelor nocive</strong>.
                </p>
                <p className="text-body">
                  De asemenea, pot fi prezentate subiecte de actualitate privind <strong>prevenția și 
                  managementul bolilor cronice</strong>, dintr-o perspectivă interdisciplinară.
                </p>
              </div>

              {/* Prezentatori */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-100)] flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[var(--color-accent-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)] mb-4">Prezentatori</h2>
                    <p className="text-body">
                      Prezentările au fost susținute de <strong>personalități de prestigiu</strong> din
                      domeniul medical și din aria medicinei stilului de viață.
                    </p>
                  </div>
                </div>
              </div>

              {/* Durata și Structura */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Durata */}
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Durata</h3>
                  </div>
                  <div className="space-y-3 text-body">
                    <p>
                      Durata unei conferințe este de <strong>20 de minute</strong>.
                    </p>
                    <p>
                      După fiecare conferință sunt prevăzute <strong>5 minute pentru discuții</strong>.
                    </p>
                  </div>
                </div>

                {/* Format */}
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-100)] flex items-center justify-center">
                      <Presentation className="w-5 h-5 text-[var(--color-accent-600)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Format</h3>
                  </div>
                  <div className="space-y-3 text-body">
                    <p>
                      Prezentări magistrale susținute de experți recunoscuți în domeniu
                    </p>
                    <p>
                      <strong>Total: 25 minute</strong> (20 min prezentare + 5 min discuții)
                    </p>
                  </div>
                </div>
              </div>

              {/* Calendarul ediției arhivate */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)]">Calendarul ediției 2026 — încheiat</h2>
                  </div>
                </div>
                
                <div className="space-y-6 ml-16">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] mb-1">
                        Titlul (provizoriu) al prezentării
                      </p>
                      <p className="text-body">
                        Termenul de transmitere a fost <strong>20 martie 2026</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] mb-1">
                        Titlul final și rezumatul lucrării
                      </p>
                      <p className="text-body">
                        Termenul final pentru rezumat a fost <strong>10 aprilie 2026</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="card p-8 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-primary-100)]">
                <div className="text-center">
                  <Users className="w-10 h-10 mx-auto mb-4 text-[var(--color-primary-700)]" />
                  <h3 className="text-title text-[var(--text-primary)] mb-3">
                    Consultați evenimentele ASLM
                  </h3>
                  <p className="text-body mb-6 max-w-2xl mx-auto">
                    Această pagină păstrează formatul ediției 2026. Anunțurile pentru edițiile viitoare sunt publicate în hub-ul de evenimente ASLM.
                  </p>
                  <Link
                    href="/evenimente"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#2D6A4F', color: '#FFFFFF' }}
                  >
                    Vezi evenimentele ASLM
                    <ArrowLeft className="w-5 h-5 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[var(--color-primary-700)] font-semibold hover:text-[var(--color-primary-800)] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Înapoi la pagina principală
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Structured Data for AI Search Optimization */}
      <Script
        id="conferinte-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebPageSchema(
              "https://www.aslm.ro/conferinte",
              "Conferințe ASLM",
              "Arhiva conferințelor științifice ASLM 2026 despre medicina stilului de viață, cu formatul prezentărilor și calendarul ediției încheiate.",
              [
                { name: "Acasă", path: "/" },
                { name: "Conferințe", path: "/conferinte" },
              ]
            )
          ),
        }}
      />
    </div>
  );
}
