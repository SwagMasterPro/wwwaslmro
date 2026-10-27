<?php
/**
 * Plugin Name: ASLM individual membership embed
 * Description: Dedicated rendering and submission guards for membership form 149.
 */

defined('ABSPATH') || exit;

if (!defined('ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED')) {
    define('ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED', false);
}

function aslm_membership_legacy_destination($method, $request_uri, $enabled) {
    if ($enabled !== true || !in_array($method, array('GET', 'HEAD'), true)) return null;
    $parts = parse_url($request_uri);
    if (!is_array($parts) || !isset($parts['path']) || $parts['path'] !== '/' || isset($parts['scheme']) || isset($parts['host']) || isset($parts['fragment'])) return null;
    $parameters = array();
    $allowed = array('utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content');
    if (isset($parts['query']) && $parts['query'] !== '') {
        if (strpos($parts['query'], ';') !== false) return null;
        foreach (explode('&', $parts['query']) as $parameter) {
            $pair = explode('=', $parameter, 2);
            $key = urldecode($pair[0]);
            if (!in_array($key, $allowed, true) || array_key_exists($key, $parameters)) return null;
            $parameters[$key] = isset($pair[1]) ? urldecode($pair[1]) : '';
        }
    }
    $query = http_build_query($parameters, '', '&', PHP_QUERY_RFC3986);
    return 'https://www.aslm.ro/membri' . ($query !== '' ? '?' . $query : '');
}

function aslm_membership_redirect_legacy_root() {
    if (is_admin() || (defined('DOING_AJAX') && DOING_AJAX) || (defined('DOING_CRON') && DOING_CRON) || (defined('REST_REQUEST') && REST_REQUEST) || (defined('XMLRPC_REQUEST') && XMLRPC_REQUEST)) return;
    $destination = aslm_membership_legacy_destination(
        isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '',
        isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '',
        ASLM_MEMBERSHIP_LEGACY_ROOT_REDIRECT_ENABLED
    );
    if ($destination === null) return;
    nocache_headers();
    header('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0');
    if (wp_redirect($destination, 302, 'ASLM membership')) exit;
}
add_action('template_redirect', 'aslm_membership_redirect_legacy_root', -1);

function aslm_membership_packages() {
    return array(
        'Membru Afiliat - 400 RON / an' => '400.00',
        'Membru Titular - 400 RON / an' => '400.00',
        'Membru Asociat PF - 300 RON / an' => '300.00',
    );
}

function aslm_membership_current_form() {
    if (!class_exists('WPCF7_Submission')) return null;
    $submission = WPCF7_Submission::get_instance();
    return $submission ? $submission->get_contact_form() : null;
}

