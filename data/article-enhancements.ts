import { getArticleBySlug } from "@/data/blog-articles";

export type ArticleEnhancement = {
  lastUpdated: string;
  reviewer: string;
  takeaways: string[];
  faqs: { question: string; answer: string }[];
  references: { label: string; href: string }[];
};

export const articleEnhancements: Record<string, ArticleEnhancement> = {
  "cum-impacteaza-somnul-sanatatea-fizica-si-mentala": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    takeaways: [
      "Somnul influențează sănătatea metabolică, cardiovasculară, mentală și imunitară.",
      "Pentru adulți, cel puțin 7 ore de somn pe noapte este un reper frecvent folosit în sănătatea publică.",
      "Somnul fragmentat, sforăitul sever sau somnolența diurnă merită discutate cu un medic.",
      "Schimbările de somn funcționează mai bine când sunt integrate cu mișcare, alimentație și gestionarea stresului.",
    ],
    faqs: [
      {
        question: "De ce este somnul important pentru sănătatea fizică și mentală?",
        answer:
          "Somnul susține reglarea hormonală, recuperarea, memoria, dispoziția, imunitatea și funcționarea cardiovasculară.",
      },
      {
        question: "Când ar trebui să cer ajutor pentru probleme de somn?",
        answer:
          "Cere ajutor dacă insomnia, somnolența diurnă, sforăitul sever sau trezirile frecvente persistă și afectează funcționarea zilnică.",
      },
    ],
    references: [
      { label: "CDC - about sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
  },
  "stresul-cronic-si-riscul-cardiovascular": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    takeaways: [
      "Stresul cronic poate influența somnul, alimentația, tensiunea arterială și comportamentele de risc.",
      "Gestionarea stresului trebuie abordată împreună cu mișcarea, somnul și suportul social.",
      "Simptomele persistente de anxietate, depresie sau insomnie justifică evaluare profesională.",
      "Intervențiile mici și repetabile sunt mai sustenabile decât schimbările bruște.",
    ],
    faqs: [
      {
        question: "Stresul cronic crește riscul cardiovascular?",
        answer:
          "Stresul cronic poate contribui indirect prin somn slab, tensiune arterială, inflamație, alimentație dezechilibrată, sedentarism sau consum de tutun și alcool.",
      },
      {
        question: "Care este primul pas în gestionarea stresului?",
        answer:
          "Primul pas este identificarea surselor și alegerea unei intervenții mici, repetabile: respirație, mișcare, pauze, somn regulat sau suport social.",
      },
    ],
    references: [
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
  },
  "beneficiile-inotului-pentru-sanatatea-pulmonara": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    takeaways: [
      "Înotul poate susține condiția fizică, controlul respirației și aderența la mișcare pentru unele persoane.",
      "Activitatea fizică regulată este asociată cu beneficii pentru sănătatea cardiovasculară, metabolică, mentală și somn.",
      "Persoanele cu boli pulmonare trebuie să discute intensitatea și siguranța exercițiilor cu medicul.",
      "Cea mai bună formă de mișcare este cea sigură, plăcută și repetabilă.",
    ],
    faqs: [
      {
        question: "Este înotul potrivit pentru sănătatea pulmonară?",
        answer:
          "Înotul poate ajuta la controlul respirației și la creșterea capacității de efort, dar persoanele cu afecțiuni pulmonare trebuie evaluate individual.",
      },
      {
        question: "Cât de des ar trebui practicată activitatea fizică?",
        answer:
          "Frecvența și intensitatea trebuie adaptate persoanei, iar progresul gradual este important pentru siguranță și aderență.",
      },
    ],
    references: [
      { label: "World Health Organization - physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    ],
  },
  "deficientele-nutritionale-si-riscul-de-depresie": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    takeaways: [
      "Nutriția poate influența sănătatea mentală prin inflamație, microbiom, neurotransmițători și energie.",
      "Deficiențele nutriționale trebuie evaluate medical, mai ales când există simptome persistente.",
      "Alimentația echilibrată completează, dar nu înlocuiește, tratamentul psihologic sau psihiatric.",
      "O abordare integrată include alimentație, somn, mișcare, stres și suport social.",
    ],
    faqs: [
      {
        question: "Pot deficiențele nutriționale contribui la simptome depresive?",
        answer:
          "Da, anumite deficiențe pot influența mecanisme relevante pentru sănătatea mentală, dar depresia este multifactorială și necesită evaluare profesională.",
      },
      {
        question: "Poate alimentația înlocui tratamentul depresiei?",
        answer:
          "Nu. Alimentația poate fi un sprijin important, dar nu înlocuiește tratamentul psihologic, psihiatric sau medical când acesta este necesar.",
      },
    ],
    references: [
      { label: "World Health Organization - healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
  },
};

const categoryDefaults: Record<string, Omit<ArticleEnhancement, "takeaways" | "faqs"> & {
  topic: string;
  guide: string;
  takeaways: string[];
}> = {
  alimentatie: {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "alimentația sănătoasă",
    guide: "/ghid/alimentatie-sanatoasa",
    takeaways: [
      "Alimentația este un pilon clinic al medicinei stilului de viață și trebuie adaptată persoanei.",
      "Modelele alimentare bazate pe alimente integrale susțin prevenția bolilor cronice.",
      "Schimbările sustenabile sunt mai eficiente decât restricțiile extreme.",
    ],
    references: [
      { label: "World Health Organization - healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
  },
  "activitate-fizica": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "activitatea fizică",
    guide: "/ghid/activitate-fizica",
    takeaways: [
      "Activitatea fizică regulată susține sănătatea metabolică, cardiovasculară, mentală și funcțională.",
      "Planul de mișcare trebuie adaptat nivelului actual, vârstei și condițiilor medicale.",
      "Aderența crește când mișcarea este sigură, plăcută și repetabilă.",
    ],
    references: [
      { label: "World Health Organization - physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    ],
  },
  "calitate-somn": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "sănătatea somnului",
    guide: "/ghid/sanatatea-somnului",
    takeaways: [
      "Somnul influențează metabolismul, sănătatea cardiovasculară, imunitatea și sănătatea mentală.",
      "Durata, regularitatea și calitatea somnului trebuie evaluate împreună.",
      "Sforăitul sever, insomnia persistentă sau somnolența diurnă merită discutate medical.",
    ],
    references: [
      { label: "CDC - about sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
  },
  "gestionare-stres": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "gestionarea stresului",
    guide: "/ghid/gestionare-stres",
    takeaways: [
      "Stresul cronic poate afecta somnul, comportamentele zilnice și riscul cardiometabolic.",
      "Tehnicile utile sunt cele care pot fi repetate în contextul real al persoanei.",
      "Simptomele persistente sau severe necesită suport medical ori psihologic.",
    ],
    references: [
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
  },
  "evitare-substante": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "renunțarea la fumat și alcool",
    guide: "/ghid/renuntare-fumat-alcool",
    takeaways: [
      "Evitarea substanțelor nocive reduce riscul de boli cronice și susține schimbarea celorlalți piloni.",
      "Dependența trebuie abordată cu empatie, suport și intervenții medicale când este necesar.",
      "Planurile concrete de reducere a riscului funcționează mai bine decât recomandările vagi.",
    ],
    references: [
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    ],
  },
  "relatii-sociale": {
    lastUpdated: "2026",
    reviewer: "Consiliul Științific ASLM",
    topic: "relațiile sociale și sănătatea",
    guide: "/ghid/relatii-sociale-sanatate",
    takeaways: [
      "Relațiile sociale influențează stresul, aderența, somnul și sănătatea mentală.",
      "Calitatea sprijinului social contează mai mult decât numărul contactelor.",
      "Izolarea persistentă merită abordată prin resurse comunitare și suport specializat când este cazul.",
    ],
    references: [
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
  },
};

export function getArticleEnhancement(slug: string): ArticleEnhancement | undefined {
  const explicit = articleEnhancements[slug];
  if (explicit) {
    return explicit;
  }

  const article = getArticleBySlug(slug);
  if (!article) {
    return undefined;
  }

  const defaults = categoryDefaults[article.categorySlug];
  if (!defaults) {
    return undefined;
  }

  return {
    lastUpdated: defaults.lastUpdated,
    reviewer: defaults.reviewer,
    takeaways: defaults.takeaways,
    faqs: [
      {
        question: `Ce ar trebui reținut din articolul „${article.title}”?`,
        answer: `Articolul explică tema prin prisma medicinei stilului de viață și o leagă de ${defaults.topic}, prevenție și schimbări sustenabile.`,
      },
      {
        question: "Când este nevoie de sfat medical personalizat?",
        answer:
          "Când există simptome persistente, boli cronice, tratamente în curs sau schimbări importante ale stării de sănătate, recomandările trebuie discutate cu un profesionist.",
      },
      {
        question: "Unde găsesc contextul complet ASLM?",
        answer: `Contextul complet este disponibil în ghidul ASLM dedicat: ${defaults.guide}.`,
      },
    ],
    references: defaults.references,
  };
}
