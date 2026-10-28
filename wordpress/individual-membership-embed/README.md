# Prepare the individual membership embed

Deploy changes only through the approved process. The root-page redirect is prepared and disabled by default.

## Run the local checks

Run these commands from the repository root.

```powershell
node --test tests/wp-membership-embed/form.test.mjs
npx eslint wordpress/individual-membership-embed/aslm-individual-membership/form.js tests/wp-membership-embed/form.test.mjs
$runner = 'E:\Codex\Temp\aslm-wp-embed\run-php74.mjs'
$repo = 'E:\Codex\Projects\Societate aslm'
Get-ChildItem tests/wp-membership-embed/*.test.php | ForEach-Object {
	node $runner $_.FullName $repo
	if ($LASTEXITCODE -ne 0) { throw "PHP test failed: $($_.Name)" }
}
```

The local runner uses PHP 7.4.33 through the existing WordPress Playground runtime. It is a host test helper, not part of the upload. With a native PHP 7.4 installation, run each PHP test file directly with `php`.

These tests isolate the plugin from WordPress. They cover profile normalization, Unicode limits, fee normalization, CFDB serialization and persistence checks, route handling, form and notification overrides, payment links, labels, and resize messages. They do not establish live provider delivery or payment success.

## Install the reviewed files

Back up any existing files at the target paths before an approved upload. Preserve the stored CF7 form and mail settings.

Upload the loader and its asset directory as siblings.

```text
wp-content/mu-plugins/
  aslm-individual-membership.php
  aslm-individual-membership/
    form.html
    original-navigation.html
    form.js
    form.css
    profile.php
```

WordPress loads the PHP file from the top level of `mu-plugins`. Uploading this entire repository folder one level below `mu-plugins` does not activate the loader.

Activation affects these paths and submissions.

- `/formular-inscriere/` serves form 149 on GET and HEAD. The route requires CF7, CFDB, the PHP shortcode handler, and the versioned form template.
- Form 149 uses `form.html` during rendering and submission validation. The stored CF7 form remains intact. Mail overrides replace only the profile rows in the two existing notification bodies. Recipients, headers, billing rows, and transport settings remain intact.
- `Nume_familie` and `Prenume` are required and saved separately. The server builds legacy `Nume` for the invoice. `Studii` is optional; `Loc_Munca` remains required and is displayed as Domeniu de activitate. Both allow up to 1,000 Unicode characters.
- New submissions require `aslm-membership-profile=2`. Preloaded old forms receive an instruction to reload before saving or sending notifications. Historical records are unchanged.
- Every submission of form 149 receives server-authoritative category and fee values. Other forms retain their existing processing.
- Dedicated submissions receive a new server token. The plugin verifies the saved CFDB row before allowing confirmation or a payment continuation link.
- The dedicated response adds framing permission for `https://www.aslm.ro`. The actual server or firewall can still impose a stricter policy.

Upload the asset directory first and the loader last. Keep the original plugin and CF7 form/mail backups outside the public web root. Restore the previous loader first during rollback, then its assets. Preserve `original-navigation.html` byte-for-byte with SHA-256 `d5689bf4b912c774a4a8cb729bb9c36d5344678f0db76c36785317e0c931cdd1`.

The legacy root page remains redirected for eligible requests. Non-dedicated renderings retain their original navigation script and do not receive the embed marker, so excluded root queries retain their existing payment continuation. They use the same updated profile fields. Dedicated submissions keep their posted embed marker even though the REST form template uses the non-dedicated variant.

## Complete the live checks before enabling the iframe

Exclude `/formular-inscriere/` from all page caches. Verify effective no-cache headers and framing headers after the server and firewall process the response.

Check the real form at 320 px, 390 px, and desktop widths. Verify labels, keyboard focus, required-field errors, reCAPTCHA, cookies, trusted resize requests, and both growing and shrinking content.

Use the operator's test environment to verify each category, saved fields, the proforma, internal notification, applicant confirmation, and bank-transfer confirmation. Verify card continuation, cancellation, failure, and return URLs without real charges. Treat saved data, SMTP acceptance, inbox receipt, and confirmed payment as separate results.

After those checks pass, configure the parent site's `MEMBERSHIP_FORM_URL` with the verified dedicated URL. Keep `MEMBERSHIP_FORM_EMBED_ENABLED=false` until the embedded journey also passes. Enable it explicitly with `true` after validation. Publish and check the parent site after each configuration change.

Keep `ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED` set to `false` in the plugin until live acceptance passes and the parent iframe is published. Enable it with the boolean `true` only after those checks and approval.

The optional redirect uses a noncached HTTP 302 from exact-root GET and HEAD requests to `https://www.aslm.ro/membri`. It preserves only `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, and `utm_content`. It skips requests with any other query key or duplicate UTM key. Other paths, POST requests, administrative requests, API requests, and cron requests retain their existing behavior.

## Roll back embedding

Set `MEMBERSHIP_FORM_EMBED_ENABLED=false` on the parent site, retain `MEMBERSHIP_FORM_URL`, and republish. The parent then links directly to the same dedicated form.

Keep the dedicated route available while that direct link is active. If the plugin itself needs rollback, first restore a working registration destination on the parent. Restore the backed-up plugin files through the approved deployment process. Removing the loader also removes its form-149 fee guards, so verify the restored processing before reopening registration.

To stop the optional root redirect, restore `ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED=false` in the plugin and deploy that change. The dedicated form remains available.
