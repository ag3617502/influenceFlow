'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Button from '../ui/Button';
import Logo from '../ui/Logo';
import styles from './Navbar.module.css';
import { useTheme } from '@/hooks/useTheme';
import { useAuth } from '@/components/providers/AuthProvider';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Logo size="sm" />
        
        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href={ROUTES.about} className={styles.link}>About</Link>
          <Link href={ROUTES.blog} className={styles.link}>Blog</Link>
        </div>

        <div className={styles.actions}>
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? (
              <DarkModeIcon className={styles.iconMoon} fontSize="small" />
            ) : (
              <LightModeIcon className={styles.iconSun} fontSize="small" />
            )}
          </button>
          
          <div className={styles.desktopActions}>
            {!loading && (
              user ? (
                <Link href={ROUTES.dashboard}>
                  <Button variant="primary" size="md">Dashboard</Button>
                </Link>
              ) : (
                <>
                  <Link href={ROUTES.login} className={styles.loginLink}>
                    Login
                  </Link>
                  <Link href={ROUTES.signup}>
                    <Button variant="primary" size="md">Get Started</Button>
                  </Link>
                </>
              )
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className={`${styles.mobileMenu} fade-in`}>
          <Link href={ROUTES.about} className={styles.mobileLink} onClick={() => setIsOpen(false)}>About</Link>
          <Link href={ROUTES.blog} className={styles.mobileLink} onClick={() => setIsOpen(false)}>Blog</Link>
          <hr className={styles.divider} />
          {!loading && (
            user ? (
              <Link href={ROUTES.dashboard} className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                <Button variant="primary" className={styles.fullWidth}>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href={ROUTES.login} className={styles.mobileLink} onClick={() => setIsOpen(false)}>Login</Link>
                <Link href={ROUTES.signup} className={styles.mobileLink} onClick={() => setIsOpen(false)}>
                  <Button variant="primary" className={styles.fullWidth}>Get Started</Button>
                </Link>
              </>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
