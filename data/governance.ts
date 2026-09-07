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
  displayName: string;
  city: string;
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
  ro: "Consiliul Executiv ASLM",
  en: "ASLM Executive Council",
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
    shortBio: { ro: "Prof. Dr. Ioana Octavia Agache, membră a Consiliului Științific ASLM." },
  }),
  withProfilePath({
    id: "marian-anghel",
    displayName: "Sociolog Marian Anghel",
    sortName: "Anghel Marian",
    image: "/images/council/marian-anghel.png",
    affiliation: scientificAffiliation,
    profileSlug: "marian-anghel",
    shortBio: { ro: "Sociolog Marian Anghel, membru al Consiliului Științific ASLM." },
  }),
  withProfilePath({ id: "adriana-sorina-antohe", displayName: "Dr. Adriana Sorina Antohe", sortName: "Antohe Adriana Sorina", image: "/images/council/dr-adriana-sorina-antohe.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "dana-teodora-anton-paduraru",
    displayName: "Conf. univ. dr. Dana-Teodora Anton-Păduraru",
    sortName: "Anton Paduraru Dana Teodora",
    image: "/images/council/conf-dr-dana-teodora-anton-paduraru.png",
    affiliation: scientificAffiliation,
    profileSlug: "dana-teodora-anton-paduraru",
    shortBio: {
      ro: "Medic primar pediatru și conferențiar universitar la UMF „Grigore T. Popa” din Iași, cu preocupări în pediatrie, nutriție pediatrică, medicina stilului de viață și tulburări metabolice.",
    },
    bio: {
      ro: "Conf. univ. dr. Dana-Teodora Anton-Păduraru este medic primar pediatru și conferențiar universitar la Universitatea de Medicină și Farmacie „Grigore T. Popa” din Iași. Activitatea sa profesională este concentrată în pediatrie și gastroenterologie pediatrică, cu pregătire în nutriție și dietetică, homeopatie clinică și fitoterapie. Este implicată în proiecte educaționale, cursuri, conferințe și inițiative dedicate nutriției și sănătății copilului, precum și în promovarea medicinei stilului de viață și a comportamentelor sănătoase încă din copilărie.",
    },
  }),
  withProfilePath({ id: "laura-atyim", displayName: "Asist. Univ. Laura Atyim", sortName: "Atyim Laura", image: "/images/council/asist-univ-laura-atyim.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dana-balta", displayName: "Șef Lucr. Dr. Dana Baltă", sortName: "Balta Dana", image: "/images/council/sef-lucr-dr-dana-balta.png", affiliation: scientificAffiliation }),
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
      ro: "Prof. univ. dr. Monica Tarcea este medic primar Igienă și specialist în nutriție comunitară și sănătate publică la UMFST „George Emil Palade” din Târgu Mureș.",
    },
    bio: {
      ro: "Prof. univ. dr. Monica Tarcea este medic primar Igienă și profesor universitar la Universitatea de Medicină, Farmacie, Științe și Tehnologie „George Emil Palade” din Târgu Mureș. A coordonat activități academice în nutriție comunitară și siguranța alimentelor, este implicată în proiecte naționale și internaționale de sănătate publică și cercetare, iar domeniile sale de interes includ nutriția comunitară, sănătatea publică, siguranța alimentelor și managementul comportamentelor de risc.",
    },
  }),
  withProfilePath({ id: "vladimir-poroch", displayName: "Prof. Dr. Vladimir Poroch", sortName: "Poroch Vladimir", image: "/images/council/prof-dr-vladimir-poroch.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "mircea-cinteza", displayName: "Prof. Dr. Mircea Cinteza", sortName: "Cinteza Mircea", image: "/images/council/prof-dr-mircea-cinteza.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-lavinia-cioca", displayName: "Șef Lucr. Dr. Adriana Lavinia Cioca", sortName: "Cioca Adriana Lavinia", image: "/images/council/sef-lucr-dr-adriana-lavinia-cioca.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "andreea-ciubotaru", displayName: "Dr. Andreea Ciubotaru", sortName: "Ciubotaru Andreea", affiliation: scientificAffiliation }),
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
  withProfilePath({ id: "beatrice-laura-iancu", displayName: "Dr. Beatrice Laura Iancu", sortName: "Iancu Beatrice Laura", affiliation: scientificAffiliation }),
  withProfilePath({ id: "cristina-isar", displayName: "Dr. Cristina Cornelia Isar", sortName: "Isar Cristina Cornelia", image: "/images/dr-cristina-isar.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "constantin-kamal", displayName: "Conf. Dr. Constantin Kamal", sortName: "Kamal Constantin", image: "/images/conf-dr-constantin-kamal.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "polliana-mihaela-leru",
    displayName: "Prof. univ. dr. Polliana Mihaela Leru",
    sortName: "Leru Polliana Mihaela",
    image: "/images/council/prof-dr-polliana-mihaela-leru.png",
    affiliation: scientificAffiliation,
    profileSlug: "polliana-mihaela-leru",
    shortBio: {
      ro: "Medic primar alergologie și profesor universitar la UMF „Carol Davila” din București, cu interese în alergologie, boli respiratorii, medicina stilului de viață, aerobiologie și sănătate publică.",
    },
    bio: {
      ro: "Prof. univ. dr. Polliana Mihaela Leru este medic primar și profesor universitar la Universitatea de Medicină și Farmacie „Carol Davila” din București. Activitatea sa clinică și de cercetare acoperă medicina internă, alergologia și imunologia clinică, iar domeniile sale de interes includ alergiile respiratorii, astmul, BPOC, medicina stilului de viață, aerobiologia, poluarea aerului, sănătatea publică și educația în asistența medicală primară.",
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
    },
    bio: {
      ro: "Mihaela Gabor Naidin este licențiată în Psihologie, cu master în Management Sanitar și formare în Managementul Calității în Sănătate. În calitate de trainer-formator în comunicare pentru domeniul sănătății, dezvoltă programe pentru profesioniști, rezidenți și studenți, abordând comunicarea cu pacientul, reglarea emoțională, managementul stresului, prevenirea burnoutului și dezvoltarea rezilienței. În cadrul ASLM coordonează aria de Psihologie Aplicată și Managementul Stresului.",
    },
  }),
  withProfilePath({
    id: "mirela-nedelescu",
    displayName: "Conf. Dr. Mirela Nedelescu",
    sortName: "Nedelescu Mirela",
    affiliation: scientificAffiliation,
    profileSlug: "mirela-nedelescu",
    shortBio: {
      ro: "Conferențiar universitar la UMF „Carol Davila” și medic primar Igienă, cu expertiză în nutriție, promovarea alimentației sănătoase, evaluarea statusului nutrițional și recomandări privind activitatea fizică.",
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
    shortBio: { ro: "Șef Lucr. Dr. Ionuț Poinăreanu, membru al Consiliului Științific ASLM." },
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

export const generalAssemblyMembers: GeneralAssemblyMember[] = [
  { displayName: "Anastasia ABĂITĂNCEI", city: "Brașov, România", sortName: "Abaitancei Anastasia" },
  { displayName: "Ioana AGACHE", city: "Brașov, România", sortName: "Agache Ioana" },
  { displayName: "Marian ANGHEL", city: "Brașov, România", sortName: "Anghel Marian" },
  { displayName: "Adriana Sorina ANTOHE", city: "Brașov, România", sortName: "Antohe Adriana Sorina" },
  { displayName: "Dana-Teodora ANTON-PĂDURARU", city: "Iași, România", sortName: "Anton Paduraru Dana Teodora" },
  { displayName: "Sorina AURELIAN", city: "București, România", sortName: "Aurelian Sorina" },
  { displayName: "Laura ATYIM", city: "Timișoara, România", sortName: "Atyim Laura" },
  { displayName: "Mihaela Daniela BALTĂ", city: "București, România", sortName: "Balta Mihaela Daniela" },
  { displayName: "Florin BĂLAN", city: "Brașov, România", sortName: "Balan Florin" },
  { displayName: "Alexandra BELIBOU", city: "Brașov, România", sortName: "Belibou Alexandra" },
  { displayName: "Lucia BUBULAC", city: "București, România", sortName: "Bubulac Lucia" },
  { displayName: "Venera - Margareta BUCUR", city: "Timișoara, România", sortName: "Bucur Venera Margareta" },
  { displayName: "Nadia-Maria BUTUM", city: "Brașov, România", sortName: "Butum Nadia Maria" },
  { displayName: "Lucia CALUSER", city: "Deva, România", sortName: "Caluser Lucia" },
  { displayName: "Adriana Lavinia CIOCA", city: "Sibiu, România", sortName: "Cioca Adriana Lavinia" },
  { displayName: "Andreea CIUBOTARU", city: "Brașov, România", sortName: "Ciubotaru Andreea" },
  { displayName: "Maria Elena COCUZ", city: "Brașov, România", sortName: "Cocuz Maria Elena" },
  { displayName: "Elena Adorata COMAN", city: "Iași, România", sortName: "Coman Elena Adorata" },
  { displayName: "Laura Maria CONDUR", city: "Constanța, România", sortName: "Condur Laura Maria" },
  { displayName: "Dan CONSTANTIN", city: "Brașov, România", sortName: "Constantin Dan" },
  { displayName: "Ana Georgiana CORNEA COSMA", city: "Brașov, România", sortName: "Cornea Cosma Ana Georgiana" },
  { displayName: "Adriana COTEL", city: "București, România", sortName: "Cotel Adriana" },
  { displayName: "Roxana Paraschiva COVALIU", city: "București, România", sortName: "Covaliu Roxana Paraschiva" },
  { displayName: "Mihai CRAIU", city: "București, România", sortName: "Craiu Mihai" },
  { displayName: "Simina Maria DIACONU", city: "Brașov, România", sortName: "Diaconu Simina Maria" },
  { displayName: "Lorena DIMA", city: "Brașov, România", sortName: "Dima Lorena" },
  { displayName: "Livia DIMA", city: "Iași, România", sortName: "Dima Livia" },
  { displayName: "Gindrovel DUMITRA", city: "Craiova, România", sortName: "Dumitra Gindrovel" },
  { displayName: "Irina EREMIA", city: "București, România", sortName: "Eremia Irina" },
  { displayName: "Szuzsanna FARKAS-PAL", city: "Oradea, România", sortName: "Farkas Pal Szuzsanna" },
  { displayName: "Roxana FOLESCU", city: "Timișoara, România", sortName: "Folescu Roxana" },
  { displayName: "Claudia Mihaela GAVRIȘ", city: "Brașov, România", sortName: "Gavris Claudia Mihaela" },
  { displayName: "Alexandra Victoria GHEMENT", city: "București, România", sortName: "Ghement Alexandra Victoria" },
  { displayName: "Mihaela Andreea GHEORGHIU", city: "Prahova, România", sortName: "Gheorghiu Mihaela Andreea" },
  { displayName: "Iulia GONTIA", city: "Brașov, România", sortName: "Gontia Iulia" },
  { displayName: "Emese GRECU", city: "Deva, România", sortName: "Grecu Emese" },
  { displayName: "Daniela GURGUȘ", city: "Timișoara, România", sortName: "Gurgus Daniela" },
  { displayName: "Felicia Alexandra HANZU", city: "Barcelona, Spania", sortName: "Hanzu Felicia Alexandra" },
  { displayName: "Andreea Narcisa IANA", city: "Timișoara, România", sortName: "Iana Andreea Narcisa" },
  { displayName: "Beatrice Laura IANCU", city: "Timișoara, România", sortName: "Iancu Beatrice Laura" },
  { displayName: "Mihaela Adela IANCU", city: "Timișoara, România", sortName: "Iancu Mihaela Adela" },
  { displayName: "Ștefan IONESCU", city: "București, România", sortName: "Ionescu Stefan" },
  { displayName: "Cristina Cornelia ISAR", city: "Brașov, România", sortName: "Isar Cristina Cornelia" },
  { displayName: "Agachii IURIE", city: "Covasna, România", sortName: "Iurie Agachii" },
  { displayName: "Luminita Anca IVAN", city: "București, România", sortName: "Ivan Luminita Anca" },
  { displayName: "Constantin KAMAL", city: "Craiova, România", sortName: "Kamal Constantin" },
  { displayName: "Poliana LERU", city: "București, România", sortName: "Leru Poliana" },
  { displayName: "Mihaela MIHALCEA", city: "Bacău, România", sortName: "Mihalcea Mihaela" },
  { displayName: "Mihaela Gabor NAIDIN", city: "Brașov, România", sortName: "Naidin Mihaela Gabor" },
  { displayName: "Andrea Elena NECULAU", city: "Brașov, România", sortName: "Neculau Andrea Elena" },
  { displayName: "Mirela - Maria NEDELESCU", city: "București, România", sortName: "Nedelescu Mirela Maria" },
  { displayName: "Robert Constantin NEGOI", city: "Brașov, România", sortName: "Negoi Robert Constantin" },
  { displayName: "Elena Iuliana NISTOROIU", city: "București, România", sortName: "Nistoroiu Elena Iuliana" },
  { displayName: "Liliana NITA", city: "Brăila, România", sortName: "Nita Liliana" },
  { displayName: "Corina OANCEA", city: "București, România", sortName: "Oancea Corina" },
  { displayName: "Dina OLTEANU-PASCAL", city: "Brașov, România", sortName: "Olteanu Pascal Dina" },
  { displayName: "Cintia ORSA", city: "Brașov, România", sortName: "Orsa Cintia" },
  { displayName: "Cătălina PANAITESCU", city: "București, România", sortName: "Panaitescu Catalina" },
  { displayName: "Alina Mihaela PASCU", city: "Brașov, România", sortName: "Pascu Alina Mihaela" },
  { displayName: "Cristina Steliana PÎNDICHI", city: "Constanța, România", sortName: "Pindichi Cristina Steliana" },
  { displayName: "Ionuț POINĂREANU", city: "Constanța, România", sortName: "Poinareanu Ionut" },
  { displayName: "Mihai-Cristian POPESCU", city: "București, România", sortName: "Popescu Mihai Cristian" },
  { displayName: "Armand-Gabriel POPESCU", city: "București, România", sortName: "Popescu Armand Gabriel" },
  { displayName: "Valentina Claudia POPESCU", city: "București, România", sortName: "Popescu Valentina Claudia" },
  { displayName: "Aida PUIA", city: "Cluj Napoca, România", sortName: "Puia Aida" },
  { displayName: "Nadinne Alexandra ROMAN", city: "Brașov, România", sortName: "Roman Nadinne Alexandra" },
  { displayName: "Horatiu RUS", city: "Brașov, România", sortName: "Rus Horatiu" },
  { displayName: "Ana Maria Alexandra STANESCU", city: "București, România", sortName: "Stanescu Ana Maria Alexandra" },
  { displayName: "Lucia STOICA", city: "Galați, România", sortName: "Stoica Lucia" },
  { displayName: "Raluca Maria STROIE", city: "București, România", sortName: "Stroie Raluca Maria" },
  { displayName: "Răzvan ȘUSAN", city: "Timișoara, România", sortName: "Susan Razvan" },
  { displayName: "Monica TARCEA", city: "Târgu Mureș, România", sortName: "Tarcea Monica" },
  { displayName: "Ioana Bianca TEBEICA", city: "Brașov, România", sortName: "Tebeica Ioana Bianca" },
  { displayName: "Bogdan TIMAR", city: "Timișoara, România", sortName: "Timar Bogdan" },
  { displayName: "Doina Adina TODEA", city: "Cluj Napoca, România", sortName: "Todea Doina Adina" },
  { displayName: "Constantin VOICU", city: "Vrancea, România", sortName: "Voicu Constantin" },
];

export const sortedGeneralAssemblyMembers = sortPeopleByName(generalAssemblyMembers);

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
