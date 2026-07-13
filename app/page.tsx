"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
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
import FAQSection from "@/components/seo/FAQSection";
import PromoVideoEmbed from "@/components/sections/PromoVideoEmbed";
import { STATUTE_EN_URL } from "@/lib/localized-routes";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/structured-data";

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
    description: "Networking cu specialiști din domeniul medicinei stilului de viață",
  },
  {
    icon: BookOpen,
    title: "Publicații & Cercetare",
    description: "Acces la revista LMRR și resurse științifice actualizate",
  },
  {
    icon: Award,
    title: "Recunoaștere profesională",
    description: "Oportunități de perfecționare și specializare în medicina stilului de viață",
  },
];

const englishPillars = [
  { icon: Salad, label: "Balanced\nnutrition", color: "#40916C" },
  { icon: Activity, label: "Physical\nactivity", color: "#52B788" },
  { icon: Moon, label: "Quality\nsleep", color: "#2D6A4F" },
  { icon: Brain, label: "Stress\nmanagement", color: "#C4725B" },
  { icon: Smile, label: "Social\nconnections", color: "#D4876E" },
  { icon: ShieldCheck, label: "Avoiding\nharmful substances", color: "#1B4332" },
];

const englishMemberBenefits = [
  {
    icon: GraduationCap,
    title: "Continuing Education",
    description: "Access specialist courses, webinars and educational materials",
  },
  {
    icon: Users,
    title: "Professional Community",
    description: "Connect with professionals working in lifestyle medicine",
  },
  {
    icon: BookOpen,
    title: "Publications & Research",
    description: "Access LMRR and current scientific resources",
  },
  {
    icon: Award,
    title: "Professional Recognition",
    description: "Opportunities for professional development and specialization",
  },
];

// Statistics
const stats = [
  { value: "1", label: "Congres național" },
  { value: "4", label: "Conferințe regionale" },
  { value: "1", label: "Școală de vară" },
  { value: "6", label: "Piloni fundamentali" },
  { value: "1", label: "Manual de practică" },
  { value: "1", label: "Revistă oficială" },
  { value: "2026", label: "Congres inaugural" },
];

const englishStats = [
  { value: "1", label: "National congress" },
  { value: "4", label: "Regional conferences" },
  { value: "1", label: "Summer school" },
  { value: "6", label: "Core pillars" },
  { value: "1", label: "Practice manual" },
  { value: "1", label: "Official journal" },
  { value: "2026", label: "Inaugural congress" },
];

const englishHomepageFAQs = [
  {
    question: "What is lifestyle medicine?",
    answer: "Lifestyle medicine is a modern, evidence-based branch of medicine focused on changing daily behaviors to prevent, treat and even reverse the progression of chronic disease. It is built on six core pillars: balanced nutrition, physical activity, quality sleep, stress management, healthy social connections and avoiding harmful substances.",
  },
  {
    question: "Who can become an ASLM member?",
    answer: "ASLM offers several membership categories, including healthcare professionals, students, residents, non-medical professionals interested in lifestyle medicine, organizations that support our mission, certified lifestyle medicine professionals and honorary members.",
  },
  {
    question: "What are the six pillars of lifestyle medicine?",
    answer: "The six pillars are balanced nutrition, regular physical activity, quality sleep, stress management, healthy social connections and avoiding harmful substances such as tobacco and excessive alcohol.",
  },
  {
    question: "Where can I find information about the 2026 ASLM Congress?",
    answer: "The inaugural ASLM Congress took place on 10–12 May 2026 in Brașov in a hybrid format. Visit congres.aslm.ro for information about the program, speakers and materials available after the event.",
  },
  {
    question: "What are the benefits of ASLM membership?",
    answer: "ASLM members receive continuing education opportunities, professional networking, access to Lifestyle Medicine Romania Review, professional recognition, preferential event rates, EMC credits for accredited events and opportunities to contribute to national lifestyle medicine initiatives.",
  },
  {
    question: "Is ASLM an accredited organization?",
    answer: "ASLM is an affiliated member of the Romanian Medical Association and collaborates with international organizations to promote lifestyle medicine globally. Our accredited events offer EMC credits to healthcare professionals.",
  },
];

