'use client';

import React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme } from '@/hooks/useTheme';
import styles from './Header.module.css';
import { ROUTES } from '@/lib/constants';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <div className={styles.search}>
          <SearchIcon className={styles.searchIcon} fontSize="small" />
          <input type="text" placeholder="Search..." />
        </div>
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
        <button className={styles.notifBtn} aria-label="Notifications">
          <NotificationsIcon fontSize="small" />
        </button>
        <Link href={ROUTES.home} className={styles.logout}>
          <LogoutIcon fontSize="small" />
          <span>Logout</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