function aslm_membership_normalize($data) {
    $form = aslm_membership_current_form();
    if (!$form || (int) $form->id() !== 149) return $data;

    $packages = aslm_membership_packages();
    $category = isset($data['taxa-ped']) ? $data['taxa-ped'] : null;
    $payment = isset($data['tip-plata']) ? $data['tip-plata'] : null;
    $raw_payment = isset($_POST['tip-plata']) ? $_POST['tip-plata'] : null;
    if (is_array($payment) && count($payment) === 1) $payment = reset($payment);
    $errors = array();
    if (!is_string($category) || !isset($packages[$category])) $errors['Taxa-inregistrare'] = 'Selectați o categorie de membru validă.';
    if (!is_string($raw_payment) || !is_string($payment) || $raw_payment !== $payment || !in_array($payment, array('Card', 'Transfer bancar'), true)) {
        $errors['tip-plata'] = 'Selectați o modalitate de plată validă.';
    }

    $marker = isset($data['aslm-membership-embed']) ? $data['aslm-membership-embed'] : null;
    $dedicated = $marker === '1';
    if ($marker !== null && !$dedicated) $errors['Taxa-inregistrare'] = 'Reîncărcați formularul și încercați din nou.';
    if ($dedicated) {
        unset($data['submit_time'], $data['submit_url']);
        try {
            $data['your-code'] = bin2hex(random_bytes(16));
        } catch (Exception $error) {
            $errors['Taxa-inregistrare'] = 'Formularul nu este disponibil momentan. Încercați mai târziu.';
        }
    }

    if (is_string($category) && isset($packages[$category])) {
        $data['pret_ab'] = $packages[$category];
        $data['taxa-eur'] = $packages[$category];
        $data['Taxa-inregistrare'] = $category;
        $data['tip-taxa-mail'] = $category;
    }
    $code = isset($data['your-code']) ? $data['your-code'] : null;
    if (!is_string($code) || !preg_match('/\A[a-f0-9]{32}\z/D', $code)) {
        $errors['Taxa-inregistrare'] = 'Reîncărcați formularul și încercați din nou.';
    } else {
        $data['link-plata-mail'] = 'https://aslm.medscience.center/?id=' . $code;
    }

    $expected = array();
    if ($dedicated) {
        foreach (array('Nume', 'telefon', 'email_contact', 'Loc_Munca', 'Adresa', 'nr-fact', 'your-code', 'taxa-ped', 'pret_ab', 'taxa-eur', 'Taxa-inregistrare', 'tip-taxa-mail', 'link-plata-mail') as $field) {
            if (!isset($data[$field]) || !is_string($data[$field]) || trim($data[$field]) === '') {
                $errors['Taxa-inregistrare'] = 'Datele formularului sunt incomplete. Reîncărcați formularul și încercați din nou.';
            } else {
                $expected[$field] = stripslashes($data[$field]);
            }
        }
        if (is_string($payment)) $expected['tip-plata'] = $payment;
    }

    $GLOBALS['aslm_membership_submission'] = array(
        'dedicated' => $dedicated,
        'errors' => $errors,
        'expected' => $expected,
        'form_title' => stripslashes($form->title()),
        'submit_time' => null,
        'persisted' => false,
        'payment' => $payment,
    );
    return $data;
}
add_filter('wpcf7_posted_data', 'aslm_membership_normalize', 20);

function aslm_membership_validate($result, $tags) {
    $form = aslm_membership_current_form();
    $state = isset($GLOBALS['aslm_membership_submission']) ? $GLOBALS['aslm_membership_submission'] : null;
    if (!$form || (int) $form->id() !== 149 || !$state) return $result;
    foreach ($tags as $tag) {
        if (isset($state['errors'][$tag->name])) $result->invalidate($tag, $state['errors'][$tag->name]);
    }
    return $result;
}
add_filter('wpcf7_validate', 'aslm_membership_validate', 20, 2);

function aslm_membership_capture_save($record) {
    $state = isset($GLOBALS['aslm_membership_submission']) ? $GLOBALS['aslm_membership_submission'] : null;
    if (!$state || !$state['dedicated'] || $state['errors']) return $record;
    if (!isset($record->WPCF7_ContactForm, $record->posted_data['your-code'], $record->submit_time)) return $record;
    if ((int) $record->WPCF7_ContactForm->id() !== 149 || $record->posted_data['your-code'] !== $state['expected']['your-code']) return $record;
    if (!is_numeric($record->submit_time)) return $record;
    $GLOBALS['aslm_membership_submission']['submit_time'] = (string) $record->submit_time;
    return $record;
}
add_filter('cfdb_form_data', 'aslm_membership_capture_save', 100);

function aslm_membership_is_persisted($state) {
    global $wpdb;
    if (!$state['submit_time'] || !$state['expected'] || $state['errors']) return false;
    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT field_name, field_value FROM {$wpdb->prefix}cf7dbplugin_submits WHERE submit_time = %s AND form_name = %s",
        $state['submit_time'],
        $state['form_title']
    ), ARRAY_A);
    if ($wpdb->last_error || !is_array($rows)) return false;
    $saved = array();
    foreach ($rows as $row) {
        if (array_key_exists($row['field_name'], $saved)) return false;
        $saved[$row['field_name']] = $row['field_value'];
    }
    foreach ($state['expected'] as $field => $value) {
        if (!array_key_exists($field, $saved) || $saved[$field] !== $value) return false;
    }
    return true;
}

