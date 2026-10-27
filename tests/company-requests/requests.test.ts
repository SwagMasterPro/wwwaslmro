import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import nodemailer from "nodemailer";
import { GET, POST } from "../../app/api/company-requests/route";
import { companyConfirmationMessage, companyRequestMessage, companyRequestSchema } from "../../lib/company-requests/model";
import { limitCompanyRequests } from "../../lib/company-requests/http";

const valid = {
  companyName: "Companie Test SRL", cui: "RO12345678", website: "exemplu.ro", locality: "București / București",
  activity: "Activitate educațională de test.", representativeName: "Ana Test", phone: "+40 721 123 456",
  email: "ana@example.com", packageId: "imm", billingCompanyName: "Facturare Separată SRL", billingCui: "RO87654321",
  privacyAcknowledged: true, submissionId: "12345678-1234-4234-8234-123456789abc", fax: "",
};
const request = (body: unknown, headers = {}) => new Request("https://www.aslm.ro/api/company-requests", {
  method: "POST", headers: { origin: "https://www.aslm.ro", "content-type": "application/json", "x-vercel-forwarded-for": crypto.randomUUID(), ...headers }, body: JSON.stringify(body),
});

test("all packages retain server prices and all separate company/billing fields", () => {
  for (const [packageId, fee] of [["imm", "1500 RON"], ["corporate", "3000 RON"], ["media", "Gratuit"]]) {
    const parsed = companyRequestSchema.parse({ ...valid, packageId });
    const message = companyRequestMessage(parsed);
    assert.match(message.text, new RegExp(fee));
    assert.match(message.text, /Facturare Separată SRL/);
    assert.match(message.text, /RO87654321/);
    assert.match(message.text, /Companie Test SRL/);
    assert.match(message.text, /https:\/\/exemplu.ro/);
    for (const key of ["cui", "activity", "locality", "representativeName", "phone", "email", "submissionId"] as const) assert.ok(message.text.includes(valid[key]));
    if (packageId === "media") assert.match(message.text, /nu solicitați plata/);
    else assert.match(message.text, /Nu a fost efectuată o plată online/);
    const confirmation = companyConfirmationMessage(parsed);
    assert.match(confirmation.text, new RegExp(fee));
    assert.ok(confirmation.text.includes(valid.submissionId));
    assert.match(confirmation.text, /nu activarea parteneriatului/);
    assert.ok(!confirmation.text.includes(valid.activity));
    assert.ok(!confirmation.text.includes(valid.billingCui));
  }
});

test("rejects tampered fees, unknown packages, missing billing, honeypot and header injection", () => {
  for (const change of [{ annualFeeRon: 0 }, { packageId: "titulari" }, { billingCui: "" }, { fax: "spam" }, { email: "test@example.com\r\nBcc: other@example.com" }, { companyName: "Test\nFake field" }, { privacyAcknowledged: false }, { website: "javascript:alert(1)" }]) {
    assert.equal(companyRequestSchema.safeParse({ ...valid, ...change }).success, false);
  }
  assert.equal(companyRequestSchema.safeParse({ ...valid, website: "" }).success, true);
});

test("origin, content type and streamed body limits are enforced; disabled form never accepts requests", async () => {
  const previous = process.env.COMPANY_REQUESTS_ENABLED;
  delete process.env.COMPANY_REQUESTS_ENABLED;
  try {
    assert.deepEqual(await GET().json(), { available: false });
    assert.equal((await POST(request(valid))).status, 503);
    assert.equal((await POST(request(valid, { origin: "https://other.example" }))).status, 403);
    assert.equal((await POST(request(valid, { "content-type": "text/plain" }))).status, 415);
    assert.equal((await POST(request({ text: "a".repeat(16385) }))).status, 413);
    assert.equal((await POST(new Request("https://www.aslm.ro/api/company-requests", { method: "POST", headers: { origin: "https://www.aslm.ro", "content-type": "application/json" }, body: "{" }))).status, 400);
  } finally {
    if (previous === undefined) delete process.env.COMPANY_REQUESTS_ENABLED; else process.env.COMPANY_REQUESTS_ENABLED = previous;
  }
});

test("warm-instance throttle rejects a sixth attempt from the same platform address", () => {
  const attempt = request(valid);
  for (let i = 0; i < 5; i++) limitCompanyRequests(attempt);
  assert.throws(() => limitCompanyRequests(attempt), /Prea multe/);
});

