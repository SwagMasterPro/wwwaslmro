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

Nu au fost citite înregistrările personale ale membrilor. Inspecția bazei de date a vizat structura tabelelor, configurarea formularului/paginilor, blocarea Wordfence provocată de această sesiune și cele două înregistrări tehnice aprobate, descrise mai jos.

## Verificări efectuate

- Revizuirea independentă a implementării a trecut. Au trecut toate cele 8 fișiere de test PHP 7.4 și cele 9 teste JavaScript.
- Testele PHP 7.4 verifică normalizarea taxelor, identificatorul generat pe server, serializarea CFDB, citirea datelor salvate, răspunsurile de succes/eșec și izolarea formularului 149.
- Testele de rută reproduc ordinea reală a constructorului Contact Form 7 5.1.6 și a citirilor de proprietăți, plus procesarea suplimentară a shortcode-urilor pentru curs și proformă. Sunt verificate GET, HEAD, POST și dependențele lipsă.
- Testele JavaScript verifică originea și fereastra mesajelor, redimensionarea în ambele direcții, continuarea explicită cu cardul, transferul, focusul, etichetele și câmpurile de facturare. ESLint pentru fișierele noi a trecut.
- În browser, ruta dedicată afișează formularul complet, reCAPTCHA, acordul etichetat și câmpurile opționale de facturare. Pachetele verificate actualizează suma la `300.00`, respectiv `400.00`. La 320 și 390 px nu apare derulare orizontală. Navigarea cu Tab trece între câmpuri, iar verificarea din sesiunea Chrome nu a raportat erori în consolă.
- Lintul complet și buildul de producție cu integrarea activată în mediul procesului local au trecut: 130 de rute generate. Verificarea SEO a trecut pentru 122 de pagini; verificarea imaginilor a trecut pentru 18 articole, două materiale de presă și nouă fișiere media.
- Testele existente pentru încorporare au trecut (8), la fel și cele pentru solicitările companiilor (6). Variabilele de integrare au fost configurate în Vercel pentru următorul deployment de producție.
- Redirecționarea opțională a rădăcinii WordPress este pregătită local și dezactivată implicit. Testele verifică GET/HEAD, parametrii UTM acceptați și excluderea celorlalte rute sau cereri.
- Arhiva ZIP a fost respinsă de regula antivirus pentru arhive cu JavaScript. Fișierele individuale au fost acceptate de verificarea antivirus, care a rămas activă.

## Cele două trimiteri tehnice aprobate

Utilizatorul a aprobat exact două trimiteri reale de test, inclusiv acordul și reCAPTCHA. Ambele au folosit `contact@aslm.ro` și au fost marcate explicit ca teste fără înscriere reală.

| Modalitate | Marcajul înregistrării | Sumă | Număr proformă înregistrat | Rezultat verificat |
| --- | --- | --- | --- | --- |
| Transfer bancar | `TEST TEHNIC ASLM - fara inscriere reala` | 300 RON | 212 | 14 câmpuri salvate verificate; confirmare Contact Form 7 `mail_sent`. |
| Card | `TEST TEHNIC ASLM CARD - fara inscriere reala` | 400 RON | 213 | 14 câmpuri salvate verificate; confirmare Contact Form 7 `mail_sent`; continuare verificată până la checkout. |

reCAPTCHA invizibil a trecut pentru ambele trimiteri. În testul cu cardul, butonul de continuare a primit focus și a deschis procesarea existentă în fereastra principală, prin `target="_top"`. Pagina de la `aslm.medscience.center` a afișat 400 RON. Checkoutul UniCredit a afișat aceeași sumă și proforma 213. Acțiunea Back a revenit la pagina existentă de plată, cu marcajul `__hc-action-cancel` în fragmentul URL.

Nu au fost introduse date de card și nu au fost efectuate debitări. Identificatorii de plată și tokenurile nu sunt incluși în acest document.

Primirea emailurilor în inbox nu este încă confirmată. Raportul de livrare cPanel consultat conține numai intrări mai vechi, fără legătură cu aceste teste, deci nu dovedește livrarea lor. Statusul Contact Form 7 `mail_sent` nu confirmă separat acceptarea fiecărui mesaj de către provider sau primirea proformei și notificărilor în inbox.

## Limite ale verificării

Testele locale PHP și JavaScript verifică regulile de validare, selecția rutelor, protocolul iframe și tratarea răspunsurilor simulate. Dovezile live de mai sus confirmă separat cele două salvări tehnice, trecerea reCAPTCHA, afișarea confirmărilor și continuarea cu suma corectă până la checkout.

Rămân neconfirmate primirea proformelor și notificărilor în inbox, o plată finalizată, tratarea unui eșec de plată și confirmarea anulării în procesarea de pe server. Revenirea prin Back cu fragmentul `__hc-action-cancel` dovedește numai navigarea observată, nu un rezultat financiar sau un callback al procesatorului.

Încorporarea pe site-ul principal rămâne inactivă, iar redirecționarea rădăcinii WordPress rămâne dezactivată. Verificarea formularului în iframe-ul public și activarea finală rămân deschise. Nu se efectuează debitări reale pentru QA.
