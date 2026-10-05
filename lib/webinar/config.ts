export const WEBINAR = {
  id: "aslm-webinar-2026-10",
  title: "Webinar ASLM",
  topic: "Medicina Stilului de Viață – Medicina Viitorului",
  startsAt: "2026-10-19T00:00:00+03:00",
  endsAt: "2026-11-18T00:00:00+02:00",
  displayDates: "19 octombrie – 17 noiembrie 2026",
  termsVersion: "webinar-2026-10-v2",
  membershipUrl: "https://membership.aslm.ro/",
} as const;

export type WebinarOption = "member";
export const OPTION_LABELS: Record<WebinarOption, string> = {
  member: "Membru ASLM existent",
};
export function registrationClosed(now: Date = new Date()): boolean {
  return now.getTime() >= Date.parse(WEBINAR.endsAt);
}

export function availability(env: Record<string, string | undefined>, now = new Date()) {
  const required = ["WEBINAR_SHEET_SCRIPT_URL", "WEBINAR_SHEET_SECRET", "WEBINAR_TOKEN_SECRET", "WEBINAR_SHEET_ID", "WEBINAR_SMTP_HOST", "WEBINAR_SMTP_USER", "WEBINAR_SMTP_PASS", "WEBINAR_SMTP_FROM", "CRON_SECRET"];
  const configured = required.every((key) => Boolean(env[key]?.trim())) && (env.WEBINAR_TOKEN_SECRET?.length ?? 0) >= 32 && (env.WEBINAR_SHEET_SECRET?.length ?? 0) >= 32;
  const closed = registrationClosed(now);
  const registrationEnabled = !closed && configured && env.WEBINAR_REGISTRATION_ENABLED === "true";
  return { registrationEnabled, closed };
}
