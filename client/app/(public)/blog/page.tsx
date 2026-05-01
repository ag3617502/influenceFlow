import React from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import styles from './BlogPage.module.css';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

export const metadata = {
  title: `Blog | ${APP_CONFIG.name}`,
  description: 'Latest tips, news, and insights for influencers and creators.',
};

// Mock data for blog posts
const posts = [
  {
    slug: 'how-to-land-your-first-brand-deal',
    title: 'How to Land Your First Brand Deal',
    excerpt: 'A comprehensive guide for micro-influencers looking to monetize their content.',
    date: 'May 10, 2026',
    category: 'Guides',
  },
  {
    slug: 'optimizing-your-content-strategy',
    title: 'Optimizing Your Content Strategy',
    excerpt: 'Learn how to use analytics to drive engagement and growth on social media.',
    date: 'May 8, 2026',
    category: 'Strategy',
  },
  {
    slug: 'tax-tips-for-creators',
    title: 'Tax Tips for Creators',
    excerpt: 'Everything you need to know about managing your finances as an influencer.',
    date: 'May 5, 2026',
    category: 'Finance',
  },
];

export default function BlogPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1>Creator Insights</h1>
          <p>Practical advice and news for the modern influencer.</p>
        </div>
      </header>

      <section className={styles.grid}>
        <div className={styles.container}>
          <div className={styles.posts}>
            {posts.map((post) => (
              <Link href={`${ROUTES.blog}/${post.slug}`} key={post.slug}>
                <Card 
                  hoverable 
                  title={post.title} 
                  description={post.excerpt}
                  footer={
                    <div className={styles.meta}>
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                  }
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
