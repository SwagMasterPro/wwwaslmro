<?php
define('ABSPATH', '/workspace/');
define('ARRAY_A', 'ARRAY_A');
$hooks = array();
function add_filter($name, $callback, $priority = 10, $args = 1) { $GLOBALS['hooks'][$name][$priority][] = $callback; }
function add_action($name, $callback, $priority = 10, $args = 1) { add_filter($name, $callback, $priority, $args); }
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
class TestForm {
    public $form_id;
    function __construct($id = 149) { $this->form_id = $id; }
    function id() { return $this->form_id; }
    function title() { return 'Formular înscriere'; }
}
class WPCF7_Submission {
    public static $instance;
    public $form;
    public $status = 'init';
    public $response = '';
    function __construct($form) { $this->form = $form; }
    static function get_instance() { return self::$instance; }
    function get_contact_form() { return $this->form; }
    function set_status($value) { $this->status = $value; }
    function set_response($value) { $this->response = $value; }
}
class TestValidation {
    public $invalid = array();
    function invalidate($tag, $message) { $this->invalid[$tag->name] = $message; }
}
class TestDatabase {
    public $prefix = 'ped1a_mxi_';
    public $last_error = '';
    public $rows = array();
    public $query_args;
    function prepare($sql, $time, $title) { $this->query_args = array($sql, $time, $title); return $sql; }
    function get_results($query, $format) { return $this->rows; }
}
require __DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership.php';

function valid_data($dedicated = true) {
    return array(
        'Nume' => 'Persoană Test', 'telefon' => '0700000000', 'email_contact' => 'test@example.invalid',
        'Loc_Munca' => 'Loc Test', 'Adresa' => 'Adresă Test', 'nr-fact' => '201',
        'taxa-ped' => 'Membru Afiliat - 400 RON / an', 'tip-plata' => array('Card'),
        'your-code' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        'pret_ab' => '1.00', 'taxa-eur' => '1.00', 'Taxa-inregistrare' => 'tampered',
        'tip-taxa-mail' => 'tampered', 'link-plata-mail' => 'https://evil.invalid/',
        'nrfact' => '1', 'data-bnr' => '2026-10-27', 'curs-bnr' => '5.0',
    ) + ($dedicated ? array('aslm-membership-embed' => '1') : array());
}
function normalize($data, $id = 149, $raw_payment = 'Card') {
    $_POST = array('tip-plata' => $raw_payment);
    unset($GLOBALS['aslm_membership_submission']);
    WPCF7_Submission::$instance = new WPCF7_Submission(new TestForm($id));
    return aslm_membership_normalize($data);
}
function saved_rows($expected) {
    $rows = array();
    foreach ($expected as $name => $value) $rows[] = array('field_name' => $name, 'field_value' => $value);
    return $rows;
}
function validated_errors() {
    $validation = new TestValidation();
    $tags = array((object) array('name' => 'Taxa-inregistrare'), (object) array('name' => 'tip-plata'));
    return aslm_membership_validate($validation, $tags)->invalid;
}

foreach (array('Membru Afiliat - 400 RON / an' => '400.00', 'Membru Titular - 400 RON / an' => '400.00', 'Membru Asociat PF - 300 RON / an' => '300.00') as $category => $fee) {
    $data = valid_data();
    $data['taxa-ped'] = $category;
    $data['submit_time'] = '123.1';
    $data['submit_url'] = 'https://evil.invalid/';
    $actual = normalize($data);
    check($actual['pret_ab'] === $fee && $actual['taxa-eur'] === $fee, 'Server fee normalization failed.');
    check($actual['Taxa-inregistrare'] === $category && $actual['tip-taxa-mail'] === $category, 'Category mail normalization failed.');
    check(preg_match('/\A[a-f0-9]{32}\z/D', $actual['your-code']) === 1 && $actual['your-code'] !== $data['your-code'], 'Dedicated code was not replaced.');
    check($actual['link-plata-mail'] === 'https://aslm.medscience.center/?id=' . $actual['your-code'], 'Payment mail link was not normalized.');
    check(!isset($actual['submit_time'], $actual['submit_url']), 'Client metadata remained.');
    check($actual['nr-fact'] === '201' && $actual['data-bnr'] === '2026-10-27' && $actual['curs-bnr'] === '5.0', 'Existing invoice metadata changed.');
    check(validated_errors() === array(), 'Legitimate CF7 radio array was rejected.');
}
echo "PASS package fees, server token and preserved invoice fields\n";

$root = valid_data(false);
$root_result = normalize($root);
check($root_result['your-code'] === $root['your-code'] && $root_result['pret_ab'] === '400.00', 'Root code or fees incorrect.');
check($GLOBALS['aslm_membership_submission']['dedicated'] === false, 'Root marked dedicated.');
check(normalize($root, 150) === $root && !isset($GLOBALS['aslm_membership_submission']), 'Other form changed.');
echo "PASS root code preservation and unrelated form isolation\n";

