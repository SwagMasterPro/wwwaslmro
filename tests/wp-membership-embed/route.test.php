<?php
define('ABSPATH', '/workspace/');
$scenario = isset($scenario) ? $scenario : 'get';
$status = null;
$cache_headers = 0;
$assets = array();
$admin_bar = true;
$second_pass_calls = 0;
function add_filter() {}
function add_action() {}
function nocache_headers() { $GLOBALS['cache_headers']++; }
function status_header($code) { $GLOBALS['status'] = $code; }
function show_admin_bar($show) { $GLOBALS['admin_bar'] = $show; }
function shortcode_exists($name) { return !($GLOBALS['scenario'] === 'php-shortcode' && $name === 'php'); }
function wpcf7_enqueue_scripts() { $GLOBALS['assets'][] = 'cf7-js'; }
function wpcf7_enqueue_styles() { $GLOBALS['assets'][] = 'cf7-css'; }
function plugin_dir_url() { return 'https://membership.aslm.ro/wp-content/mu-plugins/'; }
function wp_enqueue_style($name, $url) { $GLOBALS['assets'][] = $url; }
function wp_enqueue_script($name, $url) { $GLOBALS['assets'][] = $url; }
function wp_head() { echo '<meta name="test-head" content="present">'; }
function wp_footer() { echo '<script data-test-footer></script>'; }
class CF7DBPlugin {}
class WPCF7_ContactForm {
    private $properties = array();
    public static $instances = 0;
    private function __construct() {
        self::$instances++;
        $properties = $this->get_properties();
        if ($properties['form'] !== '') throw new RuntimeException('Constructor must first read empty properties.');
        $properties['form'] = file_get_contents(__DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership/original-navigation.html');
        $properties['mail'] = array('recipient' => 'existing');
        $properties['messages'] = array('mail_sent_ok' => 'existing');
        $this->properties = $properties;
        $this->upgrade();
    }
    static function get_instance($id) { return $GLOBALS['scenario'] === 'missing' ? false : new self(); }
    function id() { return 149; }
    function get_properties() {
        $properties = $this->properties + array('form' => '', 'mail' => array(), 'messages' => array());
        return aslm_membership_form_properties($properties, $this);
    }
    private function upgrade() {
        $this->properties['mail'] = $this->get_properties()['mail'];
        $this->properties['messages'] = $this->get_properties()['messages'];
    }
    function form_html() {
        $first = $this->get_properties();
        $second = $this->get_properties();
        if ($first !== $second || strpos($first['form'], '[hidden aslm-membership-profile "2"]') === false) throw new RuntimeException('Repeated render reads must match.');
        if (strpos($this->properties['form'], 'document.addEventListener') === false) throw new RuntimeException('Stored form was changed.');
        return '<form><input name="aslm-membership-embed" value="1"><input name="aslm-membership-profile" value="2"><input name="Nume_familie"><input name="Prenume"><input name="Studii"><input name="Loc_Munca"><input name="your-code" value="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"><input type="hidden" name="nrfact" id="nrfactura">[exchange_rate]</form>';
    }
}
function do_shortcode($shortcode) {
    if (strpos($shortcode, '<form>') !== 0 || strpos($shortcode, '[contact-form-7') !== false) throw new RuntimeException('Do not reconstruct the CF7 form during dedicated rendering.');
    $GLOBALS['second_pass_calls']++;
    return str_replace('[exchange_rate]', '<input type="hidden" name="curs" id="cursbnr" readonly="readonly"><input type="hidden" name="data" id="databnr" readonly="readonly">', $shortcode);
}
require __DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership.php';
foreach (array('/', '/formular-inscriere', '/formular-inscriere/extra', '/inscriere/', '/wp-json/contact-form-7/v1/contact-forms/149/feedback') as $path) {
    $_SERVER['REQUEST_URI'] = $path;
    $_SERVER['REQUEST_METHOD'] = 'GET';
    aslm_membership_route();
    if ($status !== null || $cache_headers !== 0 || !$admin_bar) throw new RuntimeException('Unrelated route was handled.');
}
$_SERVER['REQUEST_URI'] = '/formular-inscriere/?utm_source=aslm.ro';
$_SERVER['REQUEST_METHOD'] = $scenario === 'head' ? 'HEAD' : ($scenario === 'post' ? 'POST' : 'GET');
ob_start();
register_shutdown_function(function () use ($scenario) {
    $output = ob_get_clean();
    $expected_status = in_array($scenario, array('missing', 'php-shortcode'), true) ? 503 : ($scenario === 'post' ? 405 : 200);
    if ($GLOBALS['status'] !== $expected_status || $GLOBALS['cache_headers'] !== 1) throw new RuntimeException('Route status or cache policy incorrect.');
    if ($expected_status === 200 && $GLOBALS['admin_bar'] !== false) throw new RuntimeException('Dedicated route retained the admin bar.');
    if ($expected_status === 503) {
        $diagnostic = $scenario === 'php-shortcode' ? 'missing-php-shortcode' : 'missing-form';
        if (!in_array('X-ASLM-Form-Status: ' . $diagnostic, headers_list(), true)) throw new RuntimeException('Safe diagnostic header missing.');
    }
    if ($scenario === 'get') {
        foreach (array('test-head', 'data-test-footer', 'aslm-membership-content', 'name="your-code"') as $part) {
            if (strpos($output, $part) === false) throw new RuntimeException('Dedicated document incomplete.');
        }
        if (count($GLOBALS['assets']) !== 4) throw new RuntimeException('Required assets missing.');
        if (WPCF7_ContactForm::$instances !== 1) throw new RuntimeException('Form was reconstructed during rendering.');
        if ($GLOBALS['second_pass_calls'] !== 1 || strpos($output, '[exchange_rate]') !== false || strpos($output, 'id="cursbnr"') === false) throw new RuntimeException('Nested shortcodes did not receive one expansion pass.');
    } elseif ($scenario === 'head' || $scenario === 'post') {
        if ($output !== '') throw new RuntimeException('HEAD or rejected method produced a body.');
    } elseif (strpos($output, 'Formularul nu este disponibil') === false) {
        throw new RuntimeException('Missing form did not fail closed.');
    }
    echo 'PASS exact route, ' . $scenario . " response, and unrelated-route preservation\n";
});
aslm_membership_route();
throw new RuntimeException('Dedicated route did not terminate.');
