"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mic, Calendar, FileText, Users, CheckCircle, Clock, Presentation } from "lucide-react";

/**
 * Oral Communications Page - Comunicări Orale
 */

export default function ComunicariOralePage() {
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
            <Mic className="w-12 h-12 mx-auto mb-4" style={{ color: '#74C69D' }} />
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Comunicări Orale
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Instrucțiuni pentru autorii de COMUNICĂRI ORALE
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
                  Autorii și coautorii comunicărilor orale beneficiază de <strong>credite suplimentare</strong>, 
                  conform reglementărilor Colegiului Medicilor din România (CMR).
                </p>
                <p className="text-body">
                  La secțiunea Comunicări orale se solicită prezentarea unor studii clinice, observaționale 
                  sau experimentale din domeniul medicinei stilului de viață, corelate cu pilonii acestei 
                  discipline: <strong>nutriție, activitate fizică, somn, gestionarea stresului, relații 
                  sociale și evitarea factorilor nocivi</strong>. De asemenea, pot fi prezentate subiecte de 
                  actualitate privind prevenția și managementul bolilor cronice, dintr-o perspectivă 
                  interdisciplinară.
                </p>
              </div>

              {/* Participanți */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)] mb-4">Participanți</h2>
                    <p className="text-body">
                      La această secțiune sunt invitați să participe cu lucrări științifice:
                    </p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-body ml-16">
                  <li>Medici tineri</li>
                  <li>Doctori în medicină</li>
                  <li>Doctoranzi</li>
                  <li>Alți profesioniști din domeniul sănătății implicați în echipe de cercetare sau în 
                      proiecte interdisciplinare dedicate prevenției și managementului bolilor cronice</li>
                </ul>
              </div>

              {/* Înscriere */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-100)] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[var(--color-accent-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)]">Înscriere Comunicări Orale</h2>
                  </div>
                </div>
                
                <div className="space-y-6 ml-16">
                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] mb-1">
                        Titlul (de lucru) al expunerii
                      </p>
                      <p className="text-body">
                        Se trimite până la <strong>10 martie 2026</strong> pe adresa{" "}
                        <a href="mailto:contact@aslm.ro" className="text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] font-semibold">
                          contact@aslm.ro
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)] flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-semibold text-[var(--text-primary)] mb-1">
                        Textul (rezumat) și titlul final
                      </p>
                      <p className="text-body">
                        Până la <strong>10 aprilie 2026</strong> pe adresa{" "}
                        <a href="mailto:contact@aslm.ro" className="text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] font-semibold">
                          contact@aslm.ro
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmare */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)] mb-4">Confirmare</h2>
                    <p className="text-body mb-4">
                      Lucrările acceptate de Comitetul Științific vor fi confirmate autorilor prin e-mail 
                      și vor fi publicate în <strong>Volumul de rezumate al Conferinței</strong>.
                    </p>
                    <p className="text-body mb-4">
                      Pentru includerea în Programul Conferinței și pentru prezentarea Comunicării orale, 
                      <strong> primul autor</strong> trebuie să achite taxa de participare, primind Volumul 
                      de rezumate și Certificatul EMC special (care atestă contribuția științifică respectivă).
                    </p>
                    <p className="text-body">
                      <strong>Coautorii</strong> au obligația să se înscrie la Conferință și să achite 
                      taxa de participare pentru a primi Volumul de rezumate și Certificat EMC special.
                    </p>
                  </div>
                </div>
              </div>

              {/* Drepturi Comitet */}
              <div className="card p-8 bg-[var(--surface-tertiary)]">
                <h3 className="text-title text-[var(--text-primary)] mb-4">
                  Comitetul Științific își rezervă:
                </h3>
                <ul className="space-y-3 text-body">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary-600)] mt-2 flex-shrink-0"></span>
                    <span>Dreptul de a accepta sau respinge lucrările primite</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary-600)] mt-2 flex-shrink-0"></span>
                    <span>Dreptul de a propune schimbarea modului de prezentare al lucrării 
                    (Comunicare poster), obligându-se să anunțe acest lucru în timp util</span>
                  </li>
                </ul>
              </div>

              {/* Specificații Prezentare */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Durata */}
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-100)] flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[var(--color-accent-600)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Durata</h3>
                  </div>
                  <p className="text-body">
                    Fiecare Comunicare orală va avea o durată de <strong>8 minute</strong> și va fi 
                    urmată de discuții, <strong>2-3 minute</strong>.
                  </p>
                </div>

                {/* Structura */}
                <div className="card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-100)] flex items-center justify-center">
                      <Presentation className="w-5 h-5 text-[var(--color-primary-600)]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">Structura</h3>
                  </div>
                  <p className="text-body mb-3">Prezentarea va avea următoarea structură:</p>
                  <ul className="text-body-sm space-y-1">
                    <li>• Introducere</li>
                    <li>• Obiective (principal și secundare)</li>
                    <li>• Metodă</li>
                    <li>• Rezultate</li>
                    <li>• Concluzii</li>
                  </ul>
                </div>
              </div>

              {/* Conținut */}
              <div className="card p-8">
                <h3 className="text-title text-[var(--text-primary)] mb-4">Conținut</h3>
                <p className="text-body">
                  Prezentarea <strong>nu va cuprinde toate datele studiului</strong>. Vor fi expuse 
                  doar datele importante pentru aspectele care se doresc a fi comunicate.
                </p>
              </div>

              {/* Diapozitive */}
              <div className="card p-8">
                <h3 className="text-title text-[var(--text-primary)] mb-4">Diapozitive</h3>
                <div className="space-y-4 text-body">
                  <p>
                    Vor fi utilizate <strong>puține diapozitive</strong>, oferind astfel audienței 
                    suficient timp să citească diapozitivul și să înțeleagă ceea ce autorul încearcă 
                    să comunice.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Orientativ, se va calcula <strong>un diapozitiv pe minut</strong></li>
                    <li>Diapozitivele cu text vor fi sintetice, cu aproximativ <strong>7 rânduri pe diapozitiv</strong></li>
                    <li>Fundalul va fi <strong>alb</strong>, iar pentru text se va folosi o culoare închisă (negru, bleumarin)</li>
                    <li>Se vor folosi <strong>caractere suficient de mari</strong> pentru a fi ușor lizibile și în ultimele rânduri ale sălii</li>
                  </ul>
                </div>
              </div>

              {/* Redactarea rezumatului */}
              <div className="card p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-100)] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-[var(--color-accent-600)]" />
                  </div>
                  <div>
                    <h2 className="text-title text-[var(--text-primary)]">
                      Redactarea rezumatului pentru Comunicări Orale
                    </h2>
                  </div>
                </div>

                <div className="space-y-4 text-body ml-16">
                  <p>
                    Pentru publicare, textul va fi redactat în limbile <strong>română</strong> (folosind 
                    diacriticele românești) sau <strong>engleză</strong>.
                  </p>

                  <div className="space-y-4 mt-6">
                    <div className="flex gap-3">
                      <span className="font-semibold text-[var(--color-primary-600)] flex-shrink-0">1.</span>
                      <p>
                        Articolele se trimit în format <strong>Word (extensia *.DOC)</strong>, cu corp de 
                        literă de mărimea <strong>12</strong>, spațiate la <strong>un rând și jumătate</strong>.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="font-semibold text-[var(--color-primary-600)] flex-shrink-0">2.</span>
                      <p>
                        Manuscrisul va fi redactat cu respectarea următoarei succesiuni:{" "}
                        <strong>titlul, autorii, afiliațiile, rezumatul</strong>.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="font-semibold text-[var(--color-primary-600)] flex-shrink-0">3.</span>
                      <p>
                        Autorii vor furniza <strong>numele și prenumele complete</strong>, instituția 
                        la care profesează, orașul și țara de reședință la data redactării manuscrisului, 
                        precum și un <strong>e-mail de contact</strong> (standard internațional ISI).
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <span className="font-semibold text-[var(--color-primary-600)] flex-shrink-0">4.</span>
                      <p>
                        Rezumatul trebuie să se încadreze în limita a{" "}
                        <strong>1.500 de semne tipografice</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sfaturi */}
              <div className="card p-8 bg-[var(--color-primary-50)]">
                <h3 className="text-title text-[var(--text-primary)] mb-4">Sfaturi</h3>
                <ul className="space-y-3 text-body">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
                    <span>Nu se recomandă redactarea textului integral cu majuscule</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
                    <span>Se vor evita tabelele cu multe rânduri și coloane</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--color-primary-600)] mt-0.5 flex-shrink-0" />
                    <span>Se preferă graficele în locul tabelelor</span>
                  </li>
                </ul>
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
    </div>
  );
}
