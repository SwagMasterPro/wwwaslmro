import { verifySecret } from "./model";
import { WEBINAR } from "./config";

export type GatewayConfig = { baseUrl: string; merchantId: string; password: string; version: string; siteUrl: string };
export class GatewayError extends Error { constructor(public readonly definitive: boolean) { super("Bank request failed"); } }
export function gatewayConfig(env: Record<string, string | undefined>): GatewayConfig {
  const baseUrl = (env.UNICREDIT_GATEWAY_URL || "https://egenius.unicredit.ro/api/rest").replace(/\/+$/, "");
  const url = new URL(baseUrl);
  if (url.protocol !== "https:" || !["egenius.unicredit.ro", "test-egenius.unicredit.ro"].includes(url.hostname) || url.pathname !== "/api/rest") throw new Error("Invalid UniCredit gateway URL");
  const siteUrl = env.WEBINAR_SITE_URL || "https://www.aslm.ro";
  const site = new URL(siteUrl);
  if (site.protocol !== "https:" && !(env.NODE_ENV !== "production" && ["localhost", "127.0.0.1"].includes(site.hostname))) throw new Error("HTTPS site URL required");
  if (!env.UNICREDIT_MERCHANT_ID || !env.UNICREDIT_API_PASSWORD) throw new Error("Gateway not configured");
  return { baseUrl, siteUrl: siteUrl.replace(/\/$/, ""), merchantId: env.UNICREDIT_MERCHANT_ID, password: env.UNICREDIT_API_PASSWORD, version: env.UNICREDIT_CHECKOUT_VERSION || "85" };
}
function endpoint(config: GatewayConfig) { return `${config.baseUrl}/version/${encodeURIComponent(config.version)}/merchant/${encodeURIComponent(config.merchantId)}`; }
function headers(config: GatewayConfig) { return { Authorization: `Basic ${Buffer.from(`merchant.${config.merchantId}:${config.password}`).toString("base64")}`, "Content-Type": "application/json" }; }
export function sessionPayload(reference: string, email: string, config: GatewayConfig) {
  const receipt = `${config.siteUrl}/webinar/confirmare?order=${encodeURIComponent(reference)}`;
  return { apiOperation: "INITIATE_CHECKOUT", interaction: { operation: "PURCHASE", returnUrl: receipt, cancelUrl: `${receipt}&cancelled=1`, merchant: { name: "Fundația MedScience – ASLM" }, displayControl: { billingAddress: "OPTIONAL", customerEmail: "OPTIONAL" } }, order: { id: reference, currency: WEBINAR.currency, amount: "100.00", description: "Webinar ASLM – 19 octombrie 2026" }, customer: { email } };
}
export async function createSession(reference: string, email: string, config: GatewayConfig, fetcher = fetch): Promise<string> {
  const response = await fetcher(`${endpoint(config)}/session`, { method: "POST", headers: headers(config), body: JSON.stringify(sessionPayload(reference, email, config)), signal: AbortSignal.timeout(12_000), cache: "no-store" });
  if (!response.ok) throw new GatewayError(response.status >= 400 && response.status < 500 && response.status !== 408 && response.status !== 429);
  const body = await response.json();
  if (typeof body?.session?.id !== "string" || !/^SESSION[\w-]+$/.test(body.session.id)) throw new GatewayError(false);
  return body.session.id;
}
export async function retrieveOrder(reference: string, config: GatewayConfig, fetcher = fetch): Promise<unknown> {
  const response = await fetcher(`${endpoint(config)}/order/${encodeURIComponent(reference)}`, { headers: headers(config), signal: AbortSignal.timeout(8_000), cache: "no-store" });
  if (!response.ok) throw new GatewayError(false);
  return response.json();
}
function record(value: unknown): Record<string, unknown> { return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {}; }
export function bankPayment(payload: unknown, reference: string, merchant: string): { status: "paid" | "failed" | "pending"; transactionId?: string; paidAt?: string } {
  const data = record(payload);
  if (data.id !== reference || data.merchant !== merchant || data.currency !== "RON" || Number(data.amount) !== 100) throw new Error("Bank order mismatch");
  if (data.status === "CAPTURED" && Number(data.totalCapturedAmount) === 100 && Number(data.totalRefundedAmount || 0) === 0) {
    const transactions = Array.isArray(data.transaction) ? data.transaction : [];
    for (const item of transactions) {
      const txn = record(item), details = record(txn.transaction), response = record(txn.response);
      if (["PAYMENT", "PURCHASE", "CAPTURE"].includes(String(details.type)) && txn.result === "SUCCESS" && response.gatewayCode === "APPROVED" && Number(details.amount) === 100 && details.currency === "RON" && typeof details.id === "string") {
        const paidAt = typeof details.timeOfRecord === "string" ? details.timeOfRecord : typeof txn.timeOfRecord === "string" ? txn.timeOfRecord : undefined;
        return { status: "paid", transactionId: details.id, paidAt: paidAt && Number.isFinite(Date.parse(paidAt)) ? new Date(paidAt).toISOString() : undefined };
      }
    }
  }
  return { status: ["FAILED", "CANCELLED"].includes(String(data.status)) ? "failed" : "pending" };
}
export function notificationReference(payload: unknown): string | null {
  const data = record(payload), order = record(data.order);
  const reference = order.id ?? data.orderId;
  return typeof reference === "string" && /^ASLMWEB-[a-f0-9-]{36}$/.test(reference) ? reference : null;
}
export const verifyNotificationSecret = verifySecret;
