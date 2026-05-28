export type Expert = {
  slug: string;
  name: string;
  role: string;
  image?: string;
  affiliation: string;
  profilePath: string;
  schemaType: "Person" | "MedicalOrganization";
};

const rawExperts: Omit<Expert, "profilePath" | "schemaType">[] = [
  {
    slug: "andrea-elena-neculau",
    name: "Prof. Dr. Andrea Elena Neculau",
    role: "Președinte ASLM",
    image: "/images/andreea-neculau.jpeg",
    affiliation: "Societatea Academică de Medicina Stilului de Viață",
  },
  {
    slug: "doina-todea",
    name: "Prof. Dr. Doina Todea",
    role: "Membru fondator, Consiliul Științific ASLM",
    image: "/images/prof-dr-doina-todea.png",
    affiliation: "Consiliul Științific ASLM",
  },
  {
    slug: "monica-tarcea",
    name: "Prof. Dr. Monica Tarcea",
    role: "Membru fondator, Consiliul Științific ASLM",
    image: "/images/prof-dr-monica-tarcea.png",
    affiliation: "Consiliul Științific ASLM",
  },
  {
    slug: "mihai-cristian-popescu",
    name: "Dr. Mihai Cristian Popescu",
    role: "Secretar General ASLM",
    image: "/images/dr-mihai-cristian-popescu.png",
    affiliation: "Consiliul Director ASLM",
  },
  {
    slug: "alexandra-ghement",
    name: "Dr. Alexandra Ghement",
    role: "Coordonator Relații Academice și Cooperare Științifică",
    image: "/images/prof-dr-alexandra-ghement.png",
    affiliation: "Consiliul Director ASLM",
  },
  {
    slug: "mihaela-naidin",
    name: "Psih. Mihaela Naidin",
    role: "Coordonator Psihologie Aplicată și Managementul Stresului",
    image: "/images/psih-mihaela-naidin.png",
    affiliation: "Consiliul Director ASLM",
  },
];

export const experts: Expert[] = rawExperts.map((expert) => ({
  ...expert,
  profilePath: `/experti/${expert.slug}`,
  schemaType: "Person",
}));

export const scientificReviewBody: Expert = {
  slug: "consiliul-stiintific-aslm",
  name: "Consiliul Științific ASLM",
  role: "Revizie științifică și orientare editorială",
  affiliation: "Societatea Academică de Medicina Stilului de Viață",
  profilePath: "/echipa",
  schemaType: "MedicalOrganization",
};

export function getExpertBySlug(slug: string): Expert | undefined {
  return experts.find((expert) => expert.slug === slug);
}
