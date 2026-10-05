import { verifySecret } from "@/lib/webinar/model";
import { scheduleReconciliation } from "@/lib/webinar/service";
import { runOutbox } from "@/lib/webinar/delivery";
import { errorResponse, json } from "@/lib/webinar/http";
export const runtime = "nodejs";
export const maxDuration = 180;
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  if (!verifySecret(request.headers.get("authorization"), process.env.CRON_SECRET ? `Bearer ${process.env.CRON_SECRET}` : undefined)) return json({ error: "Unauthorized" }, 401);
  try { await scheduleReconciliation(); return json(await runOutbox()); } catch (error) { return errorResponse(error); }
}
