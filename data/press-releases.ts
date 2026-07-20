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
    title: "A fost publicat Proceedings-ul Congresului Inaugural al Societății Academice de Medicina Stilului de Viață, 2026",
    excerpt:
      "ASLM anunță publicarea oficială a volumului Proceedings aferent Congresului Inaugural, desfășurat la Brașov în perioada 10-12 mai 2026.",
    content: `
      <p>Societatea Academică de Medicina Stilului de Viață (ASLM) anunță publicarea oficială a volumului Proceedings aferent Congresului Inaugural al Societății Academice de Medicina Stilului de Viață, desfășurat în perioada 10 - 12 mai 2026, la Brașov.</p>
      <p>Publicat ca număr special al revistei Lifestyle Medicine Research &amp; Reviews, Proceedings-ul reunește principalele contribuții științifice prezentate în cadrul congresului și reprezintă o resursă valoroasă pentru profesioniștii din domeniul sănătății interesați de medicina stilului de viață.</p>
      <p>Volumul include:</p>
      <ul>
        <li>programul științific al congresului;</li>
        <li>lista keynote speakerilor și a autorilor;</li>
        <li>conferințele și comunicările orale susținute în cadrul evenimentului;</li>
        <li>rezumatele lucrărilor științifice prezentate la congres.</li>
      </ul>
      <blockquote>„Publicarea Proceedings-ului reprezintă o etapă importantă în valorificarea contribuțiilor științifice prezentate în cadrul congresului. Ne dorim ca această publicație să devină o resursă utilă pentru profesioniștii din domeniul sănătății și să contribuie la dezvoltarea medicinei stilului de viață în România și la promovarea bunelor practici bazate pe dovezi științifice”, a declarat Elena Iulia Nistoroiu, Coordonator Strategie, Dezvoltare și Comunicare al Societății Academice de Medicina Stilului de Viață (ASLM).</blockquote>
      <p>Proceedings-ul este disponibil în format electronic și poate fi consultat pe platforma revistei Lifestyle Medicine Research &amp; Reviews, pe website-ul oficial al Congresului ASLM și pe site-ul Societății Academice de Medicina Stilului de Viață.</p>
      <h2>Despre Proceedings</h2>
      <p>Proceedings-ul Congresului Inaugural al Societății Academice de Medicina Stilului de Viață reflectă activitatea științifică desfășurată în cadrul congresului și constituie o resursă de referință pentru profesioniștii interesați de medicina stilului de viață. Publicația reunește programul științific, lista speakerilor și a autorilor, conferințele și comunicările orale susținute, precum și rezumatele lucrărilor prezentate în cadrul evenimentului.</p>
      <p>Proceedings-ul Congresului ASLM poate fi vizionat aici:</p>
      <ul>
        <li><a href="https://medscience.center/LMRR/lmrr-vol-4-suppl-2-year-2026/" target="_blank" rel="noopener noreferrer">Lifestyle Medicine Research &amp; Reviews</a></li>
        <li><a href="https://view.publitas.com/amph/lmrr-2026-s2-full-issue-proceedings-aslm/page/1" target="_blank" rel="noopener noreferrer">Proceedings-ul complet pe Publitas</a></li>
      </ul>
    `,
    metadata: {
      publishDate: "2026-07-20",
      modifiedDate: "2026-07-20",
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
