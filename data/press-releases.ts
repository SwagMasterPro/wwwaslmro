export interface PressRelease {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  metadata: {
    publishDate: string;
    modifiedDate?: string;
    seoTitle: string;
    metaDescription: string;
    tags: string[];
  };
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const pressReleases: PressRelease[] = [
  {
    slug: "proceedings-congres-inaugural-aslm-2026",
    title: "A fost publicat volumul Proceedings al Congresului Inaugural al Societății Academice de Medicina Stilului de Viață, 2026",
    excerpt:
      "ASLM anunță publicarea volumului Proceedings oficial al Congresului Inaugural, desfășurat la Brașov în perioada 10-12 mai 2026.",
    content: `
      <p>Societatea Academică de Medicina Stilului de Viață (ASLM) anunță apariția volumului <em>Proceedings</em> oficial al Congresului Inaugural al Societății Academice de Medicina Stilului de Viață, desfășurat în perioada 10 - 12 mai 2026, la Brașov.</p>
      <p>Publicat ca <strong>număr special</strong> al revistei <strong><em>Lifestyle Medicine Research &amp; Reviews</em></strong>, volumul <em>Proceedings</em> reunește principalele contribuții științifice prezentate în cadrul congresului și reprezintă o resursă valoroasă pentru profesioniștii din domeniul sănătății interesați de medicina stilului de viață.</p>
      <p>Volumul include:</p>
      <ul>
        <li><em>Programul Științific</em> al congresului;</li>
        <li>Lista Keynote speakerilor și a autorilor;</li>
        <li>Conferințele și Comunicările Orale susținute în cadrul evenimentului;</li>
        <li>Rezumatele lucrărilor științifice prezentate la congres.</li>
      </ul>
      <blockquote>„Publicarea Proceedings-ului reprezintă o etapă importantă în valorificarea contribuțiilor științifice prezentate în cadrul congresului. Ne dorim ca această publicație să devină o resursă utilă pentru profesioniștii din domeniul sănătății și să contribuie la dezvoltarea medicinei stilului de viață în România și la promovarea bunelor practici bazate pe dovezi științifice”, a declarat Elena Iulia Nistoroiu, Coordonator Strategie, Dezvoltare și Comunicare al Societății Academice de Medicina Stilului de Viață (ASLM).</blockquote>
      <p>Proceedings-ul este disponibil în format electronic și poate fi consultat pe platforma revistei Lifestyle Medicine Research &amp; Reviews, pe website-ul oficial al Congresului ASLM și pe site-ul Societății Academice de Medicina Stilului de Viață.</p>
      <h2>Despre Proceedings</h2>
      <p>Proceedings-ul Congresului Inaugural al Societății Academice de Medicina Stilului de Viață reflectă activitatea științifică desfășurată în cadrul congresului și constituie o resursă de referință pentru profesioniștii interesați de medicina stilului de viață. Publicația reunește programul științific, lista speakerilor și a autorilor, conferințele și comunicările orale susținute, precum și rezumatele lucrărilor prezentate în cadrul evenimentului.</p>
      <p>Proceedings-ul Congresului ASLM poate fi vizualizat aici:</p>
      <ul>
        <li><a href="https://medscience.center/LMRR/lmrr-vol-4-suppl-2-year-2026/" target="_blank" rel="noopener noreferrer">Lifestyle Medicine Research &amp; Reviews</a></li>
        <li><a href="https://view.publitas.com/amph/lmrr-2026-s2-full-issue-proceedings-aslm/page/1" target="_blank" rel="noopener noreferrer" aria-label="Proceedings-ul complet pe Publitas">Proceedings full-issue [descarcă]</a></li>
      </ul>
    `,
    metadata: {
      publishDate: "2026-07-20",
      modifiedDate: "2026-08-31",
      seoTitle: "Proceedings Congres ASLM 2026, publicat oficial",
      metaDescription:
        "ASLM a publicat Proceedings-ul Congresului Inaugural 2026, cu programul științific, speakeri, comunicări orale și rezumate.",
      tags: ["Proceedings", "Congres ASLM 2026", "Lifestyle Medicine Research & Reviews"],
    },
    image: {
      src: "/images/proceedings-2026.webp",
      alt: "Coperta Proceedings 2026 al Congresului Inaugural al Societății Academice de Medicina Stilului de Viață",
      width: 1254,
      height: 1254,
    },
  },
  {
    slug: "sesiune-stil-de-viata-scoala-de-vara-samf-neptun-2026",
    title: "Sesiune Stil de Viață la Școala de Vară SAMF, Neptun 2026 — dedicată mișcării ca instrument terapeutic în medicina de familie",
    excerpt:
      "ASLM prezintă sesiunea dedicată prescripției activității fizice în obezitate și boli cronice, susținută de Prof. Dr. Andrea Elena Neculau la Școala de Vară SAMF 2026.",
    content: `
      <p>Medicina stilului de viață și rolul său în prevenția și managementul bolilor cronice s-au numărat printre temele abordate în cadrul Școlii de Vară SAMF 2026. În acest context, Prof. Dr. Andrea Elena Neculau, Președintele Societății Academice de Medicina Stilului de Viață (ASLM), a susținut o sesiune dedicată integrării activității fizice în practica medicului de familie, cu accent pe pacienții cu obezitate și boli cronice.</p>
      <p>Școala de Vară SAMF 2026 s-a desfășurat în perioada 24–28 august 2026, la Grand Hotel Caraiman din Neptun, reunind medici de familie aflați în diferite etape ale dezvoltării profesionale, de la medici rezidenți până la specialiști și medici primari. Evenimentul a inclus cursuri, workshopuri, prezentări de cazuri clinice și sesiuni interactive, într-un cadru dedicat actualizării cunoștințelor și schimbului de experiență profesională.</p>
      <p>În cadrul programului din 27 august, Prof. Dr. Andrea Elena Neculau a susținut o sesiune dedicată prescripției activității fizice în obezitate și boli cronice, desfășurată în cadrul Atelierului ASLM „Mișcare cu sens în cabinetul de medicină de familie”.</p>
      <p>Sesiunea a adus în atenția participanților rolul activității fizice ca intervenție care poate fi integrată structurat în managementul pacientului cronic. Dincolo de recomandarea generală de a face mai multă mișcare, abordarea prezentată a pus accent pe evaluarea pacientului, dozarea efortului și adaptarea recomandărilor de activitate fizică la particularitățile individuale, inclusiv în cazul persoanelor cu obezitate, decondiționare fizică sau boli cronice.</p>
      <p>În acest context, au fost discutate instrumente concrete care pot sprijini medicul în evaluarea și monitorizarea pacientului, precum chestionarele de risc, testele funcționale și scalele de evaluare a efortului perceput, precum și principiile care stau la baza unei prescripții individualizate a activității fizice.</p>
      <h2>Medicul de familie, un rol esențial în promovarea unui stil de viață sănătos</h2>
      <p>Prin relația pe termen lung cu pacientul și prin posibilitatea monitorizării continue, medicul de familie ocupă o poziție importantă în identificarea comportamentelor care influențează sănătatea și în integrarea intervențiilor asupra stilului de viață în îngrijirea curentă.</p>
      <p>Mesajul central al atelierului a fost acela că mișcarea poate fi prescrisă, dozată, monitorizată și ajustată în funcție de profilul și evoluția pacientului, devenind astfel o componentă concretă a intervenției medicale, alături de celelalte măsuri terapeutice.</p>
      <blockquote>„Activitatea fizică nu este doar un «sfat general», ci o intervenție clinică validată, cu instrumente concrete de evaluare (chestionare de risc, teste funcționale, scale de efort perceput) și protocoale de prescriere adaptate pacientului cu obezitate, decondiționare sau boli cronice. Mesajul central rămâne simplu: mișcarea se prescrie, se dozează și se ajustează - exact ca un tratament - iar medicul de familie este cel mai bine plasat să o integreze în îngrijirea longitudinală a pacientului. Mulțumesc tuturor colegilor prezenți pentru energia, întrebările și implicarea din timpul atelierului - interesul crescând pentru medicina stilului de viață în rândul medicinei de familie din România este cea mai bună confirmare că mergem în direcția corectă.”, a declarat Prof. Dr. Andrea Elena Neculau, Președintele Societății Academice de Medicina Stilului de Viață.</blockquote>
      <p>Participarea și interesul medicilor prezenți au evidențiat preocuparea tot mai mare pentru integrarea principiilor medicinei stilului de viață în practica medicală și pentru utilizarea unor instrumente aplicate, care să faciliteze schimbări sustenabile în comportamentele pacienților.</p>
      <h2>ASLM susține integrarea medicinei stilului de viață în practica medicală</h2>
      <p>Medicul de familie are un rol esențial în integrarea medicinei stilului de viață în practica medicală, prin relația de lungă durată cu pacientul, posibilitatea identificării precoce a factorilor de risc și includerea intervențiilor asupra stilului de viață în prevenția și managementul bolilor cronice. Activitatea fizică, alimentația, somnul, gestionarea stresului și celelalte componente ale stilului de viață pot deveni astfel parte a unei abordări preventive și terapeutice adaptate fiecărui pacient.</p>
      <p>Sesiunea susținută în cadrul Școlii de Vară SAMF 2026, dedicată prescripției activității fizice, a adus în prim-plan una dintre aceste componente, prezentând modalități concrete prin care mișcarea poate fi evaluată, prescrisă și adaptată în funcție de particularitățile pacientului și integrată în practica de zi cu zi a medicului de familie.</p>
    `,
    metadata: {
      publishDate: "2026-09-01",
      modifiedDate: "2026-09-01",
      seoTitle: "Sesiune ASLM la Școala de Vară SAMF 2026",
      metaDescription:
        "Prof. Dr. Andrea Elena Neculau a susținut la Neptun o sesiune ASLM despre prescripția activității fizice în obezitate și boli cronice.",
      tags: ["Școala de Vară SAMF 2026", "Activitate fizică", "Medicina de familie", "ASLM"],
    },
    image: {
      src: "/images/aslm-scoala-de-vara-samf-2026.webp",
      alt: "Sesiune ASLM despre mișcare ca instrument terapeutic la Școala de Vară SAMF 2026",
      width: 1000,
      height: 1000,
    },
  },
];

export function getPressReleaseBySlug(slug: string): PressRelease | undefined {
  return pressReleases.find((pressRelease) => pressRelease.slug === slug);
}

export function latestPressReleaseDate(): string {
  return pressReleases.reduce(
    (latest, pressRelease) => {
      const date = pressRelease.metadata.modifiedDate ?? pressRelease.metadata.publishDate;
      return date > latest ? date : latest;
    },
    "1970-01-01",
  );
}
