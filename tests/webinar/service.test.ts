import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { register, checkout, reconcileOrder, receipt, scheduleReconciliation, WebinarError } from "../../lib/webinar/service";
import { digest, type Registration, type Order } from "../../lib/webinar/model";
import { WEBINAR } from "../../lib/webinar/config";
import { SheetFixture } from "./sheet-fixture";

test("registration and checkout use the signed Sheet backend and authenticated bank readback", async (t) => {
  const originalFetch = globalThis.fetch, previousEnv = { ...process.env }, sheet = new SheetFixture();
  Object.assign(process.env, {
    WEBINAR_SHEET_SCRIPT_URL: "https://script.google.com/macros/s/WEBINARTEST/exec", WEBINAR_SHEET_SECRET: sheet.secret,
    WEBINAR_TOKEN_SECRET: "t".repeat(32), WEBINAR_SHEET_ID: sheet.sheetId,
    WEBINAR_REGISTRATION_ENABLED: "true", WEBINAR_CHECKOUT_ENABLED: "true", WEBINAR_CHECKOUT_QA_APPROVED: "true",
    WEBINAR_SMTP_HOST: "test", WEBINAR_SMTP_USER: "test", WEBINAR_SMTP_PASS: "test", WEBINAR_SMTP_FROM: "test", CRON_SECRET: "test",
    UNICREDIT_MERCHANT_ID: "sandbox-merchant", UNICREDIT_API_PASSWORD: "sandbox-password", UNICREDIT_WEBHOOK_SECRET: "test",
    UNICREDIT_GATEWAY_URL: "https://test-egenius.unicredit.ro/api/rest", WEBINAR_SITE_URL: "https://www.aslm.ro",
  });
  const bankStatuses = new Map<string, string>(), purchases: Record<string, unknown>[] = [];
  let failNextSession = false, loseNextRegistrationResponse = false;
  globalThis.fetch = async (input, init) => {
    const req = new Request(input, init), url = new URL(req.url);
    if (url.hostname === "test-egenius.unicredit.ro") {
      assert.equal(req.headers.get("authorization"), `Basic ${Buffer.from("merchant.sandbox-merchant:sandbox-password").toString("base64")}`);
      if (url.pathname.endsWith("/session")) {
        if (failNextSession) { failNextSession = false; return new Response("", { status: 503 }); }
        purchases.push(await req.json());
        return Response.json({ session: { id: `SESSION${purchases.length}` } });
      }
      const reference = url.pathname.split("/order/")[1];
      assert.ok(sheet.records<Order>("_WebinarOrders").some(o => o.order_reference === reference));
      return Response.json({ id: reference, merchant: "sandbox-merchant", amount: "100.00", currency: "RON", status: bankStatuses.get(reference) || "INITIATED", totalCapturedAmount: 100, totalRefundedAmount: 0, transaction: [{ result: "SUCCESS", response: { gatewayCode: "APPROVED" }, transaction: { id: "bank-transaction", amount: 100, currency: "RON", type: "PAYMENT", timeOfRecord: WEBINAR.endsAt } }] });
    }
    assert.equal(url.origin, "https://script.google.com", "tests never contact a real provider");
    const body = await req.text(), result = sheet.post(body);
    if (loseNextRegistrationResponse && JSON.parse(JSON.parse(body).payload).action === "webinar_register") {
      loseNextRegistrationResponse = false; throw new Error("Network lost after committed registration");
    }
    return Response.json(result);
  };
  const submit = (option: "member" | "join" | "ticket", email: string, submissionKey?: string) => register({ name: "Ana Ionescu", email, phone: "", option, acceptedTerms: true, website: "", submissionKey });
  const currentOrder = (id: string) => sheet.records<Order>("_WebinarOrders").find(o => o.registration_id === id && o.status !== "failed")!;
  try {
    await t.test("member/join requests persist before redirect and duplicate emails never expose a receipt", async () => {
      const member = await submit("member", "member@example.com"), join = await submit("join", "join@example.com");
      assert.equal(member.nextAction, "receipt"); assert.equal(join.nextAction, "membership"); assert.equal(join.membershipUrl, WEBINAR.membershipUrl);
      const records = sheet.records<Registration & { receipt_token_hash: string }>("_WebinarRegistrations");
      assert.equal(records.find(r => r.id === join.id)?.status, "awaiting_membership");
      assert.equal(records.find(r => r.id === member.id)?.receipt_token_hash, digest(member.token));
      await assert.rejects(submit("member", "member@example.com"), (e: unknown) => e instanceof WebinarError && e.status === 409);
    });
    await t.test("retrying the same browser submission after a lost response recovers the saved request", async () => {
      const key = randomUUID(); loseNextRegistrationResponse = true;
      await assert.rejects(submit("member", "retry@example.com", key), /Network lost/);
      const recovered = await submit("member", "retry@example.com", key);
      assert.ok(recovered.token); assert.equal(sheet.records<Registration>("_WebinarRegistrations").filter(r => r.email === "retry@example.com").length, 1);
    });
    const ticket = await submit("ticket", "ticket@example.com");
    await t.test("ticket checkout uses one 100 RON purchase and reuses an active session", async () => {
      const first = await checkout(ticket.id, ticket.token), second = await checkout(ticket.id, ticket.token);
      assert.deepEqual(second, first); assert.equal(sheet.records("_WebinarOrders").length, 1);
      assert.equal((purchases[0].order as { amount: string }).amount, "100.00");
      await assert.rejects(checkout(ticket.id, "a".repeat(64)), (e: unknown) => e instanceof WebinarError && e.status === 404);
    });
    await t.test("bank-verified failure/cancellation permit another attempt", async () => {
      for (const failure of ["FAILED", "CANCELLED"]) {
        const old = currentOrder(ticket.id); bankStatuses.set(old.order_reference, failure);
        const retry = await checkout(ticket.id, ticket.token);
        assert.notEqual("orderReference" in retry && retry.orderReference, old.order_reference);
        assert.equal(sheet.rpc<Order>("webinar_load_order", { p_reference: old.order_reference }).status, "failed");
      }
    });
    await t.test("independent scheduled retrieval confirms late payment without a browser return", async () => {
      await scheduleReconciliation();
      const current = currentOrder(ticket.id); bankStatuses.set(current.order_reference, "CAPTURED");
      await reconcileOrder(current.order_reference);
      const state = await receipt(ticket.id, ticket.token);
      assert.equal(state.status, "paid"); assert.equal(state.latePayment, true); assert.equal(state.retryAllowed, false);
      const count = sheet.records("_WebinarOrders").length;
      assert.deepEqual(await checkout(ticket.id, ticket.token), { paid: true }); assert.equal(sheet.records("_WebinarOrders").length, count);
    });
    await t.test("ambiguous bank failure keeps its order reservation and prevents a second purchase", async () => {
      const other = await submit("ticket", "ambiguous@example.com"); failNextSession = true;
      await assert.rejects(checkout(other.id, other.token), (e: unknown) => e instanceof WebinarError && e.status === 502);
      const count = sheet.records("_WebinarOrders").length;
      await assert.rejects(checkout(other.id, other.token), (e: unknown) => e instanceof WebinarError && e.status === 409);
      assert.equal(sheet.records("_WebinarOrders").length, count);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key];
    Object.assign(process.env, previousEnv);
  }
});
