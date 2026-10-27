<?php
define('ABSPATH', '/workspace/');
define('ARRAY_A', 'ARRAY_A');
function add_filter($name, $callback, $priority = 10, $args = 1) {}
function add_action($name, $callback, $priority = 10, $args = 1) {}
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }
class TestForm {
    private $form_id;
    function __construct($id = 2982) { $this->form_id = $id; }
    function id() { return $this->form_id; }
    function title() { return 'Webinar ASLM'; }
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
    public $prefix = 'test_';
    public $options = 'test_options';
    public $last_error = '';
    public $rows = array();
    public $sequence = null;
    public $history = null;
    public $allocation_error = false;
    public $query_args;
    function prepare($sql, ...$args) { $this->query_args = $args; return array($sql, $args); }
    function get_results($query, $format) { return $this->rows; }
    function get_var($query) {
        if ($this->allocation_error) { $this->last_error = 'database unavailable'; return null; }
        $this->last_error = '';
        return strpos($query, 'SELECT MAX') === 0 ? $this->history : $this->sequence;
    }
    function query($prepared) {
        list($sql, $args) = $prepared;
        if ($this->allocation_error) { $this->last_error = 'database unavailable'; return false; }
        $this->last_error = '';
        if (strpos($sql, 'INSERT IGNORE') === 0) {
            if ($this->sequence !== null) return 0;
            $this->sequence = (int) $args[1];
            return 1;
        }
        if ($this->sequence >= 2147483647) return 0;
        $this->sequence = max($this->sequence, (int) $args[0]) + 1;
        return 1;
    }
}
require __DIR__ . '/../aslm-webinar-registration.php';
$wpdb = new TestDatabase();

function data_for($category = 'Nonmembru - 100 RON', $payment = 'Card') {
    return array(
        'Nume' => 'Persoană Test', 'telefon' => '0700000000', 'email_contact' => 'test@example.invalid',
        'Loc_Munca' => 'Loc Test', 'Adresa' => 'Adresă Test', 'nr-fact' => '1',
        'taxa-ped' => $category, 'tip-plata' => array($payment), 'acceptance-64' => '1',
        'your-code' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'aslm-webinar-version' => '1',
        'pret_ab' => '0', 'taxa-eur' => '0', 'Taxa-inregistrare' => 'tampered',
        'tip-taxa-mail' => 'tampered', 'link-plata-mail' => 'https://evil.invalid/',
        'submit_time' => '100.1', 'submit_url' => 'https://evil.invalid/',
    );
}
function normalize($data, $id = 2982, $raw_payment = 'Card') {
    $_POST = array('tip-plata' => $raw_payment);
    unset($GLOBALS['aslm_webinar_submission']);
    WPCF7_Submission::$instance = new WPCF7_Submission(new TestForm($id));
    return aslm_webinar_normalize($data, 1793145600);
}
function errors() {
    $validation = new TestValidation();
    return aslm_webinar_validate($validation, array((object) array('name' => 'taxa-ped'), (object) array('name' => 'tip-plata')))->invalid;
}
function persist($data) {
    global $wpdb;
    aslm_webinar_capture_save((object) array('WPCF7_ContactForm' => new TestForm(), 'posted_data' => $data, 'submit_time' => '1793116800.1234'));
    $wpdb->rows = array();
    foreach ($GLOBALS['aslm_webinar_submission']['expected'] as $name => $value) $wpdb->rows[] = array('field_name' => $name, 'field_value' => $value);
    $abort = false;
    aslm_webinar_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
    return !$abort;
}
function response() {
    return aslm_webinar_response(array('status' => 'mail_sent'), array('contact_form_id' => 2982, 'status' => 'mail_sent'));
}

