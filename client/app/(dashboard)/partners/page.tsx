'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from './PartnersPage.module.css';

// Mock data based on the provided design
const mockPartners = [
  {
    id: '1',
    name: 'WME Agency',
    category: 'Agency',
    email: 'contact@wme.com',
    website: 'wmeagency.com',
    deals: 15,
    avatar: 'W'
  },
  {
    id: '2',
    name: 'CAA Management',
    category: 'Management',
    email: 'info@caa.com',
    website: 'caa.com',
    deals: 8,
    avatar: 'C'
  },
  {
    id: '3',
    name: 'Edelman PR',
    category: 'PR',
    email: 'press@edelman.com',
    website: 'edelman.com',
    deals: 4,
    avatar: 'E'
  },
  {
    id: '4',
    name: 'VaynerMedia',
    category: 'Agency',
    email: 'hello@vaynermedia.com',
    website: 'vaynermedia.com',
    deals: 12,
    avatar: 'V'
  }
];

export default function PartnersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Strategic Partners</h1>
          <p>Manage relationships with agencies, managers, and PR firms.</p>
        </div>
        <div className={styles.actions}>
          <Link href={ROUTES.partnerNew}>
            <Button variant="primary">
              <AddIcon fontSize="small" /> Add Partner
            </Button>
          </Link>
        </div>
      </header>

      <div className={styles.filterBar}>
        <div className={styles.searchWrapper}>
          <SearchIcon className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search partners..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.partnersGrid}>
        {mockPartners.map(partner => (
          <Card key={partner.id} className={styles.partnerCard}>
            <div className={styles.partnerHeader}>
              <div className={styles.avatar}>
                {partner.avatar}
              </div>
              <div className={styles.partnerInfo}>
                <h3 className={styles.partnerName}>{partner.name}</h3>
                <span className={styles.categoryBadge}>{partner.category}</span>
              </div>
            </div>

            <div className={styles.partnerStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Total Deals</span>
                <span className={styles.statValue}>{partner.deals}</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Revenue Share</span>
                <span className={styles.statValue}>15%</span>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <EmailIcon fontSize="inherit" />
                <span>{partner.email}</span>
              </div>
              <div className={styles.contactItem}>
                <LanguageIcon fontSize="inherit" />
                <span>{partner.website}</span>
              </div>
            </div>

            <div className={styles.cardFooter}>
              <Button variant="outline" size="sm" fullWidth>View Collaboration</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
