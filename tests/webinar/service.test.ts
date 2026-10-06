import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { register, receipt, WebinarError } from "../../lib/webinar/service";
import { digest, type Registration } from "../../lib/webinar/model";
import { SheetFixture } from "./sheet-fixture";

test("member requests and private receipts use the signed Sheet backend", async (t) => {
  const originalFetch = globalThis.fetch, previousEnv = { ...process.env }, sheet = new SheetFixture();
  Object.assign(process.env, {
    WEBINAR_SHEET_SCRIPT_URL: "https://script.google.com/macros/s/WEBINARTEST/exec", WEBINAR_SHEET_SECRET: sheet.secret,
    WEBINAR_TOKEN_SECRET: "t".repeat(32), WEBINAR_SHEET_ID: sheet.sheetId, WEBINAR_REGISTRATION_ENABLED: "true",
    WEBINAR_SMTP_HOST: "test", WEBINAR_SMTP_USER: "test", WEBINAR_SMTP_PASS: "test", WEBINAR_SMTP_FROM: "test", CRON_SECRET: "test",
  });
  let loseNextRegistrationResponse = false;
  globalThis.fetch = async (input, init) => {
    const req = new Request(input, init);
    assert.equal(new URL(req.url).origin, "https://script.google.com", "tests never contact a real provider");
    const body = await req.text(), result = sheet.post(body);
    if (loseNextRegistrationResponse && JSON.parse(JSON.parse(body).payload).action === "webinar_register") {
      loseNextRegistrationResponse = false; throw new Error("Network lost after committed registration");
    }
    return Response.json(result);
  };
  const submit = (email: string, submissionKey?: string) => register({ name: "Ana Ionescu", email, phone: "", option: "member", acceptedTerms: true, website: "", submissionKey });
  try {
    await t.test("member requests persist and duplicates never expose someone else's receipt", async () => {
      const member = await submit("member@example.com");
      const records = sheet.records<Registration & { receipt_token_hash: string }>("_WebinarRegistrations");
      assert.equal(records[0].status, "requested");
      assert.equal(records[0].receipt_token_hash, digest(member.token));
      assert.deepEqual(await receipt(member.id, member.token), { option: "member", status: "requested" });
      await assert.rejects(receipt(member.id, "a".repeat(64)), (e: unknown) => e instanceof WebinarError && e.status === 404);
      await assert.rejects(submit("member@example.com"), (e: unknown) => e instanceof WebinarError && e.status === 409);
    });
    await t.test("the same private submission recovers a request after a lost response", async () => {
      const key = randomUUID(); loseNextRegistrationResponse = true;
      await assert.rejects(submit("retry@example.com", key), /Network lost/);
      const recovered = await submit("retry@example.com", key);
      assert.ok(recovered.token);
      assert.equal(sheet.records<Registration>("_WebinarRegistrations").filter(r => r.email === "retry@example.com").length, 1);
      assert.equal(sheet.records("_WebinarQueue").length, 4);
    });
    await t.test("disabled registration does not write to the Sheet", async () => {
      process.env.WEBINAR_REGISTRATION_ENABLED = "false";
      const count = sheet.writes.length;
      await assert.rejects(submit("disabled@example.com"), (e: unknown) => e instanceof WebinarError && e.status === 503);
      assert.equal(sheet.writes.length, count);
    });
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key];
    Object.assign(process.env, previousEnv);
  }
});
