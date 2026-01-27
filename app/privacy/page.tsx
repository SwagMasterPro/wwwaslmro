"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

/**
 * Privacy Policy Page - Politica de Confidențialitate
 */

export default function PrivacyPolicy() {
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
            <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: '#74C69D' }} />
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
              Politica de Confidențialitate
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
                <h2 className="text-title text-[var(--text-primary)] mb-4">1. Introducere</h2>
                <p className="text-body mb-4">
                  Societatea Academică de Medicina Stilului de Viață (ASLM), cu sediul în Brașov, 
                  România, CIF 52379030, respectă confidențialitatea datelor dumneavoastră personale 
                  și se angajează să le protejeze în conformitate cu Regulamentul General privind 
                  Protecția Datelor (GDPR) și legislația română în vigoare.
                </p>
                <p className="text-body">
                  Această politică de confidențialitate descrie modul în care colectăm, utilizăm, 
                  stocăm și protejăm informațiile dumneavoastră personale atunci când vizitați 
                  site-ul nostru sau utilizați serviciile noastre.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">2. Datele pe care le colectăm</h2>
                <p className="text-body mb-4">Putem colecta următoarele tipuri de informații:</p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li><strong>Date de identificare:</strong> nume, prenume, titlu profesional</li>
                  <li><strong>Date de contact:</strong> adresă de email, număr de telefon, adresă poștală</li>
                  <li><strong>Date profesionale:</strong> locul de muncă, specializare medicală, număr de licență</li>
                  <li><strong>Date tehnice:</strong> adresă IP, tip de browser, date despre dispozitiv</li>
                  <li><strong>Date despre utilizare:</strong> paginile vizitate, timpul petrecut pe site</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">3. Scopul prelucrării datelor</h2>
                <p className="text-body mb-4">Utilizăm datele dumneavoastră pentru:</p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Gestionarea calității de membru ASLM</li>
                  <li>Comunicarea informațiilor despre evenimente, cursuri și conferințe</li>
                  <li>Trimiterea newsletter-ului și materialelor educaționale</li>
                  <li>Procesarea înscrierilor la evenimente</li>
                  <li>Îmbunătățirea serviciilor și a experienței utilizatorului</li>
                  <li>Respectarea obligațiilor legale</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">4. Temeiul legal al prelucrării</h2>
                <p className="text-body mb-4">Prelucrăm datele dumneavoastră pe baza:</p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li><strong>Consimțământului:</strong> pentru newsletter și comunicări de marketing</li>
                  <li><strong>Executării contractului:</strong> pentru gestionarea calității de membru</li>
                  <li><strong>Interesului legitim:</strong> pentru îmbunătățirea serviciilor</li>
                  <li><strong>Obligației legale:</strong> pentru conformarea cu legislația aplicabilă</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">5. Partajarea datelor</h2>
                <p className="text-body mb-4">
                  Nu vindem și nu închiriem datele dumneavoastră personale terților. 
                  Putem partaja informații cu:
                </p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li>Furnizori de servicii care ne ajută să operăm site-ul și serviciile</li>
                  <li>Organizații partenere pentru evenimente comune (cu acordul dumneavoastră)</li>
                  <li>Autorități publice, când legea o impune</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">6. Drepturile dumneavoastră</h2>
                <p className="text-body mb-4">Conform GDPR, aveți dreptul:</p>
                <ul className="list-disc list-inside space-y-2 text-body">
                  <li><strong>De acces:</strong> să solicitați o copie a datelor dumneavoastră</li>
                  <li><strong>De rectificare:</strong> să corectați datele inexacte</li>
                  <li><strong>De ștergere:</strong> să solicitați ștergerea datelor („dreptul de a fi uitat")</li>
                  <li><strong>De restricționare:</strong> să limitați prelucrarea datelor</li>
                  <li><strong>De portabilitate:</strong> să primiți datele într-un format structurat</li>
                  <li><strong>De opoziție:</strong> să vă opuneți prelucrării în anumite situații</li>
                  <li><strong>De retragere a consimțământului:</strong> în orice moment, fără a afecta legalitatea prelucrării anterioare</li>
                </ul>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">7. Securitatea datelor</h2>
                <p className="text-body">
                  Implementăm măsuri tehnice și organizatorice adecvate pentru a proteja 
                  datele dumneavoastră împotriva accesului neautorizat, pierderii sau distrugerii. 
                  Acestea includ criptarea datelor, controale de acces și audituri regulate de securitate.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">8. Păstrarea datelor</h2>
                <p className="text-body">
                  Păstrăm datele dumneavoastră personale doar atât timp cât este necesar pentru 
                  scopurile pentru care au fost colectate sau conform cerințelor legale. 
                  După încetarea calității de membru, datele vor fi păstrate conform obligațiilor 
                  legale și apoi șterse în mod securizat.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">9. Cookie-uri</h2>
                <p className="text-body">
                  Site-ul nostru utilizează cookie-uri pentru a îmbunătăți experiența de navigare. 
                  Acestea includ cookie-uri esențiale pentru funcționarea site-ului și cookie-uri 
                  analitice pentru înțelegerea modului în care este utilizat site-ul. 
                  Puteți gestiona preferințele cookie din setările browserului dumneavoastră.
                </p>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">10. Contact</h2>
                <p className="text-body mb-4">
                  Pentru orice întrebări privind această politică sau pentru exercitarea 
                  drepturilor dumneavoastră, ne puteți contacta la:
                </p>
                <div className="bg-[var(--surface-secondary)] p-4 rounded-lg">
                  <p className="text-body"><strong>Societatea Academică de Medicina Stilului de Viață</strong></p>
                  <p className="text-body">Str. Iuliu Maniu 41A, Brașov, România</p>
                  <p className="text-body">Email: contact@aslm.ro</p>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="text-title text-[var(--text-primary)] mb-4">11. Modificări ale politicii</h2>
                <p className="text-body">
                  Ne rezervăm dreptul de a actualiza această politică de confidențialitate. 
                  Modificările vor fi publicate pe această pagină cu data ultimei actualizări. 
                  Vă încurajăm să verificați periodic această pagină pentru a fi la curent 
                  cu practicile noastre de confidențialitate.
                </p>
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
