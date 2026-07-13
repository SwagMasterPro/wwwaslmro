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
};

export type GeneralAssemblyMember = {
  displayName: string;
  city: string;
  sortName?: string;
};

function withProfilePath(person: Omit<GovernancePerson, "profilePath">): GovernancePerson {
  return {
    ...person,
    profilePath: person.profileSlug ? `/experti/${person.profileSlug}` : undefined,
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
  image: "/images/andreea-neculau.jpeg",
  affiliation: societyAffiliation,
  profileSlug: "andrea-elena-neculau",
});

export const honoraryPresidents: GovernancePerson[] = [
  withProfilePath({
    id: "constantin-ionescu-tirgoviste",
    displayName: "Acad. Constantin Ionescu-Tîrgoviște",
    sortName: "Ionescu Tirgoviste Constantin",
  }),
  withProfilePath({
    id: "adrian-restian",
    displayName: "†Prof. Dr. Adrian Restian",
    sortName: "Restian Adrian",
  }),
];

export const scientificCouncilMembers: GovernancePerson[] = sortPeopleByName([
  withProfilePath({ id: "anastasia-abaitancei", displayName: "Dr. Anastasia Abăităncei", sortName: "Abaitancei Anastasia", image: "/images/anastasia-abaitancei.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "ioana-agache", displayName: "Prof. Dr. Ioana Agache", sortName: "Agache Ioana", image: "/images/ioana-agache.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "marian-anghel", displayName: "Psih. Marian Anghel", sortName: "Anghel Marian", image: "/images/marian-anghel.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-sorina-antohe", displayName: "Dr. Adriana Sorina Antohe", sortName: "Antohe Adriana Sorina", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dana-teodora-anton-paduraru", displayName: "Conf. Dr. Dana-Teodora Anton-Păduraru", sortName: "Anton Paduraru Dana Teodora", image: "/images/dana-anton-paduraru.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "laura-atyim", displayName: "Asist. Univ. Laura Atyim", sortName: "Atyim Laura", image: "/images/laura-atyim.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dana-balta", displayName: "Șef Lucr. Dr. Dana Baltă", sortName: "Balta Dana", image: "/images/dana-balta.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "alexandra-belibou", displayName: "Conf. Dr. Alexandra Belibou", sortName: "Belibou Alexandra", image: "/images/alexandra-belibou.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "lucia-bubulac", displayName: "Șef Lucr. Dr. Lucia Bubulac", sortName: "Bubulac Lucia", image: "/images/lucia-bubulac.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "doina-todea",
    displayName: "Prof. Dr. Doina Adina Todea",
    sortName: "Todea Doina Adina",
    role: { ro: "Membru fondator, Consiliul Științific ASLM", en: "Founding member, ASLM Scientific Council" },
    image: "/images/prof-dr-doina-todea.png",
    affiliation: scientificAffiliation,
    profileSlug: "doina-todea",
  }),
  withProfilePath({
    id: "monica-tarcea",
    displayName: "Prof. Dr. Monica Tarcea",
    sortName: "Tarcea Monica",
    role: { ro: "Membru fondator, Consiliul Științific ASLM", en: "Founding member, ASLM Scientific Council" },
    image: "/images/prof-dr-monica-tarcea.png",
    affiliation: scientificAffiliation,
    profileSlug: "monica-tarcea",
  }),
  withProfilePath({ id: "vladimir-poroch", displayName: "Prof. Dr. Vladimir Poroch", sortName: "Poroch Vladimir", image: "/images/prof-dr-vladimir-poroch.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "mircea-cinteza", displayName: "Prof. Dr. Mircea Cinteza", sortName: "Cinteza Mircea", image: "/images/prof-dr-mircea-cinteza.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-lavinia-cioca", displayName: "Șef Lucr. Dr. Adriana Lavinia Cioca", sortName: "Cioca Adriana Lavinia", image: "/images/sef-lucr-dr-adriana-cioca.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "andreea-ciubotaru", displayName: "Dr. Andreea Ciubotaru", sortName: "Ciubotaru Andreea", affiliation: scientificAffiliation }),
  withProfilePath({ id: "maria-elena-cocuz", displayName: "Conf. Dr. Maria Elena Cocuz", sortName: "Cocuz Maria Elena", image: "/images/maria-elena-cocuz.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adorata-elena-coman", displayName: "Conf. Dr. Adorata Elena Coman", sortName: "Coman Adorata Elena", image: "/images/conf-dr-adorata-coman.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "laura-maria-condur", displayName: "Șef Lucr. Dr. Laura Maria Condur", sortName: "Condur Laura Maria", image: "/images/sef-lucr-dr-laura-condur.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dan-constantin", displayName: "Șef Lucr. Dr. Dan Constantin", sortName: "Constantin Dan", image: "/images/sef-lucr-dr-dan-constantin.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adriana-cotel", displayName: "Șef Lucr. Psih. Dr. Adriana Cotel", sortName: "Cotel Adriana", affiliation: scientificAffiliation }),
  withProfilePath({ id: "mihai-craiu", displayName: "Prof. Dr. Mihai Craiu", sortName: "Craiu Mihai", image: "/images/prof-dr-mihai-craiu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "simina-maria-diaconu", displayName: "Dr. Simina Maria Diaconu", sortName: "Diaconu Simina Maria", affiliation: scientificAffiliation }),
  withProfilePath({ id: "lorena-dima", displayName: "Prof. Dr. Lorena Dima", sortName: "Dima Lorena", image: "/images/prof-dr-lorena-dima.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "gheorghe-gindrovel-dumitra", displayName: "Conf. Dr. Gheorghe Gindrovel Dumitra", sortName: "Dumitra Gheorghe Gindrovel", image: "/images/conf-dr-gindrovel-dumitra-new.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "irina-eremia", displayName: "Conf. Dr. Irina Eremia", sortName: "Eremia Irina", image: "/images/conf-dr-irina-eremia.jpg", affiliation: scientificAffiliation }),
  withProfilePath({ id: "zsuzsanna-farkas-pall", displayName: "Șef Lucr. Dr. Zsuzsanna Farkas-Pall", sortName: "Farkas Pall Zsuzsanna", affiliation: scientificAffiliation }),
  withProfilePath({ id: "roxana-folescu", displayName: "Prof. Dr. Roxana Folescu", sortName: "Folescu Roxana", image: "/images/prof-dr-roxana-folescu.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "alexandra-ghement",
    displayName: "Dr. Alexandra Ghement",
    sortName: "Ghement Alexandra",
    role: { ro: "Coordonator Relații Academice și Cooperare Științifică", en: "Academic Relations and Scientific Cooperation Coordinator" },
    image: "/images/prof-dr-alexandra-ghement.png",
    affiliation: executiveAffiliation,
    profileSlug: "alexandra-ghement",
  }),
  withProfilePath({ id: "daniela-gurgus", displayName: "Conf. Dr. Daniela Gurgus", sortName: "Gurgus Daniela", image: "/images/conf-dr-daniela-gurgus-new.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "felicia-alexandra-hanzu", displayName: "Prof. Dr. Felicia Alexandra Hanzu", sortName: "Hanzu Felicia Alexandra", affiliation: scientificAffiliation }),
  withProfilePath({ id: "andreea-narcisa-iana", displayName: "Asist. Univ. Andreea Narcisa Iana", sortName: "Iana Andreea Narcisa", affiliation: scientificAffiliation }),
  withProfilePath({ id: "adela-mihaela-iancu", displayName: "Prof. Dr. Adela Mihaela Iancu", sortName: "Iancu Adela Mihaela", image: "/images/prof-dr-adela-iancu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "beatrice-laura-iancu", displayName: "Dr. Beatrice Laura Iancu", sortName: "Iancu Beatrice Laura", affiliation: scientificAffiliation }),
  withProfilePath({ id: "cristina-isar", displayName: "Dr. Cristina Cornelia Isar", sortName: "Isar Cristina Cornelia", image: "/images/dr-cristina-isar.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "constantin-kamal", displayName: "Conf. Dr. Constantin Kamal", sortName: "Kamal Constantin", image: "/images/conf-dr-constantin-kamal.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "polliana-mihaela-leru", displayName: "Prof. Dr. Polliana Mihaela Leru", sortName: "Leru Polliana Mihaela", image: "/images/prof-dr-poliana-leru.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "roxana-miclaus", displayName: "Prof. Dr. Roxana Miclăuș", sortName: "Miclaus Roxana", image: "/images/prof-dr-roxana-miclaus.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "mihaela-naidin",
    displayName: "Psih. Mihaela Gabor Naidin",
    sortName: "Naidin Mihaela Gabor",
    role: { ro: "Coordonator Psihologie Aplicată și Managementul Stresului", en: "Applied Psychology and Stress Management Coordinator" },
    image: "/images/psih-mihaela-naidin.png",
    affiliation: executiveAffiliation,
    profileSlug: "mihaela-naidin",
  }),
  withProfilePath({ id: "mirela-nedelescu", displayName: "Conf. Dr. Mirela Nedelescu", sortName: "Nedelescu Mirela", affiliation: scientificAffiliation }),
  withProfilePath({ id: "robert-constantin-negoi", displayName: "Dr. Robert Constantin Negoi", sortName: "Negoi Robert Constantin", affiliation: scientificAffiliation }),
  withProfilePath({ id: "dina-olteanu-pascal", displayName: "Dr. Dina Olteanu-Pascal", sortName: "Olteanu Pascal Dina", affiliation: scientificAffiliation }),
  withProfilePath({ id: "cintia-orsa", displayName: "Dr. Cintia Orsa", sortName: "Orsa Cintia", image: "/images/hadriana-cintia-orsa.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "catalina-panaitescu", displayName: "Dr. Cătălina Panaitescu", sortName: "Panaitescu Catalina", image: "/images/catalina-panaitescu.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "alina-pascu", displayName: "Prof. Dr. Alina Pascu", sortName: "Pascu Alina", affiliation: scientificAffiliation }),
  withProfilePath({ id: "ionut-poinareanu", displayName: "Șef Lucr. Dr. Ionuț Poinăreanu", sortName: "Poinareanu Ionut", image: "/images/dr-ionut-poinareanu.png", affiliation: scientificAffiliation }),
  withProfilePath({
    id: "mihai-cristian-popescu",
    displayName: "Dr. Mihai Cristian Popescu",
    sortName: "Popescu Mihai Cristian",
    role: { ro: "Secretar General ASLM", en: "ASLM Secretary General" },
    image: "/images/dr-mihai-cristian-popescu.jpg",
    affiliation: executiveAffiliation,
    profileSlug: "mihai-cristian-popescu",
  }),
  withProfilePath({ id: "aida-puia", displayName: "Conf. Dr. Aida Puia", sortName: "Puia Aida", image: "/images/conf-dr-aida-puia.png", affiliation: scientificAffiliation }),
  withProfilePath({ id: "daniela-nicoleta-stanca", displayName: "Fiziokin. Dr. Daniela Nicoleta Stanca", sortName: "Stanca Daniela Nicoleta", affiliation: scientificAffiliation }),
  withProfilePath({ id: "razvan-susan", displayName: "Conf. Dr. Răzvan Șusan", sortName: "Susan Razvan", affiliation: scientificAffiliation }),
  withProfilePath({ id: "ioana-bianca-tebeica", displayName: "Dr. Ioana Bianca Tebeica", sortName: "Tebeica Ioana Bianca", affiliation: scientificAffiliation }),
  withProfilePath({ id: "doina-carina-voinescu", displayName: "Prof. Dr. Doina Carina Voinescu", sortName: "Voinescu Doina Carina", image: "/images/prof-dr-carina-voinescu.png", affiliation: scientificAffiliation }),
]);

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
  { displayName: "Nicoleta Daniela STANCA", city: "București, România", sortName: "Stanca Nicoleta Daniela" },
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

export const profiledExperts = [president, ...scientificCouncilMembers, ...executiveCouncilMembers]
  .filter((person): person is GovernancePerson & { profileSlug: string; profilePath: string } =>
    Boolean(person.profileSlug && person.profilePath),
  )
  .filter((person, index, people) => people.findIndex((candidate) => candidate.profileSlug === person.profileSlug) === index);
