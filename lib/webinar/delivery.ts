import "server-only";
import nodemailer from "nodemailer";
import { randomUUID } from "node:crypto";
import { OPTION_LABELS, WEBINAR } from "./config";
import { rpc } from "./store";
import { digest, receiptUrl, type Registration } from "./model";
import { reconcileOrder } from "./service";
export { sheetValues } from "./sheets";

export type Job = { id: string; registration_id: string; kind: string; order_reference: string | null; generation: number; attempts: number; registration: Registration | null };

export function message(r: Registration, kind: string, secret: string, siteUrl: string) {
  const paid = kind.startsWith("email-paid"), admin = kind.endsWith("admin");
  const link = receiptUrl(r.id, secret, siteUrl);
  const status = r.review_required ? "Au fost identificate mai multe plăți pentru această înscriere. ASLM va analiza situația și vă va contacta." : r.late_payment ? "Plata a fost primită după încheierea webinarului. ASLM va analiza situația și vă va contacta." : paid ? "Plata de 100 RON este confirmată." : r.option === "member" ? "Solicitarea a fost primită. ASLM va verifica statutul de membru." : r.option === "join" ? "Solicitarea pentru webinar a fost primită. Completați formularul de membru și achitați cotizația categoriei folosind aceeași adresă de e-mail." : "Solicitarea a fost primită. Înscrierea se confirmă după plata biletului de 100 RON.";
  const subject = `${paid ? "Plată confirmată" : "Solicitare primită"} – Webinar ASLM${admin ? " – " + r.id : ""}`;
  const text = `${admin ? `Nume: ${r.name}\nE-mail: ${r.email}\nTelefon: ${r.phone || "—"}\nOpțiune: ${OPTION_LABELS[r.option]}\nID: ${r.id}\n\n` : `Bună ziua, ${r.name},\n\n`}${status}\n\nÎnregistrarea webinarului este disponibilă ${WEBINAR.displayDates}, până la 18 noiembrie, ora 00:00 (ora României). Înscrierile ulterioare datei de 19 octombrie beneficiază de perioada rămasă.\n\n${admin ? "Verificați calitatea de membru/plata și trimiteți contul de acces la platformă prin e-mail. Actualizați trackerul după trimitere." : "Echipa ASLM va trimite separat, prin e-mail, datele contului pentru platforma de vizionare."}\n\nConfirmare: ${link}${r.option === "join" ? `\nFormular de membru: ${WEBINAR.membershipUrl}` : ""}\n\nContact: contact@aslm.ro`;
  return { subject, text, admin };
}
async function sendEmail(r: Registration, job: Job) {
  const mail = message(r, job.kind, process.env.WEBINAR_TOKEN_SECRET!, process.env.WEBINAR_SITE_URL || "https://www.aslm.ro");
  const smtp = nodemailer.createTransport({ host: process.env.WEBINAR_SMTP_HOST, port: Number(process.env.WEBINAR_SMTP_PORT || "587"), secure: process.env.WEBINAR_SMTP_SECURE === "true", auth: { user: process.env.WEBINAR_SMTP_USER, pass: process.env.WEBINAR_SMTP_PASS }, connectionTimeout: 8_000, greetingTimeout: 8_000, socketTimeout: 10_000 });
  await smtp.sendMail({ from: process.env.WEBINAR_SMTP_FROM, to: mail.admin ? "contact@aslm.ro" : r.email, replyTo: "contact@aslm.ro", subject: mail.subject, text: mail.text, messageId: `<${digest(job.id)}@aslm.ro>` });
}

export async function runOutbox() {
  const lease = randomUUID(), startedAt = Date.now();
  let delivered = 0, attempted = 0;
  try {
    // Drain quick deliveries without pre-leasing a slow batch. Leave enough
    // function time for one bounded provider attempt and durable completion.
    while (Date.now() - startedAt < 45_000) {
      const jobs = await rpc<Job[]>("webinar_claim_jobs", { p_lease: lease, p_limit: 1 });
      if (!jobs.length) break;
      const job = jobs[0]; attempted++;
      let failure: string | null = null;
      try {
        if (job.kind === "bank") await reconcileOrder(job.order_reference!);
        else {
          if (!job.registration) throw new Error("Registration unavailable");
          await sendEmail(job.registration, job);
        }
        delivered++;
      } catch { failure = `${job.kind} delivery failed`; }
      await rpc("webinar_finish_job", { p_id: job.id, p_lease: lease, p_generation: job.generation, p_error: failure });
    }
  } finally { await rpc("webinar_release_worker", { p_lease: lease }); }
  return { attempted, delivered };
}
