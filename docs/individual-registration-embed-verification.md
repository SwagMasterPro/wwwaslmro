# Verificarea integrării individuale WordPress

## Stare la 27 octombrie 2026

Etapa 1 este publicată. Pagina `https://www.aslm.ro/membri` afișează beneficiile și linkul către formularul WordPress. Încorporarea nu este activată în producție.

Accesul cPanel prin HTTPS funcționează. Instalarea WordPress a fost identificată în `/home/submitme/public_html_membership_aslm`. Autentificarea prin managerul cPanel a declanșat regula Wordfence pentru `/wp-admin/`. Cu aprobarea explicită a utilizatorului, a fost expirată numai blocarea acestei sesiuni, în baza de date și în copia din cache. Wordfence, regulile, conturile și parolele au rămas active și neschimbate. O copie pentru revenire a cache-ului a fost păstrată pe server, în afara directorului public.

Pluginul dedicat este instalat în `wp-content/mu-plugins/`. Ruta `https://membership.aslm.ro/formular-inscriere/` răspunde cu HTTP 200, `Cache-Control: no-store, must-revalidate, no-cache` și `Content-Security-Policy: frame-ancestors https://www.aslm.ro`, fără `X-Frame-Options`. Pagina veche nu a fost redirecționată.

## Infrastructură verificată prin cPanel

- WordPress 6.9.10, PHP 7.4.33, Contact Form 7 5.1.6, tema Vantage cu child theme.
- Formularul individual este Contact Form 7 ID 149, afișat pe pagina publică ID 43.
- Există deja o pagină draft cu slugul `inscriere`, ID 2403. Se păstrează. Nu există o pagină cu slugul `formular-inscriere` în verificarea efectuată.
- Șablonul formularului conține câmpurile existente, shortcodurile pentru numerotare, curs, identificator și pachete, plus scriptul de navigare după trimitere.
- Configurația curentă notifică ASLM și trimite solicitantului proforma în corpul emailului. Destinatarii și SMTP-ul se păstrează.
- Contact Form DB preia datele prin `WPCF7_Submission::get_posted_data()` și le salvează la `wpcf7_before_send_mail`, prioritatea 10.
- `wpcf7_posted_data` rulează înaintea validării și salvării. Versiunea instalată folosește `wpcf7_ajax_json_echo` pentru răspunsul REST.
- Procesarea existentă de la `https://aslm.medscience.center/` caută identificatorul în datele CFDB și folosește suma salvată pentru inițierea checkoutului UniCredit. Fișierele procesării plății nu au fost modificate.

Nu au fost citite înregistrările personale ale membrilor. Inspecția bazei de date a vizat structura tabelelor, configurarea formularului/paginilor și blocarea Wordfence provocată de această sesiune.

## Verificări efectuate

- Testele PHP 7.4 verifică normalizarea taxelor, identificatorul generat pe server, serializarea CFDB, citirea datelor salvate, răspunsurile de succes/eșec și izolarea formularului 149.
- Testele de rută reproduc ordinea reală a constructorului Contact Form 7 5.1.6 și a citirilor de proprietăți, plus procesarea suplimentară a shortcode-urilor pentru curs și proformă. Sunt verificate GET, HEAD, POST și dependențele lipsă.
- Testele JavaScript verifică originea și fereastra mesajelor, redimensionarea în ambele direcții, continuarea explicită cu cardul, transferul, focusul, etichetele și câmpurile de facturare. ESLint pentru fișierele noi a trecut.
- În browser, ruta dedicată afișează formularul complet, reCAPTCHA, acordul etichetat și câmpurile opționale de facturare. Pachetele verificate actualizează suma la `300.00`, respectiv `400.00`. La 320 și 390 px nu apare derulare orizontală. Navigarea cu Tab trece între câmpuri, iar verificarea din sesiunea Chrome nu a raportat erori în consolă.
- Lintul complet și buildul de producție cu integrarea activată în mediul procesului local au trecut: 130 de rute generate. Verificarea SEO a trecut pentru 122 de pagini; verificarea imaginilor a trecut pentru 18 articole, două materiale de presă și nouă fișiere media.
- Testele existente pentru încorporare au trecut (8), la fel și cele pentru solicitările companiilor (6). Variabilele de integrare nu au fost încă setate în producție.
- Redirecționarea opțională a rădăcinii WordPress este pregătită local și dezactivată implicit. Testele verifică GET/HEAD, parametrii UTM acceptați și excluderea celorlalte rute sau cereri.
- Arhiva ZIP a fost respinsă de regula antivirus pentru arhive cu JavaScript. Fișierele individuale au fost acceptate de verificarea antivirus, care a rămas activă.

## Limite ale verificării

Testele locale PHP și JavaScript pot verifica regulile de validare, selecția rutelor, protocolul iframe și tratarea răspunsurilor simulate. Ele nu confirmă funcționarea WordPress în producție, reCAPTCHA, livrarea emailurilor sau rezultatele plății.

Activarea pe site-ul principal și redirecționarea paginii vechi rămân condiționate de verificarea formularului dedicat în browser, a înregistrărilor de test, a proformelor/notificărilor și a continuării către plată. Nu se efectuează debitări reale pentru QA.