function aslm_membership_require_persistence($form, &$abort, $submission) {
    $state = isset($GLOBALS['aslm_membership_submission']) ? $GLOBALS['aslm_membership_submission'] : null;
    if ((int) $form->id() !== 149 || !$state || !$state['dedicated']) return;
    $persisted = aslm_membership_is_persisted($state);
    $GLOBALS['aslm_membership_submission']['persisted'] = $persisted;
    if (!$persisted) {
        $abort = true;
        $submission->set_status('aborted');
        $submission->set_response('Nu putem confirma înregistrarea cererii. Nu efectuați plata. Contactați contact@aslm.ro înainte de a retrimite formularul.');
    }
}
add_action('wpcf7_before_send_mail', 'aslm_membership_require_persistence', 20, 3);

function aslm_membership_response($response, $result) {
    $state = isset($GLOBALS['aslm_membership_submission']) ? $GLOBALS['aslm_membership_submission'] : null;
    if (!$state || !$state['dedicated'] || !isset($result['contact_form_id'], $result['status']) || (int) $result['contact_form_id'] !== 149 || $result['status'] !== 'mail_sent') return $response;
    if (!$state['persisted'] || !aslm_membership_is_persisted($state)) {
        $response['status'] = 'aborted';
        $response['message'] = 'Nu putem confirma înregistrarea cererii. Nu efectuați plata. Contactați contact@aslm.ro înainte de a retrimite formularul.';
        return $response;
    }
    $response['aslmMembershipState'] = $state['payment'] === 'Card' ? 'card_ready' : 'transfer_accepted';
    if ($state['payment'] === 'Card') $response['aslmPaymentUrl'] = $state['expected']['link-plata-mail'];
    return $response;
}
add_filter('wpcf7_ajax_json_echo', 'aslm_membership_response', 20, 2);

function aslm_membership_form_properties($properties, $form) {
    if (empty($GLOBALS['aslm_membership_rendering']) || (int) $form->id() !== 149) return $properties;
    $original = file_get_contents(__DIR__ . '/aslm-individual-membership/original-navigation.html');
    if (!is_string($original) || hash('sha256', $original) !== 'd5689bf4b912c774a4a8cb729bb9c36d5344678f0db76c36785317e0c931cdd1') {
        throw new RuntimeException('Membership navigation fixture is unavailable.');
    }
    if (!isset($properties['form']) || substr_count($properties['form'], $original) !== 1) {
        throw new RuntimeException('Membership navigation script has changed.');
    }
    $properties['form'] = str_replace($original, '[hidden aslm-membership-embed "1"]', $properties['form']);
    return $properties;
}
add_filter('wpcf7_contact_form_properties', 'aslm_membership_form_properties', 20, 2);

function aslm_membership_diagnostic_code($error) {
    $known = array(
        'Membership contact-form class is unavailable.' => 'missing-cf7-class',
        'Membership CFDB class is unavailable.' => 'missing-cfdb-class',
        'Membership contact-form shortcode is unavailable.' => 'missing-cf7-shortcode',
        'Membership PHP shortcode is unavailable.' => 'missing-php-shortcode',
        'Membership script loader is unavailable.' => 'missing-script-loader',
        'Membership style loader is unavailable.' => 'missing-style-loader',
        'Membership navigation fixture is unavailable.' => 'navigation-fixture',
        'Membership navigation script has changed.' => 'navigation-mismatch',
        'Membership form is unavailable.' => 'missing-form',
        'Membership form did not render completely.' => 'incomplete-markup',
    );
    $message = $error->getMessage();
    return isset($known[$message]) ? $known[$message] : 'unexpected';
}

function aslm_membership_diagnostic_message($error) {
    return '[aslm-membership-embed] ' . (aslm_membership_diagnostic_code($error) !== 'unexpected' ? $error->getMessage() : 'Unexpected rendering failure.');
}

