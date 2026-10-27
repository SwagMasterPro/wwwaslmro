import "server-only";
import nodemailer from "nodemailer";
import { companyRequestMessage, type CompanyRequest } from "./model";

export function companyRequestsConfigured() {
  return process.env.COMPANY_REQUESTS_ENABLED === "true" &&
    ["COMPANY_SMTP_HOST", "COMPANY_SMTP_USER", "COMPANY_SMTP_PASS", "COMPANY_SMTP_FROM"].every(key => Boolean(process.env[key]?.trim())) &&
    ["465", "587"].includes(process.env.COMPANY_SMTP_PORT || "587");
}

export async function deliverCompanyRequest(request: CompanyRequest) {
  if (!companyRequestsConfigured()) throw new Error("Company requests unavailable");
  const port = Number(process.env.COMPANY_SMTP_PORT || "587");
  const transport = nodemailer.createTransport({
    host: process.env.COMPANY_SMTP_HOST, port, secure: port === 465, requireTLS: true,
    auth: { user: process.env.COMPANY_SMTP_USER, pass: process.env.COMPANY_SMTP_PASS },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: process.env.COMPANY_SMTP_FROM, to: "contact@aslm.ro", replyTo: request.email,
      ...companyRequestMessage(request), messageId: `<company-${request.submissionId}@aslm.ro>`,
    });
    if (!result.accepted.some(address => String(address).toLowerCase() === "contact@aslm.ro")) throw new Error("Recipient not accepted");
  } finally { transport.close(); }
}
