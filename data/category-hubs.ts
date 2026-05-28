export type CategoryHub = {
  targetKeyword: string;
  title: string;
  summary: string;
  paragraphs: string[];
  relatedGuide: { href: string; label: string };
};

export const categoryHubs: Record<string, CategoryHub> = {
  alimentatie: {
    targetKeyword: "alimentație sănătoasă",
    title: "Alimentație sănătoasă în medicina stilului de viață",
    summary:
      "Un hub ASLM pentru nutriție, prevenție și schimbări alimentare sustenabile.",
    paragraphs: [
      "Alimentație sănătoasă nu înseamnă o listă rigidă de alimente permise și interzise, ci un mod de a construi mese care susțin energia, greutatea, sănătatea cardiometabolică și starea psihică. În medicina stilului de viață, nutriția este abordată ca un pilon clinic: contează calitatea alimentelor, ritmul meselor, mediul social, accesul la alimente, preferințele culturale și capacitatea persoanei de a menține schimbarea.",
      "Pentru majoritatea oamenilor, direcția practică este simplă: mai multe alimente integrale, mai multe legume, fructe, leguminoase, cereale integrale, nuci și semințe, mai puține produse ultraprocesate, zahăr adăugat, exces de sare și grăsimi de slabă calitate. Aceste principii trebuie adaptate la vârstă, diagnostic, tratament, buget, tradiții alimentare și nivel de activitate fizică.",
      "ASLM tratează nutriția ca parte a unui tablou mai larg. O persoană poate avea o alimentație bună, dar dacă doarme puțin, este sedentară sau trăiește cu stres cronic, rezultatele pot fi limitate. De aceea, articolele din această categorie leagă alimentația de sănătatea mentală, inflamație, prevenția bolilor cronice și obiceiurile zilnice.",
      "Pentru profesioniștii din sănătate, categoria oferă un punct de plecare pentru educația pacientului. Comunicarea eficientă despre alimentație evită rușinea, promisiunile nerealiste și soluțiile rapide. Accentul cade pe obiective mici, măsurabile și repetabile: o porție de legume în plus, alegerea unei gustări mai bune, planificarea cumpărăturilor sau reducerea băuturilor îndulcite.",
      "Pentru cititori, recomandarea ASLM este să privească alimentația ca pe o investiție pe termen lung, nu ca pe o dietă temporară. Când schimbarea este construită gradual și susținută de familie, comunitate și profesioniști, șansele de menținere cresc semnificativ.",
    ],
    relatedGuide: { href: "/ghid/alimentatie-sanatoasa", label: "Citește ghidul ASLM despre alimentație sănătoasă" },
  },
  "activitate-fizica": {
    targetKeyword: "activitate fizică",
    title: "Activitate fizică pentru prevenție și sănătate pe termen lung",
    summary:
      "Un hub ASLM despre mișcare, aderență, sănătate cardiometabolică și funcție zilnică.",
    paragraphs: [
      "Activitate fizică înseamnă mai mult decât sport organizat. Include mersul pe jos, urcatul scărilor, activități în aer liber, exerciții de forță, mobilitate, dans, înot, ciclism sau orice formă de mișcare adaptată posibilităților persoanei. În medicina stilului de viață, mișcarea este o intervenție clinică esențială pentru prevenția bolilor cronice, sănătatea mentală și menținerea independenței funcționale.",
      "Un plan realist pornește de la nivelul actual, nu de la un ideal de performanță. Pentru cineva sedentar, primele obiective pot fi pauze active, plimbări scurte sau reducerea timpului petrecut pe scaun. Pentru o persoană deja activă, accentul poate trece spre progres, varietate, recuperare și prevenirea accidentărilor.",
      "Mișcarea susține sănătatea cardiovasculară, sensibilitatea la insulină, compoziția corporală, sănătatea oaselor, somnul și reglarea stresului. De aceea, articolele ASLM despre activitate fizică nu tratează exercițiul ca pe o obligație izolată, ci ca pe o strategie integrată cu alimentația, somnul și conexiunile sociale.",
      "Aderența este cheia. Mulți oameni știu că mișcarea ajută, dar renunță când programul devine aglomerat sau când obiectivele sunt prea ambițioase. Un plan bun răspunde la întrebări concrete: când fac mișcare, cu cine, cât durează, ce fac când plouă, cum adaptez dacă apar dureri și cum mă întorc după o pauză.",
      "Pentru profesioniști, discuția despre mișcare trebuie să fie specifică și sigură. Recomandarea generală „faceți sport” este rar suficientă. Mai util este un plan gradual, monitorizat, cu alternative pentru vârstă, comorbidități, preferințe și resurse locale.",
    ],
    relatedGuide: { href: "/ghid/activitate-fizica", label: "Citește ghidul ASLM despre activitate fizică" },
  },
  "calitate-somn": {
    targetKeyword: "sănătatea somnului",
    title: "Sănătatea somnului și somnul de calitate",
    summary:
      "Un hub ASLM despre somn, ritm circadian, recuperare și sănătate mentală.",
    paragraphs: [
      "Sănătatea somnului este un pilon central al medicinei stilului de viață. Somnul influențează apetitul, glicemia, tensiunea arterială, imunitatea, memoria, dispoziția și capacitatea de a lua decizii sănătoase. O persoană care doarme insuficient poate avea dificultăți în menținerea alimentației, activității fizice și gestionării stresului, chiar dacă are intenții bune.",
      "Somnul de calitate include durată adecvată, regularitate, continuitate și trezire cu senzație de refacere. Nu toate problemele se rezolvă prin „culcă-te mai devreme”. Uneori există stres persistent, program de muncă, apnee de somn, dureri, consum de alcool, cofeină târzie, lumină seara sau utilizare excesivă a ecranelor.",
      "În această categorie, ASLM explică legătura dintre somn și sănătatea fizică și mentală, ritmul circadian, somnul fragmentat și inflamația sistemică. Scopul este să ofere cititorilor repere clare și profesioniștilor un limbaj util pentru educația pacientului.",
      "Primul pas practic este observarea tiparului personal: ora de culcare, ora de trezire, trezirile nocturne, somnolența diurnă, sforăitul și nivelul de energie. Din acest punct, se pot ajusta lumina, programul, mișcarea, mesele, stimulentele și rutina de seară.",
      "Somnul merită evaluat medical când există sforăit sever, pauze respiratorii observate, somnolență importantă, insomnie persistentă sau oboseală inexplicabilă. Medicina stilului de viață susține rutina, dar nu înlocuiește diagnosticul și tratamentul atunci când există o tulburare de somn.",
    ],
    relatedGuide: { href: "/ghid/sanatatea-somnului", label: "Citește ghidul ASLM despre sănătatea somnului" },
  },
  "gestionare-stres": {
    targetKeyword: "gestionare stres",
    title: "Gestionare stres și sănătate mentală",
    summary:
      "Un hub ASLM despre stres cronic, reglare emoțională și prevenție.",
    paragraphs: [
      "Gestionare stres este una dintre cele mai căutate teme din medicina stilului de viață, pentru că stresul influențează somnul, alimentația, activitatea fizică, relațiile sociale și riscul cardiovascular. Stresul nu este întotdeauna rău; poate mobiliza energie și atenție. Problema apare când devine cronic, intens sau lipsit de perioade reale de recuperare.",
      "Un plan de gestionare a stresului pornește de la identificarea surselor: muncă, familie, boală, lipsă de somn, probleme financiare, supraîncărcare digitală sau izolare. Apoi se stabilesc intervenții mici și repetabile: respirație lentă, mișcare, pauze, conversații de sprijin, psihoterapie, limite digitale, planificare și somn mai regulat.",
      "Articolele ASLM din această categorie abordează stresul cronic, riscul cardiovascular, managementul stresului la locul de muncă, conștientizarea emoțiilor și gândirea pozitivă. Ele sunt educaționale și pot ajuta cititorul să formuleze întrebări mai bune pentru medic, psiholog sau echipa de îngrijire.",
      "Pentru profesioniști, stresul trebuie discutat fără minimalizare. Recomandările vagi de tipul „relaxați-vă” nu sunt suficiente. Este mai util să explorăm contextul, barierele, resursele sociale și semnele care indică nevoia de suport specializat.",
      "ASLM încurajează abordarea stresului ca parte a unui plan complet. Somnul, mișcarea, alimentația, relațiile sociale și evitarea substanțelor nocive pot reduce vulnerabilitatea la stres, iar gestionarea stresului poate face mai ușoară schimbarea celorlalți piloni.",
    ],
    relatedGuide: { href: "/ghid/gestionare-stres", label: "Citește ghidul ASLM despre gestionare stres" },
  },
  "evitare-substante": {
    targetKeyword: "renunțare fumat alcool",
    title: "Renunțare fumat alcool și evitarea substanțelor nocive",
    summary:
      "Un hub ASLM despre tutun, alcool, dependență și înlocuirea obiceiurilor nocive.",
    paragraphs: [
      "Renunțare fumat alcool este o temă dificilă, dar esențială pentru prevenția bolilor cronice. Evitarea substanțelor nocive include reducerea expunerii la tutun, alcool în exces, droguri și folosirea necorespunzătoare a medicamentelor. În medicina stilului de viață, acest pilon este tratat cu empatie, pentru că dependența nu este o simplă lipsă de voință.",
      "Tutunul și alcoolul pot fi legate de stres, somn slab, mediu social, anxietate, obiceiuri vechi sau contexte profesionale. De aceea, schimbarea are șanse mai mari când persoana primește suport, alternative comportamentale și, când este cazul, tratament medical sau psihologic.",
      "Articolele din această categorie explică inflamația asociată fumatului, tehnici pentru renunțarea la tutun și alcool și înlocuirea obiceiurilor nocive cu comportamente sănătoase. Accentul nu este pe vinovăție, ci pe pași concreți și pe recunoașterea momentelor de risc.",
      "O strategie practică poate include identificarea declanșatorilor, reducerea accesului, stabilirea unei date de schimbare, sprijin din partea familiei, consiliere, grupuri de suport și discutarea opțiunilor terapeutice cu medicul. Pentru consumul problematic de alcool sau sevraj, evaluarea medicală este importantă.",
      "Evitarea substanțelor nocive funcționează mai bine când este integrată cu ceilalți piloni. Somnul mai bun, activitatea fizică, relațiile sociale sănătoase și gestionarea stresului pot reduce nevoia de compensare prin fumat sau alcool.",
    ],
    relatedGuide: { href: "/ghid/renuntare-fumat-alcool", label: "Citește ghidul ASLM despre renunțare fumat alcool" },
  },
  "relatii-sociale": {
    targetKeyword: "relații sociale sănătate",
    title: "Relații sociale sănătate și apartenență",
    summary:
      "Un hub ASLM despre conexiuni sociale, izolare și sănătate mentală.",
    paragraphs: [
      "Relații sociale sănătate este o combinație importantă în medicina stilului de viață. Conexiunile sociale influențează stresul, aderența la tratament, activitatea fizică, obiceiurile alimentare, somnul și starea emoțională. O comunitate bună poate susține schimbarea; izolarea poate face mai dificilă menținerea oricărui plan de sănătate.",
      "Relațiile sociale nu înseamnă doar numărul de oameni din jur, ci calitatea sprijinului, sentimentul de apartenență, siguranța emoțională și posibilitatea de a cere ajutor. Pentru vârstnici, studenți, persoane cu boli cronice sau profesioniști epuizați, aceste aspecte pot deveni decisive.",
      "Articolele ASLM din această categorie discută importanța relațiilor sociale la vârstnici, combaterea izolării prin activități de grup și legătura dintre conexiunile sociale și sănătatea mentală. Ele arată cum schimbările mici, dar constante, pot reduce singurătatea și pot crește reziliența.",
      "Din perspectivă practică, o intervenție poate începe cu o conversație săptămânală programată, participarea la un grup, mersul la activități comunitare, voluntariat, mișcare împreună cu altcineva sau reconectarea cu persoane importante. Pentru unii, sprijinul psihologic este necesar pentru a reconstrui încrederea și limitele sănătoase.",
      "ASLM vede relațiile sociale ca pe un pilon clinic și comunitar. Sănătatea nu este doar suma deciziilor individuale; este influențată de familie, loc de muncă, oraș, cultură și acces la comunități care fac schimbarea posibilă.",
    ],
    relatedGuide: { href: "/ghid/relatii-sociale-sanatate", label: "Citește ghidul ASLM despre relații sociale și sănătate" },
  },
};

export function getCategoryHub(categorySlug: string): CategoryHub {
  const hub = categoryHubs[categorySlug];
  if (!hub) {
    throw new Error(`Missing category hub for ${categorySlug}`);
  }

  return hub;
}
