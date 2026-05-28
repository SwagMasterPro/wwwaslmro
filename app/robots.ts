import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

/**
 * Dynamic Robots.txt for ASLM Website
 * Automatically generates robots.txt at /robots.txt
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
      ...[
        'GPTBot',
        'ChatGPT-User',
        'PerplexityBot',
        'ClaudeBot',
        'anthropic-ai',
        'Google-Extended',
        'Bingbot',
      ].map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
