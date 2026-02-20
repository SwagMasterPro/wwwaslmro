"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

const consiliulDirector = [
  { name: "Andrea Elena Neculau", role: "Președinte" },
  { name: "Mihai-Cristian Popescu", role: "Secretar General" },
  { name: "Alexandra Ghement", role: "Coordonator Relații Academice și Cooperare Științifică" },
  { name: "Ștefan Ionescu", role: "Coordonator Tehnologie și Inovație Digitală" },
  { name: "Mihaela Naidin", role: "Coordonator Psihologie Aplicată și Managementul Stresului" },
  { name: "Elena Iuliana Nistoroiu", role: "Coordonator Strategie, Dezvoltare și Comunicare" },
  { name: "Armand-Gabriel Popescu", role: "Coordonator Proiecte Speciale" },
];

export default function ConsiliulDirectorPage() {
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
              Consiliul Director
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Consiliul Director al ASLM asigură conducerea operațională a societății,
              coordonând activitățile și proiectele strategice ale organizației.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Members */}
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
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Membrii Consiliului Director
            </h2>
            <p className="text-subtitle max-w-3xl mx-auto">
              Echipa de conducere a ASLM, responsabilă de implementarea strategiei
              și coordonarea activităților societății.
            </p>
          </motion.div>

          <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto">
            {consiliulDirector.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="text-center"
              >
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {member.name}
                </h3>
                <p className="text-[var(--color-primary-600)] italic mt-1">
                  {member.role}
                </p>
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
              Vrei să faci parte din echipă?
            </h2>
            <p
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Devino membru ASLM și contribuie la dezvoltarea medicinei stilului de viață în România.
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
