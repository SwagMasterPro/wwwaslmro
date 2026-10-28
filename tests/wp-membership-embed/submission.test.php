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
        'Nume' => 'Forged name', 'Nume_familie' => 'Persoană', 'Prenume' => 'Test', 'Studii' => 'Studii Test',
        'aslm-membership-profile' => '2', 'telefon' => '0700000000', 'email_contact' => 'test@example.invalid',
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
    $tags = array_map(function ($name) { return (object) array('name' => $name); }, array('Taxa-inregistrare', 'tip-plata', 'Nume_familie', 'Prenume', 'Studii', 'Loc_Munca'));
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
    check($actual['Nume'] === 'Persoană Test', 'Forged full name reached the invoice.');
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

$old = valid_data(); unset($old['aslm-membership-profile'], $old['Nume_familie'], $old['Prenume']);
normalize($old);
check(strpos(validated_errors()['Taxa-inregistrare'], 'Reîncărcați') !== false, 'Preloaded old form was not asked to reload.');
foreach (array('Nume_familie', 'Prenume', 'Studii', 'Loc_Munca') as $field) {
    $data = valid_data(); $data[$field] = array('forged');
    normalize($data);
    check(isset(validated_errors()[$field]), 'Invalid profile value was not attached to its visible field.');
}
$data = valid_data();
$data['Specialitatea'] = 'Forged'; $data['grad-prof'] = 'Forged'; $data['cnp-cod_parafa'] = 'Forged';
$data['Studii'] = '';
$normalized = normalize($data);
check(!isset($normalized['Specialitatea'], $normalized['grad-prof'], $normalized['cnp-cod_parafa']), 'Removed medical fields reached a new record.');
check(validated_errors() === array() && !isset($GLOBALS['aslm_membership_submission']['expected']['Studii']), 'Optional blank studies blocked persistence.');
check(normalize($data, 2982) === $data && !isset($GLOBALS['aslm_membership_submission']), 'Webinar form was modified.');
echo "PASS stale form reload, visible profile errors and optional studies persistence\n";

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
foreach (array('pret_ab', 'Nume', 'Nume_familie', 'Prenume', 'Studii', 'Loc_Munca', 'your-code', 'tip-plata', 'nr-fact') as $missing) {
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

$properties = array('form' => '<p>Database original</p>', 'mail' => array('recipient' => 'existing'), 'mail_2' => array('active' => true));
$rest_properties = aslm_membership_form_properties($properties, new TestForm());
check(strpos($rest_properties['form'], '[text* Nume_familie') !== false && strpos($rest_properties['form'], '[text* Prenume') !== false, 'REST submission did not receive new required tags.');
check(strpos($rest_properties['form'], 'document.addEventListener') !== false && strpos($rest_properties['form'], '[hidden aslm-membership-embed') === false, 'Legacy page lost navigation or became a dedicated submission.');
check(aslm_membership_form_properties($rest_properties, new TestForm()) === $rest_properties, 'Repeated non-dedicated reads changed navigation.');
check(aslm_membership_form_properties(array('form' => ''), new TestForm()) === array('form' => ''), 'Early constructor properties changed.');
$GLOBALS['aslm_membership_rendering'] = true;
$modified = aslm_membership_form_properties($properties, new TestForm());
check(strpos($modified['form'], 'document.addEventListener') === false && strpos($modified['form'], '[hidden aslm-membership-embed "1"]') !== false, 'Dedicated page retained legacy navigation or lost its marker.');
check(strpos($modified['form'], '[text* Nume_familie') !== false && strpos($modified['form'], '[text* Prenume') !== false && aslm_membership_form_properties($modified, new TestForm()) === $modified, 'Dedicated required tags or repeated reads changed.');
check($modified['mail'] === $properties['mail'] && $modified['mail_2'] === $properties['mail_2'], 'Mail configuration modified.');
check(aslm_membership_form_properties($properties, new TestForm(150)) === $properties, 'Other form render modified.');
check(isset($hooks['wpcf7_posted_data'][20], $hooks['wpcf7_before_send_mail'][20], $hooks['wpcf7_ajax_json_echo'][20]), 'Expected legacy CF7 hooks missing.');
echo "PASS versioned form rendering, REST validation tags and unrelated form isolation\n";

foreach (array('', '&bull; ') as $prefix) {
    $body = '<div>' . "\n"
        . $prefix . '<strong>Nume</strong>: [Nume]<br />' . "\n"
        . $prefix . '<strong>Specialitatea</strong>: [Specialitatea]<br />' . "\n"
        . $prefix . '<strong>Grad profesional</strong>: [grad-prof]<br />' . "\n"
        . $prefix . '<strong>CUIM</strong>: [cnp-cod_parafa]<br />' . "\n"
        . $prefix . '<strong>Telefon</strong>: [telefon]<br />' . "\n"
        . $prefix . '<strong>E-mail</strong>: [email_contact]<br />' . "\n"
        . $prefix . '<strong>Loc munca</strong>: [Loc_Munca]<br />' . "\n"
        . '<p>Cumpărător: [Nume]</p><p>[pret_ab] [link-plata-mail]</p>';
    $expected = '<div>' . "\n"
        . $prefix . '<strong>Nume</strong>: [Nume_familie]<br />' . "\n"
        . $prefix . '<strong>Prenume</strong>: [Prenume]<br />' . "\n"
        . $prefix . '<strong>Studii</strong>: [Studii]<br />' . "\n"
        . $prefix . '<strong>Domeniu de activitate</strong>: [Loc_Munca]<br />' . "\n"
        . $prefix . '<strong>Telefon</strong>: [telefon]<br />' . "\n"
        . $prefix . '<strong>E-mail</strong>: [email_contact]<br />' . "\n"
        . '<p>Cumpărător: [Nume]</p><p>[pret_ab] [link-plata-mail]</p>';
    $properties = array('form' => 'stored', 'mail' => array('body' => $body, 'recipient' => 'retained', 'additional_headers' => 'retained'), 'mail_2' => array('body' => $body, 'active' => true));
    $changed = aslm_membership_form_properties($properties, new TestForm());
    check($changed['mail']['body'] === $expected && $changed['mail_2']['body'] === $expected, 'Notification profile changed unrelated billing details.');
    check($changed['mail']['recipient'] === 'retained' && $changed['mail']['additional_headers'] === 'retained' && $changed['mail_2']['active'] === true, 'Notification delivery settings changed.');
    check(aslm_membership_form_properties($changed, new TestForm()) === $changed, 'Repeated mail transformation changed the body.');
    check(aslm_membership_form_properties($properties, new TestForm(2982)) === $properties, 'Webinar mail changed.');
}
$thrown = false;
try { aslm_membership_profile_mail('Different operator template'); } catch (RuntimeException $error) { $thrown = true; }
check($thrown, 'Unexpected operator mail template silently lost profile fields.');
echo "PASS notification fields, invoice full name and unchanged delivery settings\n";

check(aslm_membership_diagnostic_message(new RuntimeException('Membership PHP shortcode is unavailable.')) === '[aslm-membership-embed] Membership PHP shortcode is unavailable.', 'Known diagnostic not preserved.');
check(aslm_membership_diagnostic_message(new RuntimeException('Private payload: test@example.invalid secret value')) === '[aslm-membership-embed] Unexpected rendering failure.', 'Unknown exception details reached diagnostic.');
check(aslm_membership_diagnostic_message(new RuntimeException("Membership PHP shortcode is unavailable.\nprivate payload")) === '[aslm-membership-embed] Unexpected rendering failure.', 'Diagnostic prefix match leaked appended details.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership PHP shortcode is unavailable.')) === 'missing-php-shortcode', 'Missing shortcode diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership navigation script has changed.')) === 'navigation-mismatch', 'Navigation diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException('Membership form did not render completely.')) === 'incomplete-markup', 'Markup diagnostic code incorrect.');
check(aslm_membership_diagnostic_code(new RuntimeException("private\r\nHeader: secret")) === 'unexpected', 'Unknown details reached diagnostic code.');
echo "PASS fixed diagnostic messages without exception details\n";

