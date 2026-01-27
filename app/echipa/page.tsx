"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Linkedin,
  Mail,
  Users,
  Globe,
  Building2,
  GraduationCap,
  Briefcase,
  MapPin
} from "lucide-react";

/**
 * Team Page - ASLM NGO Website
 * Restructured according to ASLM organizational structure:
 * - Consiliul Director (CD)
 * - Senatul ASLM
 * - Consiliul Științific (Național & Internațional)
 * - Biroul Executiv (Divizii & Departamente)
 */

// Consiliul Director - Leadership Board (3x3 grid like BSLM)
const consiliulDirector = [
  { name: "Președinte", role: "Președinte", image: null },
  { name: "Prim-Vicepreședinte", role: "Prim-Vicepreședinte", image: null },
  { name: "Vicepreședinte", role: "Vicepreședinte", image: null },
  { name: "Vicepreședinte", role: "Vicepreședinte", image: null },
  { name: "Vicepreședinte", role: "Vicepreședinte", image: null },
  { name: "Vicepreședinte", role: "Vicepreședinte", image: null },
  { name: "Membru CD", role: "Membru", image: null },
  { name: "Trezorier", role: "Trezorier", image: null },
  { name: "Secretar", role: "Secretar", image: null },
];

// Senatul ASLM - Regional Representatives
const senatulASLM = {
  leadership: [
    { name: "Președinte Senat", role: "Președinte Senat ASLM" },
    { name: "Președinte Executiv", role: "Președinte Executiv Senat ASLM" },
  ],
  regions: [
    { name: "Reprezentant", region: "Regiunea Nord-Est", icon: MapPin },
    { name: "Reprezentant", region: "Regiunea Sud-Est", icon: MapPin },
    { name: "Reprezentant", region: "Regiunea Centrală", icon: MapPin },
    { name: "Reprezentant", region: "Regiunea București", icon: MapPin },
    { name: "Reprezentant", region: "Regiunea Nord-Vest", icon: MapPin },
    { name: "Reprezentant", region: "Regiunea Sud-Vest", icon: MapPin },
  ]
};

// Consiliul Științific
const consiliulStiintific = {
  national: [
    { name: "Președinte de Onoare", role: "Președinte de Onoare" },
    { name: "Președinte", role: "Președinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Vicepreședinte", role: "Vicepreședinte" },
    { name: "Membru", role: "Membru" },
    { name: "Membru", role: "Membru" },
    { name: "Membru", role: "Membru" },
    { name: "Membru", role: "Membru" },
  ],
  international: []
};

// Biroul Executiv - Divisions & Departments
const biroulExecutiv = {
  divisions: [
    { name: "Div. Psihologie", coordinator: "Coordonator" },
    { name: "Div. Fizioterapie", coordinator: "Coordonator" },
    { name: "Div. Medicină Generală", coordinator: "Coordonator" },
    { name: "Div. Stomatologie", coordinator: "Coordonator" },
    { name: "Div. Asistență Medicală", coordinator: "Coordonator" },
    { name: "Div. Sport", coordinator: "Coordonator" },
    { name: "Div. Farmacie", coordinator: "Coordonator" },
    { name: "Div. Nutriție & Dietetică", coordinator: "Coordonator" },
    { name: "Div. Coaching", coordinator: "Coordonator" },
  ],
  departments: [
    { name: "Dep. Financiar & Fundraising", coordinator: "Coordonator" },
    { name: "Dep. Membership", coordinator: "Coordonator" },
    { name: "Dep. Proiecte", coordinator: "Coordonator" },
    { name: "Dep. Certificare", coordinator: "Coordonator" },
    { name: "Dep. Research", coordinator: "Coordonator" },
    { name: "Dep. Programe Comunitare", coordinator: "Coordonator" },
    { name: "Dep. Strategie & Dezvoltare", coordinator: "Coordonator" },
    { name: "Dep. Practică Clinică", coordinator: "Coordonator" },
    { name: "Dep. Educație & Training", coordinator: "Coordonator" },
    { name: "Dep. Marketing & SM", coordinator: "Coordonator" },
    { name: "Dep. Media", coordinator: "Coordonator" },
    { name: "Dep. Comunicare & PR", coordinator: "Coordonator" },
    { name: "Dep. Evenimente", coordinator: "Coordonator" },
    { name: "Dep. Juridic & Guidelines", coordinator: "Coordonator" },
    { name: "Dep. Parteneriate", coordinator: "Coordonator" },
    { name: "Dep. Granturi", coordinator: "Coordonator" },
    { name: "Dep. Studențesc", coordinator: "Coordonator" },
  ]
};

