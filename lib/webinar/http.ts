import "server-only";
import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { rpc } from "./store";
import { WebinarError } from "./service";

export function json(body: unknown, status = 200) { return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } }); }
export function errorResponse(error: unknown) {
  if (error instanceof WebinarError) return json({ error: error.message }, error.status);
  return json({ error: "Serviciul nu este disponibil momentan. Vă rugăm să reveniți sau să contactați contact@aslm.ro." }, 503);
}
export async function readBody(request: Request, enforceOrigin = true): Promise<unknown> {
  // Use the configured public origin when a proxy constructs an internal URL.
  const expectedOrigin = new URL(process.env.WEBINAR_SITE_URL || request.url).origin;
  if (enforceOrigin && request.headers.get("origin") !== expectedOrigin) throw new WebinarError(403, "Cerere neautorizată.");
  if (!request.headers.get("content-type")?.startsWith("application/json")) throw new WebinarError(415, "Date invalide.");
  const reader = request.body?.getReader();
  if (!reader) throw new WebinarError(400, "Date invalide.");
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const chunk = await reader.read(); if (chunk.done) break;
    size += chunk.value.length;
    if (size > 8192) { await reader.cancel(); throw new WebinarError(413, "Cererea este prea mare."); }
    chunks.push(chunk.value);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); } catch { throw new WebinarError(400, "Date invalide."); }
}
export async function rateLimit(request: Request, scope: string, email = "") {
  const secret = process.env.WEBINAR_TOKEN_SECRET;
  if (!secret) throw new WebinarError(503, "Înscrierile se deschid în curând.");
  // Trust Vercel's platform-owned address header, never a caller-supplied XFF.
  const ip = request.headers.get("x-vercel-forwarded-for")?.split(",")[0].trim() || "local";
  const keys = [`${scope}:ip:${ip}`, ...(email ? [`${scope}:email:${email}`] : [])].map(key => createHmac("sha256", secret).update(key).digest("hex"));
  if (!await rpc<boolean>("webinar_check_rates", { p_keys: keys })) throw new WebinarError(429, "Prea multe încercări. Reveniți peste 10 minute.");
}