$markup = '<form><input name="aslm-membership-embed"><input name="aslm-membership-profile"><input name="Nume_familie"><input name="Prenume"><input name="Studii"><input name="Loc_Munca"><input name="your-code"><input name="curs" id="cursbnr"><input name="data" id="databnr"><input name="nrfact" id="nrfactura"></form>';
check(aslm_membership_markup_complete($markup), 'Complete generated fields rejected.');
check(!aslm_membership_markup_complete(str_replace('name="Prenume"', 'name="missing"', $markup)), 'Missing new name field accepted.');
foreach (array('cursbnr', 'databnr', 'nrfactura') as $id) {
    check(!aslm_membership_markup_complete(str_replace('id="' . $id . '"', 'id="missing"', $markup)), 'Missing generated field accepted.');
    check(!aslm_membership_markup_complete($markup . '<input id="' . $id . '" name="unexpected">'), 'Duplicate generated id accepted.');
}
foreach (array('[exchange_rate]', '[php snippet=4]', "[php\nsnippet=4]", '[contact-form-7 id="149"]') as $unresolved) {
    check(!aslm_membership_markup_complete($markup . $unresolved), 'Unresolved shortcode accepted.');
}
check(!aslm_membership_markup_complete(str_replace('name="nrfact"', 'name="wrong"', $markup)), 'Wrong generated field name accepted.');
echo "PASS generated field presence, unique ids and unresolved shortcode rejection\n";
