<?php
/**
 * Plugin Name: ASLM webinar registration
 * Description: Registration and payment guards for webinar form 2982.
 */

defined('ABSPATH') || exit;

function aslm_webinar_categories() {
    return array(
        'Membru ASLM - Gratuit' => array('amount' => '0.00', 'status' => 'În așteptarea verificării calității de membru ASLM'),
        'Nonmembru - 100 RON' => array('amount' => '100.00', 'status' => 'În așteptarea plății'),
    );
}

function aslm_webinar_closed($now) {
    return $now >= 1796076000;
}

function aslm_webinar_invoice_number() {
    global $wpdb;
    $seed = $wpdb->get_var("SELECT MAX(CAST(field_value AS UNSIGNED)) FROM {$wpdb->prefix}cf7dbplugin_submits WHERE field_name = 'nr-fact' AND field_value REGEXP '^[0-9]+$' AND CAST(field_value AS UNSIGNED) BETWEEN 202600001 AND 2147483647");
    if ($wpdb->last_error) throw new RuntimeException('Invoice history is unavailable.');
    $seed = max(202600000, (int) $seed);
    if ($seed >= 2147483647) throw new RuntimeException('Invoice sequence is exhausted.');
    $name = 'aslm_webinar_2026_proforma_sequence';
    $inserted = $wpdb->query($wpdb->prepare(
        "INSERT IGNORE INTO {$wpdb->options} (option_name, option_value, autoload) VALUES (%s, %s, 'no')",
        $name, (string) $seed
    ));
    if ($inserted === false || $wpdb->last_error) throw new RuntimeException('Invoice sequence is unavailable.');
    $updated = $wpdb->query($wpdb->prepare(
        "UPDATE {$wpdb->options} SET option_value = LAST_INSERT_ID(GREATEST(CAST(option_value AS UNSIGNED), %d) + 1) WHERE option_name = %s AND option_value REGEXP '^[0-9]+$' AND CAST(option_value AS UNSIGNED) < 2147483647",
        $seed, $name
    ));
    if ($updated !== 1 || $wpdb->last_error) throw new RuntimeException('Invoice allocation failed.');
    $number = $wpdb->get_var('SELECT LAST_INSERT_ID()');
    if ($wpdb->last_error || !is_numeric($number) || (int) $number <= $seed || (int) $number > 2147483647) throw new RuntimeException('Invoice allocation was not confirmed.');
    return (string) $number;
}

function aslm_webinar_current_form() {
    if (!class_exists('WPCF7_Submission')) return null;
    $submission = WPCF7_Submission::get_instance();
    return $submission ? $submission->get_contact_form() : null;
}

function aslm_webinar_normalize($data, $now = null) {
    $form = aslm_webinar_current_form();
    if (!$form || (int) $form->id() !== 2982) return $data;

    $errors = array();
    $categories = aslm_webinar_categories();
    $category = isset($data['taxa-ped']) ? $data['taxa-ped'] : null;
    $valid_category = is_string($category) && isset($categories[$category]);
    if (!$valid_category) $errors['taxa-ped'] = 'Selectați tipul înregistrării.';
    if (!isset($data['aslm-webinar-version']) || $data['aslm-webinar-version'] !== '1') {
        $errors['taxa-ped'] = 'Reîncărcați pagina pentru a folosi formularul actualizat.';
    }
    if ($now === null) $now = time();
    if (aslm_webinar_closed($now)) $errors['taxa-ped'] = 'Înscrierile la acest webinar s-au încheiat.';

    $payment = isset($data['tip-plata']) ? $data['tip-plata'] : null;
    if (is_array($payment) && count($payment) === 1) $payment = reset($payment);
    $free = $valid_category && $categories[$category]['amount'] === '0.00';
    if ($free) {
        $payment = 'Fără plată';
    } elseif (!is_string($payment) || !isset($_POST['tip-plata']) || !is_string($_POST['tip-plata']) || $_POST['tip-plata'] !== $payment || !in_array($payment, array('Card', 'Transfer bancar'), true)) {
        $errors['tip-plata'] = 'Selectați o modalitate de plată validă.';
    }

    unset($data['submit_time'], $data['submit_url']);
    try {
        $data['your-code'] = bin2hex(random_bytes(16));
    } catch (Throwable $error) {
        $errors['taxa-ped'] = 'Formularul nu este disponibil momentan. Încercați mai târziu.';
        $data['your-code'] = '';
    }
    $data['nr-fact'] = '';
    $data['link-plata-mail'] = '';
    $data['data-bnr'] = (new DateTimeImmutable('@' . $now))->setTimezone(new DateTimeZone('Europe/Bucharest'))->format('d.m.Y');
    $data['curs-bnr'] = '1';
    $data['tip-plata'] = is_string($payment) ? $payment : '';
    if ($valid_category) {
        $data['pret_ab'] = $categories[$category]['amount'];
        $data['taxa-eur'] = $categories[$category]['amount'];
        $data['Taxa-inregistrare'] = $category;
        $data['tip-taxa-mail'] = $category;
        $data['aslm-webinar-status'] = $categories[$category]['status'];
        if (!$free && !$errors) {
            try {
                $data['nr-fact'] = aslm_webinar_invoice_number();
                $data['link-plata-mail'] = 'https://aslm.medscience.center/?id=' . $data['your-code'];
            } catch (Throwable $error) {
                $errors['taxa-ped'] = 'Nu putem genera proforma momentan. Încercați mai târziu.';
            }
        }
    }

    $expected = array();
    $required = array('Nume', 'telefon', 'email_contact', 'Loc_Munca', 'Adresa');
    $fields = array_merge($required, array('Specialitatea', 'grad-prof', 'cnp-cod_parafa', 'nume_firma', 'cif', 'acceptance-64', 'taxa-ped', 'pret_ab', 'taxa-eur', 'Taxa-inregistrare', 'tip-taxa-mail', 'tip-plata', 'nr-fact', 'your-code', 'link-plata-mail', 'data-bnr', 'curs-bnr', 'aslm-webinar-status'));
    foreach ($fields as $field) {
        if (!isset($data[$field])) $data[$field] = '';
        if (!is_string($data[$field]) || (in_array($field, $required, true) && trim($data[$field]) === '')) {
            $errors['taxa-ped'] = 'Datele formularului sunt incomplete. Verificați câmpurile completate.';
        } else {
            $expected[$field] = stripslashes($data[$field]);
        }
    }
    $GLOBALS['aslm_webinar_submission'] = array(
        'errors' => $errors,
        'expected' => $expected,
        'form_title' => stripslashes($form->title()),
        'submit_time' => null,
        'persisted' => false,
        'free' => $free,
        'payment' => $payment,
    );
    return $data;
}
add_filter('wpcf7_posted_data', 'aslm_webinar_normalize', 30);

