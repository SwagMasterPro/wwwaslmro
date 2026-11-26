import type { Locale } from "@/lib/localized-routes";

export type LocalizedText = {
  ro: string;
  en: string;
};

export type GovernancePerson = {
  id: string;
  displayName: string;
  sortName?: string;
  city?: string;
  image?: string;
  role?: LocalizedText;
  affiliation?: LocalizedText;
  profileSlug?: string;
  profilePath?: string;
  orcid?: string;
  shortBio?: Partial<LocalizedText>;
  bio?: Partial<LocalizedText>;
};

export type GeneralAssemblyMember = {
  profileId?: string;
  image?: string;
  shortBio?: Partial<LocalizedText>;
  displayName: string;
  city?: string;
  sortName?: string;
};

function withProfilePath(person: Omit<GovernancePerson, "profilePath">): GovernancePerson {
  const profileSlug = person.profileSlug ?? person.id;

  return {
    ...person,
    profileSlug,
    profilePath: `/experti/${profileSlug}`,
  };
}

export function textForLocale(text: LocalizedText | undefined, locale: Locale): string | undefined {
  return text?.[locale];
}

function normalizeSortValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("ro-RO");
}

export function sortPeopleByName<T extends { displayName: string; sortName?: string }>(people: T[]): T[] {
  return [...people].sort((first, second) =>
    normalizeSortValue(first.sortName ?? first.displayName).localeCompare(
      normalizeSortValue(second.sortName ?? second.displayName),
      "ro-RO",
    ),
  );
}

const societyAffiliation: LocalizedText = {
  ro: "Societatea Academică de Medicina Stilului de Viață",
  en: "Academic Society of Lifestyle Medicine",
};

const scientificAffiliation: LocalizedText = {
  ro: "Consiliul Științific ASLM",
  en: "ASLM Scientific Council",
};

const executiveAffiliation: LocalizedText = {
  ro: "Comitetul Executiv ASLM",
  en: "ASLM Executive Committee",
};

export const president = withProfilePath({
  id: "andrea-elena-neculau",
  displayName: "Prof. Dr. Andrea Elena Neculau",
  sortName: "Neculau Andrea Elena",
  role: { ro: "Președinte", en: "President" },
  image: "/images/council/prof-dr-andrea-elena-neculau.png",
  affiliation: societyAffiliation,
  profileSlug: "andrea-elena-neculau",
});

export const honoraryPresidents: GovernancePerson[] = [
  withProfilePath({
    id: "adrian-restian",
    displayName: "†Prof. Dr. Adrian Restian",
    sortName: "Restian Adrian",
    role: { ro: "Președinte de onoare", en: "Honorary President" },
    image: "/images/council/prof-dr-adrian-restian.png",
    affiliation: scientificAffiliation,
  }),
  withProfilePath({
    id: "constantin-ionescu-tirgoviste",
    displayName: "Acad. Constantin Ionescu-Tîrgoviște",
    sortName: "Ionescu Tirgoviste Constantin",
    role: { ro: "Președinte de onoare", en: "Honorary President" },
    image: "/images/council/acad-constantin-ionescu-tirgoviste.png",
    affiliation: scientificAffiliation,
  }),
];

