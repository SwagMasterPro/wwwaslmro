"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Clock
} from "lucide-react";

/**
 * Events Page - ASLM NGO Website
 */

const upcomingEvents = [
  {
    title: "Congresul Inaugural ASLM",
    date: "10-12 Mai 2026",
    location: "Universitatea Transilvania, Brașov",
    type: "Congres",
    description: "Primul congres al Societății Academice de Medicina Stilului de Viață. Format hibrid cu 10 secțiuni tematice, 30+ speakeri și credite EMC.",
    link: "https://congres.aslm.ro",
    featured: true
  }
];

const pastEvents = [
  {
    title: "Webinar: Introducere în MSV",
    date: "Ianuarie 2026",
    type: "Webinar",
    description: "Webinar introductiv despre principiile de bază ale medicinei stilului de viață."
  },
  {
    title: "Workshop: Nutriție Plant-Based",
    date: "Decembrie 2025",
    type: "Workshop",
    description: "Workshop practic despre alimentația bazată pe plante în practica clinică."
  }
];

export default function EvenimentePage() {
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
              Calendar
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Evenimente ASLM
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Descoperă evenimentele organizate de ASLM - congrese, conferințe, 
              webinarii și workshop-uri dedicate medicinei stilului de viață.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Eveniment Principal</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Următorul Eveniment Mare
            </h2>
          </motion.div>

          {upcomingEvents.filter(e => e.featured).map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl overflow-hidden shadow-xl"
              style={{ backgroundColor: '#1B4332' }}
            >
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <span 
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
                    style={{ backgroundColor: 'rgba(116, 198, 157, 0.2)', color: '#74C69D' }}
                  >
                    {event.type}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-white">
                    {event.title}
                  </h3>
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/80">
                      <Calendar className="w-5 h-5 text-[#74C69D]" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="w-5 h-5 text-[#74C69D]" />
                      {event.location}
                    </div>
                  </div>
                  
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl group"
                    style={{ backgroundColor: '#FFFFFF', color: '#1B4332' }}
                  >
                    Vizitează site-ul
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image
                    src="/images/banner-congres-2026.png"
                    alt="Congresul Inaugural ASLM 2026 - Interdisciplinaritate în medicina stilului de viață"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-overline mb-3">Istoric</p>
            <h2 className="text-headline text-[var(--text-primary)] mb-4">
              Evenimente Anterioare
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-[var(--color-primary-600)] uppercase tracking-wider">
                      {event.type}
                    </span>
                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-body-sm mb-3">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
                      <Clock className="w-4 h-4" />
                      {event.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
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
            <Calendar className="w-10 h-10 mx-auto mb-6" style={{ color: '#74C69D' }} />
            <h2 
              className="font-heading text-3xl md:text-4xl font-bold mb-6"
              style={{ color: '#FFFFFF' }}
            >
              Nu rata niciun eveniment
            </h2>
            <p 
              className="text-lg mb-8 max-w-2xl mx-auto"
              style={{ color: '#D1D5DB' }}
            >
              Abonează-te la newsletter pentru a primi notificări despre evenimentele ASLM.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl shadow-lg transition-all group"
              style={{ backgroundColor: '#FFFFFF', color: '#0f2b1d', fontWeight: 600 }}
            >
              Contactează-ne
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
