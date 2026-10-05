import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { SheetFixture, registrationArgs } from "./sheet-fixture";
import { WEBINAR } from "../../lib/webinar/config";
import type { Registration, Order } from "../../lib/webinar/model";
type Job = { id: string; status: string; generation: number; attempts: number; available_at: string };
const ticket = (s: SheetFixture) => s.rpc<Registration>("webinar_register", registrationArgs());
const reserve = (s: SheetFixture, r: Registration) => s.rpc<Order>("webinar_reserve_order", { p_registration_id: r.id, p_reference: `ASLMWEB-${randomUUID()}` });

test("all three registration paths commit one visible row and acknowledgment jobs atomically", () => {
  const s = new SheetFixture();
  for (const option of ["member", "join", "ticket"]) {
    const r = s.rpc<Registration>("webinar_register", registrationArgs(option, `${option}@example.com`));
    assert.equal(r.amount_bani, option === "ticket" ? 10000 : 0);
    assert.equal(r.status, option === "member" ? "requested" : option === "join" ? "awaiting_membership" : "pending");
    assert.equal("receipt_token_hash" in r, false);
    const batch = s.writes.at(-1)!;
    assert.equal(batch.filter(r => r.updateCells).length, 4, "registration + visible table + two emails");
  }
  assert.equal(s.records("_WebinarRegistrations").length, 3);
  assert.equal(s.records("_WebinarQueue").length, 6);
  assert.equal(s.reads, 1, "structural metadata is cached while registration state stays fresh");
});
test("lost response retries recover only the same private submission without duplicate rows or jobs", () => {
  const s = new SheetFixture(), args = registrationArgs(); s.loseResponse = true;
  assert.throws(() => s.rpc("webinar_register", args), /unavailable/);
  const recovered = s.rpc<Registration>("webinar_register", args);
  assert.equal(recovered.id, args.p_id);
  assert.equal(s.rows["Înscrieri"].length, 2); assert.equal(s.records("_WebinarQueue").length, 2);
  assert.throws(() => s.rpc("webinar_register", { ...args, p_id: randomUUID() }), /duplicate_email/);
  assert.throws(() => s.rpc("webinar_register", { ...args, p_email: "changed@example.com" }), /idempotency_conflict/);
});
test("a Sheet quota failure leaves no partial registration, row or outbox job", () => {
  const s = new SheetFixture(), args = registrationArgs(); s.failWrite = true;
  assert.throws(() => s.rpc("webinar_register", args), /unavailable/);
  assert.equal(s.records("_WebinarRegistrations").length, 0);
  assert.equal(s.records("_WebinarQueue").length, 0); assert.equal(s.rows["Înscrieri"].length, 1);
  s.rpc("webinar_register", args); assert.equal(s.records("_WebinarRegistrations").length, 1);
});
test("script lock rejects overlapping writers and simultaneous checkouts reuse one active order", () => {
  const s = new SheetFixture(), r = ticket(s); let rejected = false;
  s.duringWrite = () => {
    s.duringWrite = undefined;
    const response = s.post(s.envelope("webinar_reserve_order", { p_registration_id: r.id, p_reference: `ASLMWEB-${randomUUID()}` }));
    assert.equal(response.error, "busy"); rejected = true;
  };
  const first = reserve(s, r), second = reserve(s, r);
  assert.equal(rejected, true); assert.equal(first.order_reference, second.order_reference);
  assert.equal(s.records("_WebinarOrders").length, 1);
});
test("authenticated storage rejects forged/stale envelopes and wrong workbook before reading any Sheet", () => {
  const s = new SheetFixture();
  for (const body of [s.envelope("webinar_health", {}, { signature: "b".repeat(64) }), s.envelope("webinar_health", {}, { timestamp: s.now - 300001 }), "{}"]) assert.equal(s.post(body).ok, false);
  const badWorkbook = s.envelope("webinar_health", {});
  const body = JSON.parse(badWorkbook); body.payload = body.payload.replace("test-sheet", "other-sheet");
  assert.equal(s.post(JSON.stringify(body)).error, "unauthorized"); assert.equal(s.reads, 0);
});
test("schema damage and duplicate internal IDs stop rather than overwrite data", () => {
  const s = new SheetFixture(); s.rows["_WebinarOrders"][0][0] = "wrong";
  assert.throws(() => ticket(s), /schema_mismatch/);
  assert.equal(s.writes.length, 0);
  s.rows["_WebinarOrders"] = [["Key", "Record JSON"], ["same", "{}"], ["same", "{}"]];
  assert.throws(() => ticket(s), /duplicate_record/);
});
test("payment updates find a moved row, keep ASLM columns, and write user text literally", () => {
  const s = new SheetFixture(), r = ticket(s), o = reserve(s, r);
  const row = s.rows["Înscrieri"].pop()!; row[9] = "Verificat"; row[10] = "19.10.2026"; row[11] = "Notă ASLM";
  s.rows["Înscrieri"].push([], row);
  s.rpc("webinar_apply_payment", { p_reference: o.order_reference, p_status: "paid", p_transaction_id: "txn", p_paid_at: WEBINAR.startsAt });
  assert.deepEqual(s.rows["Înscrieri"][2].slice(9), ["Verificat", "19.10.2026", "Notă ASLM"]);
  assert.equal(s.rows["Înscrieri"][2][2], "=Ana Ionescu"); assert.equal(s.rows["Înscrieri"][2][7], "Plătit");
  assert.equal(s.rows["Înscrieri"][1].length, 0);
  const automated = s.writes.at(-1)!.find(r => r.updateCells?.start && (r.updateCells.start as { sheetId: number }).sheetId === 1)!;
  assert.equal((automated.updateCells.rows as { values: unknown[] }[])[0].values.length, 9);
});
test("failed and cancelled attempts can retry but an ambiguous creating order blocks another purchase", () => {
  const s = new SheetFixture(), r = ticket(s); const o = reserve(s, r);
  assert.equal(reserve(s, r).order_reference, o.order_reference);
  s.rpc("webinar_apply_payment", { p_reference: o.order_reference, p_status: "failed" });
  assert.match(String(s.rows["Înscrieri"][1][7]), /eșuată/);
  assert.notEqual(reserve(s, r).order_reference, o.order_reference);
});
test("paid callbacks are idempotent, never downgraded, and a delayed capture on an old failed order is flagged", () => {
  const s = new SheetFixture(), r = ticket(s), old = reserve(s, r);
  s.rpc("webinar_apply_payment", { p_reference: old.order_reference, p_status: "failed" });
  const current = reserve(s, r);
  for (let i = 0; i < 2; i++) s.rpc("webinar_apply_payment", { p_reference: current.order_reference, p_status: "paid", p_transaction_id: "txn-new", p_paid_at: WEBINAR.startsAt });
  assert.equal(s.records<Job>("_WebinarQueue").filter(j => j.id.startsWith("paid-")).length, 2);
  s.rpc("webinar_apply_payment", { p_reference: current.order_reference, p_status: "failed" });
  assert.equal(s.rpc<Order>("webinar_load_order", { p_reference: current.order_reference }).status, "paid");
  s.rpc("webinar_apply_payment", { p_reference: old.order_reference, p_status: "paid", p_transaction_id: "txn-old" });
  assert.equal(s.rpc<Registration>("webinar_load_registration", { p_id: r.id }).review_required, true);
  assert.match(String(s.rows["Înscrieri"][1][7]), /multiple/);
});
test("cutoff rejects new registrations/checkouts but schedules existing orders and records late bank settlement", () => {
  const s = new SheetFixture(), r = ticket(s), o = reserve(s, r);
  s.now = Date.parse(WEBINAR.endsAt);
  assert.throws(() => s.rpc("webinar_register", registrationArgs("member", "late@example.com")), /registration_closed/);
  assert.throws(() => reserve(s, r), /registration_closed/);
  assert.equal(s.rpc("webinar_schedule_reconciliation"), 1);
  s.rpc("webinar_apply_payment", { p_reference: o.order_reference, p_status: "paid", p_transaction_id: "late", p_paid_at: WEBINAR.endsAt });
  assert.equal(s.rpc<Registration>("webinar_load_registration", { p_id: r.id }).late_payment, true);
  assert.match(String(s.rows["Înscrieri"][1][7]), /după încheiere/);
});
test("a delayed capture on a previously failed attempt displays the confirmed order instead of its pending retry", () => {
  const s = new SheetFixture(), r = ticket(s), old = reserve(s, r);
  s.rpc("webinar_apply_payment", { p_reference: old.order_reference, p_status: "failed" });
  reserve(s, r);
  s.rpc("webinar_apply_payment", { p_reference: old.order_reference, p_status: "paid", p_transaction_id: "delayed-capture" });
  assert.equal(s.rows["Înscrieri"][1][8], old.order_reference);
  assert.equal(s.rpc<Order>("webinar_latest_order", { p_registration_id: r.id }).status, "paid");
});
test("email failures back off, worker crashes recover leases, and other workers cannot double-deliver a claim", () => {
  const s = new SheetFixture(); ticket(s); const lease = randomUUID(), other = randomUUID();
  const [job] = s.rpc<Job[]>("webinar_claim_jobs", { p_lease: lease, p_limit: 1 });
  assert.equal(s.rpc<Job[]>("webinar_claim_jobs", { p_lease: other }).length, 0);
  s.rpc("webinar_finish_job", { p_id: job.id, p_lease: lease, p_generation: job.generation, p_error: "email delivery failed" });
  s.rpc("webinar_release_worker", { p_lease: lease });
  const failed = s.records<Job>("_WebinarQueue").find(j => j.id === job.id)!;
  assert.equal(failed.status, "pending"); assert.ok(Date.parse(failed.available_at) > s.now);
  s.now += 300001;
  const retried = s.rpc<Job[]>("webinar_claim_jobs", { p_lease: other, p_limit: 4 });
  assert.equal(retried.find(j => j.id === job.id)?.attempts, 2);
  s.now += 300001;
  assert.equal(s.rpc<Job[]>("webinar_claim_jobs", { p_lease: randomUUID(), p_limit: 4 }).length, 2);
});
test("bank jobs deduplicate callback replays and preserve a newer reconciliation generation during a lease", () => {
  const s = new SheetFixture(), r = ticket(s), o = reserve(s, r);
  for (let i = 0; i < 2; i++) s.rpc("webinar_enqueue_bank", { p_reference: o.order_reference, p_digest: "same-callback" });
  assert.equal(s.records<Job>("_WebinarQueue").filter(j => j.id === "bank:same-callback").length, 1);
  s.rpc("webinar_schedule_reconciliation"); const lease = randomUUID();
  const jobs = s.rpc<Job[]>("webinar_claim_jobs", { p_lease: lease, p_limit: 4 });
  const scheduled = jobs.find(j => j.id.startsWith("scheduled-bank:"))!;
  s.now += 900001; s.rpc("webinar_schedule_reconciliation");
  s.rpc("webinar_finish_job", { p_id: scheduled.id, p_lease: lease, p_generation: scheduled.generation });
  assert.equal(s.records<Job>("_WebinarQueue").find(j => j.id === scheduled.id)!.status, "pending");
});
test("new rows expand the Sheet grid and filtered native table in the same transaction", () => {
  const s = new SheetFixture(); s.tabs[0].properties.gridProperties.rowCount = 1;
  s.tabs[0].tables![0].range.endRowIndex = 1; ticket(s);
  assert.ok(s.tabs[0].properties.gridProperties.rowCount > 2);
  assert.equal(s.tabs[0].tables![0].range.endRowIndex, s.tabs[0].properties.gridProperties.rowCount);
});
test("durable rate limiting resets after ten minutes without retaining raw IP or email", () => {
  const s = new SheetFixture(), p_key = "f".repeat(64);
  for (let i = 0; i < 10; i++) assert.equal(s.rpc("webinar_check_rate", { p_key }), true);
  assert.equal(s.rpc("webinar_check_rate", { p_key }), false);
  s.now += 600000; assert.equal(s.rpc("webinar_check_rate", { p_key }), true);
  assert.doesNotMatch(JSON.stringify(s.rows["_WebinarRateLimits"]), /@|127\.0\.0/);
});
test("one locked command checks both rate-limit keys and worker claims include a fresh public registration", () => {
  const s = new SheetFixture(), r = ticket(s), p_keys = ["a".repeat(64), "b".repeat(64)];
  for (let i = 0; i < 10; i++) assert.equal(s.rpc("webinar_check_rates", { p_keys }), true);
  assert.equal(s.rpc("webinar_check_rates", { p_keys }), false);
  const [job] = s.rpc<{ registration: Registration }[]>("webinar_claim_jobs", { p_lease: randomUUID() });
  assert.equal(job.registration.id, r.id); assert.equal("receipt_token_hash" in job.registration, false);
});
