import test from "node:test";
import assert from "node:assert/strict";
import { getMembershipResizeHeight, resolveMembershipFormConfig, resolveMembershipFormUrl } from "../../lib/membership-embed";

test("configuration activates the iframe only with an explicit true switch and keeps the URL on rollback", () => {
  const configuredUrl = "https://membership.aslm.ro/test-form/";
  const url = "https://membership.aslm.ro/test-form/?utm_source=aslm.ro&utm_medium=referral&utm_campaign=membership&utm_content=membership_registration";
  for (const flag of [undefined, "", " ", "false"]) {
    assert.deepEqual(resolveMembershipFormConfig(undefined, flag), { mode: "legacy" });
    assert.deepEqual(resolveMembershipFormConfig(configuredUrl, flag), { mode: "external", url });
  }
  assert.deepEqual(resolveMembershipFormConfig(configuredUrl, "true"), { mode: "embedded", url });
  assert.deepEqual(resolveMembershipFormConfig(configuredUrl, "false"), { mode: "external", url });
});

test("invalid activation settings fail instead of silently enabling or disabling the iframe", () => {
  for (const url of [undefined, "", " \n "]) {
    assert.throws(() => resolveMembershipFormConfig(url, "true"), /MEMBERSHIP_FORM_EMBED_ENABLED=true requires MEMBERSHIP_FORM_URL/);
  }
  for (const flag of ["TRUE", "1", "yes", "enabled"]) {
    assert.throws(() => resolveMembershipFormConfig("https://membership.aslm.ro/test-form/", flag), /MEMBERSHIP_FORM_EMBED_ENABLED must be unset, false, or true/);
  }
  assert.throws(() => resolveMembershipFormConfig("http://membership.aslm.ro/test-form/", "false"), /MEMBERSHIP_FORM_URL must be an HTTPS URL/);
});

test("membership embed stays disabled for missing or blank configuration", () => {
  for (const value of [undefined, "", " ", "\n\t"]) {
    assert.equal(resolveMembershipFormUrl(value), null);
  }
  assert.equal(
    resolveMembershipFormUrl("https://membership.aslm.ro/test-form/"),
    "https://membership.aslm.ro/test-form/?utm_source=aslm.ro&utm_medium=referral&utm_campaign=membership&utm_content=membership_registration",
  );
});

test("dedicated form URL retains configured parameters and replaces attribution", () => {
  assert.equal(
    resolveMembershipFormUrl(" https://membership.aslm.ro/test-form/?lang=ro&utm_source=old&utm_content=old&utm_content=duplicate#fields "),
    "https://membership.aslm.ro/test-form/?lang=ro&utm_source=aslm.ro&utm_content=membership_registration&utm_medium=referral&utm_campaign=membership#fields",
  );
});

test("nonblank invalid URLs fail with a configuration error", () => {
  for (const value of [
    "not a URL",
    "/test-form/",
    "http://membership.aslm.ro/test-form/",
    "https://www.aslm.ro/test-form/",
    "https://membership.aslm.ro.evil.example/test-form/",
    "https://membership.aslm.ro:8443/test-form/",
    "https://membership.aslm.ro",
    "https://membership.aslm.ro/?form=individual#form",
    "https://membership.aslm.ro///",
    "https://membership.aslm.ro/test-form/..",
    "https://user@membership.aslm.ro/test-form/",
    "https://user:password@membership.aslm.ro/test-form/",
    "javascript:alert(1)",
  ]) {
    assert.throws(() => resolveMembershipFormUrl(value), /MEMBERSHIP_FORM_URL must be an HTTPS URL.*dedicated non-root path and no credentials/);
  }
});

const iframeWindow = {} as Window;
const message = (data: unknown, overrides: Partial<Pick<MessageEvent<unknown>, "origin" | "source">> = {}) => ({
  origin: "https://membership.aslm.ro",
  source: iframeWindow,
  data,
  ...overrides,
});

test("trusted resize messages accept both limits and round fractional pixels up", () => {
  for (const [height, expected] of [[200, 200], [1200, 1200], [1200.1, 1201], [9999.9, 10000], [10000, 10000]]) {
    assert.equal(getMembershipResizeHeight(message({ type: "aslm:membership-form:resize", height }), iframeWindow), expected);
  }
});

test("resize messages require the exact origin and current nonnull iframe window", () => {
  const data = { type: "aslm:membership-form:resize", height: 800 };
  assert.equal(getMembershipResizeHeight(message(data), iframeWindow), 800);
  for (const origin of ["https://www.aslm.ro", "http://membership.aslm.ro", "https://membership.aslm.ro.evil.example", "null"]) {
    assert.equal(getMembershipResizeHeight(message(data, { origin }), iframeWindow), null);
  }
  assert.equal(getMembershipResizeHeight(message(data, { source: {} as Window }), iframeWindow), null);
  assert.equal(getMembershipResizeHeight(message(data, { source: null }), iframeWindow), null);
  assert.equal(getMembershipResizeHeight(message(data, { source: null }), null), null);
  assert.equal(getMembershipResizeHeight(message(data), null), null);
});

test("resize messages reject other commands, malformed data and unsafe heights", () => {
  assert.equal(getMembershipResizeHeight(message({ type: "aslm:membership-form:resize", height: 800 }), iframeWindow), 800);
  for (const data of [null, undefined, "resize", [], {}, { height: 800 }, { type: "navigate", height: 800, url: "https://example.com" }, { type: "aslm:membership-form:resize", html: "<script>" }]) {
    assert.equal(getMembershipResizeHeight(message(data), iframeWindow), null);
  }
  for (const height of [undefined, null, "800", true, NaN, Infinity, -Infinity, 0, -1, 199.9, 10000.1]) {
    assert.equal(getMembershipResizeHeight(message({ type: "aslm:membership-form:resize", height }), iframeWindow), null);
  }
});
