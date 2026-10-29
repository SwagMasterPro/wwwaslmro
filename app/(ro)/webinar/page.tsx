import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
import { generateWebPageSchema } from "@/lib/structured-data";
import { WEBINAR } from "@/lib/webinar/config";
import { webinarLearning, webinarLecturers, webinarReasons, webinarTopics } from "@/data/webinar";

export const metadata = generateStaticPageMetadata("/webinar");

export default function WebinarPage() {
  return <div className="pt-20">
    <header className="surface-primary pb-6 pt-4 md:pb-8 md:pt-6">
      <div className="container-default max-w-5xl">
        <h1 className="sr-only">Webinar ASLM: {WEBINAR.topic}</h1>
        <Image
          src="/images/webinar/banner-2026-10.webp"
          alt="Webinar ASLM. Medicina Stilului de Viață – Medicina Viitorului. O abordare integrată a pacientului. Online. Acces la lucrări până la 30 noiembrie 2026 inclusiv."
          width={2048}
          height={768}
          sizes="(min-width: 1024px) 976px, 100vw"
          className="block h-auto w-full"
          priority
        />
        <p className="mt-6 text-center text-base leading-relaxed text-gray-700 md:text-lg">Acces la prezentări până la <strong>30 noiembrie 2026 inclusiv</strong>. Înscrierile ulterioare beneficiază de perioada rămasă până la această dată.</p>
      </div>
    </header>

    <section className="py-8 md:py-12 surface-secondary" aria-labelledby="lectori-webinar">
      <div className="container-wide">
        <h2 id="lectori-webinar" className="text-headline text-[var(--text-primary)]">Lectori</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {webinarLecturers.map(lecturer => <li key={lecturer.name} className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
            {lecturer.image && <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-green-50">
              <Image src={lecturer.image} alt="" fill sizes="64px" className="object-contain object-bottom" />
            </div>}
            <h3 className="min-w-0 text-base font-semibold leading-snug text-green-950">{lecturer.name}</h3>
          </li>)}
        </ul>
      </div>
    </section>

    <section className="py-8 md:py-12 surface-primary" aria-labelledby="controlul-bolilor">
      <div className="container-default max-w-4xl">
        <h2 id="controlul-bolilor" className="text-headline text-[var(--text-primary)]">Controlul bolilor cronice și sănătatea pacientului</h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-gray-700">
          <p>Sănătatea este influențată de numeroși factori care acționează împreună, iar prevenția, reducerea factorilor de risc și controlul bolilor cronice sunt componente importante ale îngrijirii pe termen lung a pacientului.</p>
          <p>Medicina stilului de viață completează îngrijirea medicală prin intervenții fundamentate științific asupra unor factori modificabili – alimentație, activitate fizică, somn, gestionarea stresului, evitarea substanțelor nocive și relații sociale – contribuind la o perspectivă mai amplă și integrată asupra sănătății pacientului.</p>
        </div>
      </div>
    </section>

    <section className="py-8 md:py-12 surface-secondary" aria-labelledby="public-webinar">
      <div className="container-default max-w-4xl">
        <h2 id="public-webinar" className="text-headline text-[var(--text-primary)]">Cui se adresează acest webinar?</h2>
        <h3 className="mt-6 text-xl font-semibold text-green-950">Medicilor și altor profesioniști din domeniul sănătății</h3>
        <p className="mt-4 leading-relaxed text-gray-700">Medici de familie și din alte specialități, kinetoterapeuți, farmaciști, asistenți medicali, nutriționiști-dieteticieni și alți profesioniști interesați de prevenția și controlul bolilor cronice, reducerea factorilor de risc modificabili și integrarea intervențiilor asupra stilului de viață în îngrijirea pacientului.</p>
        <h3 className="mt-6 text-xl font-semibold text-green-950">Celor interesați de medicina preventivă</h3>
        <p className="mt-4 leading-relaxed text-gray-700">Profesioniștilor care doresc să aprofundeze rolul factorilor modificabili ai stilului de viață și abordarea interdisciplinară a sănătății.</p>
      </div>
    </section>

    <section className="py-8 md:py-12 surface-primary" aria-labelledby="ofera-webinar">
      <div className="container-wide">
        <h2 id="ofera-webinar" className="text-headline text-[var(--text-primary)]">Ce oferă acest webinar?</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {webinarReasons.map(reason => <article key={reason.title} className="card p-5 md:p-6"><h3 className="text-xl font-semibold text-green-950">{reason.title}</h3><p className="mt-4 leading-relaxed text-gray-700">{reason.text}</p></article>)}
        </div>
        <div className="mt-6 rounded-2xl bg-green-100 p-5 md:p-6">
          <h3 className="text-xl font-semibold text-green-950">Vizionezi prezentările în propriul ritm</h3>
          <p className="mt-4 leading-relaxed text-gray-700">Ai acces la înregistrările video ale prezentărilor în platformă până la 30 noiembrie 2026 inclusiv. Poți urmări prezentările în propriul ritm, în funcție de programul tău.</p>
        </div>
      </div>
    </section>

    <section className="py-8 md:py-12 surface-secondary" aria-labelledby="perspective-webinar">
      <div className="container-wide">
        <h2 id="perspective-webinar" className="text-headline text-[var(--text-primary)]">Perspective și aplicații practice</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-gray-700">Webinarul își propune să ofere participanților o perspectivă actuală, bazată pe dovezi, asupra rolului medicinei stilului de viață în prevenirea și controlul bolilor cronice. Vei înțelege mai bine:</p>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {webinarLearning.map(item => <li key={item.title} className="flex gap-4"><Check className="mt-1 h-6 w-6 shrink-0 text-green-800" aria-hidden="true" /><div><h3 className="text-xl font-semibold text-gray-900">{item.title}</h3><p className="mt-3 leading-relaxed text-gray-700">{item.text}</p></div></li>)}
        </ul>
      </div>
    </section>

    <section className="py-8 md:py-12 surface-primary" aria-labelledby="program-webinar">
      <div className="container-default max-w-5xl">
        <h2 id="program-webinar" className="text-headline text-[var(--text-primary)]">Program</h2>
        <ol className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
          {webinarTopics.map((topic, index) => <li key={topic} className="flex gap-4 py-4 md:gap-6"><span className="shrink-0 text-lg font-semibold tabular-nums text-green-800" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p className="text-lg font-medium leading-relaxed text-gray-900">{topic}</p></li>)}
        </ol>
      </div>
    </section>

    <section id="inscriere" className="py-8 md:py-12 scroll-mt-24 surface-primary" aria-labelledby="inscriere-webinar">
      <div className="container-default max-w-4xl">
        <h2 id="inscriere-webinar" className="text-headline text-center text-[var(--text-primary)]">Înscriere</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center md:p-6">
            <h3 className="text-3xl font-bold text-green-900">Gratuit</h3>
            <p className="mt-3 text-lg text-gray-800">Pentru membrii ASLM</p>
            <Link href="/adunarea-generala" className="mt-3 inline-flex min-h-12 items-center rounded-md font-semibold text-green-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-800">Vezi lista membri ASLM</Link>
          </article>
          <article className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-center md:p-6">
            <h3 className="text-3xl font-bold text-blue-900">100 lei</h3>
            <p className="mt-3 text-lg text-gray-800">Pentru nonmembrii ASLM</p>
            <Link href="/membri" className="mt-3 inline-flex min-h-12 items-center rounded-md font-semibold text-blue-900 underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-800">Devino membru ASLM</Link>
          </article>
        </div>
        <div className="mt-6 text-center">
          <a href={WEBINAR.paymentUrl} className="inline-flex min-h-14 items-center justify-center rounded-xl bg-green-800 px-7 py-4 text-lg font-semibold text-white hover:bg-green-900 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-green-800">Înscrie-te la webinar</a>
        </div>
      </div>
    </section>

    <JsonLdScript id="webinar-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema("https://www.aslm.ro/webinar", `${WEBINAR.title}: ${WEBINAR.topic}`, `Gratuit pentru membrii ASLM. 100 RON pentru nonmembri. Înscriere pe ${WEBINAR.paymentUrl}. Vizionare online până la 30 noiembrie 2026 inclusiv.`, [{ name: "Acasă", path: "/" }, { name: "Webinar", path: "/webinar" }])) }} />
  </div>;
}