export const scientificCouncilMembers: GovernancePerson[] = sortPeopleByName([
  withProfilePath({ id: "ana-maria-alexandra-stanescu", displayName: "Prof. Dr. Ana Maria Alexandra Stănescu", sortName: "Stanescu Ana Maria Alexandra", image: "/images/council/prof-dr-ana-maria-alexandra-stanescu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "anastasia-abaitancei", displayName: "Dr. Anastasia Abăităncei", sortName: "Abaitancei Anastasia", image: "/images/council/dr-anastasia-abaitancei.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "ioana-agache",
    displayName: "Prof. Dr. Ioana Octavia Agache",
    sortName: "Agache Ioana Octavia",
    image: "/images/council/prof-dr-ioana-agache.png",
    affiliation: scientificAffiliation,
    profileSlug: "ioana-agache",
    shortBio: {
      ro: "Medic primar în alergologie și imunologie clinică. La congresul inaugural ASLM a abordat intervențiile bazate pe natură în bolile cronice.",
      en: "A specialist in allergy and clinical immunology, she contributed to the inaugural ASLM congress on nature-based interventions in chronic disease.",
    },
  }),
  withProfilePath({
    id: "marian-anghel",
    displayName: "Sociolog Marian Anghel",
    sortName: "Anghel Marian",
    image: "/images/council/marian-anghel.png",
    affiliation: scientificAffiliation,
    profileSlug: "marian-anghel",
    shortBio: {
      ro: "Sociolog și instructor acreditat de mers nordic, a contribuit la congresul inaugural ASLM cu un atelier de Nordic Walking.",
      en: "A sociologist and accredited Nordic walking instructor, he contributed a Nordic walking workshop to ASLM’s inaugural congress.",
    },
  }),
  withProfilePath({ id: "adriana-sorina-antohe", displayName: "Dr. Adriana Sorina Antohe", sortName: "Antohe Adriana Sorina", image: "/images/council/dr-adriana-sorina-antohe.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "dana-teodora-anton-paduraru",
    displayName: "Conf. Dr. Dana-Teodora Anton-Păduraru",
    sortName: "Anton Paduraru Dana Teodora",
    image: "/images/council/conf-dr-dana-teodora-anton-paduraru.png",
    affiliation: scientificAffiliation,
    profileSlug: "dana-teodora-anton-paduraru",
    shortBio: {
      ro: "Medic primar pediatru și conferențiar universitar la UMF „Grigore T. Popa” din Iași, cu preocupări în pediatrie, nutriție pediatrică, medicina stilului de viață și tulburări metabolice.",
      en: "A senior paediatrician and associate professor at Grigore T. Popa University in Iași, her work includes paediatric nutrition and metabolic disorders.",
    },
    bio: {
      ro: "Conf. Dr. Dana-Teodora Anton-Păduraru este medic primar pediatru și conferențiar universitar la Universitatea de Medicină și Farmacie „Grigore T. Popa” din Iași. Activitatea sa profesională este concentrată în pediatrie și gastroenterologie pediatrică, cu pregătire în nutriție și dietetică, homeopatie clinică și fitoterapie. Este implicată în proiecte educaționale, cursuri, conferințe și inițiative dedicate nutriției și sănătății copilului, precum și în promovarea medicinei stilului de viață și a comportamentelor sănătoase încă din copilărie.",
    },
  }),
  withProfilePath({ id: "laura-atyim", displayName: "Asist. Univ. Dr. Laura Atyim", sortName: "Atyim Laura", image: "/images/council/asist-univ-laura-atyim.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dana-balta", displayName: "Șef Lucr. Dr. Mihaela Daniela Baltă", sortName: "Balta Mihaela Daniela", image: "/images/council/sef-lucr-dr-dana-balta.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "alexandra-belibou", displayName: "Conf. Dr. Alexandra Belibou", sortName: "Belibou Alexandra", image: "/images/council/conf-dr-alexandra-belibou.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "lucia-bubulac", displayName: "Șef Lucr. Dr. Lucia Bubulac", sortName: "Bubulac Lucia", image: "/images/council/sef-lucr-dr-lucia-bubulac.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "doina-todea",
    displayName: "Prof. Dr. Doina Adina Todea",
    sortName: "Todea Doina Adina",
    role: { ro: "Membru fondator, Consiliul Științific ASLM", en: "Founding member, ASLM Scientific Council" },
    image: "/images/council/prof-dr-doina-adina-todea.png",
    affiliation: scientificAffiliation,
    profileSlug: "doina-todea",
  }),
  withProfilePath({
    id: "monica-tarcea",
    displayName: "Prof. Dr. Monica Tarcea",
    sortName: "Tarcea Monica",
    role: { ro: "Membru fondator, Consiliul Științific ASLM", en: "Founding member, ASLM Scientific Council" },
    image: "/images/council/prof-dr-monica-tarcea.png",
    affiliation: scientificAffiliation,
    profileSlug: "monica-tarcea",
    shortBio: {
      ro: "Prof. Dr. Monica Tarcea este medic primar Igienă și specialist în nutriție comunitară și sănătate publică la UMFST „George Emil Palade” din Târgu Mureș.",
      en: "A physician specialising in hygiene, she works in community nutrition and public health at George Emil Palade University in Târgu Mureș.",
    },
    bio: {
      ro: "Prof. Dr. Monica Tarcea este medic primar Igienă și profesor universitar la Universitatea de Medicină, Farmacie, Științe și Tehnologie „George Emil Palade” din Târgu Mureș. A coordonat activități academice în nutriție comunitară și siguranța alimentelor, este implicată în proiecte naționale și internaționale de sănătate publică și cercetare, iar domeniile sale de interes includ nutriția comunitară, sănătatea publică, siguranța alimentelor și managementul comportamentelor de risc.",
    },
  }),
  withProfilePath({ id: "vladimir-poroch", displayName: "Prof. Dr. Vladimir Poroch", sortName: "Poroch Vladimir", image: "/images/council/prof-dr-vladimir-poroch.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "mircea-cinteza", displayName: "Prof. Dr. Mircea Cinteza", sortName: "Cinteza Mircea", image: "/images/council/prof-dr-mircea-cinteza.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-lavinia-cioca", displayName: "Șef Lucr. Dr. Adriana Lavinia Cioca", sortName: "Cioca Adriana Lavinia", image: "/images/council/sef-lucr-dr-adriana-lavinia-cioca.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "andreea-ciubotaru", displayName: "Dr. Andreea Ciubotaru", sortName: "Ciubotaru Andreea", image: "/images/council/dr-andreea-ciubotaru.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "maria-elena-cocuz", displayName: "Conf. Dr. Maria Elena Cocuz", sortName: "Cocuz Maria Elena", image: "/images/council/conf-dr-maria-elena-cocuz.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adorata-elena-coman", displayName: "Conf. Dr. Adorata Elena Coman", sortName: "Coman Adorata Elena", image: "/images/council/conf-dr-adorata-elena-coman.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "laura-maria-condur", displayName: "Șef Lucr. Dr. Laura Maria Condur", sortName: "Condur Laura Maria", image: "/images/council/sef-lucr-dr-laura-maria-condur.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dan-constantin", displayName: "Șef Lucr. Dr. Dan Constantin", sortName: "Constantin Dan", image: "/images/council/sef-lucr-dr-dan-constantin.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-cotel", displayName: "Șef Lucr. Psih. Dr. Adriana Cotel", sortName: "Cotel Adriana", image: "/images/council/sef-lucr-psih-dr-adriana-cotel.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "mihai-craiu", displayName: "Prof. Dr. Mihai Craiu", sortName: "Craiu Mihai", image: "/images/council/prof-dr-mihai-craiu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "simina-maria-diaconu", displayName: "Dr. Simina Maria Diaconu", sortName: "Diaconu Simina Maria", image: "/images/council/dr-simina-maria-diaconu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "lorena-dima", displayName: "Prof. Dr. Lorena Dima", sortName: "Dima Lorena", image: "/images/council/prof-dr-lorena-dima.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "gheorghe-gindrovel-dumitra", displayName: "Conf. Dr. Gheorghe Gindrovel Dumitra", sortName: "Dumitra Gheorghe Gindrovel", image: "/images/council/conf-dr-gheorghe-gindrovel-dumitra.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "irina-eremia", displayName: "Conf. Dr. Irina Eremia", sortName: "Eremia Irina", image: "/images/council/conf-dr-irina-eremia.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "zsuzsanna-farkas-pall", displayName: "Șef Lucr. Dr. Zsuzsanna Farkas-Pall", sortName: "Farkas Pall Zsuzsanna", image: "/images/council/sef-lucr-dr-zsuzsanna-farkas-pall.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "roxana-folescu", displayName: "Prof. Dr. Roxana Folescu", sortName: "Folescu Roxana", image: "/images/council/prof-dr-roxana-folescu.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "alexandra-ghement",
    displayName: "Dr. Alexandra Ghement",
    sortName: "Ghement Alexandra",
    role: { ro: "Coordonator Relații Academice și Cooperare Științifică", en: "Academic Relations and Scientific Cooperation Coordinator" },
    image: "/images/council/dr-alexandra-ghement.png",
    affiliation: executiveAffiliation,
    profileSlug: "alexandra-ghement",
  }),
  withProfilePath({ id: "daniela-gurgus", displayName: "Conf. Dr. Daniela Gurgus", sortName: "Gurgus Daniela", image: "/images/council/conf-dr-daniela-gurgus.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "felicia-alexandra-hanzu", displayName: "Prof. Dr. Felicia Alexandra Hanzu", sortName: "Hanzu Felicia Alexandra", image: "/images/council/prof-dr-felicia-alexandra-hanzu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "andreea-narcisa-iana", displayName: "Asist. Univ. Andreea Narcisa Iana", sortName: "Iana Andreea Narcisa", image: "/images/council/andreea-narcisa-iana.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adela-mihaela-iancu", displayName: "Prof. Dr. Adela Mihaela Iancu", sortName: "Iancu Adela Mihaela", image: "/images/council/prof-dr-adela-mihaela-iancu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "cristina-isar", displayName: "Dr. Cristina Cornelia Isar", sortName: "Isar Cristina Cornelia", image: "/images/dr-cristina-isar.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "constantin-kamal", displayName: "Conf. Dr. Constantin Kamal", sortName: "Kamal Constantin", image: "/images/conf-dr-constantin-kamal.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "polliana-mihaela-leru",
    displayName: "Prof. Dr. Polliana Mihaela Leru",
    sortName: "Leru Polliana Mihaela",
    image: "/images/council/prof-dr-polliana-mihaela-leru.png",
    affiliation: scientificAffiliation,
    profileSlug: "polliana-mihaela-leru",
    shortBio: {
      ro: "Medic primar alergologie și profesor universitar la UMF „Carol Davila” din București, cu interese în alergologie, boli respiratorii, medicina stilului de viață, aerobiologie și sănătate publică.",
      en: "A senior allergist and professor at Carol Davila University in Bucharest, her work covers respiratory disease, aerobiology and public health.",
    },
    bio: {
      ro: "Prof. Dr. Polliana Mihaela Leru este medic primar și profesor universitar la Universitatea de Medicină și Farmacie „Carol Davila” din București. Activitatea sa clinică și de cercetare acoperă medicina internă, alergologia și imunologia clinică, iar domeniile sale de interes includ alergiile respiratorii, astmul, BPOC, medicina stilului de viață, aerobiologia, poluarea aerului, sănătatea publică și educația în asistența medicală primară.",
    },
  }),
  withProfilePath({ id: "roxana-miclaus", displayName: "Prof. Dr. Roxana Miclăuș", sortName: "Miclaus Roxana", image: "/images/council/prof-dr-roxana-miclaus.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "mihaela-naidin",
    displayName: "Psih. Mihaela Gabor Naidin",
    sortName: "Naidin Mihaela Gabor",
    role: { ro: "Coordonator Psihologie Aplicată și Managementul Stresului", en: "Applied Psychology and Stress Management Coordinator" },
    image: "/images/council/psih-mihaela-gabor-naidin.png",
    affiliation: executiveAffiliation,
    profileSlug: "mihaela-naidin",
    shortBio: {
      ro: "Licențiată în Psihologie și trainer-formator în comunicare pentru domeniul sănătății, cu preocupări în managementul stresului, prevenirea burnoutului, reziliență și comunicare conștientă.",
      en: "With a degree in psychology, she trains healthcare professionals in communication, stress management, burnout prevention and resilience.",
    },
    bio: {
      ro: "Mihaela Gabor Naidin este licențiată în Psihologie, cu master în Management Sanitar și formare în Managementul Calității în Sănătate. În calitate de trainer-formator în comunicare pentru domeniul sănătății, dezvoltă programe pentru profesioniști, rezidenți și studenți, abordând comunicarea cu pacientul, reglarea emoțională, managementul stresului, prevenirea burnoutului și dezvoltarea rezilienței. În cadrul ASLM coordonează aria de Psihologie Aplicată și Managementul Stresului.",
    },
  }),
  withProfilePath({
    id: "mirela-nedelescu",
    displayName: "Conf. Dr. Mirela Nedelescu",
    sortName: "Nedelescu Mirela",
    image: "/images/council/conf-dr-mirela-nedelescu-2026.png",
    affiliation: scientificAffiliation,
    profileSlug: "mirela-nedelescu",
    shortBio: {
      ro: "Conferențiar universitar la UMF „Carol Davila” și medic primar Igienă, cu expertiză în nutriție, promovarea alimentației sănătoase, evaluarea statusului nutrițional și recomandări privind activitatea fizică.",
      en: "A senior physician in hygiene and an associate professor at Carol Davila University, she works on nutrition, dietary assessment and physical activity.",
    },
    bio: {
      ro: "Conf. Dr. Mirela Nedelescu este conferențiar universitar la Universitatea de Medicină și Farmacie „Carol Davila” din București și își desfășoară activitatea în cadrul Institutului Național de Sănătate Publică. Este medic primar Igienă și expert al Ministerului Sănătății în grupurile tehnice ale Comisiei Europene în domeniul nutriției, cu interese în nutriție, promovarea alimentației sănătoase, evaluarea statusului nutrițional și recomandări privind activitatea fizică.",
    },
  }),
  withProfilePath({ id: "robert-constantin-negoi", displayName: "Dr. Robert Constantin Negoi", sortName: "Negoi Robert Constantin", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dina-olteanu-pascal", displayName: "Dr. Dina Olteanu-Pascal", sortName: "Olteanu Pascal Dina", image: "/images/council/dr-dina-olteanu-pascal.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "cintia-orsa", displayName: "Dr. Cintia Orsa", sortName: "Orsa Cintia", image: "/images/council/dr-cintia-orsa.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "catalina-panaitescu", displayName: "Dr. Cătălina Panaitescu", sortName: "Panaitescu Catalina", image: "/images/council/dr-catalina-panaitescu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "alina-pascu", displayName: "Prof. Dr. Alina Pascu", sortName: "Pascu Alina", image: "/images/council/prof-univ-dr-alina-pascu.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "ionut-poinareanu",
    displayName: "Șef Lucr. Dr. Ionuț Poinăreanu",
    sortName: "Poinareanu Ionut",
    image: "/images/council/sef-lucr-dr-ionut-poinareanu.png",
    affiliation: scientificAffiliation,
    profileSlug: "ionut-poinareanu",
    shortBio: {
      ro: "Predă anatomie patologică la Universitatea „Ovidius” din Constanța. La congresul inaugural ASLM a prezentat rezultate ale unui studiu de meloterapie activă.",
      en: "He teaches pathology at Ovidius University of Constanța and presented a study on active music therapy at ASLM’s inaugural congress.",
    },
  }),
  withProfilePath({
    id: "mihai-cristian-popescu",
    displayName: "Dr. Mihai Cristian Popescu",
    sortName: "Popescu Mihai Cristian",
    role: { ro: "Secretar General ASLM", en: "ASLM Secretary General" },
    image: "/images/council/dr-mihai-cristian-popescu.png",
    affiliation: executiveAffiliation,
    profileSlug: "mihai-cristian-popescu",
  }),
  withProfilePath({ id: "aida-puia", displayName: "Conf. Dr. Aida Puia", sortName: "Puia Aida", image: "/images/council/conf-dr-aida-puia.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "razvan-susan", displayName: "Conf. Dr. Răzvan Șusan", sortName: "Susan Razvan", image: "/images/council/conf-dr-razvan-susan.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "ioana-bianca-tebeica", displayName: "Dr. Ioana Bianca Tebeica", sortName: "Tebeica Ioana Bianca", image: "/images/council/dr-ioana-bianca-tebeica.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "doina-carina-voinescu", displayName: "Prof. Dr. Doina Carina Voinescu", sortName: "Voinescu Doina Carina", image: "/images/council/prof-dr-doina-carina-voinescu.png", affiliation: scientificAffiliation }),
]);

export const scientificCouncilPageMembers: GovernancePerson[] = [
  president,
  ...honoraryPresidents,
  ...scientificCouncilMembers.filter((person) => person.id === "ana-maria-alexandra-stanescu"),
  ...scientificCouncilMembers.filter((person) => person.id !== "ana-maria-alexandra-stanescu"),
];

const peopleById = new Map(
  [president, ...honoraryPresidents, ...scientificCouncilMembers].map((person) => [person.id, person]),
);

function personById(id: string): GovernancePerson {
  const person = peopleById.get(id);
  if (!person) {
    throw new Error(`Missing governance person ${id}`);
  }

  return person;
}

export const executiveCouncilMembers: GovernancePerson[] = [
  {
    ...president,
    role: { ro: "Președinte", en: "President" },
    affiliation: executiveAffiliation,
  },
  {
    ...personById("mihai-cristian-popescu"),
    role: { ro: "Secretar General", en: "Secretary General" },
  },
  personById("alexandra-ghement"),
  withProfilePath({
    id: "stefan-ionescu",
    displayName: "Ștefan Ionescu",
    sortName: "Ionescu Stefan",
    role: { ro: "Coordonator Tehnologie și Inovație Digitală", en: "Technology and Digital Innovation Coordinator" },
    image: "/images/stefan-ionescu.png",
    affiliation: executiveAffiliation,
  }),
  personById("mihaela-naidin"),
  withProfilePath({
    id: "elena-iuliana-nistoroiu",
    displayName: "Elena Iuliana Nistoroiu",
    sortName: "Nistoroiu Elena Iuliana",
    role: { ro: "Coordonator Strategie, Dezvoltare și Comunicare", en: "Strategy, Development and Communication Coordinator" },
    image: "/images/iulia-nistoroiu.png",
    affiliation: executiveAffiliation,
  }),
  withProfilePath({
    id: "armand-gabriel-popescu",
    displayName: "Armand-Gabriel Popescu",
    sortName: "Popescu Armand Gabriel",
    role: { ro: "Coordonator Proiecte Speciale", en: "Special Projects Coordinator" },
    image: "/images/armand-gabriel-popescu.png",
    affiliation: executiveAffiliation,
  }),
  withProfilePath({
    id: "mirela-boroeanu",
    displayName: "Mirela Boroeanu",
    sortName: "Boroeanu Mirela",
    role: { ro: "Coordonator Evenimente și Publicații Științifice", en: "Events and Scientific Publications Coordinator" },
    affiliation: executiveAffiliation,
  }),
  withProfilePath({
    id: "anne-mary-nechita",
    displayName: "Anne Mary Nechita",
    sortName: "Nechita Anne Mary",
    role: { ro: "Coordonator Design Grafic și Imagine Instituțională", en: "Graphic Design and Institutional Image Coordinator" },
    image: "/images/anne-mary-nechita.png",
    affiliation: executiveAffiliation,
  }),
  withProfilePath({
    id: "andreea-florentina-munteanu",
    displayName: "Andreea Florentina Munteanu",
    sortName: "Munteanu Andreea Florentina",
    role: { ro: "Coordonator Comunicare Digitală", en: "Digital Communications Coordinator" },
    image: "/images/andreea-florentina-munteanu.png",
    affiliation: executiveAffiliation,
  }),
];

const genericFemalePortrait = "/images/members/assembly/portret-generic-feminin.webp";
const genericMalePortrait = "/images/members/assembly/portret-generic-masculin.webp";

// Congress contributions are credited in the official programme of the inaugural ASLM congress (May 2026).
export const generalAssemblyMembers: GeneralAssemblyMember[] = [
  {
    displayName: "Anastasia ABĂITĂNCEI", city: "Brașov, România", sortName: "Abaitancei Anastasia", profileId: "anastasia-abaitancei",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre rolul alimentației în inflamația din dermatita atopică.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on diet and inflammation in atopic dermatitis.",
    },
  },
  { displayName: "Ioana AGACHE", city: "Brașov, România", sortName: "Agache Ioana", profileId: "ioana-agache" },
  { displayName: "Marian ANGHEL", city: "Brașov, România", sortName: "Anghel Marian", profileId: "marian-anghel" },
  {
    displayName: "Adriana Sorina ANTOHE", city: "Brașov, România", sortName: "Antohe Adriana Sorina", profileId: "adriana-sorina-antohe",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre activitatea fizică și sănătatea.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on physical activity and health.",
    },
  },
  { displayName: "Dana-Teodora ANTON-PĂDURARU", city: "Iași, România", sortName: "Anton Paduraru Dana Teodora", profileId: "dana-teodora-anton-paduraru" },
  {
    displayName: "Sorina AURELIAN",
    city: "București, România",
    sortName: "Aurelian Sorina",
    image: "/images/members/assembly/dr-sorina-maria-aurelian.webp",
    shortBio: {
      ro: "Medic primar în geriatrie și gerontologie, cu preocupări în domeniul medicinei stilului de viață și al îmbătrânirii sănătoase.",
      en: "Senior physician in geriatrics and gerontology with an interest in lifestyle medicine and healthy ageing.",
    },
  },
  {
    displayName: "Laura ATYIM", city: "Timișoara, România", sortName: "Atyim Laura", profileId: "laura-atyim",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre formarea obiceiurilor sănătoase în copilărie.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on developing healthy habits in childhood.",
    },
  },
  {
    displayName: "Mihaela Daniela BALTĂ", city: "București, România", sortName: "Balta Mihaela Daniela", profileId: "dana-balta",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre prescripția socială și legătura dintre pacient și comunitate.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on social prescribing and the links between patients and their communities.",
    },
  },
  {
    displayName: "Florin BĂLAN",
    city: "Brașov, România",
    sortName: "Balan Florin",
    image: "/images/members/assembly/florin-balan.webp",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre folosirea meloterapiei active în recuperarea pacienților.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on active music therapy in rehabilitation.",
    },
  },
  {
    displayName: "Alexandra BELIBOU", city: "Brașov, România", sortName: "Belibou Alexandra", profileId: "alexandra-belibou",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre integrarea meloterapiei neurologice în echipele de neuroreabilitare.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the use of neurologic music therapy in rehabilitation teams.",
    },
  },
  {
    displayName: "Lucia BUBULAC", city: "București, România", sortName: "Bubulac Lucia", profileId: "lucia-bubulac",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre gestionarea stresului și percepția asupra realității.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on stress management and perception.",
    },
  },
  {
    displayName: "Venera - Margareta BUCUR",
    city: "Timișoara, România",
    sortName: "Bucur Venera Margareta",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de medicină generală, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și promovarea sănătății.",
      en: "General practitioner interested in lifestyle medicine, chronic disease prevention and health promotion.",
    },
  },
  {
    displayName: "Nadia-Maria BUTUM",
    city: "Brașov, România",
    sortName: "Butum Nadia Maria",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru integrarea principiilor medicinei stilului de viață în practica medicală, prevenția bolilor cronice și promovarea obiceiurilor sănătoase.",
      en: "Family physician interested in integrating lifestyle medicine into clinical practice, preventing chronic disease and promoting healthy habits.",
    },
  },
  {
    displayName: "Lucia CALUSER",
    city: "Deva, România",
    sortName: "Caluser Lucia",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie și pediatru, cu interes pentru medicina stilului de viață, prevenția bolilor și formarea obiceiurilor sănătoase încă din copilărie.",
      en: "Family physician and paediatrician interested in lifestyle medicine, disease prevention and helping children develop healthy habits from an early age.",
    },
  },
  {
    displayName: "Cristian CÂRSTOIU",
    sortName: "Carstoiu Cristian",
    image: "/images/members/assembly/dr-cristian-carstoiu.webp",
    shortBio: {
      ro: "Antreprenor și autor, implicat în proiecte la intersecția dintre creativitate, tehnologie și antreprenoriat, cu interes pentru medicina stilului de viață și promovarea sănătății.",
      en: "Entrepreneur and author whose projects bring together creativity, technology and entrepreneurship, with an interest in lifestyle medicine and health promotion.",
    },
  },
  {
    displayName: "Andreea CHIHAIA",
    sortName: "Chihaia Andreea",
    image: "/images/members/assembly/andreea-chihaia.webp",
    shortBio: {
      ro: "Specialist în nutriție și dietetică, cu interes pentru medicina stilului de viață, educația nutrițională și promovarea unor obiceiuri alimentare sănătoase și sustenabile.",
      en: "Nutrition and dietetics specialist interested in lifestyle medicine, nutrition education and promoting healthy, sustainable eating habits.",
    },
  },
  {
    displayName: "Adriana Lavinia CIOCA", city: "Sibiu, România", sortName: "Cioca Adriana Lavinia", profileId: "adriana-lavinia-cioca",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre consilierea nutrițională a pacienților cu diabet în medicina de familie.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on dietary counselling for people with diabetes in family practice.",
    },
  },
  {
    displayName: "Andreea CIUBOTARU", city: "Brașov, România", sortName: "Ciubotaru Andreea", profileId: "andreea-ciubotaru",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre stilul de viață și sănătatea metabolică la menopauză.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on lifestyle and metabolic health during menopause.",
    },
  },
  {
    displayName: "Maria Elena COCUZ", city: "Brașov, România", sortName: "Cocuz Maria Elena", profileId: "maria-elena-cocuz",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre microbiomul intestinal în hepatitele virale cronice.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the gut microbiome in chronic viral hepatitis.",
    },
  },
  {
    displayName: "Elena Adorata COMAN", city: "Iași, România", sortName: "Coman Elena Adorata", profileId: "adorata-elena-coman",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre educația pentru un stil de viață sănătos în condiții de incertitudine economică.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on healthy lifestyle education in the face of economic uncertainty.",
    },
  },
  {
    displayName: "Laura Maria CONDUR", city: "Constanța, România", sortName: "Condur Laura Maria", profileId: "laura-maria-condur",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre rolul medicinei stilului de viață în îngrijirea geriatrică.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the role of lifestyle medicine in geriatric care.",
    },
  },
  {
    displayName: "Dan CONSTANTIN", city: "Brașov, România", sortName: "Constantin Dan", profileId: "dan-constantin",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre stimularea magnetică transcraniană în tratamentul dependenței de nicotină.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on transcranial magnetic stimulation in the treatment of nicotine dependence.",
    },
  },
  {
    displayName: "Ana Georgiana CORNEA COSMA",
    city: "Brașov, România",
    sortName: "Cornea Cosma Ana Georgiana",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic specialist în psihiatrie, cu interes pentru medicina stilului de viață, promovarea sănătății mintale și integrarea obiceiurilor sănătoase în prevenția și managementul tulburărilor psihice.",
      en: "Psychiatrist interested in lifestyle medicine, mental health promotion and the role of healthy habits in preventing and managing mental disorders.",
    },
  },
  {
    displayName: "Adriana COTEL", city: "București, România", sortName: "Cotel Adriana", profileId: "adriana-cotel",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre burnout și starea de bine a profesioniștilor din sănătate.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on burnout and wellbeing among healthcare professionals.",
    },
  },
  {
    displayName: "Roxana Paraschiva COVALIU",
    city: "București, România",
    sortName: "Covaliu Roxana Paraschiva",
    image: "/images/members/assembly/dr-roxana-paraschiva-covaliu.webp",
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și educația pacienților în vederea adoptării unui stil de viață sănătos.",
      en: "Family physician interested in lifestyle medicine, chronic disease prevention and helping patients adopt a healthy lifestyle through education.",
    },
  },
  {
    displayName: "Mihai CRAIU", city: "București, România", sortName: "Craiu Mihai", profileId: "mihai-craiu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre efectele obezității infantile asupra aparatului respirator.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the respiratory effects of childhood obesity.",
    },
  },
  {
    displayName: "Carmen CROITORU",
    sortName: "Croitoru Carmen",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și susținerea pacienților în adoptarea și menținerea unor obiceiuri sănătoase.",
      en: "Family physician interested in lifestyle medicine, chronic disease prevention and helping patients adopt and maintain healthy habits.",
    },
  },
  {
    displayName: "Cristina Anca DASCALESCU",
    city: "Brașov, România",
    sortName: "Dascalescu Cristina Anca",
    image: genericFemalePortrait,
  },
  { displayName: "Simina Maria DIACONU", city: "Brașov, România", sortName: "Diaconu Simina Maria", profileId: "simina-maria-diaconu" },
  {
    displayName: "Lorena DIMA", city: "Brașov, România", sortName: "Dima Lorena", profileId: "lorena-dima",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre revizuirea tratamentului pacienților cu boli cronice când își schimbă stilul de viață.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on reviewing treatment when patients with chronic conditions make lifestyle changes.",
    },
  },
  {
    displayName: "Livia DIMA",
    city: "Iași, România",
    sortName: "Dima Livia",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de medicină de urgență, cu interes pentru medicina stilului de viață, prevenția afecțiunilor acute și cronice și reducerea factorilor de risc prin promovarea unui stil de viață sănătos.",
      en: "Emergency physician interested in lifestyle medicine, the prevention of acute and chronic conditions, and reducing risk factors by promoting healthy living.",
    },
  },
  {
    displayName: "Gindrovel DUMITRA", city: "Craiova, România", sortName: "Dumitra Gindrovel", profileId: "gheorghe-gindrovel-dumitra",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre continuitatea îngrijirii în medicina stilului de viață.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on continuity of care in lifestyle medicine.",
    },
  },
  {
    displayName: "Irina EREMIA", city: "București, România", sortName: "Eremia Irina", profileId: "irina-eremia",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre abordarea interdisciplinară a stilului de viață în medicina de familie.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on interdisciplinary approaches to lifestyle in family practice.",
    },
  },
  {
    displayName: "Szuzsanna FARKAS-PAL", city: "Oradea, România", sortName: "Farkas Pal Szuzsanna", profileId: "zsuzsanna-farkas-pall",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre intervențiile preventive asupra stilului de viață în medicina de familie.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on preventive lifestyle interventions in family practice.",
    },
  },
  {
    displayName: "Roxana FOLESCU", city: "Timișoara, România", sortName: "Folescu Roxana", profileId: "roxana-folescu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre prevenirea adicțiilor în asistența medicală primară.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on addiction prevention in primary care.",
    },
  },
  {
    displayName: "Claudia Mihaela GAVRIȘ",
    city: "Brașov, România",
    sortName: "Gavris Claudia Mihaela",
    image: "/images/members/assembly/dr-claudia-gavris.webp",
    shortBio: {
      ro: "Medic de medicină internă, cu interes pentru integrarea principiilor medicinei stilului de viață în prevenția și managementul bolilor cronice, printr-o abordare integrată a pacientului.",
      en: "Internal medicine physician interested in taking a comprehensive approach to patient care by integrating lifestyle medicine into the prevention and management of chronic disease.",
    },
  },
  {
    displayName: "Alexandra Victoria GHEMENT", city: "București, România", sortName: "Ghement Alexandra Victoria", profileId: "alexandra-ghement",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre medicina convențională și cea tradițională în contextul stilului de viață.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on conventional and traditional medicine in the context of lifestyle care.",
    },
  },
  {
    displayName: "Mihaela Andreea GHEORGHIU",
    city: "Prahova, România",
    sortName: "Gheorghiu Mihaela Andreea",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață și prevenția bolilor cronice prin adoptarea unor comportamente sănătoase.",
      en: "Family physician interested in lifestyle medicine and the prevention of chronic disease through healthy behaviours.",
    },
  },
  {
    displayName: "Iulia GONTIA",
    city: "Brașov, România",
    sortName: "Gontia Iulia",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, educația pentru sănătate și susținerea pacienților în adoptarea unor schimbări comportamentale durabile.",
      en: "Family physician interested in lifestyle medicine, health education and supporting patients as they make lasting changes to their behaviour.",
    },
  },
  {
    displayName: "Emese GRECU",
    city: "Deva, România",
    sortName: "Grecu Emese",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și îmbunătățirea calității vieții pacienților prin promovarea obiceiurilor sănătoase.",
      en: "Family physician interested in lifestyle medicine, disease prevention and improving patients’ quality of life by promoting healthy habits.",
    },
  },
  {
    displayName: "Daniela GURGUȘ", city: "Timișoara, România", sortName: "Gurgus Daniela", profileId: "daniela-gurgus",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre deciziile de sănătate ale tinerilor și diferența dintre informare și obiceiurile zilnice.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the gap between young people's health knowledge and their daily choices.",
    },
  },
  {
    displayName: "Felicia Alexandra HANZU", city: "Barcelona, Spania", sortName: "Hanzu Felicia Alexandra", profileId: "felicia-alexandra-hanzu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre efectul adaptogenilor asupra axului hipotalamo-hipofizo-adrenal.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the effects of adaptogens on the hypothalamic–pituitary–adrenal axis.",
    },
  },
  {
    displayName: "Andreea Narcisa IANA", city: "Timișoara, România", sortName: "Iana Andreea Narcisa", profileId: "andreea-narcisa-iana",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre activitatea fizică moderată și indicele gleznă-braț în medicina de familie.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on moderate physical activity and the ankle–brachial index in family practice.",
    },
  },
  {
    displayName: "Beatrice Laura IANCU",
    city: "Timișoara, România",
    sortName: "Iancu Beatrice Laura",
    image: genericFemalePortrait,
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre echilibrul metabolic și sănătatea pe termen lung.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on metabolic balance and long-term health.",
    },
  },
  {
    displayName: "Mihaela Adela IANCU", city: "Timișoara, România", sortName: "Iancu Mihaela Adela", profileId: "adela-mihaela-iancu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre factorii comportamentali implicați în obezitatea infantilă.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on behavioural factors in childhood obesity.",
    },
  },
  { displayName: "Ștefan IONESCU", city: "București, România", sortName: "Ionescu Stefan", profileId: "stefan-ionescu" },
  {
    displayName: "Cristina Cornelia ISAR", city: "Brașov, România", sortName: "Isar Cristina Cornelia", profileId: "cristina-isar",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre aplicarea dovezilor științifice în alimentație.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on using research evidence to guide dietary choices.",
    },
  },
  {
    displayName: "Sorina ISPAS",
    sortName: "Ispas Sorina",
    image: "/images/members/assembly/dr-sorina-ispas.webp",
    shortBio: {
      ro: "Medic cu specialitatea diabet zaharat, nutriție și boli metabolice, cu interes pentru medicina stilului de viață, intervențiile nutriționale, optimizarea sănătății metabolice și prevenția complicațiilor asociate.",
      en: "Physician specialising in diabetes, nutrition and metabolic diseases, with an interest in lifestyle medicine, nutritional interventions, improving metabolic health and preventing associated complications.",
    },
  },
  {
    displayName: "Agachii IURIE",
    city: "Covasna, România",
    sortName: "Iurie Agachii",
    image: genericMalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, abordarea preventivă a sănătății și susținerea pacienților în adoptarea unui stil de viață echilibrat.",
      en: "Family physician interested in lifestyle medicine, preventive care and helping patients adopt a balanced lifestyle.",
    },
  },
  {
    displayName: "Luminita Anca IVAN",
    city: "București, România",
    sortName: "Ivan Luminita Anca",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru integrarea principiilor medicinei stilului de viață în îngrijirea pacienților, promovarea sănătății și prevenția bolilor cronice.",
      en: "Family physician interested in integrating lifestyle medicine into patient care, promoting health and supporting patients in making healthy lifestyle changes.",
    },
  },
  {
    displayName: "Constantin KAMAL", city: "Craiova, România", sortName: "Kamal Constantin", profileId: "constantin-kamal",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre efectele rețelelor sociale asupra sănătății populației.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the effects of social media on population health.",
    },
  },
  { displayName: "Poliana LERU", city: "București, România", sortName: "Leru Poliana", profileId: "polliana-mihaela-leru" },
  {
    displayName: "Cristina Mădălina LUNGU",
    city: "Constanța, România",
    sortName: "Lungu Cristina Madalina",
    image: "/images/members/assembly/cristina-madalina-lungu.webp",
    shortBio: {
      ro: "Medic cu specialitatea medicină fizică și de reabilitare, cu preocupări în domeniul nutriției și al medicinei stilului de viață, cu accent pe recuperarea funcțională și îmbunătățirea calității vieții pacienților.",
      en: "Physician specialising in physical and rehabilitation medicine, with an interest in nutrition and lifestyle medicine and a focus on functional recovery and improving patients’ quality of life.",
    },
  },
  {
    displayName: "Mihaela MIHALCEA",
    city: "Bacău, România",
    sortName: "Mihalcea Mihaela",
    image: "/images/members/assembly/mihaela-mihalcea.webp",
    shortBio: {
      ro: "Specialist în nutriție și dietetică, cu competențe în kinetoterapie și interes pentru medicina stilului de viață, promovează alimentația echilibrată și activitatea fizică în vederea menținerii sănătății și îmbunătățirii calității vieții.",
      en: "A specialist in nutrition and dietetics with training in physiotherapy, she promotes a balanced diet and physical activity to maintain health and improve quality of life. Her interests include lifestyle medicine.",
    },
  },
  { displayName: "Mihaela Gabor NAIDIN", city: "Brașov, România", sortName: "Naidin Mihaela Gabor", profileId: "mihaela-naidin" },
  {
    displayName: "Andrea Elena NECULAU",
    city: "Brașov, România",
    sortName: "Neculau Andrea Elena",
    profileId: "andrea-elena-neculau",
    shortBio: {
      ro: "Președinte al Societății Academice de Medicina Stilului de Viață",
      en: "President of the Academic Society of Lifestyle Medicine",
    },
  },
  { displayName: "Mirela - Maria NEDELESCU", city: "București, România", sortName: "Nedelescu Mirela Maria", profileId: "mirela-nedelescu" },
  {
    displayName: "Robert Constantin NEGOI",
    city: "Brașov, România",
    sortName: "Negoi Robert Constantin",
    profileId: "robert-constantin-negoi",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și promovarea unei abordări personalizate a sănătății, centrate pe nevoile pacientului.",
      en: "Family physician interested in lifestyle medicine, chronic disease prevention and personalised care centred on patients’ needs.",
    },
  },
  {
    displayName: "Diana Mirela NICOLAE",
    city: "Brașov, România",
    sortName: "Nicolae Diana Mirela",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și dezvoltarea unor strategii personalizate pentru menținerea sănătății și îmbunătățirea calității vieții pacienților.",
      en: "Family physician interested in lifestyle medicine, chronic disease prevention and developing individual strategies to maintain patients’ health.",
    },
  },
  {
    displayName: "Elena Iuliana NISTOROIU",
    city: "București, România",
    sortName: "Nistoroiu Elena Iuliana",
    profileId: "elena-iuliana-nistoroiu",
    shortBio: {
      ro: "Coordonator Strategie, Dezvoltare și Comunicare; a contribuit la congresul inaugural ASLM cu o prezentare despre interviul motivațional în comunicarea dintre medic și pacient.",
      en: "Strategy, Development and Communication Coordinator. She gave a presentation on motivational interviewing in doctor–patient communication at the inaugural ASLM congress.",
    },
  },
  {
    displayName: "Liliana NITA",
    city: "Brăila, România",
    sortName: "Nita Liliana",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic cu specialitatea chirurgie generală, cu interes pentru medicina stilului de viață și pentru rolul nutriției, al activității fizice și al obiceiurilor sănătoase în pregătirea preoperatorie și recuperarea postoperatorie a pacienților.",
      en: "General surgeon interested in lifestyle medicine and the role of nutrition, physical activity and healthy habits in preparing patients for surgery and supporting their recovery.",
    },
  },
  {
    displayName: "Corina OANCEA",
    city: "București, România",
    sortName: "Oancea Corina",
    image: "/images/members/assembly/dr-corina-oancea.webp",
    shortBio: {
      ro: "Medic cu specialitatea medicină internă, cu interes pentru medicina stilului de viață, prevenția și managementul bolilor cronice, printr-o abordare integrată și personalizată a pacientului.",
      en: "Internal medicine physician interested in lifestyle medicine and in taking an integrated, personalised approach to preventing and managing chronic disease.",
    },
  },
  {
    displayName: "Dina OLTEANU-PASCAL", city: "Brașov, România", sortName: "Olteanu Pascal Dina", profileId: "dina-olteanu-pascal",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre stilul de viață digital al copiilor ca factor de risc modificabil.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on children's digital habits as a modifiable health risk.",
    },
  },
  {
    displayName: "Cintia ORSA", city: "Brașov, România", sortName: "Orsa Cintia", profileId: "cintia-orsa",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre practica tai-chi în contextul sănătății.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on tai chi in health practice.",
    },
  },
  {
    displayName: "Cătălina PANAITESCU", city: "București, România", sortName: "Panaitescu Catalina", profileId: "catalina-panaitescu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre tulburările de somn ca problemă de sănătate publică.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on sleep disorders as a public health concern.",
    },
  },
  {
    displayName: "Alina Mihaela PASCU", city: "Brașov, România", sortName: "Pascu Alina Mihaela", profileId: "alina-pascu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre nutriția de precizie în medicina stilului de viață.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on precision nutrition in lifestyle medicine.",
    },
  },
  {
    displayName: "Cristina Steliana PÎNDICHI", city: "Constanța, România", sortName: "Pindichi Cristina Steliana",
    image: "/images/members/cristina-steliana-pindichi.webp",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre medicina stilului de viață în îngrijirea persoanelor vârstnice.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on lifestyle medicine in the care of older adults.",
    },
  },
  { displayName: "Ionuț POINĂREANU", city: "Constanța, România", sortName: "Poinareanu Ionut", profileId: "ionut-poinareanu" },
  {
    displayName: "Mihai-Cristian POPESCU", city: "București, România", sortName: "Popescu Mihai Cristian", profileId: "mihai-cristian-popescu",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre magneziul și mecanismele celulare ale îmbătrânirii.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on magnesium and the cellular mechanisms of ageing.",
    },
  },
  { displayName: "Armand-Gabriel POPESCU", city: "București, România", sortName: "Popescu Armand Gabriel", profileId: "armand-gabriel-popescu" },
  {
    displayName: "Valentina Claudia POPESCU",
    city: "București, România",
    sortName: "Popescu Valentina Claudia",
    image: "/images/members/assembly/dr-valentina-claudia-popescu.webp",
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, educația pentru sănătate și promovarea intervențiilor preventive adaptate nevoilor individuale ale pacienților.",
      en: "Family physician interested in lifestyle medicine, health education and preventive interventions tailored to each patient’s needs.",
    },
  },
  {
    displayName: "Aida PUIA", city: "Cluj Napoca, România", sortName: "Puia Aida", profileId: "aida-puia",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre somnul ca determinant al stării de sănătate.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on sleep as a determinant of health.",
    },
  },
  {
    displayName: "Nadinne Alexandra ROMAN",
    city: "Brașov, România",
    sortName: "Roman Nadinne Alexandra",
    image: "/images/members/assembly/dr-nadinne-alexandra-roman.webp",
    shortBio: {
      ro: "Fiziokinetoterapeut, cu competență în recuperarea neuropsihomotorie și interes pentru medicina stilului de viață și rolul activității fizice în recuperarea funcțională.",
      en: "Physiotherapist trained in neuropsychomotor rehabilitation, with an interest in lifestyle medicine and the role of physical activity in functional recovery.",
    },
  },
  {
    displayName: "Horatiu RUS",
    city: "Brașov, România",
    sortName: "Rus Horatiu",
    image: "/images/members/assembly/dr-horatiu-rus.webp",
    shortBio: {
      ro: "Medic cardiolog, cu interes pentru medicina stilului de viață, prevenția bolilor cardiovasculare și reducerea factorilor de risc prin promovarea obiceiurilor sănătoase.",
      en: "Cardiologist interested in lifestyle medicine, cardiovascular disease prevention and reducing risk factors by promoting healthy habits.",
    },
  },
  { displayName: "Ana Maria Alexandra STANESCU", city: "București, România", sortName: "Stanescu Ana Maria Alexandra", profileId: "ana-maria-alexandra-stanescu" },
  {
    displayName: "Lucia STOICA",
    city: "Galați, România",
    sortName: "Stoica Lucia",
    image: genericFemalePortrait,
    shortBio: {
      ro: "Medic cu specialitatea medicină internă, cu interes pentru medicina stilului de viață, reducerea factorilor de risc și integrarea intervențiilor asupra stilului de viață în managementul bolilor cronice.",
      en: "Internal medicine physician interested in lifestyle medicine, reducing risk factors and incorporating lifestyle interventions into the management of chronic disease.",
    },
  },
  {
    displayName: "Raluca Maria STROIE",
    city: "București, România",
    sortName: "Stroie Raluca Maria",
    image: "/images/members/assembly/raluca-stroie.webp",
    shortBio: {
      ro: "Specialist în tehnologia informației, analiza datelor și managementul soluțiilor digitale, cu interes pentru medicina stilului de viață și promovarea unui stil de viață sănătos.",
      en: "Specialist in information technology, data analysis and digital solutions management, with an interest in lifestyle medicine and promoting healthy living.",
    },
  },
  {
    displayName: "Răzvan ȘUSAN", city: "Timișoara, România", sortName: "Susan Razvan", profileId: "razvan-susan",
    shortBio: {
      ro: "A contribuit la congresul inaugural ASLM cu o prezentare despre relația dintre stresul psihologic și microbiomul intestinal.",
      en: "Contributed to ASLM’s inaugural congress with a presentation on the relationship between psychological stress and the gut microbiome.",
    },
  },
  { displayName: "Monica TARCEA", city: "Târgu Mureș, România", sortName: "Tarcea Monica", profileId: "monica-tarcea" },
  { displayName: "Ioana Bianca TEBEICA", city: "Brașov, România", sortName: "Tebeica Ioana Bianca", profileId: "ioana-bianca-tebeica" },
  {
    displayName: "Doina Adina TODEA",
    city: "Cluj Napoca, România",
    sortName: "Todea Doina Adina",
    profileId: "doina-todea",
    shortBio: {
      ro: "Profesor universitar, medic pneumolog, cu competență în somnologie și preocupări în domeniul medicinei stilului de viață, cu accent pe rolul somnului în menținerea sănătății și prevenția bolilor cronice.",
      en: "University professor and pulmonologist trained in sleep medicine, with an interest in lifestyle medicine and a focus on the role of sleep in maintaining health and preventing chronic disease.",
    },
  },
  {
    displayName: "Constantin VOICU",
    city: "Vrancea, România",
    sortName: "Voicu Constantin",
    image: "/images/members/assembly/dr-constantin-voicu.webp",
    shortBio: {
      ro: "Medic de familie, cu interes pentru medicina stilului de viață, prevenția bolilor cronice și promovarea sănătății prin intervenții personalizate asupra stilului de viață.",
      en: "Family physician interested in lifestyle medicine, disease prevention and promoting health through personalised lifestyle interventions.",
    },
  },
];

export const profiledExperts = [
  president,
  ...honoraryPresidents,
  ...scientificCouncilMembers,
  ...executiveCouncilMembers,
]
  .filter((person): person is GovernancePerson & { profileSlug: string; profilePath: string } =>
    Boolean(person.profileSlug && person.profilePath),
  )
  .filter((person, index, people) => people.findIndex((candidate) => candidate.profileSlug === person.profileSlug) === index);

const profilesById = new Map(profiledExperts.map((profile) => [profile.id, profile]));

export const sortedGeneralAssemblyMembers = sortPeopleByName(generalAssemblyMembers).map((member) => ({
  ...member,
  profile: member.profileId ? profilesById.get(member.profileId) : undefined,
}));
