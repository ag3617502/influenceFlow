import { MetadataRoute } from 'next';
import { APP_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'], // Private routes
    },
    sitemap: `${APP_CONFIG.baseUrl}/sitemap.xml`,
  };
}
