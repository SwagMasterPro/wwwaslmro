(function () {
  "use strict";

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

  function initialize() {
    var content = document.getElementById("aslm-webinar-content");
    var outcome = document.getElementById("aslm-webinar-outcome");
    if (!content || !outcome) return;
    var category = content.querySelector('[name="taxa-ped"]');
    var payment = content.querySelector("[data-webinar-payment]");
    var member = content.querySelector("[data-webinar-member]");
    function updateCategory() {
      var free = category.value === "Membru ASLM - Gratuit";
      payment.hidden = category.value !== "Nonmembru - 100 RON";
      member.hidden = !free;
      payment.querySelectorAll('input[type="radio"]').forEach(function (input) {
        var freeOption = input.value === "Fără plată";
        if (freeOption) input.closest(".wpcf7-list-item").hidden = true;
        if (free) input.checked = freeOption;
        else if (freeOption && input.checked) {
          input.checked = false;
          payment.querySelector('input[value="Card"]').checked = true;
        }
      });
    }
    category.addEventListener("change", updateCategory);
    content.addEventListener("reset", function () { window.setTimeout(updateCategory, 0); });
    updateCategory();
    document.addEventListener("wpcf7beforesubmit", function (event) {
      if (event.detail && Number(event.detail.contactFormId) === 2982 && content.contains(event.target)) outcome.replaceChildren();
    });
    document.addEventListener("wpcf7mailsent", function (event) {
      if (!event.detail || Number(event.detail.contactFormId) !== 2982 || !content.contains(event.target)) return;
      var response = event.detail.apiResponse;
      outcome.replaceChildren();
      if (!response || response.status !== "mail_sent") return;
      var url = paymentUrl(response.aslmPaymentUrl);
      if (response.aslmWebinarState === "card_ready" && url) {
        var link = document.createElement("a");
        link.href = url;
        link.className = "aslm-webinar-payment";
        link.textContent = "Continuă plata cu cardul";
        outcome.appendChild(link);
        link.focus();
      } else if (response.aslmWebinarState !== "member_pending" && response.aslmWebinarState !== "transfer_pending") {
        outcome.textContent = "Nu putem confirma înregistrarea cererii. Nu efectuați plata. Contactați contact@aslm.ro înainte de a retrimite formularul.";
      }
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize, { once: true });
  else initialize();
})();
