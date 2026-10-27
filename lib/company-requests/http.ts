import "server-only";
import { createHash } from "node:crypto";

export class CompanyRequestError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export const unavailableMessage = "Trimiterea formularului nu este disponibilă momentan. Datele nu au fost confirmate ca primite. Contactează ASLM la contact@aslm.ro.";
export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
}
export async function readCompanyRequest(request: Request): Promise<unknown> {
  if (request.headers.get("origin") !== new URL(request.url).origin) throw new CompanyRequestError(403, "Cerere neautorizată.");
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new CompanyRequestError(415, "Date invalide.");
  const reader = request.body?.getReader();
  if (!reader) throw new CompanyRequestError(400, "Date invalide.");
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const chunk = await reader.read(); if (chunk.done) break;
    size += chunk.value.length;
    if (size > 16384) { await reader.cancel(); throw new CompanyRequestError(413, "Cererea este prea mare."); }
    chunks.push(chunk.value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { throw new CompanyRequestError(400, "Date invalide."); }
}

// A bounded warm-instance throttle; production also needs a platform firewall rule.
const attempts = new Map<string, { count: number; expires: number }>();
export function limitCompanyRequests(request: Request) {
  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "local";
  const key = createHash("sha256").update(ip).digest("hex");
  const entry = attempts.get(key) || { count: 0, expires: now + 10 * 60_000 };
  if (entry.count >= 5 || (!attempts.has(key) && attempts.size >= 4096)) throw new CompanyRequestError(429, "Prea multe încercări. Reîncearcă peste 10 minute sau contactează ASLM.");
  entry.count++; attempts.set(key, entry);
}
