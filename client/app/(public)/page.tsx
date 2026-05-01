import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import CTA from '@/components/sections/CTA';
import { APP_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Home | ${APP_CONFIG.name}`,
  description: `Welcome to ${APP_CONFIG.name}, ${APP_CONFIG.tagline}. Manage brand deals, finances, and growth all in one place.`,
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: APP_CONFIG.name,
    description: APP_CONFIG.description,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: APP_CONFIG.name,
      url: APP_CONFIG.baseUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <Features />
        <CTA />
      </main>
    </>
  );
}
