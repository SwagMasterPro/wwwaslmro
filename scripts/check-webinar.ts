import { existsSync } from "node:fs";
import { WEBINAR, availability } from "../lib/webinar/config";
import { rpc } from "../lib/webinar/store";

async function main() {
  if (existsSync(".env.local")) process.loadEnvFile(".env.local");
  const health = await rpc<{ eventId: string; endsAt: string; termsVersion: string; amountBani: number; currency: string; schemaVersion: number }>("webinar_health", {});
  if (health.eventId !== WEBINAR.id || Date.parse(health.endsAt) !== Date.parse(WEBINAR.endsAt) || health.amountBani !== WEBINAR.amountBani || health.currency !== WEBINAR.currency || health.termsVersion !== WEBINAR.termsVersion || health.schemaVersion !== 1) throw new Error("Deployed Sheet configuration does not match this website");
  console.log(JSON.stringify({ storage: "verified", ...health, ...availability(process.env) }, null, 2));
}
main().catch(() => { console.error("Webinar Sheet verification failed. Check deployment, secure configuration and matching event settings."); process.exitCode = 1; });
