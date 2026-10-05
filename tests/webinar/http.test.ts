import test from "node:test";
import assert from "node:assert/strict";
import { readBody, errorResponse } from "../../lib/webinar/http";
import { WebinarError } from "../../lib/webinar/service";
import { POST as register } from "../../app/api/webinar/register/route";
import { POST as webhook } from "../../app/api/webinar/payment/webhook/route";
import { POST as status } from "../../app/api/webinar/status/route";
import { GET as jobs } from "../../app/api/webinar/jobs/route";

function request(body = "{}", headers: Record<string, string> = {}) { return new Request("https://www.aslm.ro/api/webinar/register", { method: "POST", headers: { Origin: "https://www.aslm.ro", "Content-Type": "application/json", ...headers }, body }); }
test("public API accepts only same-origin JSON within its size limit", async () => {
  assert.deepEqual(await readBody(request()), {});
  for (const [req, code] of [[request("{}", { Origin: "https://forged.example" }), 403], [request("{}", { "Content-Type": "text/plain" }), 415], [request("malformed"), 400], [request(JSON.stringify({ padding: "x".repeat(8192) })), 413]] as const) await assert.rejects(readBody(req), (e: unknown) => e instanceof WebinarError && e.status === code);
});
test("configured public origin works behind a proxy without trusting arbitrary host headers", async () => {
  const previous = process.env.WEBINAR_SITE_URL;
  process.env.WEBINAR_SITE_URL = "https://www.aslm.ro";
  try {
    const proxied = new Request("http://localhost:3101/api/webinar/register", { method: "POST", headers: { Origin: "https://www.aslm.ro", "Content-Type": "application/json" }, body: "{}" });
    assert.deepEqual(await readBody(proxied), {});
    await assert.rejects(readBody(request("{}", { Origin: "https://forged.example", Host: "forged.example" })), (e: unknown) => e instanceof WebinarError && e.status === 403);
  } finally { if (previous === undefined) delete process.env.WEBINAR_SITE_URL; else process.env.WEBINAR_SITE_URL = previous; }
});
test("registration endpoint returns actionable validation errors before touching storage", async () => {
  const response = await register(request(JSON.stringify({ name: "A", email: "invalid", option: "ticket", acceptedTerms: false })));
  assert.equal(response.status, 400);
  const body = await response.json(); assert.ok(body.fields.email); assert.ok(body.fields.acceptedTerms);
});
test("forged bank returns cannot be supplied to the receipt-status endpoint", async () => {
  const response = await status(request(JSON.stringify({ id: "11111111-1111-4111-8111-111111111111", token: "a".repeat(64), paid: true, resultIndicator: "forged" })));
  assert.equal(response.status, 400);
});
test("bank notifications and reconciliation jobs require configured secrets", async () => {
  delete process.env.UNICREDIT_WEBHOOK_SECRET; delete process.env.CRON_SECRET;
  assert.equal((await webhook(request('{"orderId":"ASLMWEB-forged","paid":true}'))).status, 401);
  assert.equal((await jobs(new Request("https://www.aslm.ro/api/webinar/jobs"))).status, 401);
});
test("unconfigured registration fails closed and server failures never disclose credentials", async () => {
  delete process.env.WEBINAR_TOKEN_SECRET;
  const response = await register(request(JSON.stringify({ name: "Ana Ionescu", email: "ana@example.com", option: "member", acceptedTerms: true })));
  assert.equal(response.status, 503);
  const generic = errorResponse(new Error("database-password-internal"));
  assert.equal(generic.headers.get("cache-control"), "no-store");
  assert.doesNotMatch(JSON.stringify(await generic.json()), /database-password/);
});
