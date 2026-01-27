"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

/**
 * Terms of Service Page - Termeni și Condiții
 */

export default function TermsOfService() {
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
            <FileText className="w-12 h-12 mx-auto mb-4" style={{ color: '#74C69D' }} />
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Termeni și Condiții
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              Ultima actualizare: Ianuarie 2026
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
              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">1. Informații generale</h2>
                <p className="text-body mb-4">
                  Acest site web este operat de Societatea Academică de Medicina Stilului de Viață 
                  (ASLM), o asociație non-profit înregistrată în România, cu sediul în Brașov, 
                  str. Iuliu Maniu 41A, CIF 52379030.
                </p>
                <p className="text-body">
                  Prin accesarea și utilizarea acestui site web, acceptați să fiți obligat de acești 
                  termeni și condiții. Dacă nu sunteți de acord cu oricare dintre acești termeni, 
                  vă rugăm să nu utilizați site-ul nostru.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">2. Definiții</h2>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li><strong>„ASLM"</strong> sau <strong>„noi"</strong> se referă la Societatea Academică de Medicina Stilului de Viață</li>
                  <li><strong>„Site"</strong> se referă la www.aslm.ro și toate subdomeniile asociate</li>
                  <li><strong>„Utilizator"</strong> sau <strong>„dumneavoastră"</strong> se referă la orice persoană care accesează sau utilizează site-ul</li>
                  <li><strong>„Membru"</strong> se referă la persoanele care au o calitate de membru activ în ASLM</li>
                  <li><strong>„Conținut"</strong> se referă la toate materialele disponibile pe site</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">3. Utilizarea site-ului</h2>
                <p className="text-body mb-4">Prin utilizarea acestui site, vă angajați:</p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Să utilizați site-ul doar în scopuri legale și în conformitate cu acești termeni</li>
                  <li>Să nu utilizați site-ul în moduri care ar putea deteriora, dezactiva sau supraîncărca sistemele noastre</li>
                  <li>Să nu încercați să accesați zone sau funcționalități pentru care nu aveți autorizație</li>
                  <li>Să nu transmiteți viruși, malware sau alt cod dăunător</li>
                  <li>Să nu colectați informații despre alți utilizatori fără consimțământul acestora</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">4. Calitatea de membru</h2>
                <p className="text-body mb-4">
                  Membrii ASLM beneficiază de acces la resurse și servicii suplimentare. 
                  Pentru a deveni membru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Trebuie să îndepliniți criteriile de eligibilitate specifice categoriei de membru dorite</li>
                  <li>Trebuie să completați formularul de înscriere cu informații corecte și complete</li>
                  <li>Trebuie să achitați cotizația de membru, dacă este cazul</li>
                  <li>Trebuie să respectați codul de etică și regulamentul intern al ASLM</li>
                </ul>
                <p className="text-body mt-4">
                  ASLM își rezervă dreptul de a accepta sau refuza cereri de înscriere și de a 
                  suspenda sau exclude membri care încalcă regulamentele asociației.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">5. Proprietate intelectuală</h2>
                <p className="text-body mb-4">
                  Tot conținutul acestui site, incluzând dar fără a se limita la texte, grafice, 
                  logo-uri, imagini, materiale audio și video, este proprietatea ASLM sau a 
                  licențiatorilor săi și este protejat de legile dreptului de autor și ale 
                  proprietății intelectuale.
                </p>
                <p className="text-body">
                  Aveți permisiunea de a vizualiza, descărca și imprima conținutul site-ului 
                  pentru uz personal, non-comercial, cu condiția să păstrați toate notificările 
                  privind drepturile de autor. Orice altă utilizare necesită acordul nostru scris prealabil.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">6. Conținut educațional și medical</h2>
                <p className="text-body mb-4">
                  Informațiile prezentate pe acest site au scop educațional și informativ pentru 
                  profesioniștii din domeniul sănătății. Acestea:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Nu constituie sfat medical personalizat</li>
                  <li>Nu înlocuiesc consultul medical profesional</li>
                  <li>Nu trebuie utilizate pentru autodiagnosticare sau autotratament</li>
                  <li>Sunt furnizate „ca atare", fără garanții de niciun fel</li>
                </ul>
                <p className="text-body mt-4">
                  Profesioniștii din sănătate trebuie să își utilizeze propria judecată clinică 
                  în aplicarea informațiilor din materialele noastre.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">7. Evenimente și înregistrări</h2>
                <p className="text-body mb-4">
                  Pentru evenimentele organizate de ASLM (congrese, conferințe, webinarii):
                </p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Înscrierile sunt supuse disponibilității și confirmării</li>
                  <li>Taxele de participare, odată achitate, sunt rambursabile conform politicii specifice fiecărui eveniment</li>
                  <li>ASLM își rezervă dreptul de a modifica programul sau de a anula evenimente, cu notificarea participanților</li>
                  <li>Participanții sunt responsabili pentru propriile aranjamente de călătorie și cazare</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">8. Limitarea răspunderii</h2>
                <p className="text-body mb-4">
                  În măsura permisă de lege, ASLM nu va fi răspunzătoare pentru:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Daune directe, indirecte, incidentale sau consecutive rezultate din utilizarea site-ului</li>
                  <li>Întreruperi sau erori în funcționarea site-ului</li>
                  <li>Pierderea de date sau informații</li>
                  <li>Acțiunile terților sau conținutul site-urilor externe la care există linkuri</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">9. Linkuri externe</h2>
                <p className="text-body">
                  Site-ul nostru poate conține linkuri către site-uri externe. Aceste linkuri 
                  sunt furnizate doar pentru comoditate și nu implică aprobarea sau responsabilitatea 
                  noastră pentru conținutul sau practicile acelor site-uri. Vă încurajăm să citiți 
                  termenii și politicile de confidențialitate ale oricărui site extern pe care îl vizitați.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">10. Modificări ale termenilor</h2>
                <p className="text-body">
                  Ne rezervăm dreptul de a modifica acești termeni și condiții în orice moment. 
                  Modificările vor fi publicate pe această pagină cu data ultimei actualizări. 
                  Continuarea utilizării site-ului după publicarea modificărilor constituie 
                  acceptarea noilor termeni.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">11. Legea aplicabilă</h2>
                <p className="text-body">
                  Acești termeni și condiții sunt guvernați de legea română. Orice dispută 
                  care decurge din sau în legătură cu acești termeni va fi supusă jurisdicției 
                  exclusive a instanțelor competente din România.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">12. Contact</h2>
                <p className="text-body mb-4">
                  Pentru orice întrebări privind acești termeni și condiții, ne puteți contacta la:
                </p>
                <div className="bg-[var(--surface-secondary)] p-4 rounded-lg">
                  <p className="text-body"><strong>Societatea Academică de Medicina Stilului de Viață</strong></p>
                  <p className="text-body">Str. Iuliu Maniu 41A, Brașov, România</p>
                  <p className="text-body">Email: contact@aslm.ro</p>
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
    </div>
  );
}
