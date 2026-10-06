import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { WEBINAR, availability } from "./config";
import { authorizedRegistration, rpc, StoreError } from "./store";
import { digest, receiptToken, type Registration, type RegistrationInput } from "./model";

export class WebinarError extends Error { constructor(public readonly status: number, message: string) { super(message); } }
export async function register(input: RegistrationInput) {
  const ready = availability(process.env);
  if (ready.closed) throw new WebinarError(410, "Perioada de înscriere s-a încheiat.");
  if (!ready.registrationEnabled) throw new WebinarError(503, "Înscrierile se deschid în curând.");
  const secret = process.env.WEBINAR_TOKEN_SECRET!;
  // A private submission key recovers a lost-response retry without exposing
  // another attendee's receipt when a duplicate email is submitted.
  const key = createHmac("sha256", secret).update(`registration:${input.submissionKey || randomUUID()}`).digest("hex");
  const id = `${key.slice(0, 8)}-${key.slice(8, 12)}-4${key.slice(13, 16)}-a${key.slice(17, 20)}-${key.slice(20, 32)}`;
  let registration: Registration;
  try {
    registration = await rpc<Registration>("webinar_register", { p_id: id, p_name: input.name, p_email: input.email, p_phone: input.phone, p_option: input.option, p_token_hash: digest(receiptToken(id, secret)), p_terms_version: WEBINAR.termsVersion });
  } catch (error) {
    if (error instanceof StoreError && ["duplicate_email", "idempotency_conflict"].includes(error.code)) throw new WebinarError(409, "Există deja o solicitare pentru această adresă. Folosiți linkul din e-mail sau contactați ASLM.");
    if (error instanceof StoreError && error.code === "registration_closed") throw new WebinarError(410, "Perioada de înscriere s-a încheiat.");
    throw error;
  }
  return { id: registration.id, token: receiptToken(registration.id, secret) };
}

export async function receipt(id: string, token: string) {
  const registration = await authorizedRegistration(id, token);
  if (!registration) throw new WebinarError(404, "Solicitarea nu a fost găsită.");
  return { option: registration.option, status: registration.status };
}
