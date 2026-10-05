import test from "node:test";
import assert from "node:assert/strict";
import { WEBINAR, availability, registrationClosed } from "../../lib/webinar/config";
import { registrationSchema, receiptToken, verifySecret } from "../../lib/webinar/model";
import { message, sheetValues } from "../../lib/webinar/delivery";
import type { Registration } from "../../lib/webinar/model";

const sample = { name: "Ana Ionescu", email: "  ANA@EXAMPLE.COM  ", phone: "", acceptedTerms: true, option: "member" };
test("member requests accept minimal contacts and normalize email", () => {
  assert.equal(registrationSchema.parse(sample).email, "ana@example.com");
});
test("reject invalid contacts, missing consent, honeypot, removed options and supplied prices", () => {
  for (const change of [{ email: "invalid" }, { name: "A" }, { acceptedTerms: false }, { website: "spam" }, { amount: 1 }, { option: "ticket" }, { option: "join" }, { phone: "<script>" }]) assert.equal(registrationSchema.safeParse({ ...sample, ...change }).success, false);
});
test("fixed 30 calendar days crosses Bucharest daylight saving", () => {
  assert.equal((Date.parse(WEBINAR.endsAt) - Date.parse(WEBINAR.startsAt)) / 3_600_000, 721);
  assert.equal(registrationClosed(new Date("2026-11-17T21:59:59.999Z")), false);
  assert.equal(registrationClosed(new Date("2026-11-17T22:00:00Z")), true);
  const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  assert.equal(format.format(new Date(WEBINAR.endsAt)), "00:00");
});
test("requests fail closed without storage/email; membership URL needs no payment configuration", () => {
  assert.deepEqual(availability({}, new Date("2026-10-05")), { registrationEnabled: false, closed: false });
  assert.equal(WEBINAR.membershipUrl, "https://membership.aslm.ro/");
  const env = Object.fromEntries(["WEBINAR_SHEET_SCRIPT_URL", "WEBINAR_SHEET_ID", "WEBINAR_SMTP_HOST", "WEBINAR_SMTP_USER", "WEBINAR_SMTP_PASS", "WEBINAR_SMTP_FROM", "CRON_SECRET"].map(k => [k, "configured"]));
  Object.assign(env, { WEBINAR_SHEET_SECRET: "s".repeat(32), WEBINAR_TOKEN_SECRET: "a".repeat(32), WEBINAR_REGISTRATION_ENABLED: "true" });
  assert.equal(availability(env, new Date("2026-10-05")).registrationEnabled, true);
  assert.equal(availability(env, new Date(WEBINAR.endsAt)).registrationEnabled, false);
});
test("receipt credentials and job secrets are scoped and constant time", () => {
  const token = receiptToken("registration-one", "a-secret");
  assert.equal(token.length, 64);
  assert.notEqual(token, receiptToken("registration-two", "a-secret"));
  assert.notEqual(token, receiptToken("registration-one", "other-secret"));
  assert.equal(verifySecret("correct", "correct"), true);
  assert.equal(verifySecret("incorrect", "correct"), false);
  assert.equal(verifySecret(null, undefined), false);
});
const r: Registration = { id: "11111111-1111-4111-8111-111111111111", event_id: WEBINAR.id, name: "=Ana", email: "ana@example.com", phone: "+40 700", option: "member", status: "requested", created_at: "2026-10-05T10:00:00Z", sheet_row: 2 };
test("Sheet output preserves the layout without ticket amounts or orders", () => {
  const values = sheetValues(r);
  assert.equal(values.length, 9); assert.equal(values[2], "=Ana");
  assert.equal(values[6], ""); assert.equal(values[7], "Solicitare primită"); assert.equal(values[8], "");
});
test("acknowledgments explain manual membership verification, separate accounts and the fixed window", () => {
  const email = message(r, "email-request-attendee", "secret", "https://www.aslm.ro");
  assert.match(email.text, /verifica statutul de membru/); assert.match(email.text, /17 noiembrie/); assert.match(email.text, /separat/);
  assert.doesNotMatch(email.text, /100 RON|bilet|Plata/);
  const admin = message(r, "email-request-admin", "secret", "https://www.aslm.ro");
  assert.equal(admin.admin, true); assert.match(admin.text, /Actualizați trackerul/);
});