foreach (array('Unknown', array('Membru Afiliat - 400 RON / an'), null) as $category) {
    $data = valid_data(); $data['taxa-ped'] = $category;
    normalize($data);
    check(isset(validated_errors()['Taxa-inregistrare']), 'Invalid category accepted.');
}
foreach (array('Cash', array('Card'), null) as $raw_payment) {
    normalize(valid_data(), 149, $raw_payment);
    check(isset(validated_errors()['tip-plata']), 'Invalid raw payment accepted.');
}
$data = valid_data(); $data['tip-plata'] = array('Card', 'Transfer bancar');
normalize($data);
check(isset(validated_errors()['tip-plata']), 'Multiple payment methods accepted.');
echo "PASS malformed category and payment validation\n";

$normalized = normalize(valid_data());
$record = (object) array('WPCF7_ContactForm' => new TestForm(), 'posted_data' => $normalized, 'submit_time' => '1793116800.1234');
aslm_membership_capture_save($record);
$state = $GLOBALS['aslm_membership_submission'];
check($state['submit_time'] === '1793116800.1234', 'Server save timestamp not captured.');
$wpdb = new TestDatabase();
$wpdb->rows = saved_rows($state['expected']);
check(aslm_membership_is_persisted($state), 'Complete record rejected.');
check($wpdb->query_args[1] === '1793116800.1234' && $wpdb->query_args[2] === 'Formular înscriere', 'Persistence query lost record scope.');
$abort = false;
aslm_membership_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
check(!$abort && $GLOBALS['aslm_membership_submission']['persisted'], 'Complete record aborted.');
$response = aslm_membership_response(array('status' => 'mail_sent'), array('contact_form_id' => 149, 'status' => 'mail_sent'));
check($response['aslmMembershipState'] === 'card_ready' && $response['aslmPaymentUrl'] === $normalized['link-plata-mail'], 'Confirmed payment URL missing.');
foreach (array('pret_ab', 'Nume', 'your-code', 'tip-plata', 'nr-fact') as $missing) {
    $incomplete = $state['expected']; unset($incomplete[$missing]);
    $wpdb->rows = saved_rows($incomplete);
    check(!aslm_membership_is_persisted($state), 'Incomplete persistence accepted.');
}
$wrong = $state['expected']; $wrong['your-code'] = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
$wpdb->rows = saved_rows($wrong);
$abort = false;
aslm_membership_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
check($abort && WPCF7_Submission::$instance->status === 'aborted', 'Wrong token did not abort.');
$response = aslm_membership_response(array('status' => 'mail_sent'), array('contact_form_id' => 149, 'status' => 'mail_sent'));
check($response['status'] === 'aborted' && !isset($response['aslmPaymentUrl']), 'Unknown persistence returned payment.');
$wpdb->rows = saved_rows($state['expected']);
$wpdb->last_error = 'database unavailable';
check(!aslm_membership_is_persisted($state), 'Database error accepted.');
$wpdb->last_error = '';
$wpdb->rows[] = $wpdb->rows[0];
check(!aslm_membership_is_persisted($state), 'Duplicate record fields accepted.');
echo "PASS persistence readback, token association and failure rejection\n";

$data = valid_data();
$data['Loc_Munca'] = 'Cabinet \\ Etaj';
$data['Adresa'] = 'Strada A\\B';
$normalized = normalize($data);
check($normalized['Loc_Munca'] === 'Cabinet \\ Etaj' && $normalized['Adresa'] === 'Strada A\\B', 'Submitted personal fields changed.');
check($GLOBALS['aslm_membership_submission']['expected']['Loc_Munca'] === 'Cabinet  Etaj', 'Expected workplace differs from CFDB serialization.');
check($GLOBALS['aslm_membership_submission']['expected']['Adresa'] === 'Strada AB', 'Expected address differs from CFDB serialization.');
aslm_membership_capture_save((object) array('WPCF7_ContactForm' => new TestForm(), 'posted_data' => $normalized, 'submit_time' => '1793116802.1234'));
$state = $GLOBALS['aslm_membership_submission'];
$wpdb->rows = saved_rows($state['expected']);
$abort = false;
aslm_membership_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
check(!$abort && $GLOBALS['aslm_membership_submission']['persisted'], 'Legitimate CFDB backslash serialization aborted.');
$wrong = $state['expected']; $wrong['pret_ab'] = '1.00';
$wpdb->rows = saved_rows($wrong);
check(!aslm_membership_is_persisted($state), 'Serialized personal fields weakened exact fee verification.');
$wrong = $state['expected']; $wrong['your-code'] = 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb';
$wpdb->rows = saved_rows($wrong);
check(!aslm_membership_is_persisted($state), 'Serialized personal fields weakened exact token verification.');
echo "PASS CFDB backslash serialization with exact token and fee verification\n";

