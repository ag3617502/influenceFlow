/**
 * Application Constants
 */
export const APP_CONFIG = {
  name: 'InfluenceFlow',
  fullName: 'InfluenceFlow SaaS',
  description: 'The ultimate platform for influencers to manage deals, finances, and growth.',
  tagline: 'Professional Influencer Management System',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  social: {
    twitter: '@influenceflow',
    instagram: '@influenceflow',
  },
  contact: {
    email: 'support@influenceflow.com',
  },
};

export const ROUTES = {
  home: '/',
  about: '/about',
  blog: '/blog',
  login: '/login',
  signup: '/signup',
  dashboard: '/dashboard',
  clients: '/clients/all',
  clientDetail: (id: string) => `/clients/all/${id}`,
  deals: '/deals',
  invoices: '/invoices',
  expenses: '/expenses',
  partners: '/partners',
  analytics: '/analytics',
  notifications: '/notifications',
  settings: '/settings',
};
