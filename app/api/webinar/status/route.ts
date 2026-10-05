import { after } from "next/server";
import { receiptSchema } from "@/lib/webinar/model";
import { receipt } from "@/lib/webinar/service";
import { rpc } from "@/lib/webinar/store";
import { runOutbox } from "@/lib/webinar/delivery";
import { errorResponse, json, readBody } from "@/lib/webinar/http";
export const runtime = "nodejs";
export const maxDuration = 180;
export async function POST(request: Request) {
  try {
    const parsed = receiptSchema.safeParse(await readBody(request));
    if (!parsed.success) return json({ error: "Link de confirmare invalid." }, 400);
    const status = await receipt(parsed.data.id, parsed.data.token);
    if (status.orderReference && status.status === "pending") {
      // Recovery uses the server-owned reference, ignoring all bank-return query parameters.
      await rpc("webinar_enqueue_bank", { p_reference: status.orderReference, p_digest: `receipt-${status.orderReference}-${Math.floor(Date.now() / 60_000)}` });
      after(async () => { try { await runOutbox(); } catch { console.error("Webinar reconciliation pending"); } });
    }
    return json(status);
  } catch (error) { return errorResponse(error); }
}