// Team Member Card Component (3x3 grid style like BSLM)
function TeamMemberCard({ name, role, image, index }: { name: string; role: string; image?: string | null; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <div className="card overflow-hidden hover:shadow-lg transition-all duration-300">
        {/* Photo */}
        <div className="aspect-square bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
                <span className="font-heading text-2xl font-bold text-white">
                  {name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </span>
              </div>
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-4 text-center">
          <p className="text-xs font-semibold text-[var(--color-primary-600)] uppercase tracking-wider mb-1">
            {role}
          </p>
          <h3 className="font-semibold text-[var(--text-primary)]">
            {name}
          </h3>
        </div>
      </div>
    </motion.div>
  );
}

// Small Card for Divisions/Departments
function SmallCard({ name, coordinator, index }: { name: string; coordinator: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="p-4 rounded-xl border border-[var(--border-primary)] bg-white hover:border-[var(--color-primary-300)] hover:shadow-md transition-all"
    >
      <p className="font-semibold text-sm text-[var(--text-primary)] mb-1">{name}</p>
      <p className="text-xs text-[var(--text-tertiary)]">{coordinator}</p>
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
              Structură Organizațională
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Echipa ASLM
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Cunoaște echipa de profesioniști care conduce și dezvoltă Societatea 
              Academică de Medicina Stilului de Viață din România.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 surface-secondary border-b border-[var(--border-primary)]">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { href: "#consiliu-director", label: "Consiliul Director", icon: Users },
              { href: "#senat", label: "Senatul ASLM", icon: MapPin },
              { href: "#consiliu-stiintific", label: "Consiliul Științific", icon: GraduationCap },
              { href: "#birou-executiv", label: "Biroul Executiv", icon: Briefcase },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--color-primary-700)] hover:bg-[var(--color-primary-50)] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Consiliul Director - 3x3 Grid */}
      <section id="consiliu-director" className="section-lg surface-primary scroll-mt-20">
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
              Consiliul Director
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Consiliul Director al ASLM asigură conducerea strategică și operațională 
              a societății, reprezentând interesele membrilor.
            </p>
          </motion.div>

          {/* 3x3 Grid like BSLM */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {consiliulDirector.map((member, index) => (
              <TeamMemberCard
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

      {/* Senatul ASLM */}
      <section id="senat" className="section-lg surface-secondary scroll-mt-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <MapPin className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Senatul ASLM
            </h2>
            <p className="text-body max-w-3xl mx-auto">
              Senatul ASLM este constituit din lideri din mediul universitar și social, 
              care acționează ca motoare de avansare a medicinei stilului de viață în 
              universități și alte instituții de învățământ, în cadrul programelor 
              educaționale, în media etc.
            </p>
          </motion.div>

          {/* Senate Leadership */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
            {senatulASLM.leadership.map((member, index) => (
              <motion.div
                key={`senat-lead-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="card-elevated p-6 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[var(--color-primary-600)] to-[var(--color-primary-800)] flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-white">
                    {member.name[0]}
                  </span>
                </div>
                <p className="text-xs font-semibold text-[var(--color-primary-600)] uppercase tracking-wider mb-1">
                  {member.role}
                </p>
                <h3 className="font-semibold text-[var(--text-primary)]">
                  {member.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Regional Representatives */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="text-title text-[var(--text-primary)] mb-2">
              Reprezentanți Regionali
            </h3>
            <p className="text-body-sm">
              Senatul contribuie la promovarea societății și a programelor sale la nivel teritorial și național.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {senatulASLM.regions.map((region, index) => (
              <motion.div
                key={`region-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                className="card p-4 text-center"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-[var(--color-accent-100)] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[var(--color-accent-600)]" />
                </div>
                <p className="text-xs font-semibold text-[var(--color-accent-600)] uppercase tracking-wider mb-1">
                  {region.region}
                </p>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {region.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consiliul Științific */}
      <section id="consiliu-stiintific" className="section-lg surface-primary scroll-mt-20">
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
              Consiliul Științific
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Consiliul Științific ghidează direcțiile de cercetare și asigură 
              excelența academică a activităților ASLM.
            </p>
          </motion.div>

          {/* National Scientific Council */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-title text-center text-[var(--text-primary)] mb-8"
            >
              Consiliul Științific Național
            </motion.h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {consiliulStiintific.national.map((member, index) => (
                <motion.div
                  key={`csn-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="card p-4 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] flex items-center justify-center">
                    <span className="font-heading text-sm font-bold text-white">
                      {member.name[0]}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[var(--color-primary-600)] uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {member.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* International Scientific Council */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-elevated p-8 text-center max-w-2xl mx-auto"
            style={{ backgroundColor: '#1B4332' }}
          >
            <Globe className="w-10 h-10 mx-auto mb-4" style={{ color: '#74C69D' }} />
            <h3 className="text-title text-white mb-2">
              Consiliul Științific Internațional
            </h3>
            <p className="text-white/70">
              Consiliul Științific Internațional al ASLM va include experți de renume 
              mondial în medicina stilului de viață. Detalii în curând.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Biroul Executiv */}
      <section id="birou-executiv" className="section-lg surface-secondary scroll-mt-20">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Biroul Executiv
            </h2>
            <p className="text-subtitle max-w-2xl mx-auto">
              Biroul Executiv al ASLM este organizat în Divizii și Departamente, 
              asigurând implementarea strategiilor și operațiunile zilnice.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Divisions */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-title text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[var(--color-primary-600)]" />
                  Divizii
                </h3>
                <p className="text-body-sm">
                  Diviziile profesionale reunesc membrii pe domenii de specialitate.
                </p>
              </motion.div>
              
              <div className="grid gap-3">
                {biroulExecutiv.divisions.map((div, index) => (
                  <SmallCard
                    key={`div-${index}`}
                    name={div.name}
                    coordinator={div.coordinator}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Departments */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-title text-[var(--text-primary)] mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[var(--color-primary-600)]" />
                  Departamente
                </h3>
                <p className="text-body-sm">
                  Departamentele gestionează activitățile operaționale ale societății.
                </p>
              </motion.div>
              
              <div className="grid gap-3">
                {biroulExecutiv.departments.map((dept, index) => (
                  <SmallCard
                    key={`dept-${index}`}
                    name={dept.name}
                    coordinator={dept.coordinator}
                    index={index}
                  />
                ))}
              </div>
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