const aboutItemsRo = [
  {
    icon: Target,
    title: "Misiunea Noastră",
    description: "Promovăm medicina stilului de viață ca standard de practică clinică în România, contribuind la prevenirea și tratarea bolilor cronice prin schimbări sustenabile ale stilului de viață.",
  },
  {
    icon: Globe,
    title: "Viziunea Noastră",
    description: "Un sistem de sănătate românesc în care medicina stilului de viață este integrată în toate nivelurile de îngrijire, de la prevenție la tratament și recuperare.",
  },
  {
    icon: Heart,
    title: "Valorile Noastre",
    description: "Excelență profesională, colaborare interdisciplinară, educație continuă, etică medicală și angajament față de bunăstarea pacienților și comunității.",
  },
];

const aboutItemsEn = [
  {
    icon: Target,
    title: "Our Mission",
    description: "We promote lifestyle medicine as a standard of clinical practice in Romania, helping prevent and treat chronic disease through sustainable lifestyle changes.",
  },
  {
    icon: Globe,
    title: "Our Vision",
    description: "A Romanian healthcare system where lifestyle medicine is integrated across every level of care, from prevention through treatment and recovery.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description: "Professional excellence, interdisciplinary collaboration, continuing education, medical ethics and a commitment to the wellbeing of patients and communities.",
  },
];

// FAQ data for AI search optimization
const homepageFAQs = [
  {
    question: "Ce este medicina stilului de viață?",
    answer: "Medicina stilului de viață este o ramură modernă a medicinei, bazată pe dovezi științifice, care se concentrează pe schimbarea comportamentelor zilnice pentru a preveni, trata și chiar inversa progresia bolilor cronice. Aceasta se bazează pe șase piloni fundamentali: alimentația echilibrată, activitatea fizică, somnul de calitate, gestionarea stresului, relațiile sociale sănătoase și evitarea expunerii la substanțe nocive."
  },
  {
    question: "Cine poate deveni membru ASLM?",
    answer: "ASLM oferă mai multe categorii de membri: Membri Afiliați (profesioniști din sănătate - medici, farmaciști, nutriționiști, psihologi, etc.), Membri Asociați - Persoane Fizice (studenți, rezidenți și profesioniști non-medicali interesați de medicina stilului de viață), Membri Asociați - Persoane Juridice (companii și organizații care susțin misiunea ASLM), Membri Titulari (profesioniști cu experiență certificată în medicina stilului de viață) și Membri de Onoare (personalități recunoscute pentru contribuții excepționale)."
  },
  {
    question: "Care sunt cei șase piloni ai medicinei stilului de viață?",
    answer: "Cei șase piloni ai medicinei stilului de viață sunt: 1) Alimentație echilibrată - o dietă bazată preponderent pe alimente din plante, 2) Activitate fizică - mișcare regulată adaptată fiecărui individ, 3) Somn de calitate - odihna adecvată pentru recuperare, 4) Gestionarea stresului - tehnici de management pentru sănătatea mintală, 5) Relații sociale - conexiuni sociale sănătoase și comunitate suportivă, și 6) Evitarea substanțelor nocive - abstinența de la tutun, alcool în exces și alte substanțe dăunătoare."
  },
  {
    question: "Unde găsesc informații despre Congresul ASLM 2026?",
    answer: "Congresul Inaugural ASLM a avut loc în perioada 10-12 mai 2026 la Brașov, în format hibrid (fizic și online). Vizitați site-ul oficial al congresului la congres.aslm.ro pentru informații despre program, speakeri și materialele disponibile după eveniment."
  },
  {
    question: "Ce beneficii oferă calitatea de membru ASLM?",
    answer: "Membrii ASLM beneficiază de: educație continuă prin acces la cursuri online și webinarii de specialitate, networking cu profesioniști din domeniu, acces la revista Lifestyle Medicine Romania Review (LMRR), recunoaștere profesională și oportunități de specializare, tarife preferențiale la evenimente (congrese, conferințe, workshop-uri), credite EMC pentru evenimentele acreditate, și posibilitatea de a contribui la inițiative naționale de promovare a medicinei stilului de viață."
  },
  {
    question: "Este ASLM o organizație acreditată?",
    answer: "Da, ASLM este membru afiliat al Asociației Medicale Române (AMR) și colaborează cu organizații internaționale pentru promovarea medicinii stilului de viață la nivel global. Evenimentele noastre sunt acreditate și oferă credite EMC (Educație Medicală Continuă) pentru profesioniștii din sănătate."
  },
];

