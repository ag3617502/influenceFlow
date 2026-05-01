'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HandshakeIcon from '@mui/icons-material/Handshake';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Logo from '../ui/Logo';
import styles from './Sidebar.module.css';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

const navSections = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: ROUTES.dashboard, icon: DashboardIcon },
      { label: 'Deals', href: ROUTES.deals, icon: BusinessCenterIcon },
      { label: 'Invoices', href: ROUTES.invoices, icon: DescriptionIcon, badge: 3 },
      { label: 'Expenses', href: ROUTES.expenses, icon: AttachMoneyIcon },
    ]
  },
  {
    label: 'Relations',
    items: [
      { label: 'Clients', href: ROUTES.clients, icon: CorporateFareIcon },
      { label: 'Partners', href: ROUTES.partners, icon: HandshakeIcon },
    ]
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', href: ROUTES.analytics, icon: BarChartIcon },
      { label: 'Notifications', href: ROUTES.notifications, icon: NotificationsIcon, badge: 5 },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Settings', href: ROUTES.settings, icon: SettingsIcon },
    ]
  }
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.logo}>
          <Logo size="sm" onClick={onClose} />
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <nav className={styles.nav}>
          {navSections.map((section, idx) => (
            <div key={idx} className={styles.navSection}>
              <div className={styles.navSectionLabel}>{section.label}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === 'Dashboard' 
                  ? pathname === item.href 
                  : pathname.startsWith(item.href);

                return (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={onClose}
                  >
                    <Icon className={styles.navIcon} fontSize="small" />
                    <span className={styles.label}>{item.label}</span>
                    {item.badge && <span className={styles.badge}>{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.user}>
            <div className={styles.avatar}>AR</div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>Alex Rivera</span>
              <span className={styles.userRole}>Pro Account</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
