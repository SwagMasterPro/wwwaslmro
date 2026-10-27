export const webinarReasons = [
  { title: "O abordare integrată a bolilor cronice", text: "Medicina stilului de viață privește pacientul dincolo de diagnosticul individual, integrând factorii comportamentali și de mediu care pot influența riscul, evoluția și controlul bolilor cronice." },
  { title: "De la dovezi științifice la practica medicală", text: "Webinarul urmărește legătura dintre datele științifice și aplicabilitatea clinică, cu accent pe modul în care intervențiile asupra stilului de viață pot completa prevenția și managementul pacientului cu boală cronică." },
  { title: "Metode și instrumente utile în evaluarea și managementul pacientului", text: "Descoperi metode și instrumente cu aplicabilitate practică, inclusiv metode de determinare a grăsimii corporale, importanța acestora în evaluarea și definirea obezității, precum și avantajele și limitele fiecărei metode." },
  { title: "Perspectivă interdisciplinară", text: "Conținutul este relevant pentru diferite specialități medicale și pentru profesioniștii implicați în prevenție, tratament, recuperare și educația pentru sănătate." },
];
export const webinarLearning = [
  { title: "Fundamentele științifice ale medicinei stilului de viață", text: "Care sunt mecanismele prin care factorii legați de stilul de viață influențează sănătatea și riscul de apariție sau evoluție a bolilor cronice." },
  { title: "Relația dintre cei 6 piloni și patologia cronică", text: "Cum pot alimentația, activitatea fizică, somnul, stresul, consumul de substanțe nocive și relațiile sociale să influențeze factori de risc și rezultate relevante pentru sănătate." },
  { title: "Importanța intervențiilor integrate", text: "De ce abordarea unui singur factor poate fi insuficientă și cum pot fi corelate intervențiile asupra mai multor componente ale stilului de viață." },
  { title: "Rolul medicinei stilului de viață în prevenție", text: "Cum poate fi utilizată această abordare în prevenția primară, în identificarea și reducerea factorilor de risc modificabili." },
  { title: "Aplicabilitatea în managementul bolilor cronice", text: "Cum pot intervențiile asupra stilului de viață completa managementul medical al pacientului și contribui la atingerea obiectivelor terapeutice." },
  { title: "Transpunerea dovezilor în recomandări pentru pacient", text: "Cum putem transforma informația științifică în recomandări realiste, individualizate și sustenabile, adaptate profilului și nevoilor pacientului." },
];
export type WebinarLecturer = {
  name: string;
  image?: string;
};

export const webinarLecturers: readonly WebinarLecturer[] = [
  { name: "Dr. Felicia Carmen Andrei" },
  { name: "Dr. Sorina Adriana Antohe", image: "/images/council/dr-adriana-sorina-antohe.png" },
  { name: "Asist. univ. dr. Laura Atyim", image: "/images/council/asist-univ-laura-atyim.png" },
  { name: "Șef Lucr. dr. Mihaela Daniela Baltă" },
  { name: "Dr. Roxana Barbu" },
  { name: "Dr. Andreea Ciubotaru" },
  { name: "Conf. univ. dr. Elena Adorata Coman", image: "/images/council/conf-dr-adorata-elena-coman.png" },
  { name: "Conf. univ. dr. Irina Eremia", image: "/images/council/conf-dr-irina-eremia.png" },
  { name: "Șef lucr. dr. Szuzsanna Farkas-Pal", image: "/images/council/sef-lucr-dr-zsuzsanna-farkas-pall.png" },
  { name: "Prof. Dr. Roxana Folescu", image: "/images/council/prof-dr-roxana-folescu.png" },
  { name: "Conf. dr. Daniela Gurgus", image: "/images/council/conf-dr-daniela-gurgus.png" },
  { name: "Asist. univ. dr. Ivona Mihaela Hum" },
  { name: "Asist. univ. dr. Andreea-Narcisa Iana", image: "/images/council/andreea-narcisa-iana.png" },
  { name: "Prof. Dr. Andrea Elena Neculau", image: "/images/council/prof-dr-andrea-elena-neculau.png" },
  { name: "Conf. Univ. dr. Mirela Nedelescu" },
  { name: "Conf. dr. Dana Anton-Paduraru", image: "/images/council/conf-dr-dana-teodora-anton-paduraru.png" },
  { name: "Paul Paraschiv" },
  { name: "Șef Lucr. dr. Ionuț Poinăreanu", image: "/images/council/sef-lucr-dr-ionut-poinareanu.png" },
  { name: "Dr. Elena Popa" },
  { name: "Asist. univ. dr. Mihaela Poroch" },
  { name: "Conf. dr. Răzvan Șusan", image: "/images/council/conf-dr-razvan-susan.png" },
  { name: "Prof.univ.dr. Monica Tarcea", image: "/images/council/prof-dr-monica-tarcea.png" },
  { name: "Prof. dr. Doina Todea", image: "/images/council/prof-dr-doina-adina-todea.png" },
  { name: "Dr. Monica Ungureanu" },
];

export const webinarTopics: readonly string[] = [
  "Metode de determinare a grăsimii corporale și evaluarea obezității",
  "Ce punem în farfurie atunci când doare? Rolul alimentației în managementul endometriozei",
  "Dieta antiinflamatorie-algoritm clinic de intervenție",
  "Rolul activității fizice în managementul bolilor netransmisibile",
  "Contracția musculară, una dintre cifrele esentiale ale stării de sănătate",
  "SOMNUL, STRESUL ȘI METABOLISMUL - Triunghiul ascuns al medicinei stilului de viață",
  "Somnul - pilonul principal al unui stil de viata sanatos",
  "Impactul dietelor în sarcină asupra sănătății a două generații",
  "Era agoniștilor GLP-1: o nouă provocare pentru exercițiul fizic?",
  "Când ritmul devine terapie: stimularea auditivă ritmică în recuperarea motorie post-AVC",
  "Nutriția in cadrul consultației de medicină de familie",
  "Când e momentul sa începem educația despre sănătate",
  "Creierul copilului și al adolescentului în era scroll-ului: Ce este real, ce este mit și ce facem în cabinet?",
  "Omul în centrul medicinei: de la dovezi științifice la îngrijire personalizată și integrativă",
  "Dincolo de restrictii: alimentatia sustenabila in preobezitate si obezitate",
  "De la obiceiuri zilnice la micro genomica: microbiomul intestinal",
];
