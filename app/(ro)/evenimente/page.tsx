"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, ExternalLink, MapPin } from "lucide-react";
import { completedEvents, events } from "@/data/events";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { upcomingConfirmedEvents } from "@/data/events";
import { generateEventSchema, generateWebPageSchema } from "@/lib/structured-data";

const featuredEvent = events.find((event) => event.featured);
const archiveEvents = completedEvents.filter((event) => !event.featured);
const eventSchemas = upcomingConfirmedEvents
  .map(generateEventSchema)
  .filter((schema) => schema !== null);

export default function EvenimentePage() {
  return (
    <div className="pt-20">
      <section className="mesh-hero section-lg">
        <div className="container-default text-center">
          <span className="text-overline text-[var(--color-primary-300)] mb-3 block">Calendar și arhivă</span>
          <h1 className="text-display text-white" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
            Evenimente ASLM
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85">
            Congrese, conferințe și workshop-uri ASLM, cu informații clare despre statutul fiecărui eveniment și resursele disponibile participanților.
          </p>
        </div>
      </section>

      {featuredEvent && (
        <section className="section-lg surface-primary">
          <div className="container-wide">
            <div className="mb-12 text-center">
              <p className="text-overline mb-3">Arhivă principală</p>
              <h2 className="text-headline text-[var(--text-primary)]">Congresul ASLM 2026</h2>
            </div>

            <div className="overflow-hidden rounded-2xl shadow-xl" style={{ backgroundColor: "#1B4332" }}>
              <div className="grid lg:grid-cols-2">
                <div className="p-8 md:p-12">
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-[#74C69D]" style={{ backgroundColor: "rgba(116, 198, 157, 0.2)" }}>
                    Eveniment încheiat
                  </span>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-white md:text-3xl">{featuredEvent.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/75">{featuredEvent.summary}</p>
                  <div className="my-8 space-y-3 text-white/80">
                    <div className="flex items-center gap-3"><Calendar className="h-5 w-5 text-[#74C69D]" />{featuredEvent.displayDate}</div>
                    <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-[#74C69D]" />{featuredEvent.location}</div>
                    <div className="flex items-center gap-3"><Clock className="h-5 w-5 text-[#74C69D]" />{featuredEvent.emc.details}</div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {featuredEvent.detailsUrl && (
                      <a href={featuredEvent.detailsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[#1B4332] transition hover:bg-[#f3f8f4]">
                        Site-ul congresului <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    <Link href="/news/comunicate-de-presa/proceedings-congres-inaugural-aslm-2026" className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                      Proceedings 2026 <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="relative min-h-[300px] lg:min-h-full">
                  <Image src={featuredEvent.image.src} alt={featuredEvent.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section-lg surface-secondary">
        <div className="container-wide">
          <div className="mb-12 text-center">
            <p className="text-overline mb-3">Istoric</p>
            <h2 className="text-headline text-[var(--text-primary)]">Evenimente anterioare</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {archiveEvents.map((event, index) => (
              <motion.article key={event.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-100)]"><Calendar className="h-6 w-6 text-[var(--color-primary-600)]" /></div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary-600)]">{event.format} · încheiat</p>
                    <h3 className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{event.title}</h3>
                    <p className="mt-2 text-body-sm">{event.summary}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)]"><Clock className="h-4 w-4" />{event.displayDate}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-lg surface-primary">
        <div className="container-wide grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Link href="/evenimente/credite-emc" className="card p-6 transition-shadow hover:shadow-lg">
            <p className="text-overline mb-2">EMC</p>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Credite și puncte EMC</h2>
            <p className="mt-2 text-body-sm">Cum verifici statutul creditării pentru fiecare eveniment.</p>
          </Link>
          <Link href="/news/comunicate-de-presa" className="card p-6 transition-shadow hover:shadow-lg">
            <p className="text-overline mb-2">Noutăți</p>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Comunicate ASLM</h2>
            <p className="mt-2 text-body-sm">Anunțuri oficiale despre proiecte, activități și publicații.</p>
          </Link>
          <Link href="/conferinte" className="card p-6 transition-shadow hover:shadow-lg">
            <p className="text-overline mb-2">Arhivă 2026</p>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Conferințe ASLM</h2>
            <p className="mt-2 text-body-sm">Formatul și calendarul conferințelor ediției încheiate.</p>
          </Link>
          <Link href="/comunicari-orale" className="card p-6 transition-shadow hover:shadow-lg">
            <p className="text-overline mb-2">Arhivă 2026</p>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Comunicări orale</h2>
            <p className="mt-2 text-body-sm">Cerințele și calendarul apelului științific din ediția încheiată.</p>
          </Link>
          <Link href="/membri" className="card p-6 transition-shadow hover:shadow-lg">
            <p className="text-overline mb-2">Comunitate</p>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Devino membru ASLM</h2>
            <p className="mt-2 text-body-sm">Beneficii, categorii și pașii de înscriere.</p>
          </Link>
        </div>
      </section>
      <JsonLdScript
        id="events-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebPageSchema(
              "https://www.aslm.ro/evenimente",
              "Evenimente ASLM: calendar, arhivă și credite EMC",
              "Calendarul și arhiva evenimentelor Societății Academice de Medicina Stilului de Viață, cu informații despre congrese, workshop-uri și credite EMC.",
              [{ name: "Acasă", path: "/" }, { name: "Evenimente", path: "/evenimente" }],
            ),
            ...eventSchemas,
          ]),
        }}
      />
    </div>
  );
}
