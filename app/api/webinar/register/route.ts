import { after } from "next/server";
import { registrationSchema } from "@/lib/webinar/model";
import { register } from "@/lib/webinar/service";
import { runOutbox } from "@/lib/webinar/delivery";
import { errorResponse, json, rateLimit, readBody } from "@/lib/webinar/http";
export const runtime = "nodejs";
export const maxDuration = 180;
export async function POST(request: Request) {
  try {
    const parsed = registrationSchema.safeParse(await readBody(request));
    if (!parsed.success) return json({ error: "Verificați datele completate.", fields: parsed.error.flatten().fieldErrors }, 400);
    await rateLimit(request, "register", parsed.data.email);
    const result = await register(parsed.data);
    after(async () => { try { await runOutbox(); } catch { console.error("Webinar delivery pending; cron will retry"); } });
    return json(result, 201);
  } catch (error) { return errorResponse(error); }
}
