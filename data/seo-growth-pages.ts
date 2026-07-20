export type SeoGrowthPage = {
  path: string;
  modifiedDate: string;
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated?: string;
  reviewedBy?: string;
  lastReviewedDate?: string;
  medicalAudience?: string;
  directAnswer?: string;
  highlights: string[];
  relatedResources?: { label: string; href: string }[];
  comparisonRows?: { criteriu: string; lifestyleMedicine: string; preventiveMedicine: string }[];
  sections: {
    heading: string;
    body: string[];
    bullets?: string[];
  }[];
  faqs: { question: string; answer: string }[];
  references: { label: string; href: string }[];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const seoGrowthPages: Record<string, SeoGrowthPage> = {
  "/medicina-stilului-de-viata": {
    path: "/medicina-stilului-de-viata",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid ASLM",
    title: "Medicina stilului de viață: definiție, piloni și aplicare în România",
    description:
      "Medicina stilului de viață este abordarea medicală bazată pe dovezi care folosește schimbările zilnice de comportament pentru prevenirea și controlul bolilor cronice.",
    directAnswer:
      "Medicina stilului de viață este o abordare medicală bazată pe dovezi care folosește alimentația, activitatea fizică, somnul, gestionarea stresului, relațiile sociale și evitarea substanțelor nocive pentru prevenirea, tratarea și controlul bolilor cronice. În România, ASLM promovează această practică prin educație, cercetare și colaborare clinică interdisciplinară cu profesioniști dedicați sănătății publice.",
    highlights: [
      "Ținta principală este reducerea riscului de boli cronice prin intervenții comportamentale susținute.",
      "Abordarea completează îngrijirea medicală, nu înlocuiește diagnosticul sau tratamentul individual.",
      "ASLM adaptează cadrul internațional al medicinei stilului de viață la nevoile profesioniștilor și pacienților din România.",
    ],
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate, studenți și public interesat de prevenție",
    relatedResources: [
      { label: "Ghid alimentație sănătoasă", href: "/ghid/alimentatie-sanatoasa" },
      { label: "Ghid activitate fizică", href: "/ghid/activitate-fizica" },
      { label: "Ghid sănătatea somnului", href: "/ghid/sanatatea-somnului" },
      { label: "Ghid gestionare stres", href: "/ghid/gestionare-stres" },
      { label: "Ghid renunțare fumat alcool", href: "/ghid/renuntare-fumat-alcool" },
      { label: "Ghid relații sociale sănătate", href: "/ghid/relatii-sociale-sanatate" },
      { label: "Medicina stilului de viață vs medicina preventivă", href: "/medicina-stilului-de-viata-vs-medicina-preventiva" },
    ],
    comparisonRows: [
      {
        criteriu: "Focalizare",
        lifestyleMedicine: "Intervenții clinice asupra comportamentelor zilnice și a celor șase piloni.",
        preventiveMedicine: "Prevenție populațională, screening, vaccinare și reducerea riscurilor.",
      },
      {
        criteriu: "Aplicare",
        lifestyleMedicine: "Plan personalizat de alimentație, mișcare, somn, stres, relații și substanțe nocive.",
        preventiveMedicine: "Politici, programe, controale periodice și măsuri de sănătate publică.",
      },
      {
        criteriu: "Complementaritate",
        lifestyleMedicine: "Poate fi integrată în consultații și managementul bolilor cronice.",
        preventiveMedicine: "Oferă cadrul mai larg de reducere a riscului și depistare precoce.",
      },
    ],
    sections: [
      {
        heading: "Ce este medicina stilului de viață?",
        body: [
          "Medicina stilului de viață este o ramură clinică orientată spre cauzele comportamentale ale bolilor cronice. Ea pune accent pe consiliere, educație, monitorizare și intervenții practice în rutina zilnică: ce mâncăm, cât ne mișcăm, cum dormim, cum gestionăm stresul, ce relații sociale cultivăm și cum reducem expunerea la tutun, alcool în exces sau alte substanțe nocive.",
          "Pentru public, conceptul poate suna simplu, dar în practică implică decizii medicale, obiective realiste, colaborare interdisciplinară și urmărirea progresului. Pentru profesioniști, medicina stilului de viață oferă un limbaj comun pentru prevenție, aderență și schimbare comportamentală.",
        ],
      },
      {
        heading: "Cei șase piloni ai medicinei stilului de viață",
        body: [
          "Cadrul folosit internațional este construit în jurul a șase piloni. Fiecare pilon are impact propriu, dar efectele cele mai solide apar când intervențiile sunt integrate și adaptate persoanei.",
        ],
        bullets: [
          "Alimentație echilibrată, cu accent pe alimente integrale, diversitate, fibre și densitate nutritivă.",
          "Activitate fizică regulată, adaptată vârstei, stării de sănătate și obiectivelor individuale.",
          "Somn de calitate, cu durată și regularitate suficiente pentru recuperare.",
          "Gestionare stres prin tehnici validate, suport psihologic și obiceiuri de reglare emoțională.",
          "Relații sociale sănătoase, apartenență și sprijin comunitar.",
          "Evitare substanțe nocive, mai ales tutun, consum riscant de alcool și automedicație periculoasă.",
        ],
      },
      {
        heading: "Cui se adresează în România",
        body: [
          "Medicina stilului de viață este relevantă pentru medici, rezidenți, studenți, farmaciști, psihologi, nutriționiști, kinetoterapeuți, asistenți medicali și alți profesioniști implicați în prevenția bolilor cronice. Este utilă și pentru persoane care caută informații clare despre schimbări sustenabile, cu mențiunea că recomandările trebuie individualizate medical.",
          "ASLM sprijină dezvoltarea domeniului în România prin resurse educaționale, evenimente, publicații, programe pentru membri și colaborări academice. Scopul este ca prevenția și intervențiile asupra stilului de viață să devină parte firească din practica medicală.",
        ],
      },
      {
        heading: "Cui i se adresează",
        body: [
          "Medicina stilului de viață este utilă persoanelor cu risc cardiometabolic, celor care vor prevenție structurată, pacienților cu boli cronice care au nevoie de suport comportamental și profesioniștilor care caută un cadru coerent de consiliere.",
        ],
      },
      {
        heading: "Când este nevoie de evaluare medicală",
        body: [
          "Evaluarea medicală este necesară când există simptome noi sau persistente, boli cronice, tratamente în curs, sarcină, tulburări de somn severe, consum problematic de alcool sau tutun ori schimbări importante ale greutății sau stării psihice.",
        ],
      },
      {
        heading: "Pentru profesioniști",
        body: [
          "Pentru profesioniști, ASLM poziționează medicina stilului de viață ca limbaj comun între prevenție, educația pacientului, managementul bolilor cronice și colaborarea interdisciplinară.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce este medicina stilului de viață?",
        answer:
          "Medicina stilului de viață este o abordare medicală bazată pe dovezi care folosește intervenții asupra alimentației, mișcării, somnului, stresului, relațiilor sociale și substanțelor nocive pentru prevenirea și controlul bolilor cronice.",
      },
      {
        question: "Medicina stilului de viață înlocuiește tratamentul medical?",
        answer:
          "Nu. Ea completează îngrijirea medicală și trebuie integrată cu diagnosticul, monitorizarea și tratamentul recomandat de profesioniștii din sănătate.",
      },
      {
        question: "Care sunt cei șase piloni ai medicinei stilului de viață?",
        answer:
          "Cei șase piloni sunt alimentația echilibrată, activitatea fizică, somnul de calitate, gestionarea stresului, relațiile sociale sănătoase și evitarea substanțelor nocive.",
      },
    ],
    references: [
      { label: "American College of Lifestyle Medicine - overview", href: "https://lifestylemedicine.org/overview/" },
      { label: "World Health Organization - healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "World Health Organization - physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "CDC - about sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
    ],
    primaryCta: { label: "Devino membru ASLM", href: "/membri" },
    secondaryCta: { label: "Explorează articolele", href: "/news/articole" },
  },
  "/evenimente/credite-emc": {
    path: "/evenimente/credite-emc",
    modifiedDate: "2026-07-20",
    eyebrow: "Educație Medicală Continuă",
    title: "Credite EMC pentru medici la evenimente ASLM",
    description:
      "Află cum verifici creditele EMC și punctele EMC pentru medici la evenimentele ASLM, ce statut are fiecare eveniment și unde găsești documentele oficiale.",
    directAnswer:
      "Creditele EMC se verifică separat pentru fiecare eveniment ASLM. Pagina oficială a evenimentului trebuie să precizeze statutul acreditării, profesioniștii eligibili, condițiile de participare și documentele emise; până la confirmarea oficială, un eveniment nu trebuie prezentat ca acreditat.",
    highlights: [
      "Informații pentru căutările credite EMC, puncte EMC medici și credite EMC medici.",
      "Fiecare eveniment are propriul statut: confirmat, în curs de acreditare, neofertat sau de verificat pe pagina oficială.",
      "Membrii ASLM primesc comunicări dedicate despre noutăți și evenimente relevante.",
    ],
    sections: [
      {
        heading: "Cum verifici dacă un eveniment oferă credite EMC",
        body: [
          "Pentru fiecare congres, conferință sau webinar, consultă pagina oficială a evenimentului și materialele de înscriere. Acolo trebuie să apară statutul acreditării, categoria profesională eligibilă, condițiile de participare și documentele care se emit după eveniment.",
          "Dacă un eveniment este în curs de acreditare, statutul este provizoriu. Nu considera creditele confirmate înainte ca ASLM să publice informația oficială; pentru întrebări punctuale, contactează organizatorii înainte de înscriere.",
        ],
        bullets: [
          "Verifică data, formatul și prezența cerută pentru participare.",
          "Caută statutul explicit: acreditat, în curs de acreditare sau fără credite anunțate.",
          "Păstrează confirmarea de înscriere și documentele comunicate de organizator.",
        ],
      },
      {
        heading: "Pentru cine sunt relevante punctele EMC",
        body: [
          "Punctele EMC sunt relevante în special pentru medici și alți profesioniști care urmăresc formarea medicală continuă. Eligibilitatea exactă și numărul de credite se confirmă individual, nu se transferă automat de la un eveniment ASLM la altul.",
        ],
        bullets: [
          "Medici interesați de prevenție și boli cronice.",
          "Rezidenți și studenți care vor expunere la medicina stilului de viață.",
          "Profesioniști din sănătate care lucrează cu nutriție, somn, stres, activitate fizică sau renunțare la fumat.",
        ],
      },
      {
        heading: "Documente și comunicări oficiale",
        body: [
          "ASLM publică informațiile confirmate pe pagina evenimentului și în comunicările sale oficiale. Pentru evenimente încheiate, verifică arhiva și resursele publicate; pentru cele viitoare, urmărește calendarul, pagina de înscriere și eventualele actualizări privind acreditarea.",
          "Verifică periodic pagina de evenimente și comunicările ASLM. Calitatea de membru poate oferi acces la noutăți, tarife preferențiale sau oportunități de networking, în condițiile anunțate pentru fiecare eveniment.",
        ],
      },
    ],
    faqs: [
      {
        question: "Toate evenimentele ASLM oferă credite EMC?",
        answer:
          "Nu automat. Statutul de acreditare și numărul de credite se comunică separat pentru fiecare eveniment.",
      },
      {
        question: "Unde găsesc informațiile despre punctele EMC pentru un eveniment ASLM?",
        answer:
          "Informațiile confirmate apar pe pagina evenimentului, în materialele de înscriere sau în comunicările oficiale transmise participanților.",
      },
      {
        question: "Membrii ASLM au beneficii la evenimente acreditate?",
        answer:
          "Membrii pot avea acces prioritar, tarife preferențiale sau comunicări dedicate, în funcție de eveniment și de categoria de membru.",
      },
    ],
    references: [
      { label: "Pagina evenimente ASLM", href: "https://www.aslm.ro/evenimente" },
      { label: "Pagina membri ASLM", href: "https://www.aslm.ro/membri" },
      { label: "Comunicate de presă ASLM", href: "https://www.aslm.ro/news/comunicate-de-presa" },
    ],
    primaryCta: { label: "Vezi evenimentele ASLM", href: "/evenimente" },
    secondaryCta: { label: "Devino membru", href: "/membri" },
  },
  "/lifestyle-medicine-romania": {
    path: "/lifestyle-medicine-romania",
    modifiedDate: "2026-07-13",
    eyebrow: "English overview",
    title: "Lifestyle medicine in Romania",
    description:
      "ASLM is the Academic Society of Lifestyle Medicine in Romania, supporting education, research and professional collaboration around evidence-informed lifestyle medicine.",
    directAnswer:
      "Lifestyle medicine in Romania is represented by ASLM, the Academic Society of Lifestyle Medicine, a professional academic society focused on prevention, education, research and interdisciplinary collaboration. ASLM promotes evidence-informed lifestyle medicine through the six pillars: nutrition, physical activity, restorative sleep, stress management, social connection and avoidance of risky substances.",
    highlights: [
      "Designed for English searches such as lifestyle medicine Romania.",
      "Clarifies ASLM as the Romanian academic society for lifestyle medicine.",
      "Links English readers to the Romanian membership, blog and contact pages.",
    ],
    sections: [
      {
        heading: "Academic Society of Lifestyle Medicine in Romania",
        body: [
          "ASLM brings together healthcare professionals, academics, students and partner organizations interested in prevention and chronic disease care through lifestyle medicine. The society supports education, conferences, publications and community-building for professionals working in Romania.",
          "The Romanian-language website remains the primary resource, but this English overview gives international visitors, speakers, researchers and partner organizations a clear entry point.",
        ],
      },
      {
        heading: "What ASLM focuses on",
        body: [
          "The society's educational work follows the six-pillar framework used internationally in lifestyle medicine. ASLM adapts that framework to Romanian medical education, local events, student involvement and professional collaboration.",
        ],
        bullets: [
          "Evidence-informed education on nutrition, activity, sleep, stress, social connection and risky substances.",
          "Events and professional development opportunities in Romania.",
          "Student engagement through Y-ASLM and internship opportunities.",
          "Publishing and resource development for Romanian healthcare professionals.",
        ],
      },
      {
        heading: "For international partners",
        body: [
          "Researchers, speakers, medical societies and organizations interested in collaboration can use the contact page to reach ASLM. For Romanian visitors, the most useful starting points are the membership page, the events page and the educational blog.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is ASLM?",
        answer:
          "ASLM is the Academic Society of Lifestyle Medicine in Romania, focused on education, research and professional collaboration in lifestyle medicine.",
      },
      {
        question: "What are the six pillars of lifestyle medicine?",
        answer:
          "The six pillars are whole-person nutrition, regular physical activity, restorative sleep, stress management, positive social connection and avoidance of risky substances.",
      },
      {
        question: "How can international partners contact ASLM?",
        answer:
          "International partners can use the contact page at https://www.aslm.ro/contact for collaboration, speaking, research or educational inquiries.",
      },
    ],
    references: [
      { label: "American College of Lifestyle Medicine - overview", href: "https://lifestylemedicine.org/overview/" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
    primaryCta: { label: "Contact ASLM", href: "/contact" },
    secondaryCta: { label: "Read the Romanian articles", href: "/news/articole" },
  },
  "/ghid/gestionare-stres": {
    path: "/ghid/gestionare-stres",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Gestionare stres: tehnici, prevenție și rol în sănătate",
    description:
      "Ghid ASLM despre gestionare stres, tehnici practice și legătura dintre stres, somn, relații sociale și prevenția bolilor cronice.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de sănătate mentală preventivă",
    directAnswer:
      "Gestionare stres înseamnă recunoașterea surselor de presiune, reducerea expunerii când este posibil și folosirea unor tehnici regulate de reglare: respirație, mișcare, somn, suport social, consiliere și planificare realistă. În medicina stilului de viață, stresul este abordat împreună cu ceilalți piloni ai sănătății.",
    highlights: [
      "Țintește căutările pentru gestionare stres și tehnici de gestionare a stresului.",
      "Leagă stresul de somn, activitate fizică, relații sociale și sănătate cardiovasculară.",
      "Include recomandări educaționale, nu tratament psihologic individualizat.",
    ],
    relatedResources: [
      { label: "Hub gestionare stres", href: "/news/articole/gestionare-stres" },
      { label: "Stres cronic și risc cardiovascular", href: "/news/articole/gestionare-stres/stresul-cronic-si-riscul-cardiovascular" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "De ce contează gestionarea stresului",
        body: [
          "Stresul este o reacție normală la solicitări, dar stresul cronic poate influența somnul, alimentația, tensiunea arterială, inflamația, aderența la tratament și relațiile sociale. De aceea, medicina stilului de viață tratează stresul ca pe un pilon clinic, nu ca pe un detaliu secundar.",
          "Gestionarea eficientă nu înseamnă eliminarea tuturor problemelor, ci dezvoltarea unui set de obiceiuri și resurse care reduc impactul stresului asupra corpului și comportamentelor zilnice.",
        ],
      },
      {
        heading: "Tehnici de gestionare a stresului",
        body: [
          "Tehnicile utile sunt cele care pot fi repetate și integrate în viața reală. Pentru unele persoane funcționează respirația lentă, pentru altele mișcarea, jurnalul, psihoterapia, conversațiile de sprijin sau reducerea supraîncărcării digitale.",
        ],
        bullets: [
          "Planifică pauze scurte de respirație sau mișcare în zilele aglomerate.",
          "Protejează somnul prin ore regulate de culcare și trezire.",
          "Caută suport social sau profesional când stresul afectează funcționarea zilnică.",
          "Folosește obiective mici, măsurabile, în locul schimbărilor bruște și greu de susținut.",
        ],
      },
      {
        heading: "Când este nevoie de ajutor specializat",
        body: [
          "Dacă stresul este asociat cu anxietate intensă, depresie, insomnie persistentă, atacuri de panică, consum crescut de alcool sau gânduri de autovătămare, este importantă evaluarea medicală sau psihologică. Ghidul de față este educațional și nu înlocuiește intervenția profesională.",
        ],
      },
    ],
    faqs: [
      {
        question: "Care sunt cele mai simple tehnici de gestionare a stresului?",
        answer:
          "Respirația lentă, mersul pe jos, pauzele programate, somnul regulat, reducerea stimulilor digitali și discuțiile cu persoane de încredere sunt puncte de început accesibile.",
      },
      {
        question: "Stresul poate afecta sănătatea cardiovasculară?",
        answer:
          "Stresul cronic poate influența comportamentele, somnul, tensiunea arterială și inflamația, factori relevanți pentru sănătatea cardiovasculară.",
      },
      {
        question: "Gestionarea stresului înlocuiește psihoterapia?",
        answer:
          "Nu. Tehnicile de gestionare a stresului pot ajuta, dar simptomele persistente sau severe necesită evaluare medicală sau psihologică.",
      },
    ],
    references: [
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
    primaryCta: { label: "Citește articole despre stres", href: "/news/articole/gestionare-stres" },
    secondaryCta: { label: "Vezi medicina stilului de viață", href: "/medicina-stilului-de-viata" },
  },
  "/ghid/sanatatea-somnului": {
    path: "/ghid/sanatatea-somnului",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Sănătatea somnului: somn de calitate și prevenție",
    description:
      "Ghid ASLM despre sănătatea somnului, somn de calitate, ritm circadian și legătura cu sănătatea fizică și mentală.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de somn și prevenție",
    directAnswer:
      "Sănătatea somnului înseamnă durată suficientă, program regulat, calitate bună a odihnei și funcționare adecvată în timpul zilei. Pentru adulți, recomandările folosite frecvent indică cel puțin 7 ore de somn pe noapte, iar regularitatea somnului este importantă pentru metabolism, inimă și sănătate mentală.",
    highlights: [
      "Țintește căutările pentru sănătatea somnului, somnul și sănătatea și somn de calitate.",
      "Explică somnul ca pilon al medicinei stilului de viață.",
      "Trimite către articolele ASLM despre ritm circadian, inflamație și sănătate mentală.",
    ],
    relatedResources: [
      { label: "Hub calitate somn", href: "/news/articole/calitate-somn" },
      { label: "Somnul și sănătatea fizică și mentală", href: "/news/articole/calitate-somn/cum-impacteaza-somnul-sanatatea-fizica-si-mentala" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "Ce înseamnă somn de calitate",
        body: [
          "Somnul de calitate nu se rezumă doar la numărul de ore. Contează regularitatea, continuitatea, capacitatea de a adormi, trezirile nocturne, lumina de seară, cofeina, activitatea fizică și nivelul de stres. În medicina stilului de viață, somnul este analizat împreună cu alimentația, mișcarea și sănătatea mentală.",
          "Pentru mulți adulți, obiectivul practic este să protejeze o fereastră constantă de somn și să identifice factorii care fragmentează odihna.",
        ],
      },
      {
        heading: "Semne că somnul merită evaluat",
        body: [
          "Oboseala persistentă, somnolența diurnă, sforăitul puternic, trezirile frecvente, insomnia sau schimbările de dispoziție pot indica o problemă care necesită atenție. Uneori este suficientă ajustarea rutinei; alteori este necesară evaluarea medicală.",
        ],
        bullets: [
          "Păstrează ore similare de culcare și trezire, inclusiv în weekend.",
          "Redu lumina puternică și ecranele aproape de ora de culcare.",
          "Evită mesele foarte grele, alcoolul și cofeina târziu în zi.",
          "Discută cu un medic dacă există sforăit sever, pauze respiratorii sau somnolență marcată.",
        ],
      },
      {
        heading: "Somnul în prevenția bolilor cronice",
        body: [
          "Somnul influențează apetitul, tensiunea arterială, reglarea glicemiei, imunitatea și sănătatea mentală. De aceea, un plan de prevenție care ignoră somnul pierde o parte importantă din tabloul clinic.",
        ],
      },
    ],
    faqs: [
      {
        question: "Câte ore de somn sunt recomandate adulților?",
        answer:
          "Pentru adulți, recomandările folosite frecvent indică cel puțin 7 ore de somn pe noapte, cu atenție la calitate și regularitate.",
      },
      {
        question: "Ce este somnul de calitate?",
        answer:
          "Somnul de calitate include durată suficientă, continuitate, program regulat și stare bună de funcționare în timpul zilei.",
      },
      {
        question: "Când ar trebui evaluat somnul medical?",
        answer:
          "Sforăitul sever, pauzele respiratorii observate, somnolența diurnă importantă, insomnia persistentă sau oboseala inexplicabilă justifică o discuție cu un medic.",
      },
    ],
    references: [
      { label: "CDC - about sleep", href: "https://www.cdc.gov/sleep/about/index.html" },
      { label: "CDC - sleep and heart health", href: "https://www.cdc.gov/heart-disease/about/sleep-and-heart-health.html" },
    ],
    primaryCta: { label: "Citește articole despre somn", href: "/news/articole/calitate-somn" },
    secondaryCta: { label: "Vezi medicina stilului de viață", href: "/medicina-stilului-de-viata" },
  },
  "/ghid/alimentatie-sanatoasa": {
    path: "/ghid/alimentatie-sanatoasa",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Alimentație sănătoasă: principii, prevenție și aplicare",
    description:
      "Ghid ASLM despre alimentație sănătoasă, alimente integrale, prevenție și rolul nutriției în medicina stilului de viață.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de nutriție preventivă",
    directAnswer:
      "Alimentație sănătoasă înseamnă un model alimentar bazat pe alimente integrale, diversitate, fibre, legume, fructe, leguminoase, cereale integrale, nuci și semințe, adaptat persoanei. În medicina stilului de viață, nutriția susține prevenția bolilor cronice și completează tratamentul medical prin schimbări sustenabile.",
    highlights: [
      "Țintește căutările pentru alimentație sănătoasă și prevenție nutrițională.",
      "Pune accent pe alimente integrale și schimbări realiste.",
      "Leagă nutriția de somn, mișcare, stres și sănătate mentală.",
    ],
    relatedResources: [
      { label: "Hub alimentație", href: "/news/articole/alimentatie" },
      { label: "Deficiențe nutriționale și depresie", href: "/news/articole/alimentatie/deficientele-nutritionale-si-riscul-de-depresie" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "Principii de bază",
        body: [
          "Nutriția preventivă nu cere perfecțiune, ci repere repetabile: mai multe alimente integrale, mai puține produse ultraprocesate și mese adaptate preferințelor, resurselor și contextului medical.",
        ],
        bullets: [
          "Construiește farfuria în jurul legumelor, fructelor, leguminoaselor și cerealelor integrale.",
          "Redu băuturile îndulcite, excesul de sare și grăsimile de slabă calitate.",
          "Discută suplimentele sau dietele restrictive cu un profesionist când există diagnostic sau tratament.",
        ],
      },
      {
        heading: "Context ASLM în România",
        body: [
          "ASLM tratează alimentația sănătoasă ca pilon clinic integrat cu mișcarea, somnul, stresul, relațiile sociale și evitarea substanțelor nocive.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce înseamnă alimentație sănătoasă?",
        answer:
          "Înseamnă un model alimentar divers, bazat pe alimente integrale și adaptat persoanei, nu o dietă rigidă temporară.",
      },
      {
        question: "Alimentația sănătoasă poate preveni boli cronice?",
        answer:
          "Un model alimentar echilibrat poate reduce riscul unor boli cronice, mai ales când este integrat cu mișcare, somn și gestionarea stresului.",
      },
      {
        question: "Când este nevoie de sfat medical?",
        answer:
          "Când există boli cronice, sarcină, simptome persistente, tratamente sau diete restrictive, recomandările trebuie personalizate medical.",
      },
    ],
    references: [
      { label: "World Health Organization - healthy diet", href: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
    primaryCta: { label: "Citește articole despre alimentație", href: "/news/articole/alimentatie" },
    secondaryCta: { label: "Devino membru ASLM", href: "/membri" },
  },
  "/ghid/activitate-fizica": {
    path: "/ghid/activitate-fizica",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Activitate fizică: mișcare regulată pentru sănătate",
    description:
      "Ghid ASLM despre activitate fizică, mișcare regulată, aderență și prevenția bolilor cronice.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de mișcare preventivă",
    directAnswer:
      "Activitate fizică înseamnă orice formă de mișcare regulată care crește consumul de energie și susține sănătatea. În medicina stilului de viață, ea include mers, exerciții de forță, mobilitate, sport sau activități zilnice adaptate vârstei, condiției fizice și siguranței medicale.",
    highlights: [
      "Țintește căutările pentru activitate fizică și mișcare regulată.",
      "Explică progresul gradual și aderența.",
      "Leagă mișcarea de somn, stres și sănătate cardiometabolică.",
    ],
    relatedResources: [
      { label: "Hub activitate fizică", href: "/news/articole/activitate-fizica" },
      { label: "Înot și sănătate pulmonară", href: "/news/articole/activitate-fizica/beneficiile-inotului-pentru-sanatatea-pulmonara" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "Cum începi în siguranță",
        body: [
          "Un plan bun pornește de la nivelul actual. Pentru cineva sedentar, primele obiective pot fi plimbări scurte, pauze active și reducerea timpului pe scaun.",
        ],
        bullets: [
          "Alege o formă de mișcare pe care o poți repeta săptămânal.",
          "Crește treptat durata, intensitatea sau frecvența.",
          "Cere evaluare medicală dacă ai simptome, boli cardiovasculare sau limitări importante.",
        ],
      },
      {
        heading: "Context ASLM în România",
        body: [
          "ASLM promovează activitatea fizică drept intervenție de stil de viață care completează îngrijirea medicală și educația pacientului.",
        ],
      },
    ],
    faqs: [
      {
        question: "Ce este activitatea fizică?",
        answer:
          "Este orice mișcare produsă de mușchi care consumă energie, de la mers și activități casnice până la exerciții structurate.",
      },
      {
        question: "Este nevoie de sport intens pentru beneficii?",
        answer:
          "Nu. Pentru multe persoane, beneficiile încep cu mișcare moderată, repetată și adaptată nivelului actual.",
      },
      {
        question: "Când ar trebui discutat cu medicul?",
        answer:
          "Înainte de efort intens dacă există simptome, boli cardiovasculare, afecțiuni pulmonare sau alte limitări medicale.",
      },
    ],
    references: [
      { label: "World Health Organization - physical activity", href: "https://www.who.int/news-room/fact-sheets/detail/physical-activity" },
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    ],
    primaryCta: { label: "Citește articole despre mișcare", href: "/news/articole/activitate-fizica" },
    secondaryCta: { label: "Vezi pilonii medicinei stilului de viață", href: "/medicina-stilului-de-viata" },
  },
  "/ghid/renuntare-fumat-alcool": {
    path: "/ghid/renuntare-fumat-alcool",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Renunțare fumat alcool: pași și suport medical",
    description:
      "Ghid ASLM despre renunțare fumat alcool, substanțe nocive, reducerea riscului și suport profesional.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de reducerea riscurilor",
    directAnswer:
      "Renunțare fumat alcool înseamnă reducerea sau oprirea consumului de tutun și alcool atunci când acestea cresc riscul medical, afectează somnul, relațiile sau funcționarea zilnică. În medicina stilului de viață, schimbarea se face cu empatie, plan concret, suport social și ajutor medical când există dependență.",
    highlights: [
      "Țintește căutările pentru renunțare fumat alcool.",
      "Abordează substanțe nocive fără moralizare.",
      "Include situații în care este necesară evaluare medicală.",
    ],
    relatedResources: [
      { label: "Hub evitare substanțe", href: "/news/articole/evitare-substante" },
      { label: "Tehnici pentru renunțarea la tutun și alcool", href: "/news/articole/evitare-substante/tehnici-pentru-renuntarea-la-tutun-si-alcool" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "Pași practici",
        body: [
          "Schimbarea începe cu identificarea declanșatorilor, alegerea unei date realiste, reducerea accesului, sprijin din partea familiei și, când este nevoie, consiliere sau tratament.",
        ],
        bullets: [
          "Notează momentele, locurile și emoțiile asociate consumului.",
          "Înlocuiește obiceiul cu alternative concrete pentru stres sau socializare.",
          "Cere ajutor medical pentru sevraj, consum problematic sau recăderi repetate.",
        ],
      },
      {
        heading: "Context ASLM în România",
        body: [
          "ASLM integrează evitarea substanțelor nocive cu somnul, stresul, relațiile sociale, alimentația și activitatea fizică.",
        ],
      },
    ],
    faqs: [
      {
        question: "Este suficientă voința pentru renunțare?",
        answer:
          "Uneori ajută, dar dependența are componente biologice, psihologice și sociale; suportul crește șansele de reușită.",
      },
      {
        question: "Când este necesar ajutor medical?",
        answer:
          "Când există sevraj, consum problematic, recăderi frecvente, boli asociate sau afectare majoră a vieții zilnice.",
      },
      {
        question: "Renunțarea ajută și ceilalți piloni?",
        answer:
          "Da. Reducerea tutunului și alcoolului poate îmbunătăți somnul, energia, respirația, relațiile și aderența la mișcare.",
      },
    ],
    references: [
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
    ],
    primaryCta: { label: "Citește articole despre substanțe nocive", href: "/news/articole/evitare-substante" },
    secondaryCta: { label: "Devino membru ASLM", href: "/membri" },
  },
  "/ghid/relatii-sociale-sanatate": {
    path: "/ghid/relatii-sociale-sanatate",
    modifiedDate: "2026-07-13",
    eyebrow: "Ghid practic",
    title: "Relații sociale sănătate: sprijin, apartenență și prevenție",
    description:
      "Ghid ASLM despre relații sociale sănătate, sprijin social, izolare și rolul conexiunilor în medicina stilului de viață.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    medicalAudience: "Profesioniști din sănătate și public interesat de sprijin social",
    directAnswer:
      "Relații sociale sănătate descrie legătura dintre sprijinul social, apartenență, izolare, stres și comportamentele zilnice. În medicina stilului de viață, relațiile sănătoase pot susține somnul, activitatea fizică, aderența la tratament, sănătatea mentală și schimbările pe termen lung.",
    highlights: [
      "Țintește căutările pentru relații sociale sănătate.",
      "Leagă sprijinul social de stres, somn și aderență.",
      "Include pași practici pentru reducerea izolării.",
    ],
    relatedResources: [
      { label: "Hub relații sociale", href: "/news/articole/relatii-sociale" },
      { label: "Conexiuni sociale și sănătate mentală", href: "/news/articole/relatii-sociale/conexiunile-sociale-si-sanatatea-mentala" },
      { label: "Medicina stilului de viață", href: "/medicina-stilului-de-viata" },
    ],
    sections: [
      {
        heading: "De ce contează sprijinul social",
        body: [
          "Sprijinul social poate reduce vulnerabilitatea la stres și poate face mai ușor de menținut obiceiurile sănătoase. Nu contează doar numărul contactelor, ci calitatea relațiilor.",
        ],
        bullets: [
          "Programează contacte regulate cu persoane de încredere.",
          "Caută activități de grup potrivite vârstei, intereselor și stării de sănătate.",
          "Cere suport specializat când izolarea sau anxietatea socială persistă.",
        ],
      },
      {
        heading: "Context ASLM în România",
        body: [
          "ASLM tratează relațiile sociale ca pilon al sănătății, nu ca detaliu separat de prevenție sau îngrijirea bolilor cronice.",
        ],
      },
    ],
    faqs: [
      {
        question: "Cum influențează relațiile sociale sănătatea?",
        answer:
          "Relațiile pot influența stresul, somnul, comportamentele zilnice, aderența și sănătatea mentală.",
      },
      {
        question: "Ce pot face când există izolare socială?",
        answer:
          "Un prim pas este contactul regulat cu persoane de încredere, activități comunitare sau suport psihologic când izolarea persistă.",
      },
      {
        question: "Relațiile sociale sunt parte din medicina stilului de viață?",
        answer:
          "Da. Conexiunile sociale sănătoase sunt unul dintre cei șase piloni ai medicinei stilului de viață.",
      },
    ],
    references: [
      { label: "World Health Organization - healthy lifestyle recommendations", href: "https://www.who.int/europe/news-room/fact-sheets/item/a-healthy-lifestyle---who-recommendations" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
    primaryCta: { label: "Citește articole despre relații sociale", href: "/news/articole/relatii-sociale" },
    secondaryCta: { label: "Vezi pilonii medicinei stilului de viață", href: "/medicina-stilului-de-viata" },
  },
  "/medicina-stilului-de-viata-vs-medicina-preventiva": {
    path: "/medicina-stilului-de-viata-vs-medicina-preventiva",
    modifiedDate: "2026-07-13",
    eyebrow: "Comparație",
    title: "Medicina stilului de viață vs medicina preventivă",
    description:
      "Comparație ASLM între medicina stilului de viață și medicina preventivă: diferențe, suprapuneri și aplicare în România.",
    lastUpdated: "2026",
    reviewedBy: "Consiliul Științific ASLM",
    directAnswer:
      "Medicina stilului de viață și medicina preventivă se completează. Medicina preventivă reduce riscul prin screening, vaccinare, politici și depistare precoce, iar medicina stilului de viață folosește intervenții clinice asupra comportamentelor zilnice: alimentație, mișcare, somn, stres, relații sociale și evitarea substanțelor nocive.",
    highlights: [
      "Clarifică diferențe și suprapuneri pentru căutări comparative.",
      "Reduce confuzia între prevenție populațională și intervenții de stil de viață.",
      "Trimite cititorul către ghidul principal și cele șase piloni.",
    ],
    comparisonRows: [
      {
        criteriu: "Obiectiv",
        lifestyleMedicine: "Schimbare comportamentală susținută și management al riscului în viața de zi cu zi.",
        preventiveMedicine: "Prevenție, screening, vaccinare, depistare precoce și politici de sănătate.",
      },
      {
        criteriu: "Instrumente",
        lifestyleMedicine: "Consiliere, obiective, monitorizare, nutriție, mișcare, somn, stres și relații.",
        preventiveMedicine: "Programe populaționale, controale periodice, vaccinuri și recomandări de sănătate publică.",
      },
      {
        criteriu: "Relație",
        lifestyleMedicine: "Poate fi văzută ca o componentă clinică aplicată a prevenției și îngrijirii cronice.",
        preventiveMedicine: "Oferă cadrul larg în care intervențiile de stil de viață pot fi integrate.",
      },
    ],
    relatedResources: [
      { label: "Ghid principal", href: "/medicina-stilului-de-viata" },
      { label: "Misiune ASLM", href: "/misiune" },
      { label: "Devino membru ASLM", href: "/membri" },
    ],
    sections: [
      {
        heading: "diferențe principale",
        body: [
          "Diferența practică este nivelul de aplicare. Medicina preventivă include intervenții largi pentru populație și depistare precoce, în timp ce medicina stilului de viață transformă pilonii comportamentali în planuri clinice individualizate.",
        ],
      },
      {
        heading: "Cum se completează",
        body: [
          "Pentru ASLM, cele două abordări nu concurează. Ele se susțin reciproc: prevenția identifică riscurile, iar medicina stilului de viață oferă instrumente concrete pentru schimbare sustenabilă.",
        ],
      },
    ],
    faqs: [
      {
        question: "Este medicina stilului de viață același lucru cu medicina preventivă?",
        answer:
          "Nu exact. Se suprapun, dar medicina stilului de viață se concentrează pe intervenții clinice asupra comportamentelor zilnice.",
      },
      {
        question: "Care este mai importantă?",
        answer:
          "Ambele sunt importante. Medicina preventivă oferă cadrul de reducere a riscurilor, iar medicina stilului de viață susține schimbarea comportamentală.",
      },
      {
        question: "Cum aplică ASLM aceste concepte?",
        answer:
          "ASLM le aplică prin educație, resurse, evenimente, publicații și colaborare interdisciplinară în România.",
      },
    ],
    references: [
      { label: "American College of Lifestyle Medicine - overview", href: "https://lifestylemedicine.org/overview/" },
      { label: "World Health Organization - noncommunicable diseases", href: "https://www.who.int/health-topics/noncommunicable-diseases" },
    ],
    primaryCta: { label: "Vezi ghidul principal", href: "/medicina-stilului-de-viata" },
    secondaryCta: { label: "Explorează articolele", href: "/news/articole" },
  },
};

export function getSeoGrowthPage(path: string): SeoGrowthPage {
  const page = seoGrowthPages[path];
  if (!page) {
    throw new Error(`Missing SEO growth page for ${path}`);
  }

  return page;
}
