"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  Calendar,
  ExternalLink,
  GraduationCap,
  Globe,
  Target
} from "lucide-react";

/**
 * Homepage - ASLM NGO Website
 * Societatea Academică de Medicina Stilului de Viață
 */

// Six pillars of Lifestyle Medicine
const pillars = [
  { icon: Salad, label: "Alimentație\nechilibrată", color: "#40916C" },
  { icon: Activity, label: "Activitate\nfizică", color: "#52B788" },
  { icon: Moon, label: "Somn de\ncalitate", color: "#2D6A4F" },
  { icon: Brain, label: "Gestionarea\nstresului", color: "#C4725B" },
  { icon: Smile, label: "Relații\nsociale", color: "#D4876E" },
  { icon: ShieldCheck, label: "Evitare\nsubstanțe nocive", color: "#1B4332" },
];

// Key benefits of membership
const memberBenefits = [
  {
    icon: GraduationCap,
    title: "Educație Continuă",
    description: "Acces la cursuri, webinarii și materiale educaționale de specialitate",
  },
  {
    icon: Users,
    title: "Comunitate Profesională",
    description: "Networking cu specialiști din domeniul medicinii stilului de viață",
  },
  {
    icon: BookOpen,
    title: "Publicații & Cercetare",
    description: "Acces la revista LMRR și resurse științifice actualizate",
  },
  {
    icon: Award,
    title: "Certificări",
    description: "Oportunități de certificare în medicina stilului de viață",
  },
];

