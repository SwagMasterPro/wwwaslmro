import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';
import { experts } from '@/data/experts';

/**
 * Dynamic Sitemap for ASLM Website
 * Automatically generates sitemap.xml at /sitemap.xml
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;
  const lastModified = new Date();
  const expertPages = experts.map((expert) => ({
    url: `${baseUrl}${expert.profilePath}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.55,
  }));

  return [
    // Main Pages
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/despre`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/misiune`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/echipa`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consiliul-director`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/membri`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/medicina-stilului-de-viata`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/medicina-stilului-de-viata-vs-medicina-preventiva`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/revizie-medicala`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/internship`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/publicatii`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/evenimente`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/evenimente/credite-emc`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/lifestyle-medicine-romania`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/gestionare-stres`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/sanatatea-somnului`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/alimentatie-sanatoasa`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/activitate-fizica`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/renuntare-fumat-alcool`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/ghid/relatii-sociale-sanatate`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/y-aslm`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/conferinte`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/comunicari-orale`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/ai-context.md`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...expertPages,

    // Blog Main and Categories
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/alimentatie`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/activitate-fizica`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/calitate-somn`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/gestionare-stres`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/relatii-sociale`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/evitare-substante`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // Blog Articles - Alimentație
    {
      url: `${baseUrl}/blog/alimentatie/alimentatia-echilibrata-cheia-unei-vieti-active`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/alimentatie/deficientele-nutritionale-si-riscul-de-depresie`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/alimentatie/rolul-alimentatiei-in-prevenirea-bolilor`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog Articles - Activitate Fizică
    {
      url: `${baseUrl}/blog/activitate-fizica/cum-activitatile-in-aer-liber-reduc-stresul`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/activitate-fizica/tehnici-de-automotivare-pentru-antrenamente`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/activitate-fizica/beneficiile-inotului-pentru-sanatatea-pulmonara`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog Articles - Calitate Somn
    {
      url: `${baseUrl}/blog/calitate-somn/cum-impacteaza-somnul-sanatatea-fizica-si-mentala`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/calitate-somn/ritmul-circadian-de-ce-conteaza-ora-de-culcare`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/calitate-somn/somnul-fragmentat-si-inflamatia-sistemica`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog Articles - Gestionare Stres
    {
      url: `${baseUrl}/blog/gestionare-stres/stresul-cronic-si-riscul-cardiovascular`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/gestionare-stres/managementul-stresului-la-locul-de-munca`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/gestionare-stres/constientizarea-emotiilor-si-gandirea-pozitiva`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog Articles - Relații Sociale
    {
      url: `${baseUrl}/blog/relatii-sociale/importanta-relatiilor-sociale-la-varstnici`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/relatii-sociale/combaterea-izolarii-sociale-beneficiile-activitatilor-de-grup`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/relatii-sociale/conexiunile-sociale-si-sanatatea-mentala`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Blog Articles - Evitare Substanțe
    {
      url: `${baseUrl}/blog/evitare-substante/fumatul-si-inflamatia-cronica`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/evitare-substante/tehnici-pentru-renuntarea-la-tutun-si-alcool`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/evitare-substante/inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
