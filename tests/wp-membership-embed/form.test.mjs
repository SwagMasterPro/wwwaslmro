import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../../wordpress/individual-membership-embed/aslm-individual-membership/form.js", import.meta.url), "utf8");

function surface({ ids = [], fields = [] } = {}) {
  function events() {
    const handlers = new Map();
    return {
      addEventListener(name, handler) { if (!handlers.has(name)) handlers.set(name, new Set()); handlers.get(name).add(handler); },
      removeEventListener(name, handler) { handlers.get(name)?.delete(handler); },
      emit(name, event = {}) { for (const handler of [...(handlers.get(name) || [])]) handler(event); },
      count(name) { return handlers.get(name)?.size || 0; },
    };
  }
  const document = events();
  const window = events();
  const sent = [];
  const frames = new Map();
  let frameNumber = 0;
  let height = 900;
  const content = { offsetTop: 0, querySelectorAll: selector => selector === "[id]" ? ids : fields, contains: target => target === form, getBoundingClientRect: () => ({ height }) };
  const form = {};
  const outcome = { children: [], textContent: "", replaceChildren() { this.children.forEach(child => { child.isConnected = false; }); this.children = []; this.textContent = ""; }, appendChild(child) { child.isConnected = true; this.children.push(child); } };
  document.readyState = "complete";
  document.getElementById = id => id === "aslm-membership-content" ? content : id === "aslm-membership-outcome" ? outcome : null;
  document.createElement = tag => ({ tag, isConnected: false, focus() { this.focused = true; document.activeElement = this; } });
  window.parent = { postMessage: (data, origin) => sent.push({ data: JSON.parse(JSON.stringify(data)), origin }) };
  window.requestAnimationFrame = callback => { frames.set(++frameNumber, callback); return frameNumber; };
  window.cancelAnimationFrame = id => frames.delete(id);
  let observer;
  class ResizeObserver {
    constructor(callback) {
      observer = { callback, observe(target) { this.target = target; }, disconnect() { this.disconnected = true; } };
      return observer;
    }
  }
  vm.runInNewContext(source, { window, document, ResizeObserver, URL, Set, Array, Number, Math });
  return {
    window, document, content, form, outcome, sent,
    get observer() { return observer; },
    resize(nextHeight) { height = nextHeight; observer.callback(); },
    flush() { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()); },
    success(response, overrides = {}) { document.emit("wpcf7mailsent", { target: form, detail: { contactFormId: 149, apiResponse: response, ...overrides } }); },
  };
}

test("resize measures the content wrapper and supports shrinking", () => {
  const ui = surface();
  ui.flush();
  assert.deepEqual(ui.sent, [{ data: { type: "aslm:membership-form:resize", height: 900 }, origin: "https://www.aslm.ro" }]);
  assert.equal(ui.observer.target, ui.content);
  ui.resize(350.2);
  ui.flush();
  assert.deepEqual(ui.sent[1], { data: { type: "aslm:membership-form:resize", height: 351 }, origin: "https://www.aslm.ro" });
});

test("measure requests require the exact parent window, origin and type", () => {
  const ui = surface();
  ui.flush();
  const trusted = { source: ui.window.parent, origin: "https://www.aslm.ro", data: { type: "aslm:membership-form:measure" } };
  for (const event of [
    { ...trusted, source: {} }, { ...trusted, source: null },
    { ...trusted, origin: "https://aslm.ro" }, { ...trusted, origin: "https://www.aslm.ro.evil.test" },
    { ...trusted, data: null }, { ...trusted, data: [] }, { ...trusted, data: { type: "navigate" } },
  ]) ui.window.emit("message", event);
  ui.flush();
  assert.equal(ui.sent.length, 1);
  ui.window.emit("message", trusted);
  ui.flush();
  assert.equal(ui.sent.length, 2);
  assert.equal(ui.sent[1].data.height, 900);
});

test("confirmed card response creates only an explicit top-window payment link", () => {
  const ui = surface();
  const url = "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef";
  ui.success({ status: "mail_sent", aslmMembershipState: "card_ready", aslmPaymentUrl: url });
  assert.equal(ui.outcome.children.length, 1);
  assert.equal(ui.outcome.children[0].href, url);
  assert.equal(ui.outcome.children[0].target, "_top");
  assert.equal(ui.outcome.children[0].textContent, "Continuă plata cu cardul");
  const cf7Response = { role: "screen-reader-response" };
  ui.document.activeElement = cf7Response;
  ui.flush();
  assert.equal(ui.outcome.children[0].focused, true);
  assert.equal(ui.document.activeElement, ui.outcome.children[0]);
  assert.equal(ui.window.location, undefined);
});

test("unsafe or missing payment responses never retain an accepted confirmation", () => {
  const ui = surface();
  const good = "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef";
  ui.success({ status: "mail_sent", aslmMembershipState: "card_ready", aslmPaymentUrl: good });
  assert.equal(ui.outcome.children.length, 1);
  for (const url of [undefined, "javascript:alert(1)", good.replace("https:", "http:"), good.replace(".center/", ".center.evil.test/"), good + "&other=1", good + "&id=0123456789abcdef0123456789abcdef", good + "#section", good.replace("/?", "/checkout?"), good.replace("https://", "https://user@"), "https://aslm.medscience.center/?id=short"]) {
    const response = { status: "mail_sent", aslmMembershipState: "card_ready", aslmPaymentUrl: url };
    ui.success(response);
    assert.equal(ui.outcome.children.length, 0);
    assert.equal(response.status, "aborted");
    assert.match(ui.outcome.textContent, /Nu efectuați plata/);
  }
  const incomplete = { status: "mail_sent" };
  ui.success(incomplete);
  assert.equal(incomplete.status, "aborted");
});

