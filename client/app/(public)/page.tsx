import React from 'react';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import CTA from '@/components/sections/CTA';
import { APP_CONFIG } from '@/lib/constants';

export const metadata = {
  title: `Home | ${APP_CONFIG.name}`,
  description: `Welcome to ${APP_CONFIG.name}, ${APP_CONFIG.tagline}`,
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Features />
      <CTA />
    </main>
  );
}
