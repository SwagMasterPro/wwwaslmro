<!doctype html>
<html lang="ro">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Înscriere la webinarul ASLM</title>
<?php wp_head(); ?>
</head>
<body class="aslm-webinar-registration">
<main id="aslm-webinar-content">
<a class="aslm-webinar-back" href="https://www.aslm.ro/webinar">Înapoi la prezentarea webinarului</a>
<h1>Înscriere la webinarul ASLM</h1>
<p class="aslm-webinar-intro">Medicina Stilului de Viață – Medicina Viitorului</p>
<p>Online. Acces la lucrări până la <strong>30 noiembrie 2026 inclusiv</strong>.</p>
<section class="aslm-webinar-packages" aria-label="Participare la webinar">
<article class="aslm-webinar-package aslm-webinar-free"><h2>Gratuit</h2><p>Pentru membrii ASLM</p><a href="https://www.aslm.ro/adunarea-generala">Vezi lista membri ASLM</a></article>
<article class="aslm-webinar-package"><h2>100 lei</h2><p>Pentru nonmembrii ASLM</p><a href="https://www.aslm.ro/membri">Devino membru ASLM</a></article>
</section>
<section id="inscriere" aria-labelledby="aslm-webinar-form-title">
<h2 id="aslm-webinar-form-title">Formular de înscriere</h2>
<?php if ($closed): ?>
<p role="status">Înscrierile la acest webinar s-au încheiat.</p>
<?php else: ?>
<p>Câmpurile marcate cu * sunt obligatorii.</p>
<?php echo $markup; ?>
<div id="aslm-webinar-outcome" role="status" aria-live="polite"></div>
<?php endif; ?>
</section>
</main>
<?php wp_footer(); ?>
</body>
</html>