// Statistics
const stats = [
  { value: "150+", label: "Membri activi" },
  { value: "10+", label: "Evenimente anuale" },
  { value: "6", label: "Piloni fundamentali" },
  { value: "2026", label: "Primul congres" },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[90vh] flex items-center"
        style={{ 
          paddingTop: '100px',
          background: 'linear-gradient(135deg, #081C15 0%, #1B4332 50%, #2D6A4F 100%)'
        }}
      >
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)`
          }}
        />
        
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#95D5B2' }}
              >
                Societatea Academică de Medicina Stilului de Viață
              </span>
              
              <h1 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                Transformăm sănătatea prin
                <span style={{ color: '#74C69D' }}> stilul de viață</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                ASLM reunește profesioniști din domeniul sănătății dedicați promovării 
                medicinii stilului de viață în România. Împreună construim un viitor 
                mai sănătos prin educație, cercetare și colaborare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/membri"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group"
                  style={{ backgroundColor: '#FFFFFF', color: '#1B4332' }}
                >
                  Devino Membru
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/despre"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#FFFFFF',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  Află mai multe
                </Link>
              </div>
            </motion.div>

            {/* Hero visual - Logo and pillars */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Central logo */}
                <div 
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
                >
                  <div className="relative w-32 h-32">
                    <Image
                      src="/images/aslm-logo.png"
                      alt="ASLM Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                
                {/* Orbiting pillars */}
                {pillars.map((pillar, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const radius = 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="absolute w-16 h-16 rounded-xl flex items-center justify-center"
                      style={{ 
                        left: `calc(50% + ${x}px - 32px)`,
                        top: `calc(50% + ${y}px - 32px)`,
                        backgroundColor: 'rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)'
                      }}
                    >
                      <pillar.icon className="w-7 h-7" style={{ color: pillar.color }} />
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: '#0f2b1d' }}
      >
        <div className="container-wide py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="block text-3xl md:text-4xl font-bold mb-1" style={{ color: '#74C69D' }}>
                  {stat.value}
                </span>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* What is Lifestyle Medicine */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-overline mb-3">Fundament</p>
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                Ce este Medicina Stilului de Viață?
              </h2>
              <div className="space-y-4 text-body text-[var(--text-secondary)]">
                <p>
                  Medicina stilului de viață este o ramură modernă a medicinei, bazată pe 
                  dovezi științifice, care se concentrează pe schimbarea comportamentelor 
                  zilnice pentru a <strong>preveni</strong>, <strong>trata</strong> și 
                  chiar <strong>inversa</strong> progresia bolilor cronice.
                </p>
                <p>
                  Spre deosebire de abordările tradiționale centrate exclusiv pe medicamente 
                  și proceduri, medicina stilului de viață pune pacientul în centrul 
                  deciziei terapeutice, valorificând puterea alegerilor zilnice.
                </p>
                <p>
                  Aceasta se bazează pe <strong>șase piloni fundamentali</strong>: 
                  alimentația echilibrată, activitatea fizică, somnul de calitate, 
                  gestionarea stresului, relațiile sociale sănătoase și evitarea 
                  expunerii la substanțe nocive.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/despre"
                  className="inline-flex items-center gap-2 text-[var(--color-primary-700)] font-semibold hover:text-[var(--color-primary-800)] transition-colors group"
                >
                  Descoperă mai multe despre MSV
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Six Pillars Grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="card-elevated p-5 text-center hover:shadow-lg transition-shadow"
                >
                  <div 
                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${pillar.color}15` }}
                  >
                    <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)] whitespace-pre-line leading-tight">
                    {pillar.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About ASLM Section */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Despre noi</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Cine suntem
            </h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-3xl mx-auto">
              ASLM este o organizație non-profit care reunește medici, cercetători și 
              profesioniști din domeniul sănătății dedicați promovării medicinii 
              stilului de viață în România.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Misiunea Noastră",
                description: "Promovăm medicina stilului de viață ca standard de practică clinică în România, contribuind la prevenirea și tratarea bolilor cronice prin schimbări sustenabile ale stilului de viață."
              },
              {
                icon: Globe,
                title: "Viziunea Noastră",
                description: "Un sistem de sănătate românesc în care medicina stilului de viață este integrată în toate nivelurile de îngrijire, de la prevenție la tratament și recuperare."
              },
              {
                icon: Heart,
                title: "Valorile Noastre",
                description: "Excelență profesională, colaborare interdisciplinară, educație continuă, etică medicală și angajament față de bunăstarea pacienților și comunității."
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-title text-lg mb-3 text-[var(--text-primary)]">
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

      {/* Membership Benefits */}
      <section className="section-lg surface-tertiary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Beneficii</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              De ce să devii membru ASLM?
            </h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto">
              Alătură-te comunității de profesioniști dedicați transformării sănătății
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {memberBenefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated p-6 group hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center group-hover:bg-[var(--color-primary-600)] transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-[var(--color-primary-600)] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-body-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10"
          >
            <Link
              href="/membri"
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all group shadow-sm hover:shadow-md"
              style={{
                backgroundColor: '#2D6A4F',
                color: '#FFFFFF'
              }}
            >
              Înscrie-te ca membru
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Congress CTA Section */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
                style={{ backgroundColor: '#FEF6F3', color: '#9A3412' }}
              >
                <Calendar className="w-4 h-4" />
                10-12 Mai 2026
              </span>
              
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                Congresul Inaugural ASLM
              </h2>
              
              <p className="text-body mb-6">
                Vă invităm la primul Congres al Societății Academice de Medicina 
                Stilului de Viață, un eveniment de referință pentru profesioniștii 
                din domeniul sănătății.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  "Format hibrid: fizic la Brașov + online",
                  "10 secțiuni tematice specializate",
                  "30+ speakeri de top",
                  "Credite EMC acreditate"
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
                href="https://congres.aslm.ro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all group shadow-md hover:shadow-lg"
                style={{
                  backgroundColor: '#2D6A4F',
                  color: '#FFFFFF'
                }}
              >
                Vizitează site-ul congresului
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div 
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ backgroundColor: '#1B4332' }}
              >
                <div className="p-8 md:p-12">
                  <p 
                    className="text-sm font-bold uppercase tracking-wider mb-4"
                    style={{ color: '#74C69D' }}
                  >
                    Universitatea Transilvania
                  </p>
                  <h3 
                    className="font-heading text-2xl md:text-3xl font-bold mb-4"
                    style={{ color: '#FFFFFF' }}
                  >
                    Brașov, România
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Aula Universității Transilvania va găzdui prima ediție a 
                    Congresului ASLM, reunind experți naționali și internaționali.
                  </p>
                  
                  <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-3xl font-bold" style={{ color: '#74C69D' }}>500+</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Participanți așteptați</p>
                      </div>
                      <div className="w-px h-12" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                      <div>
                        <p className="text-3xl font-bold" style={{ color: '#74C69D' }}>3</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>Zile de conferințe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="py-20 md:py-28 relative overflow-hidden"
        style={{ backgroundColor: '#0f2b1d' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 
              className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Alătură-te mișcării pentru sănătate
            </h2>
            <p 
              className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#D1D5DB' }}
            >
              Fii parte din comunitatea profesioniștilor care transformă medicina 
              românească prin abordarea stilului de viață.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/membri"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#0f2b1d', 
                  fontWeight: 600
                }}
              >
                Devino Membru
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl transition-all hover:bg-white/10"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: '#FFFFFF', 
                  fontWeight: 600,
                  border: '2px solid #FFFFFF'
                }}
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
