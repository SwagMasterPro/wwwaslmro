"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Target,
  Lightbulb,
} from "lucide-react";

const involvementItems = [
  "Familiarizarea cu principiile medicinei stilului de viață (resursele științifice vor fi puse la dispoziție în limba română de către echipa ASLM)",
  "Promovarea responsabilă a informațiilor științifice și a inițiativelor ASLM",
  "Implicarea în comunicarea proiectelor educaționale și a evenimentelor",
  "Participarea la dezvoltarea comunității studențești ASLM",
];

const benefits = [
  {
    icon: Award,
    title: "Acces gratuit",
    description: "Acces gratuit la evenimentele organizate de ASLM",
  },
  {
    icon: CheckCircle,
    title: "Diplomă",
    description: "Diplomă de participare",
  },
  {
    icon: BookOpen,
    title: "Resurse educaționale",
    description: "Acces la resurse educaționale și informații actuale din domeniu",
  },
  {
    icon: Users,
    title: "Networking",
    description: "Networking cu lectori de top și profesioniști din domeniul sănătății, precum și cu alți studenți interesați de prevenția bolilor",
  },
  {
    icon: Lightbulb,
    title: "Proiect național",
    description: "Posibilitatea de implicare într-un proiect național în dezvoltare",
  },
  {
    icon: Target,
    title: "Oportunități de coordonare",
    description: "Oportunitatea de a fi selectat ulterior pentru roluri de coordonare în cadrul departamentului studențesc și de a accesa beneficii suplimentare",
  },
];

const registrationSteps = [
  {
    step: 1,
    title: "Trimite email",
    description: "Pentru a face parte din Departamentul Studențesc ASLM, te invităm să ne trimiți un email la adresa: contact@aslm.ro",
  },
  {
    step: 2,
    title: "Include informațiile",
    description: "Mesajul trebuie să includă următoarele informații: Nume și prenume, Universitatea, specializarea, anul de studiu și orașul",
  },
  {
    step: 3,
    title: "Domeniul de interes",
    description: "Domeniul de interes (nutriție, activitate fizică, somn, gestionarea stresului, relații sociale sau evitarea consumului de substanțe nocive cum sunt alcoolul, fumatul și alte substanțe)",
  },
];

export default function YAslmPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <section className="mesh-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-[var(--color-accent-500)]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-6">
              <GraduationCap className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white">Departamentul Studențesc</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              Y-ASLM
            </h1>
            <p className="text-xl text-white/80 mb-2">Young ASLM</p>
            <p className="text-lg text-white/70">
              Departamentul Studențesc ASLM
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-6">
              Implică-te activ în medicina stilului de viață
            </h2>
            <p className="text-body text-[var(--text-secondary)] leading-relaxed">
              Societatea Academică de Medicina Stilului de Viață lansează Departamentul Studențesc ASLM,
              o inițiativă dedicată studenților care își doresc să se implice activ în promovarea prevenției și a
              unui model modern de medicină, centrat pe prevenție și medicina stilului de viață.
            </p>
            <p className="text-body text-[var(--text-secondary)] leading-relaxed mt-4">
              Ne adresăm studenților motivați, interesați de educație medicală, prevenție și dezvoltare
              profesională, care își doresc să facă parte dintr-o comunitate academică în formare.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* What it involves */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-elevated p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center">
                  <Target className="w-6 h-6 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="text-title text-[var(--text-primary)]">
                  Ce presupune implicarea
                </h3>
              </div>
              <ul className="space-y-4">
                {involvementItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[var(--color-primary-600)]" />
                    </div>
                    <span className="text-body text-[var(--text-secondary)]">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Selection info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="card-elevated p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-100)] flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--color-accent-600)]" />
                </div>
                <h3 className="text-title text-[var(--text-primary)]">
                  Selecție
                </h3>
              </div>
              <p className="text-body text-[var(--text-secondary)] leading-relaxed">
                În funcție de nivelul de implicare și consecvență, studenții activi pot fi selectați pentru
                roluri de coordonare în cadrul Departamentului Studențesc și vor accesa beneficii
                suplimentare.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-[var(--color-accent-50)] border border-[var(--color-accent-100)]">
                <p className="text-body-sm text-[var(--color-accent-700)] font-medium">
                  Fii parte din generația tânără care contribuie la dezvoltarea medicinei stilului de viață în România.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-lg surface-tertiary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Beneficii pentru studenți
            </h2>
            <p className="text-body text-[var(--text-secondary)] max-w-2xl mx-auto">
              Alătură-te departamentului studențesc și accesează oportunități unice de dezvoltare
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-body-sm text-[var(--text-secondary)]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="section-lg surface-primary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Cum te poți înscrie
            </h2>
            <p className="text-body text-[var(--text-secondary)] max-w-2xl mx-auto">
              Urmează acești pași simpli pentru a face parte din Departamentul Studențesc ASLM
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {registrationSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--color-primary-600)] text-white font-bold text-lg flex items-center justify-center flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="card flex-1 p-6">
                    <h3 className="font-heading text-lg font-semibold text-[var(--text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-body text-[var(--text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <a
                href="mailto:contact@aslm.ro?subject=Inscriere Departamentul Studentesc ASLM"
                className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: '#166534',
                  color: '#FFFFFF'
                }}
              >
                <Mail className="w-5 h-5" />
                Trimite email de înscriere
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-caption text-[var(--text-secondary)] mt-4">
                contact@aslm.ro
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-md surface-tertiary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--color-primary-100)] flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-[var(--color-primary-600)]" />
            </div>
            <h2 className="text-headline text-[var(--text-primary)] mb-6">
              Fii parte din generația tânără care contribuie la dezvoltarea medicinei stilului de viață în România
            </h2>
            <p className="text-body text-[var(--text-secondary)] mb-8">
              Alătură-te Departamentului Studențesc ASLM și începe călătoria ta în medicina stilului de viață
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:contact@aslm.ro?subject=Inscriere Departamentul Studentesc ASLM"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: '#166534',
                  color: '#FFFFFF'
                }}
              >
                <Mail className="w-5 h-5" />
                Înscrie-te acum
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl border-2 transition-all duration-200"
                style={{
                  borderColor: '#166534',
                  color: '#166534'
                }}
              >
                Contactează-ne
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
