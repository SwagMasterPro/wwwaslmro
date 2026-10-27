import { getMembershipJoinUrl } from "./analytics";

const membershipOrigin = "https://membership.aslm.ro";

export type MembershipResizeMessage = {
  type: "aslm:membership-form:resize";
  height: number;
};

export type MembershipFormConfig =
  | { mode: "legacy" }
  | { mode: "external"; url: string }
  | { mode: "embedded"; url: string };

export function resolveMembershipFormConfig(
  configuredUrl: string | undefined,
  embedEnabled: string | undefined,
): MembershipFormConfig {
  const flag = embedEnabled?.trim();
  if (flag && flag !== "true" && flag !== "false") {
    throw new Error("MEMBERSHIP_FORM_EMBED_ENABLED must be unset, false, or true.");
  }

  const url = resolveMembershipFormUrl(configuredUrl);
  if (!url) {
    if (flag === "true") throw new Error("MEMBERSHIP_FORM_EMBED_ENABLED=true requires MEMBERSHIP_FORM_URL.");
    return { mode: "legacy" };
  }
  return { mode: flag === "true" ? "embedded" : "external", url };
}

export function resolveMembershipFormUrl(configuredUrl: string | undefined): string | null {
  if (!configuredUrl?.trim()) return null;

  const configurationError = "MEMBERSHIP_FORM_URL must be an HTTPS URL on https://membership.aslm.ro with a dedicated non-root path and no credentials.";
  let url: URL;
  try {
    url = new URL(configuredUrl.trim());
  } catch {
    throw new Error(configurationError);
  }

  if (url.origin !== membershipOrigin || url.username || url.password || !url.pathname.replaceAll("/", "")) {
    throw new Error(configurationError);
  }

  const attribution = new URL(getMembershipJoinUrl("membership_registration")).searchParams;
  attribution.forEach((value, key) => url.searchParams.set(key, value));
  return url.toString();
}

export function getMembershipResizeHeight(
  event: Pick<MessageEvent<unknown>, "origin" | "source" | "data">,
  iframeWindow: Window | null,
): number | null {
  if (!iframeWindow || event.origin !== membershipOrigin || event.source !== iframeWindow) return null;
  if (typeof event.data !== "object" || event.data === null || Array.isArray(event.data)) return null;

  const message = event.data as Partial<MembershipResizeMessage>;
  if (
    message.type !== "aslm:membership-form:resize" ||
    typeof message.height !== "number" ||
    !Number.isFinite(message.height) ||
    message.height < 200 ||
    message.height > 10000
  ) return null;

  return Math.ceil(message.height);
}
