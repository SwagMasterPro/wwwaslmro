import { availability } from "@/lib/webinar/config";
import { json } from "@/lib/webinar/http";
export const dynamic = "force-dynamic";
export function GET() { return json(availability(process.env)); }