test("transfer confirmation stays in the form and other forms cannot add a payment link", () => {
  const ui = surface();
  const transfer = { status: "mail_sent", aslmMembershipState: "transfer_accepted" };
  ui.success(transfer);
  assert.equal(transfer.status, "mail_sent");
  assert.equal(ui.outcome.children.length, 0);
  assert.equal(ui.window.location, undefined);
  ui.success({ status: "mail_sent", aslmMembershipState: "card_ready", aslmPaymentUrl: "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef" }, { contactFormId: 150 });
  assert.equal(ui.outcome.children.length, 0);
  ui.success({ status: "mail_sent", aslmMembershipState: "card_ready", aslmPaymentUrl: "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef" });
  assert.equal(ui.outcome.children.length, 1);
  ui.document.emit("wpcf7beforesubmit", { target: ui.form, detail: { contactFormId: 149 } });
  assert.equal(ui.outcome.children.length, 0);
  const responseFocus = { role: "screen-reader-response" };
  ui.document.activeElement = responseFocus;
  ui.flush();
  assert.equal(ui.document.activeElement, responseFocus);
});

test("page cleanup removes listeners and observer while bfcache preserves them", () => {
  const ui = surface();
  ui.window.emit("pagehide", { persisted: true });
  assert.equal(ui.window.count("message"), 1);
  ui.window.emit("pagehide", { persisted: false });
  assert.equal(ui.window.count("message"), 0);
  assert.equal(ui.document.count("wpcf7mailsent"), 0);
  assert.equal(ui.observer.disconnected, true);
  ui.flush();
  assert.equal(ui.sent.length, 0);
});

test("duplicate ids are repaired and source labels are associated without changing field names", () => {
  const table = { id: "existing-table" };
  const secondTable = { id: "existing-table" };
  const wrappedLabel = {};
  const wrapped = { id: "", name: "Nume", closest: tag => tag === "label" ? wrappedLabel : null };
  const labelCell = { id: "", textContent: "Loc de muncă", contains: () => false, querySelector: () => null };
  const labelled = { id: "", name: "Loc_Munca", labels: [], attributes: {}, closest: tag => tag === "tr" ? { children: [labelCell] } : null, setAttribute(name, value) { this.attributes[name] = value; } };
  const optionLabel = { id: "", textContent: "Card" };
  const radio = { id: "", name: "tip-plata", attributes: {}, closest: tag => tag === ".wpcf7-list-item" ? { querySelector: () => optionLabel } : null, setAttribute(name, value) { this.attributes[name] = value; } };
  surface({ ids: [table, secondTable], fields: [wrapped, labelled, radio] });
  assert.equal(table.id, "existing-table");
  assert.notEqual(secondTable.id, table.id);
  assert.equal(wrappedLabel.htmlFor, wrapped.id);
  assert.equal(labelled.attributes["aria-labelledby"], labelCell.id);
  assert.equal(radio.attributes["aria-labelledby"], optionLabel.id);
  assert.deepEqual([wrapped.name, labelled.name, radio.name], ["Nume", "Loc_Munca", "tip-plata"]);
  assert.equal(labelCell.textContent, "Loc de muncă");
});

test("consent uses the adjacent existing agreement text as its accessible name", () => {
  const consentText = { id: "", textContent: "Confirmați că sunteți de acord cu Termenii și condițiile" };
  const acceptance = {
    id: "acceptance-64", name: "acceptance-64", attributes: {},
    closest: selector => selector === ".wpcf7-form-control-wrap" ? { nextElementSibling: consentText } : null,
    setAttribute(name, value) { this.attributes[name] = value; },
  };
  surface({ ids: [acceptance], fields: [acceptance] });
  assert.equal(acceptance.attributes["aria-labelledby"], consentText.id);
  assert.match(consentText.id, /^aslm-membership-label-/);
  assert.equal(consentText.textContent, "Confirmați că sunteți de acord cu Termenii și condițiile");
  assert.equal(acceptance.name, "acceptance-64");
});

test("only the two existing optional billing rows become visible and retain their labels", () => {
  const rows = [];
  const fields = ["nume_firma", "cif", "unrelated"].map((name, index) => {
    const label = { id: "", textContent: ["NUME FIRMĂ/CMI", "CUI/CIF", "Other"][index], contains: () => false, querySelector: () => null };
    const row = { style: { display: "none", removeProperty(property) { delete this[property]; } }, children: [label] };
    rows.push(row);
    return { id: "", name, labels: [], attributes: {}, closest: selector => selector === "tr" ? row : null, setAttribute(key, value) { this.attributes[key] = value; } };
  });
  surface({ fields });
  assert.equal(rows[0].style.display, undefined);
  assert.equal(rows[1].style.display, undefined);
  assert.equal(rows[2].style.display, "none");
  assert.equal(fields[0].attributes["aria-labelledby"], rows[0].children[0].id);
  assert.equal(fields[1].attributes["aria-labelledby"], rows[1].children[0].id);
  assert.deepEqual(fields.map(field => field.name), ["nume_firma", "cif", "unrelated"]);
  assert.deepEqual(rows.slice(0, 2).map(row => row.children[0].textContent), ["NUME FIRMĂ/CMI", "CUI/CIF"]);
});
