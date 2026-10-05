import test from "node:test";
import assert from "node:assert/strict";
import { WEBINAR, availability, registrationClosed } from "../../lib/webinar/config";
import { registrationSchema, receiptToken, verifySecret } from "../../lib/webinar/model";
import { message, sheetValues } from "../../lib/webinar/delivery";
import type { Registration } from "../../lib/webinar/model";

const sample = { name: "Ana Ionescu", email: "  ANA@EXAMPLE.COM  ", phone: "", acceptedTerms: true };
test("all options accept minimal contact details and normalize email", () => {
  for (const option of ["member", "ticket", "join"]) assert.equal(registrationSchema.parse({ ...sample, option }).email, "ana@example.com");
});
test("reject invalid contact, missing consent, honeypot and browser-supplied prices", () => {
  for (const change of [{ email: "invalid" }, { name: "A" }, { acceptedTerms: false }, { website: "spam" }, { amount: 1 }, { option: "msc" }, { phone: "<script>" }]) assert.equal(registrationSchema.safeParse({ ...sample, option: "ticket", ...change }).success, false);
});
test("fixed 30 calendar days crosses Bucharest daylight saving", () => {
  assert.equal((Date.parse(WEBINAR.endsAt) - Date.parse(WEBINAR.startsAt)) / 3_600_000, 721);
  assert.equal(registrationClosed(new Date("2026-11-17T21:59:59.999Z")), false);
  assert.equal(registrationClosed(new Date("2026-11-17T22:00:00Z")), true);
  const format = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Bucharest", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  assert.equal(format.format(new Date(WEBINAR.endsAt)), "00:00");
});
test("registration and checkout fail closed without configuration and explicit QA", () => {
  assert.deepEqual(availability({}, new Date("2026-10-05")), { registrationEnabled: false, checkoutEnabled: false, closed: false });
  const env = Object.fromEntries(["WEBINAR_SHEET_SCRIPT_URL", "WEBINAR_SHEET_ID", "WEBINAR_SMTP_HOST", "WEBINAR_SMTP_USER", "WEBINAR_SMTP_PASS", "WEBINAR_SMTP_FROM", "CRON_SECRET", "UNICREDIT_MERCHANT_ID", "UNICREDIT_API_PASSWORD", "UNICREDIT_WEBHOOK_SECRET"].map(k => [k,"configured"]));
  Object.assign(env, { WEBINAR_SHEET_SECRET: "s".repeat(32), WEBINAR_TOKEN_SECRET: "a".repeat(32), WEBINAR_REGISTRATION_ENABLED: "true", WEBINAR_CHECKOUT_ENABLED: "true" });
  assert.equal(availability(env, new Date("2026-10-05")).registrationEnabled, true);
  assert.equal(availability(env, new Date("2026-10-05")).checkoutEnabled, false);
  env.WEBINAR_CHECKOUT_QA_APPROVED = "true";
  assert.equal(availability(env, new Date("2026-10-05")).checkoutEnabled, true);
  assert.equal(availability(env, new Date(WEBINAR.endsAt)).checkoutEnabled, false);
});
test("receipt credentials and bank secrets are scoped and constant time", () => {
  const token = receiptToken("registration-one", "a-secret");
  assert.equal(token.length, 64);
  assert.notEqual(token, receiptToken("registration-two", "a-secret"));
  assert.notEqual(token, receiptToken("registration-one", "other-secret"));
  assert.equal(verifySecret("correct", "correct"), true);
  assert.equal(verifySecret("incorrect", "correct"), false);
  assert.equal(verifySecret(null, undefined), false);
});
const r: Registration = { id:"11111111-1111-4111-8111-111111111111",event_id:WEBINAR.id,name:"=Ana",email:"ana@example.com",phone:"+40 700",option:"join",amount_bani:0,status:"awaiting_membership",late_payment:false,created_at:"2026-10-05T10:00:00Z",paid_at:null,sheet_row:2 };
test("sheet output is limited to automated columns; membership fee is not recorded as a ticket", () => {
  const values = sheetValues(r, null);
  assert.equal(values.length, 9); assert.equal(values[2], "=Ana"); assert.equal(values[6],0);
});
test("membership acknowledgments explain the same-email external form and fixed window", () => {
  const email = message(r, "email-request-attendee", "secret", "https://www.aslm.ro");
  assert.match(email.text, /aceeași adresă/); assert.match(email.text,/membership\.aslm\.ro/); assert.match(email.text,/17 noiembrie/); assert.match(email.text,/separat/);
});
test("late payment email makes ASLM review explicit", () => {
  assert.match(message({ ...r, option:"ticket", status:"paid",late_payment:true,amount_bani:10000 }, "email-paid-attendee", "secret","https://www.aslm.ro").text,/după încheierea/);
});
test("tracker shows a verified failed checkout and keeps confirmed payment authoritative", () => {
  const ticket = { ...r, option: "ticket" as const, amount_bani: 10000, status: "pending" as const };
  assert.match(String(sheetValues(ticket, "order", "failed")[7]), /eșuată/);
  assert.equal(sheetValues({ ...ticket, status: "paid" }, "order", "failed")[7], "Plătit");
});
