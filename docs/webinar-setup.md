# ASLM Webinar: Sheet-based registration and checkout

The Google Sheet is the only persistent data store. There is no cloud database, SQL migration or service-account key.

Tracker: [Webinar ASLM – înscrieri](https://docs.google.com/spreadsheets/d/1coMLPgIRzwjYT8Cwr3PkeltMbPpJQi7ivz5Q3cNclyg/edit).

## Current delivery

- Romanian `/webinar` page, desktop/mobile/English navigation, footer and Events promotion.
- Landing copy, five lecturers and all three graphics from Iulia Nistoroiu's 5 October 2026 email, “Landing page - webinar ASLM”.
- Free member requests, 100 RON one-time UniCredit ticket checkout, and saved new-member requests before the existing membership form (300/400 RON category fee).
- Visible `Înscrieri` table and five hidden operational tabs have been prepared in the private live Sheet. They contain headers only; no test attendee records were added.
- Next.js endpoints and the deployable Apps Script storage service are implemented. Neither the website changes nor the Apps Script service have been deployed.
- Registration and checkout flags default to false. Merchant/SMTP credentials are absent locally. The connected Vercel provider returned HTTP 403 when listing MSC environment variables. Apps Script deployment is not available through the connected tools; browser automation is unavailable.

## Deploy the Sheet service

Use the Sheet owner's Google account; never make the Sheet public. All Sheet editors are trusted operators. Hidden tabs are organizational, not an access-control boundary.

1. Open the tracker and choose **Extensions → Apps Script**.
2. Add `Store.gs` and `Code.gs` from `scripts/webinar-sheet/`. Their exact deployed code is executed by the local storage tests.
3. In Project Settings, enable **Show appsscript.json manifest file** and replace it with the supplied `appsscript.json`. This enables the Advanced Sheets v4 service, V8 and the Bucharest timezone. If using a custom Google Cloud project, enable its Google Sheets API.
4. Add these **Script Properties** securely:
   - `WEBINAR_SHEET_ID`: `1coMLPgIRzwjYT8Cwr3PkeltMbPpJQi7ivz5Q3cNclyg`
   - `WEBINAR_SHEET_SECRET`: a cryptographically random secret of at least 32 characters, also configured on the site
   - `WEBINAR_SITE_URL`: `https://www.aslm.ro`
   - `CRON_SECRET`: a separate random secret, also configured on the site
5. Run `setupWebinarStorage` once and authorize the requested scopes. It verifies the existing table and creates missing hidden tabs without resetting data.
6. Deploy a versioned **Web app**, executing as **Me**, accessible to **Anyone**. Only the script endpoint is accessible anonymously; every storage request requires a signed server HMAC, timestamp and matching Sheet ID. GET exposes no records. Copy its `https://script.google.com/macros/s/.../exec` URL into the site's `WEBINAR_SHEET_SCRIPT_URL`.
7. After the website endpoints are deployed, run `installWebinarReconciliation` once. The five-minute trigger calls the site's authenticated `/api/webinar/jobs` endpoint. It handles email retries and bank reconciliation even if the attendee never returns, including after registration closes. Keep this trigger running while any order/job is unresolved.
8. Monitor Apps Script executions and the hidden queue for failures. Owner quota/authorization loss makes registration fail closed. Enable Google failure notices for the trigger.

Do not create a second Apps Script project against the same production Sheet: ScriptLock serializes executions within one project. Use a separate copied Sheet and separate script for sandbox tests.

## Website configuration

Copy `.env.example` to local/provider environment settings and configure secrets there, never in Git, the Sheet cells or public variables.

- Storage: `WEBINAR_SHEET_SCRIPT_URL`, `WEBINAR_SHEET_SECRET`, `WEBINAR_SHEET_ID`.
- Receipt authentication: independent `WEBINAR_TOKEN_SECRET` (at least 32 random characters). Keep it stable; rotating it invalidates existing receipt links.
- Email: `WEBINAR_SMTP_HOST`, `WEBINAR_SMTP_PORT`, `WEBINAR_SMTP_SECURE`, `WEBINAR_SMTP_USER`, `WEBINAR_SMTP_PASS`, `WEBINAR_SMTP_FROM`. Use an authorized ASLM sender with working SPF/DKIM.
- Reconciliation: `CRON_SECRET`, identical in Script Properties.
- Merchant: existing approved MedScience `UNICREDIT_MERCHANT_ID`, `UNICREDIT_API_PASSWORD`, `UNICREDIT_WEBHOOK_SECRET`; gateway/version from `.env.example`. Do not use a recurring billing agreement for webinar purchases.
- Flags: `WEBINAR_REGISTRATION_ENABLED`, `WEBINAR_CHECKOUT_ENABLED`, `WEBINAR_CHECKOUT_QA_APPROVED` remain false until the corresponding live checks pass.

The 100 RON ticket price is defined on both trusted servers, never accepted from the browser. The Script health response reports the fixed event ID, price, currency, terms version and cutoff; verify it matches `lib/webinar/config.ts` before activation.

After securely configuring `.env.local`, run `npm run check:webinar` to verify the deployed Script schema, price and cutoff without creating records or printing secrets. It does not verify email or bank delivery.

## Consistency and retries

Every storage command verifies its HMAC before accessing Google data, acquires `LockService.getScriptLock()`, reads current state, and commits one atomic Sheets API `batchUpdate`.

Registration, the visible row and its two email jobs are saved together. Bank-confirmed payment, its visible status and payment email jobs are saved together. Google write failures cannot leave a partial committed batch. A browser retry uses a private submission key to recover its own saved registration after an unknown network result. A different submission with the same email receives a duplicate warning, never another attendee's receipt.

The operational tabs store JSON records by stable key:

| Tab | Records |
| --- | --- |
| `_WebinarRegistrations` | contact, option, consent version, receipt hash, payment status |
| `_WebinarOrders` | all checkout attempts, bank transaction IDs, session IDs, reconciliation times |
| `_WebinarQueue` | acknowledgment/payment email jobs and bank-readback jobs with retry/lease state |
| `_WebinarRateLimits` | HMAC hashes of rate-limit keys and counters; no raw IP |
| `_WebinarWorker` | global worker lease to prevent concurrent delivery attempts |

A committed write with a lost response is recovered by stable record IDs; retries do not append duplicate attendees or email jobs. Each attendee has at most one active checkout. Failed/cancelled bank orders can retry; ambiguous bank timeouts retain the reservation until bank readback resolves it. Callback replays are deduplicated.

Email delivery is **at least once**: SMTP acceptance followed by a lost completion write can resend an email. Stable Message-ID headers aid provider deduplication but cannot guarantee it. No email is silently marked sent on failure. Jobs back off up to one hour and recover expired worker leases.

ASLM manages **J:L only**: membership verification, account-sent date and notes. Automated updates find rows by registration ID and write **A:I only**, preserving J:L. Filter the native table normally. Avoid editing, deleting or directly sorting automated rows while the service writes; human Sheet edits do not acquire the script lock. Hidden tab schemas/keys must remain intact.

The native registration table and grids extend as new attendees arrive. Monitor Google Sheets/Apps Script quotas before a large mailing or traffic burst; this implementation deliberately does not provision a database.

## Payment verification and existing merchant callback

- Checkout uses UniCredit hosted `PURCHASE`, 100.00 RON, distinct `ASLMWEB-<UUID>` order references.
- The webhook requires `X-Notification-Secret`. It queues authenticated bank retrieval; callback/browser status values cannot mark payment paid.
- Readback must match order ID, merchant ID, amount and RON currency, with captured funds and an approved successful payment/capture transaction.
- Duplicate paid registration is blocked. A contradictory delayed capture on an old failed order is retained and flagged for ASLM review, as are settlements after expiry.
- Do not replace MSC's existing merchant callback. Confirm UniCredit supports an additional webinar notification target, or route `ASLMWEB-` notifications to `https://www.aslm.ro/api/webinar/payment/webhook` without changing MSC's handling. That merchant-side arrangement has not been verified.

## Fixed viewing window

Recordings are available **19 October–17 November 2026 inclusive**. Registration and new checkout close **18 November 2026 at 00:00 Europe/Bucharest** (`2026-11-17T22:00:00Z`). This is 30 calendar days / 721 elapsed hours across the daylight-saving change. The Script checks the cutoff under the lock as well as the website checks.

Existing payment attempts continue reconciling after closure. Bank-side in-flight settlement can occur after expiry and is flagged for manual review. The external viewing platform must enforce the same fixed cutoff. Late registrations receive only the remaining window.

ASLM manually verifies existing/new membership and membership-form payments, creates platform accounts and sends credentials beginning on 19 October after confirmation. The final platform and detailed presentation schedule remain pending. The MSC free-access offer is deferred.

## Activation evidence required

1. Deploy the Script against a private sandbox copy; verify signed health, wrong-signature rejection, all three registrations, simultaneous duplicates and repeated lost-response requests.
2. Verify real UniCredit sandbox hosted payment **and authenticated readback**, including success, decline/cancel, forged browser return, delayed callback and callback routing for the shared merchant.
3. Read back the actual Sheet rows and payment status. Change J:L and verify payment updates preserve them.
4. Verify delivered acknowledgment and payment emails to the attendee and `contact@aslm.ro`; induce a provider failure and verify a subsequent job retry.
5. Verify the existing membership form's payment path with the correct category fee and same email. A source/build check is not payment-provider proof.
6. Confirm five-minute jobs keep running without browser returns and after event closure; test the exact Bucharest cutoff.
7. Verify desktop/mobile navigation, keyboard controls/focus and form errors in an available browser.
8. Enable registration only after storage/email verification. Enable both checkout flags only after actual bank QA passes.

## Local checks

Run on E: with the E: cache/temp paths:

```powershell
npm run test:webinar
npm run lint
npx tsc --noEmit
npm run build
npm run test:seo
npm run test:images
npm audit --omit=dev
git diff --check
```

The test suite exercises the actual Apps Script source in a Node VM with mocked Google Sheets/LockService, authenticated simulated UniCredit readback, and a local SMTP sink proving failure/retry processing. These checks do not prove a deployed Apps Script, real provider payment or delivery to actual inboxes. Browser automation is unavailable in this session, so visual mobile/keyboard acceptance remains open.

The dependency updates remove the Next.js/Sharp production advisories from the original checkout. The remaining five high advisories are in the ESLint development dependency chain; avoid `npm audit fix --force`, which proposes an unrelated framework downgrade.

Verified locally on 5 October 2026: **46 tests passed**, lint, TypeScript, production build (131 routes), SEO (121 indexable pages), image checks (including all three webinar graphics), zero production dependency advisories and clean diff checks. HTTP smoke tests returned 200 for the landing/receipt/English/Events pages and the image optimizer; unconfigured registration returned 503, forged receipt input 400, and unauthenticated webhook/jobs 401. The private live Sheet's five hidden headers and original 12-column native table were read back. The exported tracker was rendered and inspected; native Google colors were verified separately because Excel export changes table styling. No production attendee records or actual provider payments/emails were created.

The implementation was developed on `codex/aslm-webinar`, based on remote main `1b3059aaa91331263cfc95586a243a9c76bfd200`, preserving the newer governance changes. The C: compatibility junction still targets the E: project.

## Primary references

- [ScriptLock](https://developers.google.com/apps-script/reference/lock/lock-service)
- [Atomic Sheets batch requests](https://developers.google.com/workspace/sheets/api/guides/batch)
- [Advanced Sheets service](https://developers.google.com/apps-script/advanced/sheets)
- [Web app deployment](https://developers.google.com/apps-script/guides/web)
