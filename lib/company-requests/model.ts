import { z } from "zod";
import { companyMembershipPackages } from "../../data/membership-packages";

const line = (max: number) => z.string().trim().min(2, "Completează acest câmp.").max(max, `Folosește cel mult ${max} de caractere.`).refine(value => !/[\r\n\u0000-\u001f]/.test(value), "Folosește o singură linie.");
const taxId = line(32).regex(/^[\p{L}\p{N} .-]+$/u, "Introdu un CUI valid.");
const website = z.string().trim().max(250).transform(value => value && !/^https?:\/\//i.test(value) ? `https://${value}` : value).refine(value => {
  if (!value) return true;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) && url.hostname.includes(".") && !url.username && !url.password; } catch { return false; }
}, "Introdu un site valid, de exemplu companie.ro.");

export const companyRequestSchema = z.object({
  companyName: line(200),
  cui: taxId,
  website,
  locality: line(160),
  activity: z.string().trim().min(10, "Descrie activitatea firmei în minimum 10 caractere.").max(2000, "Folosește cel mult 2000 de caractere."),
  representativeName: line(160),
  phone: z.string().trim().min(7).max(32).regex(/^\+?[\d ().-]+$/, "Introdu un număr de telefon valid.").refine(value => value.replace(/\D/g, "").length >= 7, "Introdu un număr de telefon valid."),
  email: z.email("Introdu o adresă de email validă.").max(254),
  packageId: z.enum(["imm", "corporate", "media"], { error: "Alege un pachet." }),
  billingCompanyName: line(200),
  billingCui: taxId,
  privacyAcknowledged: z.literal(true, { error: "Confirmă că ai citit informarea privind datele personale." }),
  submissionId: z.uuid(),
  fax: z.string().max(0),
}).strict();

export type CompanyRequest = z.infer<typeof companyRequestSchema>;
export function companyPackage(id: CompanyRequest["packageId"]) {
  return companyMembershipPackages.find(item => item.id === id)!;
}

export function companyRequestMessage(request: CompanyRequest) {
  const selected = companyPackage(request.packageId);
  const fee = selected.annualFeeRon ? `${selected.annualFeeRon} RON / an` : "Gratuit";
  return {
    subject: `Solicitare parteneriat ASLM — ${selected.name} — ${request.submissionId}`,
    text: [
      `Referință solicitare: ${request.submissionId}`,
      `Pachet: ${selected.name}`,
      `Cotizație: ${fee}`,
      "Durată: 1 an / 365 zile",
      selected.annualFeeRon ? "Solicitare de înscriere. ASLM verifică datele și contactează compania pentru facturare. Nu a fost efectuată o plată online." : "Solicitare de înscriere gratuită Parteneri Media. ASLM verifică datele și contactează compania; nu solicitați plata unei cotizații.",
      "", `Nume companie: ${request.companyName}`, `CUI: ${request.cui}`,
      `Site: ${request.website || "Nespecificat"}`, `Oraș/Județ: ${request.locality}`,
      `Scurtă descriere a activității firmei:\n${request.activity}`, "",
      `Nume reprezentant: ${request.representativeName}`, `Telefon: ${request.phone}`, `Email: ${request.email}`, "",
      "Date facturare", `Nume companie: ${request.billingCompanyName}`, `CUI: ${request.billingCui}`, "",
      "Informarea privind datele personale a fost confirmată în formular.",
      "Dacă primiți mai multe mesaje cu aceeași referință, procesați o singură solicitare.",
    ].join("\n"),
  };
}
