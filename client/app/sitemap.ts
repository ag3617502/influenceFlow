import { MetadataRoute } from 'next';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_CONFIG.baseUrl;

  // Static routes
  const staticRoutes = [
    '',
    ROUTES.about,
    ROUTES.blog,
    ROUTES.login,
    ROUTES.signup,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // In a real app, you would fetch blog slugs from a CMS here
  const blogRoutes = [
    'how-to-land-your-first-brand-deal',
    'optimizing-your-content-strategy',
    'tax-tips-for-creators',
  ].map((slug) => ({
    url: `${baseUrl}${ROUTES.blog}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
