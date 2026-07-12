import { profiledExperts, scientificCouncilMembers } from "@/data/governance";

export type Expert = {
  slug: string;
  name: string;
  role: string;
  image?: string;
  affiliation: string;
  profilePath: string;
  schemaType: "Person" | "MedicalOrganization";
  orcid?: string;
  shortBio?: {
    ro?: string;
    en?: string;
  };
};

export const experts: Expert[] = profiledExperts.map((person) => ({
  slug: person.profileSlug,
  name: person.displayName,
  role: person.role?.ro ?? "Expert ASLM",
  image: person.image,
  affiliation: person.affiliation?.ro ?? "Societatea Academică de Medicina Stilului de Viață",
  profilePath: person.profilePath,
  schemaType: "Person",
  orcid: person.orcid,
  shortBio: person.shortBio,
}));

export const scientificReviewBody: Expert = {
  slug: "consiliul-stiintific-aslm",
  name: "Consiliul Științific ASLM",
  role: "Revizie științifică și orientare editorială",
  affiliation: "Societatea Academică de Medicina Stilului de Viață",
  profilePath: "/consiliu-stiintific",
  schemaType: "MedicalOrganization",
};

export function getExpertBySlug(slug: string): Expert | undefined {
  return experts.find((expert) => expert.slug === slug);
}

export const scientificCouncilExpertNames = new Set(
  scientificCouncilMembers.map((member) => member.displayName),
);
