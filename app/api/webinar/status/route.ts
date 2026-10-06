import { receiptSchema } from "@/lib/webinar/model";
import { receipt } from "@/lib/webinar/service";
import { errorResponse, json, readBody } from "@/lib/webinar/http";
export const runtime = "nodejs";
export const maxDuration = 180;
export async function POST(request: Request) {
  try {
    const parsed = receiptSchema.safeParse(await readBody(request));
    if (!parsed.success) return json({ error: "Link de confirmare invalid." }, 400);
    const status = await receipt(parsed.data.id, parsed.data.token);
    return json(status);
  } catch (error) { return errorResponse(error); }
}
