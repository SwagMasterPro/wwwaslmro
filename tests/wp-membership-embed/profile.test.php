<?php
require __DIR__ . '/../../wordpress/individual-membership-embed/aslm-individual-membership/profile.php';
function check($condition, $message) { if (!$condition) throw new RuntimeException($message); }

$input = array('Nume_familie' => '  Șerban ', 'Prenume' => ' Ana-Maria ', 'Studii' => ' Master în nutriție ', 'Loc_Munca' => ' Educație și cercetare ', 'Nume' => 'Forged invoice name');
$profile = aslm_membership_profile($input);
check($profile['values'] === array('Nume_familie' => 'Șerban', 'Prenume' => 'Ana-Maria', 'Studii' => 'Master în nutriție', 'Loc_Munca' => 'Educație și cercetare', 'Nume' => 'Șerban Ana-Maria'), 'Split names did not produce the authoritative full invoice name.');
check($profile['errors'] === array(), 'Valid profile rejected.');
unset($input['Studii']);
check(aslm_membership_profile($input)['values']['Studii'] === '', 'Omitted studies did not remain optional.');
foreach (array('Nume_familie', 'Prenume', 'Loc_Munca') as $field) {
    foreach (array('', " \n\t ", array('value'), null) as $invalid) {
        $changed = $input; $changed[$field] = $invalid;
        check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Missing or malformed required field accepted: ' . $field);
    }
    $changed = $input; unset($changed[$field]);
    check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Absent required field accepted: ' . $field);
}
foreach (array('Studii', 'Loc_Munca') as $field) {
    $changed = $input; $changed[$field] = str_repeat('ș', 1000);
    check(aslm_membership_profile($changed)['values'][$field] === str_repeat('ș', 1000) && aslm_membership_profile($changed)['errors'] === array(), 'Unicode limit counted bytes instead of characters.');
    $changed[$field] .= 'ț';
    check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Overlong field was not rejected.');
    $slashed = addslashes(str_repeat('ș', 997) . "'\\\"");
    $changed[$field] = $slashed;
    $result = aslm_membership_profile($changed);
    check($result['errors'] === array() && $result['values'][$field] === $slashed, 'WordPress escaping reduced the visible character limit or changed CFDB serialization.');
    $changed[$field] .= 'ț';
    check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Overlong escaped content was accepted.');
    $changed[$field] = array('text');
    check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Array field was accepted.');
    $changed[$field] = "\xC3\x28";
    check(isset(aslm_membership_profile($changed)['errors'][$field]), 'Invalid UTF-8 was accepted.');
}
echo "PASS split profile fields, legacy invoice name, optional studies and Unicode limits\n";
