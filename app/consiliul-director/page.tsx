"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users } from "lucide-react";

const consiliulDirector = [
  {
    name: "Prof. Dr. Andrea Elena Neculau",
    role: "Președinte",
    image: "/images/andreea-neculau.jpeg",
  },
  {
    name: "Dr. Mihai-Cristian Popescu",
    role: "Secretar General",
    image: "/images/dr-mihai-cristian-popescu.png",
  },
  {
    name: "Dr. Alexandra Ghement",
    role: "Coordonator Relații Academice și Cooperare Științifică",
    image: "/images/prof-dr-alexandra-ghement.png",
  },
  {
    name: "Ștefan Ionescu",
    role: "Coordonator Tehnologie și Inovație Digitală",
    image: null,
  },
  {
    name: "Psih. Mihaela Naidin",
    role: "Coordonator Psihologie Aplicată și Managementul Stresului",
    image: "/images/psih-mihaela-naidin.png",
  },
  {
    name: "Elena Iuliana Nistoroiu",
    role: "Coordonator Strategie, Dezvoltare și Comunicare",
    image: null,
  },
  {
    name: "Armand-Gabriel Popescu",
    role: "Coordonator Proiecte Speciale",
    image: null,
  },
];

function DirectorCard({ name, role, image, index }: { name: string; role: string; image?: string | null; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="aspect-square bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)]">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="font-heading text-2xl font-bold text-white">
                  {name.split(" ").filter((_, i) => i > 0 && i < 4).map(n => n[0]).join("")}
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="p-5 text-center bg-white">
          <h3 className="font-semibold text-[var(--text-primary)] text-lg">
            {name}
          </h3>
          <p className="text-sm text-[var(--color-primary-600)] font-medium mt-1">
            {role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

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
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Membrii Consiliului Director
            </h2>
            <p className="text-subtitle max-w-3xl mx-auto">
              Echipa de conducere a ASLM, responsabilă de implementarea strategiei
              și coordonarea activităților societății.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {consiliulDirector.map((member, index) => (
              <DirectorCard
                key={`cd-${index}`}
                name={member.name}
                role={member.role}
                image={member.image}
                index={index}
              />
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