test("real SMTP rejection gives no success; every package sends separate ASLM and applicant messages", async t => {
  const accepted: { recipients: string[]; data: string }[] = [];
  const sockets = new Set<net.Socket>();
  let reject = true;
  const server = net.createServer(socket => {
    sockets.add(socket); socket.on("close", () => sockets.delete(socket)); socket.on("error", () => socket.destroy());
    socket.write("220 local.test ESMTP\r\n");
    let buffer = "", data = "", collecting = false, recipients: string[] = [];
    socket.on("data", chunk => {
      buffer += chunk.toString();
      while (buffer.includes("\r\n")) {
        const end = buffer.indexOf("\r\n"), line = buffer.slice(0, end); buffer = buffer.slice(end + 2);
        if (collecting) {
          if (line !== ".") { data += line + "\r\n"; continue; }
          collecting = false;
          if (reject) { reject = false; socket.write("554 test rejection\r\n"); }
          else { accepted.push({ recipients: [...recipients], data }); socket.write("250 queued\r\n"); }
          data = "";
        } else if (/^EHLO|^HELO/.test(line)) socket.write("250 local.test\r\n");
        else if (line.startsWith("MAIL FROM:")) { recipients = []; socket.write("250 sender accepted\r\n"); }
        else if (line.startsWith("RCPT TO:")) { recipients.push(line); socket.write("250 recipient accepted\r\n"); }
        else if (line === "DATA") { collecting = true; socket.write("354 send message\r\n"); }
        else if (line === "QUIT") socket.end("221 bye\r\n");
        else socket.write("250 OK\r\n");
      }
    });
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const previous = { ...process.env }, originalCreate = nodemailer.createTransport;
  Object.assign(process.env, { COMPANY_REQUESTS_ENABLED: "true", COMPANY_SMTP_HOST: "smtp.aslm.test", COMPANY_SMTP_PORT: "587", COMPANY_SMTP_USER: "test", COMPANY_SMTP_PASS: "test", COMPANY_SMTP_FROM: "ASLM <test@aslm.test>" });
  t.mock.method(nodemailer, "createTransport", (options: { requireTLS: boolean; secure: boolean; port: number }) => {
    assert.equal(options.requireTLS, true); assert.equal(options.port, 587); assert.equal(options.secure, false);
    return originalCreate({ host: "127.0.0.1", port: (server.address() as net.AddressInfo).port, secure: false, ignoreTLS: true });
  });
  try {
    assert.deepEqual(await GET().json(), { available: true });
    assert.equal((await POST(request({ ...valid, annualFeeRon: 1 }))).status, 400);
    const failed = await POST(request(valid));
    assert.equal(failed.status, 503); assert.equal((await failed.json()).reference, undefined);
    for (const packageId of ["imm", "corporate", "media"]) {
      const result = await POST(request({ ...valid, packageId }));
      assert.equal(result.status, 200); assert.deepEqual(await result.json(), { reference: valid.submissionId, confirmationSent: true });
      assert.equal(result.headers.get("cache-control"), "no-store");
    }
    assert.equal(accepted.length, 6);
    for (const [index, mail] of accepted.entries()) {
      const admin = index % 2 === 0;
      assert.deepEqual(mail.recipients, [admin ? "RCPT TO:<contact@aslm.ro>" : "RCPT TO:<ana@example.com>"]);
      assert.match(mail.data, admin ? /Reply-To: ana@example.com/ : /Reply-To: contact@aslm.ro/);
      assert.match(mail.data, admin ? /Message-ID:\s+<company-12345678-1234-4234-8234-123456789abc@aslm.ro>/ : /Message-ID:\s+<company-confirmation-12345678-1234-4234-8234-123456789abc@aslm.ro>/);
    }
  } finally {
    t.mock.restoreAll();
    for (const key of Object.keys(process.env)) if (!(key in previous)) delete process.env[key];
    Object.assign(process.env, previous);
    sockets.forEach(socket => socket.destroy());
    await new Promise<void>(resolve => server.close(() => resolve()));
  }
});

test("confirmation failure preserves the accepted application without retrying or claiming confirmation", async t => {
  const previous = { ...process.env };
  Object.assign(process.env, { COMPANY_REQUESTS_ENABLED: "true", COMPANY_SMTP_HOST: "smtp.aslm.test", COMPANY_SMTP_PORT: "465", COMPANY_SMTP_USER: "test", COMPANY_SMTP_PASS: "test", COMPANY_SMTP_FROM: "ASLM <test@aslm.test>" });
  const recipients: string[] = [];
  let mode = "throw", closed = 0;
  t.mock.method(nodemailer, "createTransport", () => ({
    sendMail: async (mail: { to: string }) => {
      recipients.push(mail.to);
      if (mail.to === "contact@aslm.ro") return { accepted: [mail.to] };
      if (mode === "throw") throw new Error("Confirmation rejected");
      return { accepted: [], rejected: [mail.to] };
    },
    close: () => { closed++; },
  }));
  try {
    for (mode of ["throw", "rejected"]) {
      const response = await POST(request(valid));
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { reference: valid.submissionId, confirmationSent: false });
    }
    assert.deepEqual(recipients, ["contact@aslm.ro", valid.email, "contact@aslm.ro", valid.email]);
    assert.equal(closed, 2);
  } finally {
    t.mock.restoreAll();
    for (const key of Object.keys(process.env)) if (!(key in previous)) delete process.env[key];
    Object.assign(process.env, previous);
  }
});
