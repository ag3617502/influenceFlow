import type { Metadata, Viewport } from 'next';
import { APP_CONFIG } from '@/lib/constants';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/hooks/useTheme';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5', // Brand primary color
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.baseUrl),
  title: {
    template: `%s | ${APP_CONFIG.name}`,
    default: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    'influencer management', 
    'creator economy', 
    'brand deals tracker', 
    'influencer finance', 
    'saas for creators',
    'influencer analytics',
    'campaign management'
  ],
  authors: [{ name: 'InfluenceFlow Team' }],
  creator: 'InfluenceFlow',
  publisher: 'InfluenceFlow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_CONFIG.baseUrl,
    siteName: APP_CONFIG.name,
    title: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
    description: APP_CONFIG.description,
    images: [
      {
        url: '/og-image.png', // Placeholder for OG image
        width: 1200,
        height: 630,
        alt: APP_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
    description: APP_CONFIG.description,
    creator: APP_CONFIG.social.twitter,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