$paid = normalize(data_for());
check($paid['pret_ab'] === '100.00' && $paid['taxa-eur'] === '100.00', 'Forged zero amount was not replaced.');
check($paid['nr-fact'] === '202600001', 'Proforma was not allocated in the webinar range.');
check($paid['your-code'] !== 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' && preg_match('/\A[a-f0-9]{32}\z/D', $paid['your-code']) === 1, 'Server request code was not generated.');
check($paid['link-plata-mail'] === 'https://aslm.medscience.center/?id=' . $paid['your-code'], 'Forged payment link was retained.');
check(!isset($paid['submit_time'], $paid['submit_url']) && errors() === array(), 'Valid submission metadata was not normalized.');
check(persist($paid), 'Complete paid registration was rejected.');
$result = response();
check($result['aslmWebinarState'] === 'card_ready' && $result['aslmPaymentUrl'] === $paid['link-plata-mail'], 'Saved card registration cannot continue.');
echo "PASS paid fee, request code, proforma, persistence and card continuation\n";

$counter = $wpdb->sequence;
$free_input = data_for('Membru ASLM - Gratuit');
$free_input['pret_ab'] = '100.00';
$free = normalize($free_input);
check($free['pret_ab'] === '0.00' && $free['taxa-eur'] === '0.00' && $free['tip-plata'] === 'Fără plată', 'Member fee was not canonicalized.');
check($free['nr-fact'] === '' && $free['link-plata-mail'] === '' && $wpdb->sequence === $counter, 'Free submission allocated a proforma or payment URL.');
check(persist($free), 'Complete free registration was rejected.');
$result = response();
check($result['aslmWebinarState'] === 'member_pending' && strpos($result['message'], 'va verifica apartenența') !== false && !isset($result['aslmPaymentUrl']), 'Free registration was not held for verification.');
echo "PASS free member request has no invoice, payment or automatic access\n";

$mail = array('active' => true, 'subject' => 'Original paid subject', 'body' => 'Original paid proforma', 'recipient' => 'contact@aslm.ro', 'additional_headers' => 'Bcc: configured@example.invalid', 'attachments' => 'original.pdf');
$properties = array('form' => 'old form', 'mail' => $mail, 'mail_2' => $mail, 'messages' => array('mail_sent_ok' => 'Saved'));
$actual = aslm_webinar_form_properties($properties, new TestForm());
check($actual['mail']['recipient'] === $mail['recipient'] && $actual['mail']['additional_headers'] === $mail['additional_headers'], 'Free notification destinations changed.');
check($actual['mail']['attachments'] === '' && $actual['mail_2']['attachments'] === '' && strpos($actual['mail_2']['body'], 'Nu este necesară plata') !== false && strpos($actual['mail_2']['body'], 'link-plata-mail') === false, 'Free message retained proforma or payment content.');
normalize(data_for());
$actual = aslm_webinar_form_properties($properties, new TestForm());
check($actual['mail'] === $mail && $actual['mail_2'] === $mail, 'Paid mail configuration changed.');
check(aslm_webinar_form_properties($properties, new TestForm(149)) === $properties, 'Individual form properties changed.');
check(normalize(data_for(), 149) === data_for() && !isset($GLOBALS['aslm_webinar_submission']), 'Individual form submission changed.');
echo "PASS free notification copy, paid mail preservation and form isolation\n";

foreach (array('unknown', '', array('Membru ASLM - Gratuit'), null) as $category) {
    normalize(data_for($category));
    check(isset(errors()['taxa-ped']), 'Invalid category accepted.');
}
foreach (array('Fără plată', 'Cash', array('Card'), null) as $raw) {
    normalize(data_for(), 2982, $raw);
    check(isset(errors()['tip-plata']), 'Invalid payment accepted for paid category.');
}
$invalid = data_for(); $invalid['tip-plata'] = array('Card', 'Transfer bancar');
normalize($invalid);
check(isset(errors()['tip-plata']), 'Multiple payment methods accepted.');
$stale = data_for(); unset($stale['aslm-webinar-version']);
normalize($stale);
check(isset(errors()['taxa-ped']), 'Stale form accepted.');
check(aslm_webinar_closed(1796075999) === false && aslm_webinar_closed(1796076000) === true, 'Bucharest cutoff is incorrect.');
aslm_webinar_normalize(data_for(), 1796076000);
check(isset(errors()['taxa-ped']), 'Expired form was accepted by submission validation.');
echo "PASS malformed category, payment tampering, stale form and cutoff\n";

$paid = normalize(data_for('Nonmembru - 100 RON', 'Transfer bancar'), 2982, 'Transfer bancar');
check(persist($paid), 'Transfer registration not persisted.');
$result = response();
check($result['aslmWebinarState'] === 'transfer_pending' && !isset($result['aslmPaymentUrl']), 'Transfer registration exposed card continuation.');
$complete = $wpdb->rows;
foreach (array('pret_ab', 'Nume', 'nr-fact', 'your-code', 'tip-plata', 'Specialitatea', 'acceptance-64') as $missing) {
    $wpdb->rows = array_values(array_filter($complete, function ($row) use ($missing) { return $row['field_name'] !== $missing; }));
    $abort = false;
    aslm_webinar_require_persistence(new TestForm(), $abort, WPCF7_Submission::$instance);
    $result = response();
    check($abort && $result['status'] === 'aborted' && !isset($result['aslmPaymentUrl']), 'Incomplete record allowed success or payment.');
}
$wpdb->rows = $complete;
$wpdb->rows[] = $complete[0];
check(aslm_webinar_is_persisted($GLOBALS['aslm_webinar_submission']) === false, 'Duplicate saved fields accepted.');
$wpdb->rows = $complete;
$wpdb->last_error = 'database unavailable';
check(aslm_webinar_is_persisted($GLOBALS['aslm_webinar_submission']) === false, 'Database failure accepted.');
$wpdb->last_error = '';
echo "PASS transfer, complete field readback and persistence failure handling\n";

$wpdb->sequence = null; $wpdb->history = '202600050';
check(aslm_webinar_invoice_number() === '202600051' && aslm_webinar_invoice_number() === '202600052', 'Sequence failed to recover from persisted history or reused a number.');
$wpdb->allocation_error = true;
$failed = normalize(data_for());
check(isset(errors()['taxa-ped']) && $failed['nr-fact'] === '' && $failed['link-plata-mail'] === '', 'Database allocation failure did not fail closed.');
$wpdb->allocation_error = false; $wpdb->sequence = 2147483647;
$failed = normalize(data_for());
check(isset(errors()['taxa-ped']) && $failed['nr-fact'] === '', 'Integer overflow did not fail closed.');
echo "PASS invoice recovery, distinct allocations, database failure and integer bound\n";
echo "All webinar PHP checks passed.\n";
