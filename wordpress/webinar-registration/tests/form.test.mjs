import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../aslm-webinar-registration/form.js", import.meta.url), "utf8");

function mount() {
  const handlers = new Map();
  const category = { value: "", addEventListener(name, handler) { handlers.set(`category:${name}`, handler); } };
  const radios = ["Card", "Transfer bancar", "Fără plată"].map((value, index) => ({
    value,
    checked: index === 0,
    wrapper: { hidden: false },
    closest() { return this.wrapper; },
  }));
  const payment = {
    hidden: true,
    querySelectorAll() { return radios; },
    querySelector() { return radios[0]; },
  };
  const member = { hidden: true };
  const outcome = {
    textContent: "",
    children: [],
    replaceChildren() { this.children = []; this.textContent = ""; },
    appendChild(element) { this.children.push(element); },
  };
  const form = {};
  const content = {
    querySelector(selector) {
      return { '[name="taxa-ped"]': category, "[data-webinar-payment]": payment, "[data-webinar-member]": member }[selector];
    },
    addEventListener(name, handler) { handlers.set(`content:${name}`, handler); },
    contains(element) { return element === form; },
  };
  const document = {
    readyState: "complete",
    getElementById(id) { return id === "aslm-webinar-content" ? content : outcome; },
    addEventListener(name, handler) { handlers.set(name, handler); },
    createElement(tag) { return { tag, focused: false, focus() { this.focused = true; } }; },
  };
  vm.runInNewContext(source, { document, URL, window: { setTimeout(handler) { handler(); } } });
  return {
    category, payment, member, radios, outcome,
    select(value) { category.value = value; handlers.get("category:change")(); },
    sent(apiResponse, id = 2982) { handlers.get("wpcf7mailsent")({ target: form, detail: { contactFormId: id, apiResponse } }); },
  };
}

test("category selection shows paid controls only for nonmembers", () => {
  const page = mount();
  assert.equal(page.payment.hidden, true);
  page.select("Membru ASLM - Gratuit");
  assert.deepEqual([page.payment.hidden, page.member.hidden], [true, false]);
  assert.deepEqual(page.radios.map((radio) => radio.checked), [false, false, true]);
  assert.equal(page.radios[2].wrapper.hidden, true);
  page.select("Nonmembru - 100 RON");
  assert.deepEqual([page.payment.hidden, page.member.hidden], [false, true]);
  assert.deepEqual(page.radios.map((radio) => radio.checked), [true, false, false]);
  page.select("");
  assert.deepEqual([page.payment.hidden, page.member.hidden], [true, true]);
});

test("verified card response creates an accessible continuation and free response clears it", () => {
  const page = mount();
  const paymentUrl = "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef";
  page.sent({ status: "mail_sent", aslmWebinarState: "card_ready", aslmPaymentUrl: paymentUrl });
  assert.equal(page.outcome.children.length, 1);
  assert.equal(page.outcome.children[0].href, paymentUrl);
  assert.equal(page.outcome.children[0].textContent, "Continuă plata cu cardul");
  assert.equal(page.outcome.children[0].focused, true);
  page.sent({ status: "mail_sent", aslmWebinarState: "member_pending" });
  assert.deepEqual(page.outcome.children, []);
  assert.equal(page.outcome.textContent, "");
});

test("forged payment destinations show an error instead of a continuation", () => {
  for (const destination of [
    "https://evil.invalid/?id=0123456789abcdef0123456789abcdef",
    "https://aslm.medscience.center/other?id=0123456789abcdef0123456789abcdef",
    "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef&next=evil",
    "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef#unsafe",
    "javascript:alert(1)",
  ]) {
    const page = mount();
    page.sent({ status: "mail_sent", aslmWebinarState: "card_ready", aslmPaymentUrl: destination });
    assert.equal(page.outcome.children.length, 0);
    assert.match(page.outcome.textContent, /Nu efectuați plata/);
  }
});

test("other forms and failed submissions cannot expose a webinar payment link", () => {
  const page = mount();
  page.sent({ status: "mail_sent", aslmWebinarState: "card_ready", aslmPaymentUrl: "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef" }, 149);
  assert.equal(page.outcome.children.length, 0);
  page.sent({ status: "mail_sent", aslmWebinarState: "card_ready", aslmPaymentUrl: "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef" });
  assert.equal(page.outcome.children.length, 1);
  page.sent({ status: "aborted", aslmWebinarState: "card_ready", aslmPaymentUrl: "https://aslm.medscience.center/?id=0123456789abcdef0123456789abcdef" });
  assert.equal(page.outcome.children.length, 0);
});
