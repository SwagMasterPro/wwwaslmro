import Image from "next/image";
import { CalendarDays, MonitorPlay, Mail, Check } from "lucide-react";
import RegistrationForm from "@/components/webinar/RegistrationForm";
import JsonLdScript from "@/components/seo/JsonLdScript";
import { generateStaticPageMetadata } from "@/lib/metadata-helpers";
import { generateWebPageSchema } from "@/lib/structured-data";
import { WEBINAR } from "@/lib/webinar/config";
import { webinarLearning, webinarLecturers, webinarReasons } from "@/data/webinar";

export const metadata = generateStaticPageMetadata("/webinar");
export default function WebinarPage() {
  return <div className="pt-20">
    <section className="surface-primary">
      <a href="#inscriere" aria-label="Participă la Webinar ASLM — mergi la opțiunile de înscriere" className="block w-full focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-green-700">
        <Image src="/images/webinar/banner.webp" alt="Webinar ASLM: Medicina Stilului de Viață – Medicina Viitorului. O abordare integrată în îngrijirea pacientului. 19 octombrie 2026, online." width={1672} height={941} sizes="100vw" className="block h-auto w-full" priority />
      </a>
    </section>
    <section className="mesh-hero section-lg">
      <div className="container-wide grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="text-overline mb-4 text-[var(--color-primary-300)]">O abordare integrată în îngrijirea pacientului</p>
          <h1 className="text-display text-white">Webinar ASLM</h1>
          <h2 className="mt-5 text-2xl font-semibold leading-snug text-white md:text-3xl">{WEBINAR.topic}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">De la dovezi științifice la practica medicală: aprofundează medicina stilului de viață, descoperind perspective și instrumente utile pentru o abordare mai complexă a pacientului.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 p-6 md:p-8">
          <div className="space-y-5 leading-relaxed">
            <p className="flex items-center gap-3 text-white"><CalendarDays className="h-5 w-5 shrink-0 text-green-200" aria-hidden="true" />{WEBINAR.displayDates}</p>
            <p className="flex items-start gap-3 text-white"><MonitorPlay className="mt-1 h-5 w-5 shrink-0 text-green-200" aria-hidden="true" />Acces la înregistrări timp de 30 de zile. Vizionezi prezentările când ai timp.</p>
            <p className="flex items-start gap-3 text-white"><Mail className="mt-1 h-5 w-5 shrink-0 text-green-200" aria-hidden="true" />Datele de logare se trimit separat prin e-mail, începând cu 19 octombrie, după confirmarea înscrierii.</p>
          </div>
          <a href="#inscriere" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-white px-6 py-3 font-semibold text-green-950">Înscrie-te la webinar</a>
          <p className="mt-4 text-sm leading-relaxed text-white/85">Gratuit pentru membrii ASLM confirmați. <a href={WEBINAR.membershipUrl} className="font-semibold text-white underline hover:text-white">Devino membru ASLM</a>. Accesul doar la webinar, fără înscriere ca membru, va fi disponibil pentru 100 RON pe <a href={WEBINAR.membershipUrl} className="font-semibold text-white underline hover:text-white">membership.aslm.ro</a>.</p>
        </div>
      </div>
    </section>
    <section className="section-lg surface-primary">
      <div className="container-default max-w-4xl">
        <h2 className="text-headline text-[var(--text-primary)]">Controlul bolilor cronice și sănătatea pacientului</h2>
        <div className="mt-6 space-y-5 text-lg leading-relaxed text-gray-700">
          <p>Sănătatea este influențată de numeroși factori care acționează împreună, iar prevenția, reducerea factorilor de risc și controlul bolilor cronice sunt componente importante ale îngrijirii pe termen lung a pacientului.</p>
          <p>Medicina stilului de viață completează îngrijirea medicală prin intervenții fundamentate științific asupra unor factori modificabili – alimentație, activitate fizică, somn, gestionarea stresului, evitarea substanțelor nocive și relații sociale – contribuind la o perspectivă mai amplă și integrată asupra sănătății pacientului.</p>
        </div>
      </div>
    </section>
    <section className="section-lg surface-secondary">
      <div className="container-wide">
        <h2 className="text-headline text-[var(--text-primary)]">De ce acest webinar?</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {webinarReasons.map(reason => <article key={reason.title} className="card p-6 md:p-8"><h3 className="text-xl font-semibold text-green-950">{reason.title}</h3><p className="mt-4 leading-relaxed text-gray-700">{reason.text}</p></article>)}
        </div>
        <div className="mt-8 rounded-2xl bg-green-100 p-6 md:p-8">
          <h3 className="text-xl font-semibold text-green-950">Acces timp de 30 de zile – vizionezi prezentările când ai timp</h3>
          <p className="mt-4 leading-relaxed text-gray-700">Ai acces la înregistrările video ale prezentărilor în platformă între 19 octombrie și 17 noiembrie 2026 inclusiv. Poți urmări prezentările în propriul ritm, în funcție de programul tău. Înscrierile după 19 octombrie beneficiază de perioada rămasă.</p>
        </div>
      </div>
    </section>
    <section className="section-lg surface-primary">
      <div className="container-wide">
        <h2 className="text-headline text-[var(--text-primary)]">Ce vei învăța din acest webinar?</h2>
        <p className="mt-5 max-w-4xl text-lg leading-relaxed text-gray-700">Webinarul își propune să ofere participanților o perspectivă actuală, bazată pe dovezi, asupra rolului medicinei stilului de viață în prevenirea și controlul bolilor cronice. Vei înțelege mai bine:</p>
        <ul className="mt-8 grid gap-8 md:grid-cols-2">
          {webinarLearning.map(item => <li key={item.title} className="flex gap-4"><Check className="mt-1 h-6 w-6 shrink-0 text-green-800" aria-hidden="true" /><div><h3 className="text-xl font-semibold text-gray-900">{item.title}</h3><p className="mt-3 leading-relaxed text-gray-700">{item.text}</p></div></li>)}
        </ul>
      </div>
    </section>
    <section className="section-lg surface-secondary">
      <div className="container-wide grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-headline text-[var(--text-primary)]">Cui se adresează webinarul?</h2>
          <h3 className="mt-6 text-xl font-semibold text-green-950">Medicilor și altor profesioniști din domeniul sănătății</h3>
          <p className="mt-4 leading-relaxed text-gray-700">Medici de familie și din alte specialități, kinetoterapeuți, farmaciști, asistenți medicali, nutriționiști-dieteticieni și alți profesioniști interesați de prevenția și controlul bolilor cronice, reducerea factorilor de risc modificabili și integrarea intervențiilor asupra stilului de viață în îngrijirea pacientului.</p>
          <h3 className="mt-6 text-xl font-semibold text-green-950">Celor interesați de medicina preventivă</h3>
          <p className="mt-4 leading-relaxed text-gray-700">Profesioniștilor care doresc să aprofundeze rolul factorilor modificabili ai stilului de viață și abordarea interdisciplinară a sănătății.</p>
        </div>
        <div>
          <h2 className="text-headline text-[var(--text-primary)]">Lectori</h2>
          <p className="mt-6 leading-relaxed text-gray-700">În cadrul webinarului vor susține prezentări, printre alții, și lectorii:</p>
          <ul className="mt-6 space-y-4">{webinarLecturers.map(name => <li key={name} className="rounded-xl border border-green-200 bg-white px-5 py-4 text-lg font-semibold text-green-950">{name}</li>)}</ul>
        </div>
      </div>
    </section>
    <section className="section-lg surface-primary">
      <div className="container-wide">
        <a href="#inscriere" className="mb-10 block rounded-xl focus-visible:outline-4 focus-visible:outline-green-700"><Image src="/images/webinar/register.webp" alt="Înscrie-te la webinar ASLM" width={2103} height={204} sizes="(min-width: 1440px) 1280px, 95vw" className="h-auto w-full rounded-xl" /></a>
        <RegistrationForm />
        <div className="mt-10 rounded-2xl border border-green-200 bg-green-50 p-6 md:p-8">
          <a href={WEBINAR.membershipUrl} className="block rounded-xl focus-visible:outline-4 focus-visible:outline-green-700"><Image src="/images/webinar/membership.webp" alt="Devino membru în ASLM – Societatea Academică de Medicina Stilului de Viață" width={2103} height={204} sizes="(min-width: 1440px) 1200px, 90vw" className="h-auto w-full rounded-xl" /></a>
          <p className="mt-6 leading-relaxed text-gray-700">Devino membru ASLM și beneficiază de participare gratuită la webinar, alături de celelalte beneficii oferite membrilor Societății Academice de Medicina Stilului de Viață. Completează formularul de pe <a href={WEBINAR.membershipUrl} className="font-semibold text-green-800 underline">membership.aslm.ro</a> și achită acolo cotizația categoriei tale. Apoi revino la formularul de webinar, folosind aceeași adresă de e-mail.</p>
        </div>
      </div>
    </section>
    <section id="conditii" className="section-lg scroll-mt-24 surface-primary"><div className="container-default max-w-3xl">
      <h2 className="text-2xl font-semibold text-gray-900">Condiții de participare</h2>
      <div className="mt-6 space-y-4 leading-relaxed text-gray-700">
        <p>Webinarul se vizionează ca înregistrare pe o platformă externă. Programul detaliat și numele platformei vor fi anunțate de ASLM.</p>
        <p>Accesul este disponibil între 19 octombrie și 17 noiembrie 2026 inclusiv și se încheie pe 18 noiembrie, la ora 00:00, ora României. Înscrierile după 19 octombrie beneficiază de perioada rămasă.</p>
        <p>Membrii ASLM confirmați participă gratuit. Dacă doriți să deveniți membru, înscrierea și plata cotizației anuale se fac prin <a href={WEBINAR.membershipUrl} className="font-semibold text-green-800 underline">formularul de membru ASLM</a>. După completarea acestuia, solicitați accesul la webinar folosind aceeași adresă de e-mail.</p>
        <p>Pentru participarea doar la webinar, fără înscriere ca membru ASLM, taxa este de 100 RON. Această opțiune va fi disponibilă pe <a href={WEBINAR.membershipUrl} className="font-semibold text-green-800 underline">membership.aslm.ro</a>, unde se va face și plata.</p>
        <p>Echipa ASLM verifică statutul de membru sau plata taxei de participare și trimite separat, prin e-mail, datele contului pentru vizionare, începând cu 19 octombrie. Solicitarea trimisă nu înlocuiește confirmarea înscrierii.</p>
        <p>Pentru asistență privind înscrierea sau accesul, scrieți la <a href="mailto:contact@aslm.ro" className="font-semibold text-green-800 underline">contact@aslm.ro</a>.</p>
      </div>
    </div></section>
    <JsonLdScript id="webinar-structured-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebPageSchema("https://www.aslm.ro/webinar", `${WEBINAR.title}: ${WEBINAR.topic}`, "Gratuit pentru membrii ASLM confirmați. Opțiunea de acces doar la webinar, pentru 100 RON, va fi disponibilă pe membership.aslm.ro. Vizionare online între 19 octombrie și 17 noiembrie 2026.", [{ name: "Acasă", path: "/" }, { name: "Webinar", path: "/webinar" }])) }} />
  </div>;
}
