import "server-only";
import { createHmac, randomUUID } from "node:crypto";
import { digest, type Registration } from "./model";

export class StoreError extends Error {
  constructor(public readonly code: string) { super(`Webinar storage: ${code}`); }
}

export async function rpc<T>(action: string, args: Record<string, unknown>): Promise<T> {
  const endpoint = process.env.WEBINAR_SHEET_SCRIPT_URL, secret = process.env.WEBINAR_SHEET_SECRET;
  if (!endpoint || !secret || secret.length < 32) throw new StoreError("not_configured");
  const url = new URL(endpoint);
  if (url.origin !== "https://script.google.com" || !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname) || url.search || url.hash) throw new StoreError("invalid_endpoint");
  const payload = JSON.stringify({ action, args, sheetId: process.env.WEBINAR_SHEET_ID });
  const timestamp = Date.now(), nonce = randomUUID();
  const signature = createHmac("sha256", secret).update(`${timestamp}\n${nonce}\n${payload}`).digest("hex");
  const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ payload, timestamp, nonce, signature }), cache: "no-store", signal: AbortSignal.timeout(25_000), redirect: "follow" });
  if (!response.ok) throw new StoreError("unavailable");
  const result = await response.json();
  if (result.ok !== true) throw new StoreError(typeof result.error === "string" ? result.error : "unavailable");
  return result.result as T;
}

export async function loadRegistration(id: string): Promise<Registration> {
  const result = await rpc<Registration | null>("webinar_load_registration", { p_id: id });
  if (!result) throw new StoreError("registration_missing");
  return result;
}
export function authorizedRegistration(id: string, token: string): Promise<Registration | null> {
  return rpc("webinar_authorized_registration", { p_id: id, p_token_hash: digest(token) });
}
