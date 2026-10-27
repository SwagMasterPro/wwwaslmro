import { companyRequestSchema } from "@/lib/company-requests/model";
import { companyRequestsConfigured, deliverCompanyRequest } from "@/lib/company-requests/delivery";
import { CompanyRequestError, json, limitCompanyRequests, readCompanyRequest, unavailableMessage } from "@/lib/company-requests/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

export function GET() { return json({ available: companyRequestsConfigured() }); }

export async function POST(request: Request) {
  try {
    const body = await readCompanyRequest(request);
    if (!companyRequestsConfigured()) return json({ error: unavailableMessage }, 503);
    limitCompanyRequests(request);
    const parsed = companyRequestSchema.safeParse(body);
    if (!parsed.success) {
      const fields = Object.fromEntries(parsed.error.issues.map(issue => [issue.path[0], issue.message]));
      return json({ error: "Verifică datele introduse.", fields }, 400);
    }
    const delivery = await deliverCompanyRequest(parsed.data);
    return json({ reference: parsed.data.submissionId, confirmationSent: delivery.confirmationSent });
  } catch (error) {
    if (error instanceof CompanyRequestError) return json({ error: error.message }, error.status);
    return json({ error: unavailableMessage }, 503);
  }
}
