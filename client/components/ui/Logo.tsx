import React from 'react';
import Link from 'next/link';
import { APP_CONFIG, ROUTES } from '@/lib/constants';
import styles from './Logo.module.css';

interface LogoProps {
  className?: string;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
}

const LogoIcon = () => (
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {/* Abstract Megaphone / Influence Symbol */}
    <path d="M18 8c0-2.21-1.79-4-4-4H4v12h10c2.21 0 4-1.79 4-4v-4z" />
    <path d="M18 8l4-2v8l-4-2" />
    <path d="M4 16v2a2 2 0 0 0 2 2h2" />
    {/* Growth / Flow Sparkle */}
    <path d="M14 10l2 2-2 2" stroke="var(--secondary)" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  showName = true, 
  size = 'md',
  href = ROUTES.home,
  onClick
}) => {
  const containerClass = [
    styles.container,
    styles[size],
    className
  ].join(' ');

  return (
    <Link href={href} className={containerClass} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <div className={styles.iconInner}>
          <LogoIcon />
        </div>
        <div className={styles.iconGlow} />
      </div>
      {showName && (
        <span className={styles.name}>
          {APP_CONFIG.name.replace('Flow', '')}<span>Flow</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
