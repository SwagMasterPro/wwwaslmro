<?php

function aslm_membership_profile($data) {
    $fields = array(
        'Nume_familie' => array('required' => true, 'limit' => null),
        'Prenume' => array('required' => true, 'limit' => null),
        'Studii' => array('required' => false, 'limit' => 1000),
        'Loc_Munca' => array('required' => true, 'limit' => 1000),
    );
    $values = array();
    $errors = array();
    foreach ($fields as $name => $rules) {
        $value = isset($data[$name]) ? $data[$name] : '';
        if (!is_string($value) || preg_match('//u', $value) !== 1) {
            $errors[$name] = 'Introduceți un text valid.';
            $values[$name] = '';
            continue;
        }
        $value = preg_replace('/\A\s+|\s+\z/u', '', $value);
        $values[$name] = $value;
        if ($rules['required'] && $value === '') {
            $errors[$name] = 'Completați acest câmp.';
        } elseif ($rules['limit'] !== null && preg_match_all('/./us', stripslashes($value)) > $rules['limit']) {
            $errors[$name] = 'Introduceți cel mult 1.000 de caractere.';
        }
    }
    $values['Nume'] = trim($values['Nume_familie'] . ' ' . $values['Prenume']);
    return array('values' => $values, 'errors' => $errors);
}
