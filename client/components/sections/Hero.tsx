'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import styles from './Hero.module.css';
import { useAuth } from '@/components/providers/AuthProvider';
import { ROUTES } from '@/lib/constants';

const Hero = () => {
  const { user, loading } = useAuth();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.badge} fade-in`}>New: AI-Powered Deal Matching</div>
          <h1 className={`${styles.title} fade-in`}>
            Manage Your Influencer <br /> 
            <span>Business Like a Pro</span>
          </h1>
          <p className={`${styles.description} fade-in`}>
            The ultimate platform to track deals, manage expenses, and scale your influence. 
            Stop using spreadsheets and start using InfluenceFlow.
          </p>
          <div className={`${styles.actions} fade-in`}>
            {!loading && (
              user ? (
                <Link href={ROUTES.dashboard}>
                  <Button size="lg" variant="primary">Go to Dashboard →</Button>
                </Link>
              ) : (
                <Link href={ROUTES.signup}>
                  <Button size="lg" variant="primary">Start Free Trial</Button>
                </Link>
              )
            )}
            <Button size="lg" variant="outline">Watch Demo</Button>
          </div>
        </div>
        
        <div className={`${styles.imageWrapper} fade-in`}>
          <div className={styles.glassFrame}>
            <Image 
              src="/dashboard_preview.png" 
              alt="InfluenceFlow Dashboard Preview" 
              width={1000} 
              height={600} 
              className={styles.dashboardImage}
              priority
            />
          </div>
          <div className={styles.floatingCard1}>
            <div className={styles.cardDot}></div>
            <span>+12.5% Revenue Growth</span>
          </div>
          <div className={styles.floatingCard2}>
            <div className={styles.cardDot}></div>
            <span>8 New Brand Deals</span>
          </div>
        </div>
      </div>
      
      <div className={styles.background}>
        <div className={styles.glow1}></div>
        <div className={styles.glow2}></div>
      </div>
    </section>
  );
};

export default Hero;