export type HomeLocale = "ro" | "en";

export function HomePage({ locale = "ro" }: { locale?: HomeLocale }) {
  const isEnglish = locale === "en";
  const localizedPillars = isEnglish ? englishPillars : pillars;
  const localizedMemberBenefits = isEnglish ? englishMemberBenefits : memberBenefits;
  const localizedStats = isEnglish ? englishStats : stats;
  const localizedFAQs = isEnglish ? englishHomepageFAQs : homepageFAQs;
  const localizedAboutItems = isEnglish ? aboutItemsEn : aboutItemsRo;
  const memberPath = isEnglish ? "/en/membership" : "/membri";
  const lifestyleMedicinePath = isEnglish ? "/en#lifestyle-medicine" : "/medicina-stilului-de-viata";
  const aboutPath = isEnglish ? "/en#about-aslm" : "/despre";
  const congressBullets = isEnglish
    ? ["Hybrid format: Brașov + online", "10 specialized thematic sections", "30+ invited speakers", "Accredited EMC credits"]
    : ["Format hibrid: Brașov + online", "10 secțiuni tematice specializate", "30+ speakeri invitați", "Credite EMC acreditate"];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        className="relative min-h-[75vh] flex items-center"
        style={{ 
          paddingTop: '80px',
          paddingBottom: '40px',
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
                {isEnglish ? "Academic Society of Lifestyle Medicine" : "Societatea Academică de Medicina Stilului de Viață"}
              </span>
              
              <h1 
                className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: '#FFFFFF' }}
              >
                {isEnglish ? "Together for health through" : "Împreună pentru sănătate prin"}
                <span style={{ color: '#74C69D' }}>{isEnglish ? " lifestyle medicine" : " medicina stilului de viață"}</span>
              </h1>
              
              <p 
                className="text-lg md:text-xl mb-8 leading-relaxed max-w-xl"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {isEnglish
                  ? "ASLM brings together healthcare professionals committed to advancing lifestyle medicine in Romania. Together, we are building a healthier future through education, research and collaboration."
                  : "ASLM reunește profesioniști din domeniul sănătății dedicați promovării medicinei stilului de viață în România. Împreună construim un viitor mai sănătos prin educație, cercetare și colaborare."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={memberPath}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group"
                  style={{ backgroundColor: '#FFFFFF', color: '#1B4332' }}
                >
                  {isEnglish ? "Join ASLM" : "Devino Membru"}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href={lifestyleMedicinePath}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: '#FFFFFF',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}
                >
                  {isEnglish ? "What is lifestyle medicine" : "Ce este medicina stilului de viață"}
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
                <div
                  className="w-48 h-48 rounded-full flex flex-col items-center justify-center shadow-xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}
                >
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src="/images/aslm-logo.png"
                      alt="ASLM Logo"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs font-bold text-center leading-tight px-4" style={{ color: '#1B4332' }}>
                    {isEnglish ? "6 lifestyle medicine" : "Cei 6 piloni"}<br />
                    {isEnglish ? "pillars" : "ai MSV"}
                  </p>
                </div>

                {localizedPillars.map((pillar, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const radius = 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <motion.div
                      key={pillar.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="absolute flex flex-col items-center"
                      style={{
                        left: `calc(50% + ${x}px - 40px)`,
                        top: `calc(50% + ${y}px - 50px)`,
                        width: '80px'
                      }}
                    >
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg mb-1"
                        style={{ backgroundColor: pillar.color }}
                      >
                        <pillar.icon className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-[9px] font-semibold text-center leading-tight text-white whitespace-pre-line">
                        {pillar.label}
                      </p>
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
        <div className="container-wide py-6">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 md:gap-6 text-center">
            {localizedStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <span className="block text-2xl md:text-3xl font-bold mb-1" style={{ color: '#74C69D' }}>
                  {stat.value}
                </span>
                <span className="text-xs md:text-sm leading-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <PromoVideoEmbed />

      {/* What is Lifestyle Medicine */}
      <section id="lifestyle-medicine" className="section-lg surface-secondary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-overline mb-3">{isEnglish ? "Foundation" : "Fundament"}</p>
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                {isEnglish ? "What is Lifestyle Medicine?" : "Ce este Medicina Stilului de Viață?"}
              </h2>
              <div className="space-y-4 text-body text-[var(--text-secondary)]">
                {isEnglish ? (
                  <>
                    <p>
                      Lifestyle medicine is a modern, evidence-based branch of medicine focused on changing daily behaviors to <strong>prevent</strong>, <strong>treat</strong> and even <strong>reverse</strong> chronic disease.
                    </p>
                    <p>
                      Unlike traditional approaches centered exclusively on medication and procedures, lifestyle medicine puts the patient at the center of care and recognizes the power of everyday choices.
                    </p>
                    <p>
                      It is built on <strong>six core pillars</strong>: balanced nutrition, physical activity, quality sleep, stress management, healthy social connections and avoiding harmful substances.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Medicina stilului de viață este o ramură modernă a medicinei, bazată pe dovezi științifice, care se concentrează pe schimbarea comportamentelor zilnice pentru a <strong>preveni</strong>, <strong>trata</strong> și chiar <strong>inversa</strong> progresia bolilor cronice.
                    </p>
                    <p>
                      Spre deosebire de abordările tradiționale centrate exclusiv pe medicamente și proceduri, medicina stilului de viață pune pacientul în centrul deciziei terapeutice, valorificând puterea alegerilor zilnice.
                    </p>
                    <p>
                      Aceasta se bazează pe <strong>șase piloni fundamentali</strong>: alimentația echilibrată, activitatea fizică, somnul de calitate, gestionarea stresului, relațiile sociale sănătoase și evitarea expunerii la substanțe nocive.
                    </p>
                  </>
                )}
              </div>
              <div className="mt-8">
                <Link
                  href={aboutPath}
                  className="inline-flex items-center gap-2 text-[var(--color-primary-700)] font-semibold hover:text-[var(--color-primary-800)] transition-colors group"
                >
                  {isEnglish ? "Learn more about lifestyle medicine" : "Descoperă mai multe despre MSV"}
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
              {localizedPillars.map((pillar, index) => (
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
      <section id="about-aslm" className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">{isEnglish ? "About us" : "Despre noi"}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              {isEnglish ? "Who we are" : "Cine suntem"}
            </h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-3xl mx-auto">
              {isEnglish
                ? "ASLM is a non-profit organization bringing together physicians, researchers and healthcare professionals dedicated to advancing lifestyle medicine in Romania."
                : "ASLM este o organizație non-profit care reunește medici, cercetători și profesioniști din domeniul sănătății dedicați promovării medicinii stilului de viață în România."}
            </p>
            {isEnglish && (
              <a
                href={STATUTE_EN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] transition-colors"
              >
                Read the ASLM Statute (extracts)
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {localizedAboutItems.map((item, index) => (
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
            <p className="text-overline mb-3">{isEnglish ? "Benefits" : "Beneficii"}</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              {isEnglish ? "Why become an ASLM member?" : "De ce să devii membru ASLM?"}
            </h2>
            <p className="text-subtitle text-[var(--text-secondary)] max-w-2xl mx-auto">
              {isEnglish
                ? "Join a community of professionals dedicated to transforming health"
                : "Alătură-te comunității de profesioniști dedicați transformării sănătății"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {localizedMemberBenefits.map((item, index) => (
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
              href={memberPath}
              className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all group shadow-sm hover:shadow-md"
              style={{
                backgroundColor: '#2D6A4F',
                color: '#FFFFFF'
              }}
            >
              {isEnglish ? "Join as a member" : "Înscrie-te ca membru"}
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
                {isEnglish ? "10–12 May 2026 · retrospective" : "10-12 Mai 2026 · retrospectivă"}
              </span>
              
              <h2 className="text-headline text-[var(--text-primary)] mb-6">
                {isEnglish ? "The Inaugural ASLM Congress" : "Congresul Inaugural ASLM"}
              </h2>
              
              <p className="text-body mb-6">
                {isEnglish
                  ? "The first congress of the Academic Society of Lifestyle Medicine brought healthcare professionals together in Brașov to focus on prevention, medical education and interdisciplinary collaboration."
                  : "Primul Congres al Societății Academice de Medicina Stilului de Viață a reunit la Brașov profesioniști din domeniul sănătății interesați de prevenție, educație medicală și colaborare interdisciplinară."}
              </p>
              
              <ul className="space-y-3 mb-8">
                {congressBullets.map((item, index) => (
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
                {isEnglish ? "Visit the congress website" : "Vezi site-ul congresului"}
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
                    {isEnglish ? "Brașov, Romania" : "Brașov, România"}
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {isEnglish
                      ? "The Transilvania University auditorium hosted the first ASLM Congress, bringing together national and international experts."
                      : "Aula Universității Transilvania a găzduit prima ediție a Congresului ASLM, reunind experți naționali și internaționali."}
                  </p>
                  
                  <div className="mt-8 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-3xl font-bold" style={{ color: '#74C69D' }}>500+</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{isEnglish ? "Participants" : "Participanți"}</p>
                      </div>
                      <div className="w-px h-12" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                      <div>
                        <p className="text-3xl font-bold" style={{ color: '#74C69D' }}>3</p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{isEnglish ? "Conference days" : "Zile de conferințe"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title={isEnglish ? "Frequently Asked Questions" : "Întrebări Frecvente"}
        subtitle={isEnglish ? "Answers to common questions about ASLM and lifestyle medicine" : "Răspunsuri la cele mai comune întrebări despre ASLM și medicina stilului de viață"}
        faqs={localizedFAQs}
      />

      {/* Structured Data for AI Search Optimization */}
      <Script
        id={`homepage-structured-data-${locale}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateFAQSchema(localizedFAQs),
            generateWebPageSchema(
              isEnglish ? "https://www.aslm.ro/en" : "https://www.aslm.ro",
              isEnglish ? "ASLM - Academic Society of Lifestyle Medicine" : "ASLM - Societatea Academică de Medicina Stilului de Viață",
              isEnglish
                ? "The Academic Society of Lifestyle Medicine (ASLM) advances lifestyle medicine through education, research and professional collaboration in Romania."
                : "Societatea Academică de Medicina Stilului de Viață (ASLM) promovează excelența în medicina stilului de viață prin educație, cercetare și colaborare profesională în România.",
              [{ name: isEnglish ? "Home" : "Acasă", path: isEnglish ? "/en" : "/" }],
              "https://www.aslm.ro/images/aslm-logo.png"
            ),
          ]),
        }}
      />

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
              {isEnglish ? "Join the lifestyle medicine community" : "Alătură-te comunității medicinei stilului de viață"}
            </h2>
            <p 
              className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#D1D5DB' }}
            >
              {isEnglish
                ? "Be part of the professional community transforming healthcare through a lifestyle medicine approach."
                : "Fii parte din comunitatea profesioniștilor care transformă medicina românească prin abordarea stilului de viață."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={memberPath}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  color: '#0f2b1d', 
                  fontWeight: 600
                }}
              >
                {isEnglish ? "Join ASLM" : "Devino Membru"}
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
                {isEnglish ? "Contact us" : "Contactează-ne"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}

export default function Home() {
  return <HomePage locale="ro" />;
}
