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
  mirrorPortrait?: boolean;
};

export const webinarLecturers: readonly WebinarLecturer[] = [
  { name: "Prof. dr. Monica Tarcea", image: "/images/council/prof-dr-monica-tarcea.png" },
  { name: "Dr. Felicia Carmen Andrei", image: "/images/webinar/dr-felicia-carmen-andrei.png" },
  { name: "Dr. Sorina Adriana Antohe", image: "/images/council/dr-adriana-sorina-antohe.png" },
  { name: "Conf. dr. Dana Anton-Paduraru", image: "/images/council/conf-dr-dana-teodora-anton-paduraru.png" },
  { name: "Asist. univ. dr. Laura Atyim", image: "/images/council/asist-univ-laura-atyim.png" },
  { name: "Șef lucr. dr. Mihaela Daniela Baltă", image: "/images/webinar/sef-lucr-dr-mihaela-daniela-balta.png" },
  { name: "Dr. Roxana Barbu", image: "/images/webinar/dr-roxana-barbu.png" },
  { name: "Dr. Andreea Ciubotaru", image: "/images/council/dr-andreea-ciubotaru.png" },
  { name: "Conf. dr. Elena Adorata Coman", image: "/images/council/conf-dr-adorata-elena-coman.png" },
  { name: "Conf. dr. Irina Eremia", image: "/images/council/conf-dr-irina-eremia.png" },
  { name: "Șef lucr. dr. Zsuzsanna Farkas-Pall", image: "/images/council/sef-lucr-dr-zsuzsanna-farkas-pall.png" },
  { name: "Prof. dr. Roxana Folescu", image: "/images/council/prof-dr-roxana-folescu.png" },
  { name: "Conf. dr. Daniela Gurguș", image: "/images/council/conf-dr-daniela-gurgus.png" },
  { name: "Asist. univ. dr. Ivona Mihaela Hum", image: "/images/webinar/ivona-mihaela-hum.png" },
  { name: "Asist. univ. dr. Andreea-Narcisa Iana", image: "/images/council/andreea-narcisa-iana.png" },
  { name: "Prof. dr. Andrea Elena Neculau", image: "/images/council/prof-dr-andrea-elena-neculau.png" },
  { name: "Conf. dr. Mirela Nedelescu", image: "/images/council/conf-dr-mirela-nedelescu-2026.png" },
  { name: "Iulia Nistoroiu", image: "/images/webinar/iulia-nistoroiu-2026.png", mirrorPortrait: true },
  { name: "Paul Paraschiv", image: "/images/webinar/paul-paraschiv.png" },
  { name: "Șef lucr. dr. Ionuț Poinăreanu", image: "/images/council/sef-lucr-dr-ionut-poinareanu.png" },
  { name: "Dr. Elena Popa", image: "/images/webinar/dr-elena-popa.png" },
  { name: "Asist. univ. dr. Mihaela Poroch", image: "/images/webinar/dr-mihaela-poroch.png" },
  { name: "Conf. dr. Răzvan Șusan", image: "/images/council/conf-dr-razvan-susan.png" },
  { name: "Prof. dr. Doina Todea", image: "/images/council/prof-dr-doina-adina-todea.png" },
  { name: "Dr. Monica Ungureanu" },
  { name: "Conf. Dr. Corneliu Zeană", image: "/images/webinar/conf-dr-corneliu-zeana.png" },
];

export type WebinarProgramItem = {
  title: string;
  speakers: readonly string[];
};

export const webinarProgram: readonly WebinarProgramItem[] = [
  {
    title: "Metode de determinare a grăsimii corporale și evaluarea obezității",
    speakers: ["Șef lucr. dr. Mihaela Daniela Baltă"],
  },
  {
    title: "Ce punem în farfurie atunci când doare? Rolul alimentației în managementul endometriozei",
    speakers: ["Dr. Andreea Ciubotaru"],
  },
  {
    title: "Dieta antiinflamatorie-algoritm clinic de intervenție",
    speakers: ["Prof. dr. Monica Tarcea"],
  },
  {
    title: "Rolul activității fizice în managementul bolilor netransmisibile",
    speakers: ["Conf. dr. Mirela Nedelescu"],
  },
  {
    title: "Contracția musculară, una dintre cifrele esențiale ale stării de sănătate",
    speakers: ["Dr. Sorina Adriana Antohe"],
  },
  {
    title: "SOMNUL, STRESUL ȘI METABOLISMUL - Triunghiul ascuns al medicinei stilului de viață",
    speakers: ["Conf. dr. Irina Eremia"],
  },
  {
    title: "Somnul - pilonul principal al unui stil de viață sănătos",
    speakers: ["Prof. dr. Doina Todea"],
  },
  {
    title: "Impactul dietelor în sarcină asupra sănătății a două generații",
    speakers: ["Conf. dr. Dana Anton-Paduraru"],
  },
  {
    title: "Era agoniștilor GLP-1: o nouă provocare pentru exercițiul fizic?",
    speakers: ["Conf. dr. Răzvan Șusan"],
  },
  {
    title: "Când ritmul devine terapie: stimularea auditivă ritmică în recuperarea motorie post-AVC",
    speakers: ["Șef lucr. dr. Ionuț Poinăreanu"],
  },
  {
    title: "Noțiuni fundamentale despre macronutrienți și micronutrienți – Elemente de bază ale nutriției pentru practica clinică",
    speakers: ["Șef lucr. dr. Zsuzsanna Farkas-Pall"],
  },
  {
    title: "Când e momentul să începem educația despre sănătate?",
    speakers: ["Paul Paraschiv"],
  },
  {
    title: "Creierul copilului și al adolescentului în era scroll-ului: Ce este real, ce este mit și ce facem în cabinet?",
    speakers: ["Conf. dr. Daniela Gurguș"],
  },
  {
    title: "Omul în centrul medicinei: de la dovezi științifice la îngrijire personalizată și integrativă",
    speakers: [
      "Asist. univ. dr. Laura Atyim",
      "Dr. Felicia Carmen Andrei",
      "Asist. univ. dr. Andreea-Narcisa Iana",
      "Asist. univ. dr. Ivona Mihaela Hum",
      "Conf. Dr. Daniela Gurgus",
      "Prof. Dr. Roxana Folescu",
    ],
  },
  {
    title: "Dincolo de restricții: alimentația sustenabilă în preobezitate și obezitate",
    speakers: ["Prof. dr. Roxana Folescu"],
  },
  {
    title: "De la obiceiuri zilnice la genetică: microbiomul intestinal",
    speakers: [
      "Conf. dr. Elena Adorata Coman",
      "Asist. univ. dr. Mihaela Poroch",
      "Dr. Monica Ungureanu",
      "Dr. Roxana Barbu",
      "Dr. Elena Popa",
    ],
  },
  {
    title: "Comunicarea medic-pacient: de la recomandări la schimbări durabile",
    speakers: ["Iulia Nistoroiu"],
  },
  {
    title: "În jurul magneziului: de la cercetare la practica medicală",
    speakers: ["Conf. Dr. Corneliu Zeană"],
  },
];
