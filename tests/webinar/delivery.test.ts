import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { runOutbox } from "../../lib/webinar/delivery";
import { SheetFixture, registrationArgs } from "./sheet-fixture";

test("SMTP failure stays in the Sheet queue and a later worker actually resends to a local SMTP sink", async () => {
  const sheet = new SheetFixture(), originalFetch = globalThis.fetch, previousEnv = { ...process.env };
  const accepted: { recipients: string[]; data: string }[] = [], sockets = new Set<net.Socket>();
  let rejectFirst = true;
  const server = net.createServer(socket => {
    sockets.add(socket); socket.on("close", () => sockets.delete(socket));
    socket.on("error", () => socket.destroy());
    socket.write("220 local-smtp.test ESMTP\r\n");
    let buffer = "", data = "", collecting = false, recipients: string[] = [];
    socket.on("data", chunk => {
      buffer += chunk.toString();
      while (buffer.includes("\r\n")) {
        const end = buffer.indexOf("\r\n"), line = buffer.slice(0, end); buffer = buffer.slice(end + 2);
        if (collecting) {
          if (line !== ".") { data += line + "\r\n"; continue; }
          collecting = false;
          if (rejectFirst) { rejectFirst = false; socket.write("554 temporary test rejection\r\n"); }
          else { accepted.push({ recipients: [...recipients], data }); socket.write("250 accepted by local sink\r\n"); }
          data = "";
        } else if (/^EHLO|^HELO/.test(line)) socket.write("250-local-smtp.test\r\n250-AUTH PLAIN\r\n250 SIZE 1000000\r\n");
        else if (line.startsWith("AUTH ")) socket.write("235 authenticated\r\n");
        else if (line.startsWith("MAIL FROM:")) { recipients = []; socket.write("250 sender accepted\r\n"); }
        else if (line.startsWith("RCPT TO:")) { recipients.push(line); socket.write("250 recipient accepted\r\n"); }
        else if (line === "DATA") { collecting = true; socket.write("354 send message\r\n"); }
        else if (line === "QUIT") socket.end("221 bye\r\n");
        else socket.write("250 OK\r\n");
      }
    });
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as net.AddressInfo;
  Object.assign(process.env, {
    WEBINAR_SHEET_SCRIPT_URL: "https://script.google.com/macros/s/WEBINARTEST/exec", WEBINAR_SHEET_ID: sheet.sheetId, WEBINAR_SHEET_SECRET: sheet.secret,
    WEBINAR_TOKEN_SECRET: "t".repeat(32), WEBINAR_SITE_URL: "https://www.aslm.ro",
    WEBINAR_SMTP_HOST: "127.0.0.1", WEBINAR_SMTP_PORT: String(address.port), WEBINAR_SMTP_SECURE: "false",
    WEBINAR_SMTP_USER: "local-sink", WEBINAR_SMTP_PASS: "test-password", WEBINAR_SMTP_FROM: "ASLM Tests <no-reply@aslm.test>",
  });
  globalThis.fetch = async (input, init) => {
    const req = new Request(input, init);
    assert.equal(new URL(req.url).hostname, "script.google.com");
    return Response.json(sheet.post(await req.text()));
  };
  try {
    sheet.rpc("webinar_register", registrationArgs());
    assert.deepEqual(await runOutbox(), { attempted: 2, delivered: 1 });
    const jobs = sheet.records<{ kind: string; status: string; attempts: number }>("_WebinarQueue");
    assert.equal(jobs.find(j => j.kind === "email-request-attendee")?.status, "pending");
    assert.equal(jobs.find(j => j.kind === "email-request-admin")?.status, "done");
    assert.match(accepted[0].recipients.join(), /contact@aslm.ro/);
    sheet.now += 61000;
    assert.deepEqual(await runOutbox(), { attempted: 1, delivered: 1 });
    assert.match(accepted[1].recipients.join(), /ana@example.com/);
    assert.equal(sheet.records<{ status: string }>("_WebinarQueue").every(j => j.status === "done"), true);
    assert.match(accepted[1].data.replace(/=\r\n/g, ""), /ASLM va verifica statutul de membru/);
    assert.match(accepted[1].data, /17 noiembrie/);
    const ids = accepted.map(mail => mail.data.match(/Message-ID:\s*(<[^>]+>)/i)?.[1]);
    assert.ok(ids[0] && ids[1]); assert.notEqual(ids[0], ids[1]);
    assert.deepEqual(await runOutbox(), { attempted: 0, delivered: 0 });
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of Object.keys(process.env)) if (!(key in previousEnv)) delete process.env[key];
    Object.assign(process.env, previousEnv);
    sockets.forEach(socket => socket.destroy());
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
});
