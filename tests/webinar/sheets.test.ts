import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { SheetFixture, registrationArgs } from "./sheet-fixture";
import { WEBINAR } from "../../lib/webinar/config";
import type { Registration } from "../../lib/webinar/model";
type Job = { id: string; status: string; generation: number; attempts: number; available_at: string };
const member = (s: SheetFixture) => s.rpc<Registration>("webinar_register", registrationArgs());

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
test("authenticated storage rejects forged/stale envelopes and wrong workbook before reading any Sheet", () => {
  const s = new SheetFixture();
  for (const body of [s.envelope("webinar_health", {}, { signature: "b".repeat(64) }), s.envelope("webinar_health", {}, { timestamp: s.now - 300001 }), "{}"]) assert.equal(s.post(body).ok, false);
  const badWorkbook = s.envelope("webinar_health", {});
  const body = JSON.parse(badWorkbook); body.payload = body.payload.replace("test-sheet", "other-sheet");
  assert.equal(s.post(JSON.stringify(body)).error, "unauthorized"); assert.equal(s.reads, 0);
});
test("schema damage and duplicate internal IDs stop rather than overwrite data", () => {
  const s = new SheetFixture(); s.rows["_WebinarRegistrations"][0][0] = "wrong";
  assert.throws(() => member(s), /schema_mismatch/);
  assert.equal(s.writes.length, 0);
  s.rows["_WebinarRegistrations"] = [["Key", "Record JSON"], ["same", "{}"], ["same", "{}"]];
  assert.throws(() => member(s), /duplicate_record/);
});
test("email failures back off, worker crashes recover leases, and other workers cannot double-deliver a claim", () => {
  const s = new SheetFixture(); member(s); const lease = randomUUID(), other = randomUUID();
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
test("new rows expand the Sheet grid and filtered native table in the same transaction", () => {
  const s = new SheetFixture(); s.tabs[0].properties.gridProperties.rowCount = 1;
  s.tabs[0].tables![0].range.endRowIndex = 1; member(s);
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
  const s = new SheetFixture(), r = member(s), p_keys = ["a".repeat(64), "b".repeat(64)];
  for (let i = 0; i < 10; i++) assert.equal(s.rpc("webinar_check_rates", { p_keys }), true);
  assert.equal(s.rpc("webinar_check_rates", { p_keys }), false);
  const [job] = s.rpc<{ registration: Registration }[]>("webinar_claim_jobs", { p_lease: randomUUID() });
  assert.equal(job.registration.id, r.id); assert.equal("receipt_token_hash" in job.registration, false);
});


test("member registration commits a visible row and two acknowledgment jobs atomically", () => {
  const s = new SheetFixture(), r = member(s);
  assert.equal(r.status, "requested"); assert.equal("receipt_token_hash" in r, false);
  assert.equal(s.records("_WebinarRegistrations").length, 1);
  assert.equal(s.records("_WebinarQueue").length, 2);
  assert.equal(s.writes.at(-1)!.filter(r => r.updateCells).length, 4);
  assert.deepEqual(s.rows["Înscrieri"][1].slice(6, 9), ["", "Solicitare primită", ""]);
});
test("removed payment actions and non-member options cannot create records", () => {
  const s = new SheetFixture();
  for (const option of ["ticket", "join"]) assert.throws(() => s.rpc("webinar_register", registrationArgs(option)), /invalid_registration/);
  for (const action of ["webinar_reserve_order", "webinar_apply_payment", "webinar_enqueue_bank", "webinar_schedule_reconciliation"]) assert.throws(() => s.rpc(action), /unknown_action/);
  assert.equal(s.writes.length, 0);
});
test("script lock rejects overlapping registration writers", () => {
  const s = new SheetFixture(); let rejected = false;
  s.duringWrite = () => {
    s.duringWrite = undefined;
    const response = s.post(s.envelope("webinar_register", registrationArgs("member", "other@example.com")));
    assert.equal(response.error, "busy"); rejected = true;
  };
  member(s);
  assert.equal(rejected, true); assert.equal(s.records("_WebinarRegistrations").length, 1);
});
test("new requests and email workers preserve manually edited and moved ASLM rows", () => {
  const s = new SheetFixture(), r = member(s);
  const automated = s.writes.at(-1)!.find(r => r.updateCells?.start && (r.updateCells.start as { sheetId: number }).sheetId === 1)!;
  assert.equal((automated.updateCells.rows as { values: unknown[] }[])[0].values.length, 9);
  const row = s.rows["Înscrieri"].pop()!;
  row[9] = "Verificat"; row[10] = "19.10.2026"; row[11] = "Notă ASLM";
  s.rows["Înscrieri"].push([], row);
  s.rpc("webinar_register", registrationArgs("member", "another@example.com"));
  s.rpc("webinar_claim_jobs", { p_lease: randomUUID() });
  const saved = s.rows["Înscrieri"].find(row => row[0] === r.id)!;
  assert.deepEqual(saved.slice(9), ["Verificat", "19.10.2026", "Notă ASLM"]);
  assert.equal(saved[2], "=Ana Ionescu");
});
test("cutoff closes registration under the lock while acknowledgment delivery continues", () => {
  const s = new SheetFixture();
  s.now = Date.parse(WEBINAR.endsAt) - 1; const r = member(s);
  s.now++;
  assert.throws(() => s.rpc("webinar_register", registrationArgs("member", "late@example.com")), /registration_closed/);
  const jobs = s.rpc<{ registration: Registration }[]>("webinar_claim_jobs", { p_lease: randomUUID(), p_limit: 4 });
  assert.equal(jobs.length, 2); assert.equal(jobs[0].registration.id, r.id);
});
test("deployed health declares membership-only schema and matching terms/cutoff", () => {
  const s = new SheetFixture();
  assert.deepEqual(s.rpc("webinar_health"), { eventId: WEBINAR.id, endsAt: WEBINAR.endsAt, termsVersion: WEBINAR.termsVersion, schemaVersion: 2 });
});
