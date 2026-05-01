import React from 'react';
import { Metadata } from 'next';
import styles from './PostPage.module.css';
import { APP_CONFIG } from '@/lib/constants';

type Props = {
  params: Promise<{ slug: string }>;
};

// This would typically fetch from an API
async function getPost(slug: string) {
  return {
    title: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    content: 'This is the full content of the blog post. It would be fetched from a CMS or database in a real application.',
    date: 'May 10, 2026',
    author: 'Influencer Team',
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) return { title: `Blog Post | ${APP_CONFIG.name}` };
  
  const post = await getPost(slug);
  return {
    title: `${post.title} | ${APP_CONFIG.name}`,
    description: `Read more about ${post.title} on ${APP_CONFIG.name}.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) return <div>Post not found</div>;

  const post = await getPost(slug);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.meta}>{post.date} • {post.author}</div>
          <h1>{post.title}</h1>
        </div>
      </header>
      
      <div className={styles.container}>
        <div className={styles.content}>
          <p>{post.content}</p>
          {/* Real content would be rendered here */}
        </div>
      </div>
    </article>
  );
}
