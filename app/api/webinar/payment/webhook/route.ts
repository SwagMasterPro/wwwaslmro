import { after } from "next/server";
import { notificationReference, verifyNotificationSecret } from "@/lib/webinar/gateway";
import { digest } from "@/lib/webinar/model";
import { rpc } from "@/lib/webinar/store";
import { runOutbox } from "@/lib/webinar/delivery";
import { errorResponse, json, readBody } from "@/lib/webinar/http";
export const runtime = "nodejs";
export const maxDuration = 180;
export async function POST(request: Request) {
  if (!verifyNotificationSecret(request.headers.get("x-notification-secret"), process.env.UNICREDIT_WEBHOOK_SECRET)) return json({ error: "Invalid notification secret" }, 401);
  try {
    const payload = await readBody(request, false), reference = notificationReference(payload);
    if (!reference) return json({ ignored: true });
    await rpc("webinar_enqueue_bank", { p_reference: reference, p_digest: digest(JSON.stringify(payload)) });
    after(async () => { try { await runOutbox(); } catch { console.error("Webinar bank notification pending"); } });
    return json({ received: true });
  } catch (error) { return errorResponse(error); }
}
