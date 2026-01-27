"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { MapPin, Mail, Phone, Clock, Facebook, Linkedin, Instagram, ArrowRight, Send, CheckCircle } from "lucide-react";

/**
 * Contact Page - ASLM NGO Website
 */

const contactInfo = [
  {
    icon: MapPin,
    title: "Sediu",
    content: "Str. Iuliu Maniu 41A, Brașov",
    link: null,
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@aslm.ro",
    link: "mailto:contact@aslm.ro",
  },
  {
    icon: Clock,
    title: "Program",
    content: "Luni - Vineri, 9:00 - 17:00",
    link: null,
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

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
              Suntem aici să te ajutăm
            </span>
            <h1 className="text-display text-white mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
              Contact
            </h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Ai întrebări despre ASLM sau medicina stilului de viață? Echipa noastră 
              este aici să te ajute. Trimite-ne un mesaj și îți vom răspunde cât mai curând.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-lg surface-primary">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-overline text-[var(--color-primary-600)] mb-2 block">
                  Informații
                </span>
                <h2 className="text-headline text-[var(--text-primary)] mb-6">
                  Date de contact
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card padding="sm" className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary-50)] flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-[var(--color-primary-700)]" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--text-primary)] text-sm mb-0.5">
                            {item.title}
                          </p>
                          {item.link ? (
                            <a
                              href={item.link}
                              className="text-[var(--text-secondary)] hover:text-[var(--color-primary-700)] transition-colors"
                            >
                              {item.content}
                            </a>
                          ) : (
                            <p className="text-[var(--text-secondary)]">
                              {item.content}
                            </p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-4">
                    Urmărește-ne
                  </h3>
                  <div className="flex items-center gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="
                          w-10 h-10 rounded-lg 
                          bg-[var(--color-primary-50)] 
                          flex items-center justify-center 
                          text-[var(--color-primary-700)] 
                          hover:bg-[var(--color-primary-800)] hover:text-white 
                          transition-colors duration-200
                        "
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card variant="elevated" padding="lg">
                  <span className="text-overline text-[var(--color-primary-600)] mb-2 block">
                    Formular
                  </span>
                  <h2 className="text-headline text-[var(--text-primary)] mb-2">
                    Trimite-ne un mesaj
                  </h2>
                  <p className="text-body mb-8">
                    Completează formularul pentru întrebări, solicitări sau 
                    oportunități de colaborare. Suntem deschiși dialogului.
                  </p>
                  
                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-[var(--color-primary-600)]" />
                      </div>
                      <h3 className="text-title text-[var(--text-primary)] mb-2">
                        Mesaj trimis cu succes!
                      </h3>
                      <p className="text-body mb-6">
                        Îți mulțumim pentru mesaj. Te vom contacta în cel mai scurt timp posibil.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={() => setIsSubmitted(false)}
                      >
                        Trimite alt mesaj
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <Input
                          label="Nume complet"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Numele tău"
                          required
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@exemplu.com"
                          required
                        />
                      </div>
                      <Input
                        label="Subiect"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Despre ce vrei să discutăm?"
                        required
                      />
                      <Textarea
                        label="Mesaj"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Scrie mesajul tău aici..."
                        required
                      />
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          size="lg"
                          isLoading={isSubmitting}
                          rightIcon={<Send className="w-4 h-4" />}
                        >
                          Trimite mesajul
                        </Button>
                      </div>
                    </form>
                  )}
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-lg surface-secondary">
        <div className="container-default">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-overline text-[var(--color-primary-600)] mb-2 block">
              Locație
            </span>
            <h2 className="text-headline text-[var(--text-primary)] mb-3">
              Unde ne găsești
            </h2>
            <p className="text-body">
              Str. Iuliu Maniu 41A, Brașov, România
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl overflow-hidden shadow-[var(--shadow-lg)] h-[400px] bg-[var(--surface-tertiary)]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2788.2!2d25.5875!3d45.6529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b35b9f8de00001%3A0x1!2sBrasov!5e0!3m2!1sro!2sro!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sediul ASLM - Brașov"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-md surface-primary">
        <div className="container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-headline text-[var(--text-primary)] mb-3">
              Vrei să devii membru?
            </h2>
            <p className="text-body mb-8">
              Alătură-te comunității de profesioniști dedicați medicinei stilului de viață.
            </p>
            <Link
              href="/membri"
              className="
                inline-flex items-center gap-2 px-6 py-3
                bg-[var(--color-primary-800)] text-white
                font-semibold rounded-xl
                hover:bg-[var(--color-primary-700)]
                transition-all duration-200
                group
              "
            >
              Înscrie-te ca membru
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
