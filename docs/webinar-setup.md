# ASLM Webinar: membership access and Sheet registration

Non-members go directly to [membership.aslm.ro](https://membership.aslm.ro/) to become ASLM members and pay their category's annual fee there. After completing that form, they return to the webinar page and request access with the same email. Existing members submit a free webinar request. ASLM manually verifies membership before sending platform accounts.

There is no webinar ticket checkout, payment webhook, bank client or cloud database. The private Google Sheet is the only persistent store for webinar requests.

Tracker: [Webinar ASLM – înscrieri](https://docs.google.com/spreadsheets/d/1coMLPgIRzwjYT8Cwr3PkeltMbPpJQi7ivz5Q3cNclyg/edit).

## Current delivery

- Romanian `/webinar`, desktop/mobile/English navigation, footer and Events promotion.
- Landing copy, five lecturers and three graphics from Iulia Nistoroiu's 5 October 2026 email, “Landing page - webinar ASLM”.
- Direct membership links work independently of the webinar registration configuration.
- Member requests use Sheet storage, private receipt links and durable acknowledgment jobs for attendees and `contact@aslm.ro`.
- The private live Sheet was prepared with its original 12-column table and hidden operational headers. No test attendees were added. The unused `_WebinarOrders` tab and old ticket/order columns are preserved; the current service ignores that tab and leaves those columns blank.
- The Apps Script service is prepared but has not been deployed. Member registration defaults to disabled until storage/email verification. SMTP credentials are absent locally. Actual provider delivery and browser visual/keyboard QA remain unverified.

## Deploy the Sheet service

Use the Sheet owner's Google account; never make the Sheet public. All Sheet editors are trusted operators. Hidden tabs are organizational, not an access-control boundary.

1. Open the tracker and choose **Extensions → Apps Script**.
2. Add `Store.gs` and `Code.gs` from `scripts/webinar-sheet/`. Local tests execute these exact source files.
3. In Project Settings, enable **Show appsscript.json manifest file** and replace it with the supplied manifest. This enables the Advanced Sheets v4 service, V8 and the Bucharest timezone. If using a custom Google Cloud project, enable its Google Sheets API.
4. Configure these **Script Properties** securely:
   - `WEBINAR_SHEET_ID`: `1coMLPgIRzwjYT8Cwr3PkeltMbPpJQi7ivz5Q3cNclyg`
   - `WEBINAR_SHEET_SECRET`: a cryptographically random secret of at least 32 characters, also configured on the site
   - `WEBINAR_SITE_URL`: `https://www.aslm.ro`
   - `CRON_SECRET`: a separate random secret, also configured on the site
5. Run `setupWebinarStorage` once and authorize the scopes. It verifies the table and creates missing operational tabs without resetting data.
6. Deploy a versioned **Web app**, executing as **Me**, accessible to **Anyone**. Every storage request requires a signed server HMAC, timestamp and matching Sheet ID. GET exposes no records. Put its `https://script.google.com/macros/s/.../exec` URL in the site's `WEBINAR_SHEET_SCRIPT_URL`.
7. After deploying the website endpoints, run `installWebinarDelivery` once. Its five-minute trigger calls authenticated `/api/webinar/jobs` for acknowledgment retries, including after registration closes. Keep it running while jobs remain unresolved.
8. Monitor Apps Script executions and the queue. Owner quota/authorization loss makes registration fail closed. Enable Google trigger failure notices.

Use one Apps Script project per production Sheet: ScriptLock serializes executions within one project. For sandbox tests, use a copied Sheet and a separate script. Deploy both source files together; this version requires schema **2** and terms **webinar-2026-10-v2**.

## Website configuration

Configure `.env.example` values in local/provider environment settings, never Git, Sheet cells or public variables:

- Storage: `WEBINAR_SHEET_SCRIPT_URL`, `WEBINAR_SHEET_SECRET`, `WEBINAR_SHEET_ID`.
- Receipt authentication: independent `WEBINAR_TOKEN_SECRET` of at least 32 random characters. Keep it stable; rotation invalidates receipt links.
- Email: `WEBINAR_SMTP_HOST`, `WEBINAR_SMTP_PORT`, `WEBINAR_SMTP_SECURE`, `WEBINAR_SMTP_USER`, `WEBINAR_SMTP_PASS`, `WEBINAR_SMTP_FROM`. Use an authorized ASLM sender with SPF/DKIM.
- Delivery trigger: `CRON_SECRET`, identical in Script Properties.
- `WEBINAR_REGISTRATION_ENABLED=false` until actual storage and email checks pass.

No merchant credentials or checkout flags are needed. The membership form handles membership payments separately.

After securely configuring `.env.local`, run `npm run check:webinar` to verify deployed Script health, schema, terms and cutoff without creating records or printing secrets. It does not verify email delivery.

## Consistency and retries

Every storage command verifies its HMAC before accessing Google data, acquires ScriptLock, reads current state, and commits one atomic Sheets API batch. Registration, its visible row and two email jobs commit together.

Private submission keys recover a saved request after a lost response. A separate submission using an existing email receives a duplicate warning and cannot retrieve another attendee's receipt. Stable record IDs prevent duplicate rows or jobs.

| Tab | Records |
| --- | --- |
| `_WebinarRegistrations` | contact details, member request, consent version, receipt hash |
| `_WebinarQueue` | attendee/admin acknowledgments, retry and lease state |
| `_WebinarRateLimits` | HMAC hashes and counters; no raw IP |
| `_WebinarWorker` | global delivery lease |

Email delivery is **at least once**: SMTP acceptance followed by a lost completion write can resend an email. Stable Message-ID headers aid deduplication but cannot guarantee it. Failed jobs remain pending, back off up to one hour and recover expired leases.

ASLM manages **J:L**: membership verification, account-sent date and notes. Automated writes use **A:I only** and preserve J:L. Ticket amount and order ID stay blank; request status means “Solicitare primită”, not verified membership. The service never marks membership payments confirmed.

Filter the native table normally. Avoid directly editing, deleting or sorting automated rows while the service writes; human edits do not acquire ScriptLock. Hidden schemas/keys must stay intact. Grids and the native table extend automatically. Monitor Sheets/Apps Script quotas before a large traffic burst.

## Fixed viewing window

Recordings are available **19 October–17 November 2026 inclusive**. Webinar registration closes **18 November 2026 at 00:00 Europe/Bucharest** (`2026-11-17T22:00:00Z`): 30 calendar days / 721 elapsed hours across the daylight-saving change. The website and locked Script both enforce the cutoff.

Late registrations receive the remaining window. The external platform must enforce the same viewing cutoff. The membership site remains independently available.

ASLM manually verifies existing/new membership and payments made through the membership form, creates platform accounts and sends details beginning on 19 October after confirmation. The platform and detailed presentation schedule remain pending. The MSC free-access offer is deferred.

## Activation and validation

1. Deploy the Script against a private sandbox copy; verify signed health, wrong-signature rejection, member requests, simultaneous duplicates and lost-response retries.
2. Read back saved requests and verify ASLM's J:L edits remain intact.
3. Verify acknowledgments arrive at the attendee and `contact@aslm.ro`; induce a provider failure and verify retry.
4. Verify the direct membership link and the existing site's membership/payment path. Local checks do not prove that external payment provider.
5. Confirm delivery jobs run without browser returns and after closure; verify the Bucharest cutoff.
6. Check desktop/mobile navigation, keyboard access, focus and form errors in an available browser.
7. Enable member requests only after storage/email verification.

Run on E: with E: cache/temp paths:

```powershell
npm run test:webinar
npm run lint
npx tsc --noEmit
npm run build
npm run test:seo
npm run test:images
git diff --check
```

Tests execute the actual Apps Script in a Node VM with mocked Sheets/LockService and a local SMTP sink proving failure/retry. No real provider emails or attendee records are created. Browser automation is unavailable in this session; visual mobile/keyboard acceptance remains open.

Verified locally on 5 October 2026: **33 tests passed**, lint, TypeScript, production build (129 routes), SEO (121 indexable pages), image checks and HTTP smoke checks. Direct membership buttons and the artwork link render with no configured registration backend. Landing, receipt, English and Events pages return 200; removed checkout/webhook endpoints return 404. Unconfigured member requests return 503, removed options and forged receipt data return 400, and unauthenticated delivery jobs return 401.

The branch `codex/aslm-webinar` started at remote main `1b3059aaa91331263cfc95586a243a9c76bfd200`, preserving newer governance. The C: compatibility junction still targets the E: project.

## Primary references

- [ScriptLock](https://developers.google.com/apps-script/reference/lock/lock-service)
- [Atomic Sheets batch requests](https://developers.google.com/workspace/sheets/api/guides/batch)
- [Advanced Sheets service](https://developers.google.com/apps-script/advanced/sheets)
- [Web app deployment](https://developers.google.com/apps-script/guides/web)
