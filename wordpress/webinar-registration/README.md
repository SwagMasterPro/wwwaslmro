# Deploy the webinar registration adapter

This MU plugin changes only CF7 form 2982 and the public WordPress page 2980 at `/webinar/`. The saved page and CF7 properties remain intact. Removing the loader restores their original behavior.

## Install

1. Export page 2980 and all postmeta for form 2982 before deployment.
2. Upload the `aslm-webinar-registration` asset directory to `wp-content/mu-plugins/aslm-webinar-registration/`.
3. Upload `aslm-webinar-registration.php` to `wp-content/mu-plugins/` last.
4. Check the public page as a signed-out visitor. Both registration categories, all required fields, reCAPTCHA, and payment controls must render.
5. Verify the free member flow and the paid card and transfer flows using explicitly authorized technical registrations. No real payment is needed.

Remove or rename the loader to roll back. Keep the assets, saved CF7 records, and `aslm_webinar_2026_proforma_sequence` option. Do not reset the sequence during rollback or redeployment.

## Registration behavior

The server replaces browser-supplied amounts, payment links, request codes, dates, and invoice numbers. Nonmembers pay 100 RON. Members create a free request awaiting ASLM verification. Free requests have no proforma, payment link, or automatic viewing access.

CFDB must save every expected field before mail or payment continuation can succeed. Existing paid email templates, recipients, Bcc settings, bank details, and gateway remain unchanged. Free notification templates reuse those configured destinations and omit invoice and payment content.

The existing gateway stores proforma numbers as signed integers. Paid webinar requests use an atomic WordPress option counter starting at **202600001**. Each allocation also considers the maximum saved CFDB number in that range. Allocation failures and integer exhaustion stop submission. Failed validation or mail can leave gaps. No table or column is added. Membership form 149 keeps its existing numbering behavior.

The site rejects registration at **1 December 2026, 00:00 Europe/Bucharest**, Unix timestamp `1796076000`. This does not change the separate viewing platform's access policy.

## Verify

Run the PHP tests with PHP 7.4 or newer:

```sh
php wordpress/webinar-registration/tests/submission.test.php
node --test wordpress/webinar-registration/tests/form.test.mjs
```

The tests exercise amount tampering, free registration, proforma allocation, preserved paid templates, malformed input, the cutoff, persistence failures, category controls, payment destinations, and isolation from form 149. They use framework, database, and DOM doubles and send no email.

Check the actual page at desktop, 320 px, and 390 px. Use the keyboard through category selection, agreement, payment choice, submission, and card continuation. Check that free registration hides payment controls and preserves its manual verification message.

CF7's `mail_sent` status proves the primary notification was accepted by its mail call. This legacy CF7 version ignores failure of the secondary mail call. Verify attendee proforma and confirmation receipt separately in the receiving inbox. Browser success alone is not delivery proof.