function aslm_webinar_validate($result, $tags) {
    $form = aslm_webinar_current_form();
    $state = isset($GLOBALS['aslm_webinar_submission']) ? $GLOBALS['aslm_webinar_submission'] : null;
    if (!$form || (int) $form->id() !== 2982 || !$state) return $result;
    foreach ($tags as $tag) {
        if (isset($state['errors'][$tag->name])) $result->invalidate($tag, $state['errors'][$tag->name]);
    }
    return $result;
}
add_filter('wpcf7_validate', 'aslm_webinar_validate', 30, 2);

function aslm_webinar_capture_save($record) {
    $state = isset($GLOBALS['aslm_webinar_submission']) ? $GLOBALS['aslm_webinar_submission'] : null;
    if (!$state || $state['errors']) return $record;
    if (!isset($record->WPCF7_ContactForm, $record->posted_data['your-code'], $record->submit_time)) return $record;
    if ((int) $record->WPCF7_ContactForm->id() !== 2982 || $record->posted_data['your-code'] !== $state['expected']['your-code'] || !is_numeric($record->submit_time)) return $record;
    $GLOBALS['aslm_webinar_submission']['submit_time'] = (string) $record->submit_time;
    return $record;
}
add_filter('cfdb_form_data', 'aslm_webinar_capture_save', 100);

