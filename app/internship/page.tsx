"use client";

import { motion } from "framer-motion";

/**
 * Internship Page - ASLM Student Leader Program
 */

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
    </div>
  );
}
