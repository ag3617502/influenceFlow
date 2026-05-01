import React from 'react';
import Link from 'next/link';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import styles from './Footer.module.css';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href={ROUTES.home} className={styles.logo}>
              <FlashOnIcon className={styles.logoIcon} />
              {APP_CONFIG.name.replace('Flow', '')}<span>Flow</span>
            </Link>
            <p>{APP_CONFIG.description}</p>
          </div>
          
          <div className={styles.linksGrid}>
            <div className={styles.col}>
              <h4>Product</h4>
              <Link href={ROUTES.dashboard}>Dashboard</Link>
              <Link href={ROUTES.analytics}>Analytics</Link>
              <Link href={ROUTES.deals}>Brand Deals</Link>
            </div>
            <div className={styles.col}>
              <h4>Company</h4>
              <Link href={ROUTES.about}>About Us</Link>
              <Link href={ROUTES.blog}>Blog</Link>
              <Link href="#">Careers</Link>
            </div>
            <div className={styles.col}>
              <h4>Legal</h4>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <Link href="#">Cookie Policy</Link>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
          <div className={styles.socials}>
            <Link href="#">Twitter</Link>
            <Link href="#">Instagram</Link>
            <Link href="#">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
