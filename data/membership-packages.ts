export type MembershipPackage = {
  id: string;
  name: string;
  audience: string;
  audienceSummary?: string;
  headingAccent?: string;
  annualFeeRon: number;
  benefits: readonly string[];
};

export const membershipDuration = "1 an / 365 zile";

const certificate = "Certificat special de membru ASLM";
const congressAccess = "Acces gratuit la platforma cu lucrările Congresului ASLM 2026";
const journal = "Abonament gratuit la Revista Lifestyle Medicine Research & Review - 10 credite EMC";
const essentialBook = "Acces gratuit la cartea Esențialul în Medicina stilului de viață, versiune epub";
const webinars = "Acces gratuit la webinariile organizate de ASLM";
const congressDiscount = "25% discount la Congresele organizate de ASLM";
const scientificCouncil = "Drept de a fi ales în Consiliul științific al ASLM";
const bonusBooks = "Bonus: acces la o selecție de cărți motivaționale, versiune e-pub";

export const individualMembershipPackages: readonly MembershipPackage[] = [
  {
    id: "afiliati",
    name: "Membri Afiliați",
    audienceSummary: "Pentru profesioniștii din sănătate",
    audience: "Profesioniști din domeniul sănătății (medici, farmaciști, nutriționiști & dieteticieni, psihologi, biologi, biochimiști, instructori fitness, etc).",
    annualFeeRon: 400,
    benefits: [certificate, congressAccess, journal, essentialBook, webinars, congressDiscount, scientificCouncil, bonusBooks],
  },
  {
    id: "titulari",
    name: "Membri Titulari",
    audienceSummary: "Pentru membri cu vechime",
    audience: "Membri afiliați cu o vechime de cel puțin 2 ani în ASLM și care au contribuit la promovarea societății.",
    annualFeeRon: 400,
    benefits: [certificate, congressAccess, journal, essentialBook, webinars, congressDiscount, scientificCouncil, "Drept de vot în AGA", "Drept de a fi ales în toate structurile ASLM", "Participare la luarea deciziilor strategice", bonusBooks],
  },
  {
    id: "asociati",
    name: "Membri Asociați",
    audienceSummary: "Pentru persoane fizice pasionate",
    audience: "Persoane pasionate de principiile Medicinei Stilului de Viață.",
    annualFeeRon: 300,
    benefits: [certificate, congressAccess, essentialBook, webinars, congressDiscount, bonusBooks],
  },
];

const partnerCertificate = "Certificat special de partener ASLM";
const companyLogo = "Logo și descriere companie pe site ASLM";
const employeeDiscount = "25% reducere pt angajați companie - participare la evenimente de sanatate organizate de ASLM";
const partnerBooks = "Acces gratuit la o selecție de cărti motivaționale, versiune epub";
const partnerProgram = "Eligibil pentru includere în Programul ASLM Lifestyle Medicine Partners";
const rollup = "Expunere roll-up companie la evenimentele ASLM";

export const companyMembershipPackages: readonly MembershipPackage[] = [
  {
    id: "imm",
    name: "Parteneri ASLM IMM",
    headingAccent: "IMM",
    audience: "Companii care doresc vizibilitate și asociere imagine cu inițiative & proiecte dedicate Medicinei Stilului de Viață.",
    annualFeeRon: 1500,
    benefits: [partnerCertificate, companyLogo, "5 invitații VIP angajați - acces gratuit în platforma cu lucrările de la Congresul ASLM 2026", "5 invitații VIP angajați - acces gratuit la Webinariile ASLM", employeeDiscount, "15% reducere pt companie - participare la Congresul ASLM 2027", partnerBooks, partnerProgram],
  },
  {
    id: "corporate",
    name: "Parteneri ASLM Corporate",
    headingAccent: "Corporate",
    audience: "Companii care își doresc o implicare mai activă în proiecte dedicate Medicinei Stilului de Viață, beneficiind de oportunități extinse de colaborare, promovare și vizibilitate.",
    annualFeeRon: 3000,
    benefits: [partnerCertificate, companyLogo, "10 invitații VIP angajați - acces gratuit în platforma cu lucrările de la Congresul ASLM 2026", "10 invitații VIP angajați - acces gratuit la Webinariile ASLM", employeeDiscount, "20% reducere pt companie - participare la Congresul ASLM 2027", partnerBooks, "Susținere prezentare gratuit la evenimente ASLM", rollup, "Reducere 100% pentru publicare articole în cadrul Revistei Lifestyle Medicine Research & Review (LMRR)", "Reducere 100% la taxa de peer review pentru articolele din LMRR", partnerProgram],
  },
  {
    id: "media",
    name: "Parteneri Media",
    headingAccent: "Media",
    audience: "Companii și organizații media care contribuie la promovarea Medicinei Stilului de Viață prin susținerea vizibilității și diseminarea informațiilor despre inițiativele, proiectele și evenimentele ASLM.",
    annualFeeRon: 0,
    benefits: ["Afișare sigla Partener pe site-ul ASLM, în secțiune Media", "Vizibilitate în materialele de comunicare ale proiectelor și evenimentelor susținute.", "Distribuire pliante la evenimentele ASLM", rollup, "Posibilitatea dezvoltării unor proiecte și campanii media comune"],
  },
];
