'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HandshakeIcon from '@mui/icons-material/Handshake';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from './NewDealPage.module.css';

export default function NewDealPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push(ROUTES.deals);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={ROUTES.deals} className={styles.backBtn}>
          <ArrowBackIcon fontSize="small" /> Back to Deals
        </Link>
        <div className={styles.headerContent}>
          <h1>Create New Deal</h1>
          <p>Define your campaign terms and link with brand partners.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGrid}>
          {/* Main Information */}
          <div className={styles.mainColumn}>
            <Card title="Campaign Details" className={styles.sectionCard}>
              <div className={styles.inputGroup}>
                <label>Campaign Title</label>
                <div className={styles.inputWrapper}>
                  <BusinessCenterIcon className={styles.inputIcon} />
                  <input type="text" placeholder="e.g. Nike Summer Run 2026" required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Select Client</label>
                  <div className={styles.inputWrapper}>
                    <CorporateFareIcon className={styles.inputIcon} />
                    <select required>
                      <option value="">Select a brand...</option>
                      <option value="nike">Nike</option>
                      <option value="samsung">Samsung</option>
                      <option value="zara">Zara</option>
                    </select>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label>Agency / Partner (Optional)</label>
                  <div className={styles.inputWrapper}>
                    <HandshakeIcon className={styles.inputIcon} />
                    <select>
                      <option value="">Direct to Brand</option>
                      <option value="wme">WME Agency</option>
                      <option value="caa">CAA Management</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Description & Scope</label>
                <textarea 
                  className={styles.textarea}
                  placeholder="Describe the deliverables, posting schedule, and key requirements..." 
                  rows={4} 
                />
              </div>
            </Card>

            <Card title="Platform & Deliverables" className={styles.sectionCard}>
              <div className={styles.platformGrid}>
                {['Instagram', 'TikTok', 'YouTube', 'Twitter', 'Facebook'].map(platform => (
                  <label key={platform} className={styles.checkboxLabel}>
                    <input type="checkbox" name="platforms" value={platform.toLowerCase()} />
                    <span className={styles.checkboxCustom} />
                    <span className={styles.platformName}>{platform}</span>
                  </label>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className={styles.sideColumn}>
            <Card title="Budget & Timing" className={styles.sectionCard}>
              <div className={styles.inputGroup}>
                <label>Contract Value</label>
                <div className={styles.inputWrapper}>
                  <AttachMoneyIcon className={styles.inputIcon} />
                  <input type="number" placeholder="0.00" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Start Date</label>
                <div className={styles.inputWrapper}>
                  <CalendarTodayIcon className={styles.inputIcon} />
                  <input type="date" required />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>End Date</label>
                <div className={styles.inputWrapper}>
                  <CalendarTodayIcon className={styles.inputIcon} />
                  <input type="date" required />
                </div>
              </div>
            </Card>

            <Card title="Quick Checklist" className={styles.sectionCard}>
              <div className={styles.checklist}>
                <label className={styles.checkItem}>
                  <input type="checkbox" />
                  <span>Contract Signed</span>
                </label>
                <label className={styles.checkItem}>
                  <input type="checkbox" />
                  <span>Brief Received</span>
                </label>
                <label className={styles.checkItem}>
                  <input type="checkbox" />
                  <span>Assets Uploaded</span>
                </label>
              </div>
            </Card>

            <div className={styles.formActions}>
              <Button type="submit" variant="primary" fullWidth disabled={loading}>
                {loading ? 'Creating...' : 'Launch Campaign'}
              </Button>
              <Button type="button" variant="outline" fullWidth onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
