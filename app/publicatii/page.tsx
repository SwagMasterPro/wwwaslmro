"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ExternalLink,
  FileText,
  Download,
  ArrowRight
} from "lucide-react";

/**
 * Publications Page - ASLM NGO Website
 */

export default function PublicatiiPage() {
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
              Resurse
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Publicații
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Explorează resursele științifice și publicațiile ASLM în domeniul 
              medicinei stilului de viață.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LMRR Journal */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-overline text-[var(--color-primary-600)] mb-3 block">
                Revista Oficială
              </span>
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                Lifestyle Medicine Research & Reviews
              </h2>
              <p className="text-body mb-6">
                LMRR este revista oficială a Societății Academice de Medicina 
                Stilului de Viață din România. Publicăm articole originale, 
                review-uri și studii de caz în domeniul medicinei stilului de viață.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Articole evaluate de experți",
                  "Studii de caz clinice",
                  "Review-uri sistematice",
                  "Ghiduri de bună practică"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-5 h-5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-[var(--color-primary-600)]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://medscience.center/LMRR/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
                style={{ backgroundColor: '#2D6A4F', color: '#FFFFFF' }}
              >
                Accesează revista
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden">
                <Image
                  src="/images/revista-lmrr.jpg"
                  alt="Lifestyle Medicine Romania Review - LMRR"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Materiale</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Resurse Educaționale
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Materiale educaționale disponibile pentru membrii ASLM
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: "Ghiduri Clinice",
                description: "Ghiduri practice pentru implementarea MSV în practica clinică"
              },
              {
                icon: BookOpen,
                title: "Prezentări Webinarii",
                description: "Arhiva prezentărilor din webinariile anterioare"
              },
              {
                icon: Download,
                title: "Materiale pentru Pacienți",
                description: "Resurse descărcabile pentru educația pacienților"
              }
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <resource.icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {resource.title}
                </h3>
                <p className="text-body-sm mb-4">{resource.description}</p>
                <span className="text-sm font-medium text-[var(--color-primary-600)]">
                  Disponibil pentru membri →
                </span>
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
              Vrei acces la toate resursele?
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Devino membru ASLM pentru a accesa întreaga arhivă de materiale educaționale.
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
