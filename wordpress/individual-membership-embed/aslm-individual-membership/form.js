(function () {
  "use strict";

  var parentOrigin = "https://www.aslm.ro";

  function paymentUrl(value) {
    if (typeof value !== "string") return null;
    try {
      var url = new URL(value);
      if (url.origin !== "https://aslm.medscience.center" || url.pathname !== "/" || url.username || url.password || url.hash) return null;
      var keys = Array.from(url.searchParams.keys());
      if (keys.length !== 1 || keys[0] !== "id" || !/^[a-f0-9]{32}$/.test(url.searchParams.get("id"))) return null;
      return url.href;
    } catch {
      return null;
    }
  }

  function isMeasureRequest(event, parentWindow) {
    return parentWindow !== window && event.source === parentWindow && event.origin === parentOrigin && event.data !== null && typeof event.data === "object" && !Array.isArray(event.data) && event.data.type === "aslm:membership-form:measure";
  }

  function improveLabels(content) {
    var seen = new Set();
    var serial = 0;
    content.querySelectorAll("[id]").forEach(function (element) {
      if (seen.has(element.id)) element.id = "aslm-membership-duplicate-" + (++serial);
      seen.add(element.id);
    });
    content.querySelectorAll("input:not([type=hidden]):not([type=submit]):not([type=button]), select, textarea").forEach(function (field) {
      if (field.name === "nume_firma" || field.name === "cif") {
        var billingRow = field.closest("tr");
        if (billingRow) billingRow.style.removeProperty("display");
      }
      if (!field.id) field.id = "aslm-membership-field-" + (++serial);
      var wrappingLabel = field.closest("label");
      if (wrappingLabel) {
        wrappingLabel.htmlFor = field.id;
        return;
      }
      if (field.name === "acceptance-64") {
        var control = field.closest(".wpcf7-form-control-wrap");
        var consentText = control && control.nextElementSibling;
        if (consentText && consentText.textContent.trim()) {
          if (!consentText.id) consentText.id = "aslm-membership-label-" + (++serial);
          field.setAttribute("aria-labelledby", consentText.id);
          return;
        }
      }
      var option = field.closest(".wpcf7-list-item");
      var optionLabel = option && option.querySelector(".wpcf7-list-item-label");
      if (optionLabel) {
        if (!optionLabel.id) optionLabel.id = "aslm-membership-label-" + (++serial);
        field.setAttribute("aria-labelledby", optionLabel.id);
        return;
      }
      if (field.labels && field.labels.length) return;
      var row = field.closest("tr");
      var labelCell = row && Array.from(row.children).find(function (cell) {
        return !cell.contains(field) && !cell.querySelector("input,select,textarea") && cell.textContent.trim();
      });
      if (labelCell) {
        if (!labelCell.id) labelCell.id = "aslm-membership-label-" + (++serial);
        field.setAttribute("aria-labelledby", labelCell.id);
      }
    });
  }

  function initialize() {
    var content = document.getElementById("aslm-membership-content");
    var outcome = document.getElementById("aslm-membership-outcome");
    if (!content || !outcome) return;
    improveLabels(content);
    var pendingFrame = null;
    var observer = null;

    function measure() {
      pendingFrame = null;
      if (window.parent === window) return;
      var height = Math.max(200, Math.ceil(content.getBoundingClientRect().height + content.offsetTop));
      window.parent.postMessage({ type: "aslm:membership-form:resize", height: height }, parentOrigin);
    }

    function queueMeasure() {
      if (pendingFrame === null) pendingFrame = window.requestAnimationFrame(measure);
    }

    function onMessage(event) {
      if (isMeasureRequest(event, window.parent)) queueMeasure();
    }

    function onSent(event) {
      if (!event.detail || Number(event.detail.contactFormId) !== 149 || !content.contains(event.target)) return;
      var response = event.detail.apiResponse;
      outcome.replaceChildren();
      if (!response || response.status !== "mail_sent") return;
      var url = paymentUrl(response.aslmPaymentUrl);
      if (response.aslmMembershipState === "card_ready" && url) {
        var link = document.createElement("a");
        link.href = url;
        link.target = "_top";
        link.className = "aslm-membership-payment";
        link.textContent = "Continuă plata cu cardul";
        outcome.appendChild(link);
        window.requestAnimationFrame(function () {
          if (link.isConnected) link.focus();
        });
      } else if (response.aslmMembershipState !== "transfer_accepted") {
        response.status = "aborted";
        response.message = "Nu putem confirma înregistrarea cererii. Nu efectuați plata. Contactați contact@aslm.ro înainte de a retrimite formularul.";
        outcome.textContent = response.message;
      }
      queueMeasure();
    }

    function onBeforeSubmit(event) {
      if (event.detail && Number(event.detail.contactFormId) === 149 && content.contains(event.target)) outcome.replaceChildren();
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("resize", queueMeasure);
    window.addEventListener("load", queueMeasure);
    document.addEventListener("wpcf7mailsent", onSent);
    document.addEventListener("wpcf7beforesubmit", onBeforeSubmit);
    document.addEventListener("wpcf7submit", queueMeasure);
    if (typeof ResizeObserver === "function") {
      observer = new ResizeObserver(queueMeasure);
      observer.observe(content);
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(queueMeasure);
    queueMeasure();
    window.addEventListener("pagehide", function cleanup(event) {
      if (event.persisted) return;
      if (observer) observer.disconnect();
      if (pendingFrame !== null) window.cancelAnimationFrame(pendingFrame);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("resize", queueMeasure);
      window.removeEventListener("load", queueMeasure);
      document.removeEventListener("wpcf7mailsent", onSent);
      document.removeEventListener("wpcf7beforesubmit", onBeforeSubmit);
      document.removeEventListener("wpcf7submit", queueMeasure);
      window.removeEventListener("pagehide", cleanup);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
