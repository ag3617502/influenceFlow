import type { Metadata, Viewport } from 'next';
import { APP_CONFIG } from '@/lib/constants';
import '@/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_CONFIG.name}`,
    default: `${APP_CONFIG.name} - ${APP_CONFIG.tagline}`,
  },
  description: APP_CONFIG.description,
  keywords: ['influencer', 'management', 'saas', 'deals', 'analytics', 'dashboard'],
  authors: [{ name: 'Antigravity' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
