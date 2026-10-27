<?php
define('ABSPATH', '/workspace/');
define('ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED', true);
$admin = true;
$redirect = null;
$cache_headers = 0;
function add_filter() {}
function add_action() {}
function is_admin() { return $GLOBALS['admin']; }
function nocache_headers() { $GLOBALS['cache_headers']++; }
function wp_redirect($destination, $status, $by) { $GLOBALS['redirect'] = array($destination, $status, $by); return true; }
require __DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership.php';
$_SERVER['REQUEST_METHOD'] = 'HEAD';
$_SERVER['REQUEST_URI'] = '/?utm_source=aslm.ro';
aslm_membership_redirect_legacy_root();
if ($redirect !== null || $cache_headers !== 0) throw new RuntimeException('Administrative request redirected.');
$admin = false;
$_SERVER['REQUEST_URI'] = '/formular-inscriere/';
aslm_membership_redirect_legacy_root();
if ($redirect !== null || $cache_headers !== 0) throw new RuntimeException('Dedicated form redirected.');
$_SERVER['REQUEST_URI'] = '/?utm_source=aslm.ro';
ob_start();
register_shutdown_function(function () {
    $output = ob_get_clean();
    if ($GLOBALS['redirect'] !== array('https://www.aslm.ro/membri?utm_source=aslm.ro', 302, 'ASLM membership')) throw new RuntimeException('Enabled redirect destination or status incorrect.');
    if ($GLOBALS['cache_headers'] !== 1 || $output !== '') throw new RuntimeException('Redirect cache policy or body incorrect.');
    if (!in_array('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0', headers_list(), true)) throw new RuntimeException('Redirect is cacheable.');
    echo "PASS explicitly enabled HEAD redirect, no-cache headers and administrative/dedicated exclusions\n";
});
aslm_membership_redirect_legacy_root();
throw new RuntimeException('Enabled redirect did not terminate.');
