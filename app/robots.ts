import { MetadataRoute } from 'next';

/**
 * Dynamic Robots.txt for ASLM Website
 * Automatically generates robots.txt at /robots.txt
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [],
    },
    sitemap: 'https://aslm.ro/sitemap.xml',
  };
}
