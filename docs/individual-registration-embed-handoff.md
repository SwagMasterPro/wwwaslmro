# George — încorporarea formularului individual ASLM

## Sursa și ordinea publicării

Feedback Iulia Nistoroiu, 27 octombrie 2026, email „Site ASLM - actualizari la sectiunea Membri”, cele 7 slide-uri din „Feedback site_ASLM.pptx” și bannerele Membri-ASLM.png / Parteneri-ASLM.png. [Prezentarea din Drive](https://docs.google.com/presentation/d/1C8nNX5rPeq1Vk6u8LQS6xCeTu2cAm8iG/edit) este identică atașamentului.

Etapa 1 publică designul și beneficiile actualizate la https://www.aslm.ro/membri și https://www.aslm.ro/parteneri-companii. Sub tabelul membrilor există momentan un singur link către formularul WordPress. Formularul companiilor este deja activ pe site-ul principal, cu facturare manuală și confirmare separată către solicitant; nu trebuie recreat în WordPress și nu necesită alte schimbări SMTP.

Etapa 2 depinde de livrarea și verificarea formularului individual de către operatorul WordPress. Acest brief este local; nu a fost trimis prin email. Înlocuiește instrucțiunea anterioară de a menține un al doilea tabel de beneficii pe membership.aslm.ro.

## Ce pregătește George

- Un URL HTTPS stabil pe membership.aslm.ro care afișează numai formularul individual existent și mesajele sale. Fără tabel de beneficii, banner, meniu sau footer duplicat. Nu copiem formularul ca HTML static: păstrăm procesarea Contact Form 7, proforma și integrarea MedScience.
- Păstrarea câmpurilor și validării existente: nume și prenume, specialitate, grad profesional, CUIM, telefon, email, loc de muncă, oraș/județ, categoria/taxa de înregistrare, acordul cu termenii și condițiile și modalitatea de plată. Păstrarea câmpurilor interne necesare procesării; valorile pentru identificare, factură și plată sunt generate de infrastructura existentă, nu de pagina aslm.ro.
- Pachetele individuale rămân Afiliați 400 RON/an, Titulari 400 RON/an, Asociați 300 RON/an. Se păstrează proforma și opțiunile Card / Transfer bancar. Verificarea sumelor trebuie făcută în procesarea de pe server, nu doar în câmpuri HTML.
- Etichete asociate câmpurilor, erori lizibile, date păstrate după erori recuperabile, navigare cu tastatura și afișare fără derulare orizontală la 320/390 px.
- Permisiune de încorporare pentru https://www.aslm.ro prin politica frame-ancestors, fără un X-Frame-Options incompatibil. Verificarea reCAPTCHA, sesiunii și cookie-urilor în iframe pe domeniul final.
- Informațiile de plată de sub vechiul tabel rămân disponibile. Cele despre durata calității de membru, proformă și dovada plății sunt deja afișate în pagina principală; evităm dublarea lor în antetul formularului încorporat. Păstrăm mesajele aferente butonului de trimitere și rezultatelor.

## Contract de integrare pentru etapa 2

George returnează URL-ul verificat și confirmarea verificărilor de mai jos. Nu configurăm un URL presupus și nu publicăm un iframe gol înainte de acest pas.

- Iframe cu titlu accesibil „Formular de înscriere în ASLM”, sub titlul „ÎNSCRIERE ÎN ASLM” și subtitlul „Societatea Academică de Medicina Stilului de Viață”. Link alternativ către același URL, pentru deschidere directă.
- La încărcare și la schimbarea dimensiunii, pagina WordPress trimite către `https://www.aslm.ro` mesajul `{ type: "aslm:membership-form:resize", height: <număr de pixeli> }`, pe baza înălțimii documentului. Folosește ResizeObserver, inclusiv pentru apariția erorilor.
- Pagina părinte acceptă mesajul numai dacă `event.origin === "https://membership.aslm.ro"`, `event.source === iframe.contentWindow`, tipul corespunde și înălțimea este finită, între 200 și 10000 px. Nu acceptă HTML, scripturi sau URL-uri de navigare prin acest mesaj. Listener-ul se elimină la demontare.
- Plata cu cardul trebuie deschisă în fereastra principală către integrarea existentă `https://aslm.medscience.center/`, nu încărcată în iframe. George verifică navigarea după trimiterea asincronă, inclusiv restricțiile browserului; dacă este necesară o nouă acțiune a utilizatorului, formularul afișează un link explicit de continuare către plata validată de server, cu target `_top`.
- Confirmarea pentru transfer bancar rămâne în formular și nu reîncarcă pagina publică cu tabelul vechi în iframe. URL-urile de revenire după plată trebuie verificate în fluxul real al procesatorului.

## Acceptare și retragerea paginii redundante

1. Verificați fiecare categorie și suma corectă în proformă și în cererea de plată. Verificați câmpurile obligatorii, acordul, erorile, reCAPTCHA și accesul cu tastatura în iframe.
2. În mediul de test al operatorului: trimitere acceptată, toate câmpurile înregistrate, proformă, notificare internă și confirmare solicitant. Verificați separat transferul bancar și plata cu cardul: succes, anulare, eșec și revenire. Nu se fac debitări reale pentru QA.
3. După aceste dovezi, înlocuim linkul temporar din aslm.ro cu iframe-ul, păstrând linkul alternativ; publicăm și verificăm din nou desktop/mobil în producție.
4. Numai după validarea încorporării, George elimină tabelul vechi și redirecționează vechea pagină publică de prezentare către https://www.aslm.ro/membri. Păstrează parametrii de atribuire. Redirecționarea este limitată la pagina publică: exclude URL-ul dedicat formularului, POST-urile, API-urile, callback-urile, resursele și /webinar/. Fără bucle de redirecționare în iframe.
5. Dacă integrarea are o regresie, pagina principală revine la linkul direct către formularul dedicat funcțional; nu se șterge infrastructura WordPress sau de plată.

Înregistrarea unei cereri, acceptarea SMTP, primirea efectivă în inbox și plata confirmată sunt dovezi distincte. Etapa 1 nu confirmă integrarea individuală încorporată sau aceste rezultate de etapă 2.
