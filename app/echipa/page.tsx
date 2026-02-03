"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  GraduationCap
} from "lucide-react";

/**
 * Team Page - ASLM NGO Website
 * Consiliul Științific
 */

// President
const president = {
  name: "Prof. Dr. Andrea Elena Neculau",
  title: "Președinte",
  image: "/images/prof-dr-andrea-neculau.png"
};

// Scientific Council Members
// Order: Doina Todea, Monica Tarcea first, then alphabetical
const consiliulStiintific = [
  { name: "Prof. Dr. Doina Todea", image: "/images/prof-dr-doina-todea.png" },
  { name: "Prof. Dr. Monica Tarcea", image: "/images/prof-dr-monica-tarcea.png" },
  { name: "Conf. Dr. Adorata Coman", image: "/images/conf-dr-adorata-coman.png" },
  { name: "Șef Lucr. Dr. Adriana Cioca", image: "/images/sef-lucr-dr-adriana-cioca.png" },
  { name: "Șef Lucr. Dr. Dan Constantin", image: null },
  { name: "Prof. Dr. Mihai Craiu", image: "/images/prof-dr-mihai-craiu.png" },
  { name: "Prof. Dr. Lorena Dima", image: "/images/prof-dr-lorena-dima.png" },
  { name: "Conf. Dr. Gindrovel Dumitra", image: "/images/conf-dr-gindrovel-dumitra.png" },
  { name: "Prof. Dr. Roxana Folescu", image: "/images/prof-dr-roxana-folescu.png" },
  { name: "Prof. Dr. Alexandra Ghement", image: "/images/prof-dr-alexandra-ghement.png" },
  { name: "Conf. Dr. Daniela Gurgus", image: "/images/conf-dr-daniela-gurgus.png" },
  { name: "Prof. Dr. Adela Golea Iancu", image: "/images/prof-dr-adela-iancu.png" },
  { name: "Conf. Dr. Irina Irimia", image: "/images/conf-dr-irina-irimia.png" },
  { name: "Conf. Dr. Kamal Kamel", image: null },
  { name: "Prof. Dr. Poliana Leru", image: "/images/prof-dr-poliana-leru.png" },
  { name: "Prof. Dr. Roxana Miclăuș", image: "/images/prof-dr-roxana-miclaus.png" },
  { name: "Psih. Mihaela Naidin", image: null },
  { name: "Conf. Dr. Aida Puia", image: "/images/conf-dr-aida-puia.png" },
  { name: "Prof. Dr. Carina Voinescu", image: "/images/prof-dr-carina-voinescu.png" },
  { name: "Șef Lucr. Dr. Laura Condur", image: "/images/sef-lucr-dr-laura-condur.png" },
];

// Team Member Card Component
function TeamMemberCard({ name, image, index, title }: { name: string; image?: string | null; index: number; title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <div className="card overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Photo */}
        <div className="aspect-square bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-primary-200)] relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)]">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <span className="font-heading text-2xl font-bold text-white">
                  {name.split(" ").filter((n, i) => i > 0 && i < 4).map(n => n[0]).join("")}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-5 text-center bg-white">
          <h3 className="font-semibold text-[var(--text-primary)] text-lg">
            {name}
          </h3>
          {title && (
            <p className="text-sm text-[var(--color-primary-600)] font-medium mt-1">
              {title}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function EchipaPage() {
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
              Echipa ASLM
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Consiliul Științific
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Consiliul Științific al ASLM reunește experți de renume din domeniul medicinei 
              stilului de viață, care ghidează direcțiile de cercetare și asigură excelența 
              academică a activităților societății.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Președinte Section */}
      <section className="section-lg surface-secondary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-2">
              Președinte ASLM
            </h2>
          </motion.div>

          {/* President Card - Centered and larger */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <TeamMemberCard
                name={president.name}
                title={president.title}
                image={president.image}
                index={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Consiliul Științific */}
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
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Membrii Consiliului Științific
            </h2>
            <p className="text-subtitle max-w-3xl mx-auto">
              Echipa de profesori universitari, conferențiari și cercetători care asigură 
              fundamentul științific al activităților ASLM în domeniul medicinei stilului de viață.
            </p>
          </motion.div>

          {/* Members Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {consiliulStiintific.map((member, index) => (
              <TeamMemberCard
                key={`cs-${index}`}
                name={member.name}
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
              Te poți implica în activitățile și proiectele ASLM, corespunzător domeniului tău de competență profesională.
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