function aslm_webinar_is_persisted($state) {
    global $wpdb;
    if (!$state['submit_time'] || !$state['expected'] || $state['errors']) return false;
    $rows = $wpdb->get_results($wpdb->prepare(
        "SELECT field_name, field_value FROM {$wpdb->prefix}cf7dbplugin_submits WHERE submit_time = %s AND form_name = %s",
        $state['submit_time'], $state['form_title']
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

function aslm_webinar_persistence_error() {
    return 'Nu putem confirma înregistrarea cererii. Nu efectuați plata. Contactați contact@aslm.ro înainte de a retrimite formularul.';
}

function aslm_webinar_require_persistence($form, &$abort, $submission) {
    $state = isset($GLOBALS['aslm_webinar_submission']) ? $GLOBALS['aslm_webinar_submission'] : null;
    if ((int) $form->id() !== 2982) return;
    $persisted = $state && aslm_webinar_is_persisted($state);
    if ($state) $GLOBALS['aslm_webinar_submission']['persisted'] = $persisted;
    if (!$persisted) {
        $abort = true;
        $submission->set_status('aborted');
        $submission->set_response(aslm_webinar_persistence_error());
    }
}
add_action('wpcf7_before_send_mail', 'aslm_webinar_require_persistence', 30, 3);

function aslm_webinar_response($response, $result) {
    if (!isset($result['contact_form_id'], $result['status']) || (int) $result['contact_form_id'] !== 2982 || $result['status'] !== 'mail_sent') return $response;
    $state = isset($GLOBALS['aslm_webinar_submission']) ? $GLOBALS['aslm_webinar_submission'] : null;
    if (!$state || !$state['persisted'] || !aslm_webinar_is_persisted($state)) {
        $response['status'] = 'aborted';
        $response['message'] = aslm_webinar_persistence_error();
        unset($response['aslmPaymentUrl'], $response['aslmWebinarState']);
        return $response;
    }
    if ($state['free']) {
        $response['aslmWebinarState'] = 'member_pending';
        $response['message'] = 'Solicitarea a fost înregistrată. ASLM va verifica apartenența înainte de acordarea accesului. Nu este necesară plata.';
        unset($response['aslmPaymentUrl']);
    } else {
        $response['aslmWebinarState'] = $state['payment'] === 'Card' ? 'card_ready' : 'transfer_pending';
        $response['message'] = 'Înscrierea a fost înregistrată. Veți primi proforma pe email. Accesul se acordă după confirmarea plății.';
        if ($state['payment'] === 'Card') $response['aslmPaymentUrl'] = $state['expected']['link-plata-mail'];
    }
    return $response;
}
add_filter('wpcf7_ajax_json_echo', 'aslm_webinar_response', 30, 2);

function aslm_webinar_form_properties($properties, $form) {
    if ((int) $form->id() !== 2982) return $properties;
    $markup = file_get_contents(__DIR__ . '/aslm-webinar-registration/form.html');
    if (!is_string($markup) || $markup === '') throw new RuntimeException('Webinar form template is unavailable.');
    $properties['form'] = $markup;
    $state = isset($GLOBALS['aslm_webinar_submission']) ? $GLOBALS['aslm_webinar_submission'] : null;
    if ($state && $state['free']) {
        $details = '<p>Nume: [Nume]<br>Specialitatea: [Specialitatea]<br>Grad profesional: [grad-prof]<br>CUIM: [cnp-cod_parafa]<br>Telefon: [telefon]<br>Email: [email_contact]<br>Locul de muncă: [Loc_Munca]<br>Oraș, județ: [Adresa]<br>Înregistrare: [Taxa-inregistrare]<br>Data: [data-bnr]<br>Referință: [your-code]</p>';
        foreach (array('mail', 'mail_2') as $key) {
            $properties[$key]['subject'] = 'Webinar ASLM - solicitare membru, în așteptarea verificării';
            $properties[$key]['body'] = '<p>Solicitarea de participare gratuită la webinar a fost înregistrată. ASLM va verifica apartenența înainte de acordarea accesului. Nu este necesară plata.</p>' . $details;
            $properties[$key]['attachments'] = '';
            $properties[$key]['use_html'] = true;
        }
    }
    return $properties;
}
add_filter('wpcf7_contact_form_properties', 'aslm_webinar_form_properties', 30, 2);

function aslm_webinar_route() {
    $path = parse_url(isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '', PHP_URL_PATH);
    if ($path !== '/webinar/' && $path !== '/webinar') return;
    if (!is_page(2980)) return;
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
    $closed = aslm_webinar_closed(time());
    $markup = '';
    try {
        if (!class_exists('WPCF7_ContactForm') || !class_exists('CF7DBPlugin') || !function_exists('wpcf7_enqueue_scripts') || !function_exists('wpcf7_enqueue_styles')) {
            throw new RuntimeException('Webinar form dependencies are unavailable.');
        }
        if (!$closed) {
            $form = WPCF7_ContactForm::get_instance(2982);
            if (!$form) throw new RuntimeException('Webinar form is unavailable.');
            $markup = $form->form_html();
            if (strpos($markup, 'name="aslm-webinar-version"') === false || strpos($markup, 'name="taxa-ped"') === false) throw new RuntimeException('Webinar form did not render completely.');
        }
    } catch (Throwable $error) {
        error_log('[aslm-webinar-registration] Form rendering failed.');
        status_header(503);
        header('Content-Type: text/html; charset=UTF-8');
        if ($method !== 'HEAD') echo '<!doctype html><html lang="ro"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Înscriere webinar ASLM</title><p>Formularul nu este disponibil momentan. Contactați <a href="mailto:contact@aslm.ro">contact@aslm.ro</a>.</p></html>';
        exit;
    }
    show_admin_bar(false);
    status_header(200);
    header('Content-Type: text/html; charset=UTF-8');
    if ($method === 'HEAD') exit;
    wpcf7_enqueue_scripts();
    wpcf7_enqueue_styles();
    $assets = plugin_dir_url(__FILE__) . 'aslm-webinar-registration/';
    wp_enqueue_style('aslm-webinar-registration', $assets . 'form.css', array(), '1.0.2');
    wp_enqueue_script('aslm-webinar-registration', $assets . 'form.js', array('contact-form-7'), '1.0.0', true);
    require __DIR__ . '/aslm-webinar-registration/page.php';
    exit;
}
add_action('template_redirect', 'aslm_webinar_route', 0);
