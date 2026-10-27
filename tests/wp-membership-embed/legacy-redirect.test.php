<?php
define('ABSPATH', '/workspace/');
$hooks = array();
function add_filter() {}
function add_action($name, $callback, $priority = 10) { $GLOBALS['hooks'][$name][$priority][] = $callback; }
function is_admin() { return false; }
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
require __DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership.php';

check(ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED === false, 'Redirect activated by default.');
check(aslm_membership_legacy_destination('GET', '/', false) === null, 'Disabled redirect returned destination.');
check(aslm_membership_legacy_destination('GET', '/', 'true') === null, 'Nonboolean activation accepted.');
check(aslm_membership_legacy_destination('GET', '/', true) === 'https://www.aslm.ro/membri', 'Exact GET root destination incorrect.');
check(aslm_membership_legacy_destination('HEAD', '/', true) === 'https://www.aslm.ro/membri', 'Exact HEAD root destination incorrect.');
check(aslm_membership_legacy_destination('GET', '/?', true) === 'https://www.aslm.ro/membri', 'Empty query changed destination.');
check(
    aslm_membership_legacy_destination('GET', '/?utm_source=aslm.ro&utm_medium=referral&utm_campaign=membership&utm_term=medic+specialist&utm_content=hero%26button', true)
    === 'https://www.aslm.ro/membri?utm_source=aslm.ro&utm_medium=referral&utm_campaign=membership&utm_term=medic%20specialist&utm_content=hero%26button',
    'Allowed attribution was not preserved.'
);
foreach (array('POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'get', '') as $method) {
    check(aslm_membership_legacy_destination($method, '/', true) === null, 'Nonpublic request method redirected.');
}
foreach (array(
    '/formular-inscriere/', '/inscriere/', '/webinar/', '/wp-json/', '/wp-admin/', '/wp-login.php',
    '/wp-cron.php', '/xmlrpc.php', '/wp-content/form.js', '/callback/', '/payment/', '/membri',
    '', '//example.invalid/', 'https://membership.aslm.ro/', 'http:/', '/#fragment',
    '/?rest_route=%2Fcontact-form-7%2Fv1', '/?wc-api=callback', '/?id=payment', '/?p=43', '/?page_id=43',
    '/?preview=true', '/?doing_wp_cron=1', '/?action=anything', '/?utm_source=allowed&unknown=value',
    '/?utm_source[]=array', '/?utm.source=not-a-known-key', '/?utm_source=one&utm_source=two',
    '/?utm_source=one&', '/?utm_source=one;action=another',
) as $uri) {
    check(aslm_membership_legacy_destination('GET', $uri, true) === null, 'Excluded route or query redirected: ' . $uri);
}
$_SERVER['REQUEST_METHOD'] = 'GET';
$_SERVER['REQUEST_URI'] = '/';
aslm_membership_redirect_legacy_root();
check(isset($hooks['template_redirect'][-1]) && $hooks['template_redirect'][-1] === array('aslm_membership_redirect_legacy_root'), 'Root redirect hook order incorrect.');
echo "PASS default-off activation, exact root methods, attribution and route/query exclusions\n";
