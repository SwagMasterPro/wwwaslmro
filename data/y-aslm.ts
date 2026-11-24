import type { LocalizedText } from "@/data/governance";

type YoungMember = {
  displayName: string;
  city: string;
  image?: string;
  shortBio?: Partial<LocalizedText>;
};

export const activeYoungMembers: YoungMember[] = [
  { displayName: "Caian Ioana-Gabriela", city: "Brașov" },
  { displayName: "Celano Sara-Viorica", city: "Brașov" },
  { displayName: "Cotirta Gabriela Cristina", city: "București" },
  { displayName: "Drondu Mara Cristiana", city: "București" },
  { displayName: "Dutu Maria", city: "Iași" },
  { displayName: "Elisei Alina Mihaela", city: "Galați" },
  { displayName: "Nastase Medeea", city: "București" },
  { displayName: "Pavel-Balan Grațiela-Andrada", city: "Brașov" },
  { displayName: "Poenar Sabina", city: "Brașov" },
  { displayName: "Rosca Lucian Andrei", city: "București" },
  { displayName: "Staicu Coca", city: "Brașov" },
];
