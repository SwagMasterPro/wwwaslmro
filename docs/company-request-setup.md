# Formular companii pe aslm.ro

Decizie actualizată la 27 octombrie 2026: formularul este pe site-ul principal, la `/parteneri-companii#inscriere`. Trimite o solicitare către `contact@aslm.ro`; ASLM verifică datele, facturează și urmărește înscrierea manual. IMM: 1500 RON/an; Corporate: 3000 RON/an; Media: gratuit. Nu există checkout sau confirmare automată a parteneriatului. Înscrierile individuale rămân pe WordPress.

## Configurare de către George

Introduceți secretele direct în proiectul Vercel `wwwaslmro`, nu în Git, email sau conversații:

| Variabilă | Valoare |
| --- | --- |
| `COMPANY_SMTP_HOST` | Serverul SMTP autorizat ASLM |
| `COMPANY_SMTP_PORT` | `587` (STARTTLS obligatoriu) sau `465` (TLS) |
| `COMPANY_SMTP_USER` | Utilizatorul SMTP |
| `COMPANY_SMTP_PASS` | Parola SMTP / parola de aplicație |
| `COMPANY_SMTP_FROM` | Expeditor autorizat de serviciul ASLM, de exemplu `ASLM <adresa-autorizata@aslm.ro>` |
| `COMPANY_REQUESTS_ENABLED` | `true` numai în mediul verificat |

Destinatarul este fix: `contact@aslm.ro`. Adresa introdusă în formular devine Reply-To. Formularul nu trimite mesaje automate solicitantului. Configurați SPF/DKIM conform serviciului ASLM existent; nu schimbați înregistrările MX pentru acest formular.

Păstrați activarea dezactivată în producție până la verificarea într-un deployment preview. Variabilele Vercel se aplică la un deployment nou. `GET /api/company-requests` trebuie să răspundă cu `available: true` numai când configurarea necesară este prezentă și activarea explicită este setată. Acesta este un control de configurare, nu o probă de livrare SMTP. Fără configurare, pagina afișează formularul, butonul de trimitere este dezactivat și contactul direct ASLM rămâne disponibil.

## Verificare înainte de activarea producției

1. Configurați și verificați în Vercel Firewall o regulă de limitare pentru `POST /api/company-requests` (de exemplu cinci încercări per IP în zece minute, în limitele planului disponibil). Aplicația are un honeypot, validare strictă, control de origine, limită de 16 KiB și un throttle în memorie; acesta din urmă nu este distribuit între instanțe și nu înlocuiește regula platformei.
2. Cu acordul echipei ASLM pentru mesajele de test, trimiteți IMM, Corporate și Media din preview. Verificați în inboxul `contact@aslm.ro` toate câmpurile, descrierea, site-ul, datele de facturare distincte, Reply-To, referința și suma calculată pe server. Media trebuie să arate Gratuit, fără cerere de plată.
3. Verificați o eroare de livrare: nu trebuie afișat succes, iar datele trebuie să rămână în formular. Verificați tastatura, mobilul și selectarea pachetului din fiecare card.
4. După confirmarea primirii în inbox, activați variabilele în Production, publicați un deployment nou și repetați o probă de livrare aprobată. Verificați jurnalul furnizorului și inboxul, inclusiv Spam.

## Operare și limite

Inboxul ASLM este evidența solicitărilor; acest flux nu creează o bază de date sau conturi. Mesajul de succes apare numai după acceptarea destinatarului și a mesajului de către SMTP. Acceptarea SMTP nu garantează livrarea finală în inbox; urmăriți respingerile ulterioare prin serviciul de email.

Nu există coadă persistentă în aplicație sau garanție de procesare o singură dată. Un timeout după acceptarea SMTP poate produce o retrimitere; browserul păstrează aceeași referință și Message-ID la reîncercare în formularul deschis. Operatorul trebuie să deduplice după referință. Reîncărcarea paginii pornește o solicitare nouă. Nu se păstrează date personale în localStorage sau în loguri.

Testele automate folosesc un server SMTP local: respingere, reîncercare, toate cele trei pachete, destinatar fix, câmpuri separate și lipsa unei plăți. Ele nu confirmă livrarea prin serviciul ASLM. Activarea și proba în inbox rămân dependente de configurarea lui George.