$data = valid_data(); $data['tip-plata'] = array('Transfer bancar');
$normalized = normalize($data, 149, 'Transfer bancar');
aslm_membership_capture_save((object) array('WPCF7_ContactForm' => new TestForm(), 'posted_data' => $normalized, 'submit_time' => '1793116801.1234'));
$wpdb->rows = saved_rows($GLOBALS['aslm_membership_submission']['expected']);
$abort = false;
aslm_membership_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
$response = aslm_membership_response(array('status' => 'mail_sent'), array('contact_form_id' => 149, 'status' => 'mail_sent'));
check($response['aslmMembershipState'] === 'transfer_accepted' && !isset($response['aslmPaymentUrl']), 'Transfer response incorrect.');
check(aslm_membership_response(array('status' => 'mail_failed'), array('contact_form_id' => 149, 'status' => 'mail_failed')) === array('status' => 'mail_failed'), 'Mail failure converted to success.');
echo "PASS transfer confirmation and mail failure preservation\n";

$original = file_get_contents(__DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership/original-navigation.html');
$properties = array('form' => '<p>Preserved</p>' . $original . '<script>keep()</script>', 'mail' => array('recipient' => 'existing'), 'mail_2' => array('active' => true));
check(aslm_membership_form_properties($properties, new TestForm()) === $properties, 'Root render modified.');
$GLOBALS['aslm_membership_rendering'] = true;
$modified = aslm_membership_form_properties($properties, new TestForm());
check($modified['form'] === '<p>Preserved</p>[hidden aslm-membership-embed "1"]<script>keep()</script>', 'Scoped navigation replacement incorrect.');
check($modified['mail'] === $properties['mail'] && $modified['mail_2'] === $properties['mail_2'], 'Mail configuration modified.');
check(aslm_membership_form_properties($properties, new TestForm(150)) === $properties, 'Other form render modified.');
foreach (array('changed', $original . $original) as $invalid_form) {
    $thrown = false;
    try { aslm_membership_form_properties(array('form' => $invalid_form), new TestForm()); } catch (RuntimeException $error) { $thrown = true; }
    check($thrown, 'Navigation drift did not fail closed.');
}
check(isset($hooks['wpcf7_posted_data'][20], $hooks['wpcf7_before_send_mail'][20], $hooks['wpcf7_ajax_json_echo'][20]), 'Expected legacy CF7 hooks missing.');
echo "PASS scoped exact script replacement and mail preservation\n";

check(aslm_membership_diagnostic_message(new RuntimeException('Membership PHP shortcode is unavailable.')) === '[aslm-membership-embed] Membership PHP shortcode is unavailable.', 'Known diagnostic not preserved.');
check(aslm_membership_diagnostic_message(new RuntimeException('Private payload: test@example.invalid secret value')) === '[aslm-membership-embed] Unexpected rendering failure.', 'Unknown exception details reached diagnostic.');
check(aslm_membership_diagnostic_message(new RuntimeException("Membership PHP shortcode is unavailable.\nprivate payload")) === '[aslm-membership-embed] Unexpected rendering failure.', 'Diagnostic prefix match leaked appended details.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership PHP shortcode is unavailable.')) === 'missing-php-shortcode', 'Missing shortcode diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership navigation script has changed.')) === 'navigation-mismatch', 'Navigation diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership form did not render completely.')) === 'incomplete-markup', 'Markup diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException("private\r\nHeader: secret")) === 'unexpected', 'Unknown details reached diagnostic code.');
echo "PASS fixed diagnostic messages without exception details\n";

$markup = '<form><input name="aslm-membership-embed"><input name="your-code"><input name="curs" id="cursbnr"><input name="data" id="databnr"><input name="nrfact" id="nrfactura"></form>';
check(aslm_membership_markup_complete($markup), 'Complete generated fields rejected.');
foreach (array('cursbnr', 'databnr', 'nrfactura') as $id) {
    check(!aslm_membership_markup_complete(str_replace('id="' . $id . '"', 'id="missing"', $markup)), 'Missing generated field accepted.');
    check(!aslm_membership_markup_complete($markup . '<input id="' . $id . '" name="unexpected">'), 'Duplicate generated id accepted.');
}
foreach (array('[exchange_rate]', '[php snippet=4]', "[php\nsnippet=4]", '[contact-form-7 id="149"]') as $unresolved) {
    check(!aslm_membership_markup_complete($markup . $unresolved), 'Unresolved shortcode accepted.');
}
check(!aslm_membership_markup_complete(str_replace('name="nrfact"', 'name="wrong"', $markup)), 'Wrong generated field name accepted.');
echo "PASS generated field presence, unique ids and unresolved shortcode rejection\n";
