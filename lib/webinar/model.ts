import { z } from "zod";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { WEBINAR, type WebinarOption } from "./config";

export const registrationSchema = z.object({
  name: z.string().trim().min(3, "Introduceți numele complet.").max(150),
  email: z.string().trim().toLowerCase().max(254).pipe(z.email("Introduceți o adresă de e-mail validă.")),
  phone: z.string().trim().max(30).regex(/^[+\d\s().-]*$/, "Verificați numărul de telefon.").optional().default(""),
  option: z.literal("member"),
  acceptedTerms: z.literal(true, { error: "Acceptați condițiile de participare." }),
  website: z.string().max(0).optional().default(""),
  submissionKey: z.uuid().optional(),
}).strict();
export const receiptSchema = z.object({ id: z.uuid(), token: z.string().regex(/^[a-f0-9]{64}$/) }).strict();
export type RegistrationInput = z.infer<typeof registrationSchema>;
export type Registration = {
  id: string; event_id: string; name: string; email: string; phone: string;
  option: WebinarOption; status: "requested"; created_at: string; sheet_row: number;
};
export function digest(value: string) { return createHash("sha256").update(value).digest("hex"); }
export function receiptToken(id: string, secret: string) { return createHmac("sha256", secret).update(`${WEBINAR.id}:${id}`).digest("hex"); }
export function verifySecret(received: string | null, expected: string | undefined) {
  return Boolean(received && expected && timingSafeEqual(Buffer.from(digest(received)), Buffer.from(digest(expected))));
}
export function receiptUrl(id: string, secret: string, siteUrl: string) {
  return `${siteUrl}/webinar/confirmare#${new URLSearchParams({ id, token: receiptToken(id, secret) })}`;
}
