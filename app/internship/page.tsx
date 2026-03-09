"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import FAQSection from "@/components/seo/FAQSection";
import { generateFAQSchema, generateWebPageSchema } from "@/lib/structured-data";

/**
 * Internship Page - ASLM Student Leader Program
 */

const internshipFAQs = [
  {
    question: "Cine se poate înscrie în programul de internship ASLM Student Leader?",
    answer: "Programul este dedicat studenților motivați, cu interes real pentru prevenție, educație medicală și dezvoltare profesională. Este adresat studenților de la medicină, farmacie, nutriție, psihologie și alte specializări din domeniul sănătății care doresc să promoveze medicina stilului de viață în comunitatea academică."
  },
  {
    question: "Ce responsabilități are un ASLM Student Leader?",
    answer: "Responsabilitățile includ: informare temeinică despre medicina stilului de viață (cu bibliografie și surse oficiale transmise de echipa ASLM), promovarea responsabilă a materialelor ASLM și a Congresului de Medicina Stilului de Viață în mediul academic și online, republicarea și distribuirea conținutului educațional, și susținerea inițiativelor științifice ale societății."
  },
  {
    question: "Cum se desfășoară procesul de selecție?",
    answer: "Accesul în program se face pe baza unei scrisori de intenție. Candidații transmit un email la contact@aslm.ro cu o scurtă prezentare personală (nume, universitate, specializare, an de studiu, oraș), motivația pentru care doresc să facă parte din program, și domeniul lor de interes în medicina stilului de viață cu referire la cei șase piloni (nutriție, activitate fizică, somn, gestionare stres, relații sociale, evitare substanțe toxice)."
  },
  {
    question: "Ce beneficii primesc studenții acceptați în program?",
    answer: "Studenții acceptați primesc: <strong>certificat oficial de voluntar în cadrul ASLM</strong>, implicare într-o comunitate academică aflată în dezvoltare, <strong>acces gratuit la Congresul de Medicina Stilului de Viață - Ediția 2026</strong>, posibilitatea de a interacționa cu profesioniști din domeniul medical, și recomandare pentru cei care demonstrează consecvență și profesionalism."
  },
  {
    question: "Cât timp durează programul de internship?",
    answer: "Programul are o durată flexibilă, cu evaluare continuă pe baza implicării și consecvenței demonstrate. Studenții care se dovedesc dedicați și profesionali pot primi recomandări oficiale din partea ASLM și pot continua colaborarea pe termen lung."
  },
  {
    question: "Este programul plătit sau voluntar?",
    answer: "Este un program de voluntariat care oferă beneficii educaționale și profesionale semnificative, inclusiv acces gratuit la Congresul ASLM 2026, certificat oficial, networking cu profesioniști din domeniul medical, și oportunități de dezvoltare în domeniul medicinei stilului de viață."
  },
];

export default function Internship() {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="mesh-hero section-lg">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Internship
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-elevated p-8 md:p-12">
              <div className="prose prose-lg max-w-none" style={{ color: 'var(--text-primary)' }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                  Înscrie-te în Programul de Internship ASLM Student Leader
                </h2>
                
                <p className="mb-4">
                  Societatea Academică de Medicina Stilului de Viață lansează un program de internship dedicat
                  studenților care doresc să se implice activ în promovarea medicinei stilului de viață și a valorilor
                  preventive în comunitatea academică și profesională.
                </p>
                
                <p className="mb-6">
                  Acest program reprezintă o inițiativă selectivă, adresată studenților motivați, cu interes real
                  pentru prevenție, educație medicală și dezvoltare profesională. Ne dorim alături de noi tineri
                  care înțeleg că medicina viitorului înseamnă responsabilitate, coerență științifică și implicare
                  constantă.
                </p>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
                  Ce presupune rolul de ASLM Lifestyle Medicine Student Leader?
                </h3>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>
                    Informare temeinică despre medicina stilului de viață (bibliografia și sursele oficiale vor
                    fi transmise de către echipa ASLM)
                  </li>
                  <li>
                    Promovarea responsabilă a materialelor ASLM și a Congresului de Medicina Stilului de
                    Viață în mediul academic și online
                  </li>
                  <li>Republicarea și distribuirea conținutului educațional</li>
                  <li>Susținerea inițiativelor științifice ale societății</li>
                </ul>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
                  Ce oferim?
                </h3>
                
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Certificat oficial de voluntar în cadrul ASLM</li>
                  <li>Implicare într-o comunitate academică aflată în dezvoltare</li>
                  <li>Acces gratuit la Congresul de Medicina Stilului de Viață – Ediția 2026</li>
                  <li>Posibilitatea de a interacționa cu profesioniști din domeniul medical</li>
                  <li>Recomandare pentru studenții care demonstrează consecvență și profesionalism</li>
                </ul>

                <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
                  Procesul de selecție
                </h3>
                
                <p className="mb-4">
                  Accesul în program se face pe baza unei scrisori de intenție. Studenții interesați sunt invitați să
                  transmită un email la adresa <a href="mailto:contact@aslm.ro" className="text-[var(--color-primary-600)] hover:underline">contact@aslm.ro</a>
                </p>
                
                <p className="mb-2">Mesajul trebuie să includă:</p>
                
                <p className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                  – o scurtă prezentare personală (nume și prenume, universitatea, specializarea, anul de studiu
                  și orașul)
                </p>
                <p className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                  – motivația pentru care doresc să facă parte din program
                </p>
                <p className="mb-6" style={{ paddingLeft: '1.5rem' }}>
                  – domeniul de interes în medicina stilului de viață [cu referire la cei șase piloni ai medicinei
                  stilului de viațaă nutriție echilibrată, activitate fizică, somn, gestionarea stresului, relații sociale,
                  evitarea consumului de substanțe toxice).
                </p>

                <p className="mb-4 font-semibold">
                  Alătură-te unei inițiative care modelează medicina preventivă a viitorului.
                </p>

                <p className="mb-0">
                  Oferim un cadru de formare pentru viitorii profesioniști ai medicinei stilului de viață.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        title="Întrebări Frecvente despre Programul de Internship"
        subtitle="Află mai multe despre procesul de aplicare, responsabilități și beneficii"
        faqs={internshipFAQs}
      />

      {/* Structured Data for AI Search Optimization */}
      <Script
        id="internship-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateFAQSchema(internshipFAQs),
            generateWebPageSchema(
              "https://aslm.ro/internship",
              "Program Internship ASLM Student Leader",
              "Înscrie-te în programul de internship ASLM Student Leader. Program dedicat studenților care doresc să promoveze medicina stilului de viață în comunitatea academică. Certificat oficial, acces gratuit la Congres 2026.",
              [
                { name: "Acasă", path: "/" },
                { name: "Internship", path: "/internship" },
              ]
            ),
          ]),
        }}
      />
    </div>
  );
}