function aslm_membership_markup_complete($markup) {
    if (!is_string($markup) || strpos($markup, 'name="aslm-membership-embed"') === false || strpos($markup, 'name="your-code"') === false) return false;
    if (preg_match('/\[(?:php|exchange_rate|contact-form-7)\b/i', $markup)) return false;
    preg_match_all('/<input\b[^>]*>/i', $markup, $inputs);
    foreach (array('cursbnr' => 'curs', 'databnr' => 'data', 'nrfactura' => 'nrfact') as $id => $name) {
        $count = 0;
        foreach ($inputs[0] as $input) {
            if (!preg_match('/\sid\s*=\s*(["\'])' . $id . '\1/i', $input)) continue;
            $count++;
            if (!preg_match('/\sname\s*=\s*(["\'])' . $name . '\1/i', $input)) return false;
        }
        if ($count !== 1) return false;
    }
    return true;
}

function aslm_membership_route() {
    $path = parse_url(isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '', PHP_URL_PATH);
    if ($path !== '/formular-inscriere/') return;
    $method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : '';
    nocache_headers();
    header('Cache-Control: private, no-store, no-cache, must-revalidate, max-age=0');
    header('X-Robots-Tag: noindex, nofollow');
    if (!in_array($method, array('GET', 'HEAD'), true)) {
        header('Allow: GET, HEAD');
        status_header(405);
        exit;
    }
    if (!defined('DONOTCACHEPAGE')) define('DONOTCACHEPAGE', true);
    try {
        $dependencies = array(
            'Membership contact-form class is unavailable.' => class_exists('WPCF7_ContactForm'),
            'Membership CFDB class is unavailable.' => class_exists('CF7DBPlugin'),
            'Membership contact-form shortcode is unavailable.' => shortcode_exists('contact-form-7'),
            'Membership PHP shortcode is unavailable.' => shortcode_exists('php'),
            'Membership script loader is unavailable.' => function_exists('wpcf7_enqueue_scripts'),
            'Membership style loader is unavailable.' => function_exists('wpcf7_enqueue_styles'),
        );
        foreach ($dependencies as $message => $available) {
            if (!$available) throw new RuntimeException($message);
        }
        $form = WPCF7_ContactForm::get_instance(149);
        if (!$form) throw new RuntimeException('Membership form is unavailable.');
        $GLOBALS['aslm_membership_rendering'] = true;
        $form->get_properties();
        $markup = do_shortcode($form->form_html());
        if (!aslm_membership_markup_complete($markup)) {
            throw new RuntimeException('Membership form did not render completely.');
        }
    } catch (Throwable $error) {
        error_log(aslm_membership_diagnostic_message($error));
        header('X-ASLM-Form-Status: ' . aslm_membership_diagnostic_code($error));
        $GLOBALS['aslm_membership_rendering'] = false;
        status_header(503);
        header('Content-Type: text/html; charset=UTF-8');
        if ($method !== 'HEAD') echo '<!doctype html><html lang="ro"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Înscriere ASLM</title><p>Formularul nu este disponibil momentan. Contactați <a href="mailto:contact@aslm.ro">contact@aslm.ro</a>.</p></html>';
        exit;
    }
    $GLOBALS['aslm_membership_rendering'] = false;
    show_admin_bar(false);
    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    header_remove('X-Frame-Options');
    header("Content-Security-Policy: frame-ancestors https://www.aslm.ro", false);
    if ($method === 'HEAD') exit;
    wpcf7_enqueue_scripts();
    wpcf7_enqueue_styles();
    $assets = plugin_dir_url(__FILE__) . 'aslm-individual-membership/';
    wp_enqueue_style('aslm-membership-embed', $assets . 'form.css', array(), '1.0.0');
    wp_enqueue_script('aslm-membership-embed', $assets . 'form.js', array('contact-form-7'), '1.0.1', true);
    ?><!doctype html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Formular de înscriere în ASLM</title>
<?php wp_head(); ?>
</head>
<body class="aslm-membership-embed">
<main id="aslm-membership-content" aria-label="Formular de înscriere în ASLM">
<?php echo $markup; ?>
<div id="aslm-membership-outcome" role="status" aria-live="polite"></div>
</main>
<?php wp_footer(); ?>
</body>
</html><?php
    exit;
}
add_action('template_redirect', 'aslm_membership_route', 0);
