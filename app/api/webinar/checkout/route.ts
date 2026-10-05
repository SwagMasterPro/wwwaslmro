import { receiptSchema } from "@/lib/webinar/model";
import { checkout } from "@/lib/webinar/service";
import { errorResponse, json, rateLimit, readBody } from "@/lib/webinar/http";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const parsed = receiptSchema.safeParse(await readBody(request));
    if (!parsed.success) return json({ error: "Link de confirmare invalid." }, 400);
    await rateLimit(request, "checkout");
    return json(await checkout(parsed.data.id, parsed.data.token));
  } catch (error) { return errorResponse(error); }
}
