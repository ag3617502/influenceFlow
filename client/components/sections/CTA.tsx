import React from 'react';
import Button from '../ui/Button';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>Ready to take your content <br /><span>business to the next level?</span></h2>
          <p>Join over 10,000+ creators who trust InfluenceFlow to manage their careers.</p>
          <div className={styles.actions}>
            <Button size="lg" variant="primary">Get Started Now</Button>
            <Button size="lg" variant="ghost" className={styles.secondaryBtn}>Contact Sales</Button>
          </div>
        </div>
      </div>
      <div className={styles.bgGlow}></div>
    </section>
  );
};

export default CTA;
