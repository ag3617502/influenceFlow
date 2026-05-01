'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Sidebar component handles its own fixed/mobile positioning */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* This spacer div ensures the main content doesn't go under the fixed sidebar on desktop */}
      <div className={styles.sidebarContainer} />

      <main className={styles.main}>
        <Header 
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}
