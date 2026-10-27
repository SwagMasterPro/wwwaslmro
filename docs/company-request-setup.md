# Formular companii pe aslm.ro

Decizie actualizată la 27 octombrie 2026: formularul este pe site-ul principal, la `/parteneri-companii#inscriere`. Trimite o solicitare către `contact@aslm.ro`; ASLM verifică datele, facturează și urmărește înscrierea manual. IMM: 1500 RON/an; Corporate: 3000 RON/an; Media: gratuit. Nu există checkout sau confirmare automată a parteneriatului. Înscrierile individuale rămân pe WordPress.

## Configurare în Vercel

Introduceți secretele direct în proiectul Vercel `wwwaslmro`, nu în Git, email sau conversații:

| Variabilă | Valoare |
| --- | --- |
| `COMPANY_SMTP_HOST` | Serverul SMTP autorizat ASLM |
| `COMPANY_SMTP_PORT` | `587` (STARTTLS obligatoriu) sau `465` (TLS) |
| `COMPANY_SMTP_USER` | Utilizatorul SMTP |
| `COMPANY_SMTP_PASS` | Parola SMTP / parola de aplicație |
| `COMPANY_SMTP_FROM` | Expeditor autorizat de serviciul ASLM, de exemplu `ASLM <adresa-autorizata@aslm.ro>` |
| `COMPANY_REQUESTS_ENABLED` | `true` numai în mediul verificat |

Destinatarul notificării interne este fix: `contact@aslm.ro`. George a confirmat că adresa este un alias către Mihai și Iulia; nu este inboxul operatorului site-ului. Adresa introdusă în formular devine Reply-To pentru notificarea internă. După acceptarea notificării interne de către SMTP, formularul trimite solicitantului un email separat cu pachetul, cotizația și referința. Acesta are Reply-To `contact@aslm.ro` și precizează că parteneriatul nu este încă activat. Nu include descrierea liberă sau datele fiscale. Configurați SPF/DKIM conform serviciului ASLM existent; nu schimbați înregistrările MX pentru acest formular.

Datele furnizate de George au fost salvate ca secrete Production în Vercel. TLS și autentificarea SMTP au fost verificate. Nu păstrați parola în acest document.

## Verificare și activare — 27 octombrie 2026

- Test autorizat prin endpointul real `/api/company-requests`, într-un deployment Vercel Production pregătit fără mutarea domeniilor: `dpl_HSYYPRmYPQ2qiXk6g61kc1gbrBPD`, sursă echivalentă commitului `a839814`.
- O singură solicitare Media, cu nume și descriere marcate TEST / NU PROCESAȚI / NU FACTURAȚI; referință `253164ae-57a6-41b0-ac49-aab5ba6d6120`. Răspuns HTTP 200, `confirmationSent: true`. Au fost generate notificarea către aliasul ASLM și confirmarea separată către solicitant.
- Confirmarea a fost citită în Gmail, etichetată INBOX, cu referința corectă, cotizație Gratuit, Reply-To `contact@aslm.ro` și SPF/DKIM/DMARC toate PASS. Acesta este testul real de livrare; celelalte pachete și eșecurile sunt acoperite de testele automate locale.
- Pentru notificarea către ASLM, avem acceptarea SMTP; inboxurile finale ale lui Mihai și Iulia nu sunt accesibile pentru verificare directă. Confirmarea lor rămâne o verificare operațională distinctă.
- Regula Vercel Firewall `ASLM company requests rate limit` este publicată: maximum cinci POST-uri per IP în 600 secunde pentru acest endpoint. Cererile de verificare cu payload gol au primit HTTP 429 de la platformă la atingerea limitei, fără trimitere de emailuri.
- `COMPANY_REQUESTS_ENABLED=true` este salvat în Production. Deploymentul testat a fost promovat pe domeniile publice; formularul este activ. Testul nu a creat conturi, plăți sau înscrieri reale.

Pentru schimbări viitoare de configurare, verificați într-un deployment fără domeniile publice înainte de promovare. Variabilele Vercel se aplică la un deployment nou. `GET /api/company-requests` trebuie să răspundă cu `available: true` numai când configurarea necesară este prezentă și activarea explicită este setată. Acesta este un control de configurare, nu o probă de livrare SMTP. Fără configurare, pagina afișează formularul, butonul de trimitere este dezactivat și contactul direct ASLM rămâne disponibil.

## Verificare înainte de activarea producției

1. Configurați și verificați în Vercel Firewall o regulă de limitare pentru `POST /api/company-requests` (de exemplu cinci încercări per IP în zece minute, în limitele planului disponibil). Aplicația are un honeypot, validare strictă, control de origine, limită de 16 KiB și un throttle în memorie; acesta din urmă nu este distribuit între instanțe și nu înlocuiește regula platformei.
2. Cu acordul echipei ASLM pentru mesajele de test, trimiteți IMM, Corporate și Media din preview. Verificați la destinatarii aliasului `contact@aslm.ro` toate câmpurile, descrierea, site-ul, datele de facturare distincte, Reply-To, referința și suma calculată pe server. Verificați separat confirmarea în inboxul solicitantului și Reply-To către ASLM. Media trebuie să arate Gratuit, fără cerere de plată.
3. Verificați o eroare de livrare: nu trebuie afișat succes, iar datele trebuie să rămână în formular. Verificați tastatura, mobilul și selectarea pachetului din fiecare card.
4. După confirmarea primirii în inbox, activați variabilele în Production, publicați un deployment nou și repetați o probă de livrare aprobată. Verificați jurnalul furnizorului și inboxul, inclusiv Spam.

## Operare și limite

Inboxul ASLM este evidența solicitărilor; acest flux nu creează o bază de date sau conturi. Mesajul de succes apare numai după acceptarea destinatarului și a mesajului de către SMTP. Acceptarea SMTP nu garantează livrarea finală în inbox; urmăriți respingerile ulterioare prin serviciul de email.

Nu există coadă persistentă în aplicație sau garanție de procesare o singură dată. Un timeout după acceptarea SMTP poate produce o retrimitere; browserul păstrează aceeași referință și Message-ID la reîncercare în formularul deschis. Operatorul trebuie să deduplice după referință. Dacă notificarea internă este acceptată, dar confirmarea solicitantului eșuează, răspunsul rămâne de succes pentru solicitare, cu `confirmationSent: false`: pagina explică să nu se retrimită formularul. Nu există reîncercare automată a confirmării. Reîncărcarea paginii pornește o solicitare nouă. Nu se păstrează date personale în localStorage sau în loguri.

Testele automate folosesc un server SMTP local: respingere, reîncercare, toate cele trei pachete, destinatari separați, câmpuri separate și lipsa unei plăți. Sunt verificate și erorile confirmării după acceptarea solicitării interne. Ele nu confirmă livrarea prin serviciul ASLM; dovada testului real este în secțiunea de verificare de mai sus.
