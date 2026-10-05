import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { WEBINAR, availability } from "./config";
import { authorizedRegistration, latestOrder, loadOrder, rpc, StoreError } from "./store";
import { bankPayment, createSession, GatewayError, gatewayConfig, retrieveOrder } from "./gateway";
import { digest, receiptToken, receiptUrl, type Order, type Registration, type RegistrationInput } from "./model";

export class WebinarError extends Error { constructor(public readonly status: number, message: string) { super(message); } }
export async function register(input: RegistrationInput) {
  const ready = availability(process.env);
  if (ready.closed) throw new WebinarError(410, "Perioada de înscriere s-a încheiat.");
  if (!ready.registrationEnabled || (input.option === "ticket" && !ready.checkoutEnabled)) throw new WebinarError(503, "Înscrierile pentru această opțiune se deschid în curând.");
  const secret = process.env.WEBINAR_TOKEN_SECRET!;
  // A private browser submission key lets a lost-response retry recover its own
  // receipt. Email duplicates alone never reveal another attendee's receipt.
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
  return { id: registration.id, token: receiptToken(registration.id, secret), nextAction: input.option === "join" ? "membership" : input.option === "ticket" ? "payment" : "receipt", membershipUrl: input.option === "join" ? WEBINAR.membershipUrl : undefined };
}

export async function reconcileOrder(reference: string) {
  const order = await loadOrder(reference);
  if (!order || order.status === "paid") return;
  const config = gatewayConfig(process.env);
  const payment = bankPayment(await retrieveOrder(reference, config), reference, config.merchantId);
  await rpc("webinar_apply_payment", { p_reference: reference, p_status: payment.status, p_transaction_id: payment.transactionId ?? null, p_paid_at: payment.paidAt ?? null });
}

export async function checkout(id: string, token: string) {
  const ready = availability(process.env);
  if (ready.closed) throw new WebinarError(410, "Perioada de înscriere s-a încheiat.");
  if (!ready.checkoutEnabled) throw new WebinarError(503, "Plata online nu este disponibilă momentan.");
  const registration = await authorizedRegistration(id, token);
  if (!registration) throw new WebinarError(404, "Solicitarea nu a fost găsită.");
  if (registration.option !== "ticket") throw new WebinarError(400, "Această solicitare nu necesită un bilet.");
  if (registration.status === "paid") return { paid: true };
  const config = gatewayConfig(process.env), reference = `ASLMWEB-${randomUUID()}`;
  let order: Order;
  try { order = await rpc<Order>("webinar_reserve_order", { p_registration_id: id, p_reference: reference }); }
  catch (error) {
    if (error instanceof StoreError && error.code === "registration_closed") throw new WebinarError(410, "Perioada de înscriere s-a încheiat.");
    throw error;
  }
  if (order.order_reference !== reference) {
    await reconcileOrder(order.order_reference);
    order = (await loadOrder(order.order_reference))!;
    if (order.status === "paid") return { paid: true };
    if (order.status === "failed") return checkout(id, token);
    if (order.session_id && Date.now() - Date.parse(order.created_at) < 55 * 60_000) return { paid: false, orderReference: order.order_reference, sessionId: order.session_id, checkoutScript: `${config.baseUrl.replace(/\/api\/rest$/, "")}/static/checkout/checkout.min.js` };
    throw new WebinarError(409, "Plata este în curs de verificare. Reveniți la confirmare sau contactați ASLM înainte de o nouă plată.");
  }
  try {
    const sessionId = await createSession(reference, registration.email, config);
    await rpc("webinar_attach_session", { p_reference: reference, p_session: sessionId });
    return { paid: false, orderReference: reference, sessionId, checkoutScript: `${config.baseUrl.replace(/\/api\/rest$/, "")}/static/checkout/checkout.min.js` };
  } catch (error) {
    if (error instanceof GatewayError && error.definitive) await rpc("webinar_apply_payment", { p_reference: reference, p_status: "failed" });
    throw new WebinarError(502, "Plata nu a putut fi deschisă. Verificați confirmarea înainte de a reîncerca.");
  }
}

export async function receipt(id: string, token: string) {
  const registration = await authorizedRegistration(id, token);
  if (!registration) throw new WebinarError(404, "Solicitarea nu a fost găsită.");
  const order = await latestOrder(id);
  return { option: registration.option, status: registration.status, latePayment: registration.late_payment, reviewRequired: Boolean(registration.review_required), orderReference: order?.order_reference ?? null, orderStatus: order?.status ?? null, retryAllowed: registration.option === "ticket" && registration.status !== "paid" && availability(process.env).checkoutEnabled, membershipUrl: registration.option === "join" ? WEBINAR.membershipUrl : undefined };
}

export async function scheduleReconciliation() {
  await rpc("webinar_schedule_reconciliation", {});
}

export function confirmationLink(id: string) {
  return receiptUrl(id, process.env.WEBINAR_TOKEN_SECRET!, process.env.WEBINAR_SITE_URL || "https://www.aslm.ro");
}
