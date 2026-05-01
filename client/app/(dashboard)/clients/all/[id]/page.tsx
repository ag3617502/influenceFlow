'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from './ClientDetailPage.module.css';
import api from '@/lib/axios';
import { ROUTES } from '@/lib/constants';

interface Client {
  _id: string;
  name: string;
  email: string;
  industry: string;
  website?: string;
  location?: string;
  contactPerson?: string;
  totalRevenue: number;
  totalDeals: number;
  paymentBehavior: string;
  createdAt: string;
}

// Mock deals for display
const mockDeals = [
  { id: '1', name: 'Spring Campaign 2026', value: 8500, status: 'Active', date: '2026-04-15' },
  { id: '2', name: 'Product Launch Review', value: 4200, status: 'Completed', date: '2026-03-10' },
  { id: '3', name: 'Q1 Brand Awareness', value: 7400, status: 'Completed', date: '2026-01-22' },
];

const ClientDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await api.get(`/clients/${id}`);
        if (response.data.success) {
          setClient(response.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch client', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  if (loading) return <div className="p-8">Loading client profile...</div>;
  if (!client) return <div className="p-8">Client not found</div>;

  return (
    <div className={styles.container}>
      <header style={{ marginBottom: '0.5rem' }}>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.push(ROUTES.clients)}
          style={{ border: 'none', paddingLeft: 0 }}
        >
          <ArrowBackIcon fontSize="small" style={{ marginRight: '8px' }} /> Back to Clients
        </Button>
      </header>

      <div className={styles.hero}>
        <div className={styles.heroMain}>
          <div className={styles.avatarLg}>
            {client.name.substring(0, 2).toUpperCase()}
          </div>
          <div className={styles.heroContent}>
            <h1>{client.name}</h1>
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}><EmailIcon fontSize="inherit" /> {client.email}</div>
              <div className={styles.metaItem}><LocationOnIcon fontSize="inherit" /> {client.location || 'Global'}</div>
              <div className={styles.metaItem}><CalendarTodayIcon fontSize="inherit" /> Client since {new Date(client.createdAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        <div className={styles.heroActions}>
          <Button variant="outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'white' }}>
            <EditIcon fontSize="small" /> Edit Profile
          </Button>
          <Button variant="danger">
            <DeleteIcon fontSize="small" />
          </Button>
        </div>
      </div>

      <div className={styles.statsRow}>
        <Card topAccent="var(--primary)" title="Total Revenue" subtitle="LIFETIME GENERATED">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)' }}>
            ${client.totalRevenue.toLocaleString()}
          </div>
        </Card>
        
        <Card topAccent="var(--secondary)" title="Total Deals" subtitle="SUCCESSFUL COLLABORATIONS">
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)' }}>
            {client.totalDeals} <span style={{ fontSize: '1rem', color: 'var(--muted-foreground)' }}>Deals</span>
          </div>
        </Card>

        <Card title="Payment Behavior" subtitle="RELIABILITY SCORE">
          <div className={styles.behaviorCard}>
            <div className={styles.behaviorItem}>
              <div className={styles.behaviorLabel}>
                <span>On Time / Early</span>
                <span style={{ color: '#10b981' }}>85%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '85%', background: '#10b981' }} />
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#166534', background: '#f0fdf4', padding: '8px', borderRadius: '6px', fontWeight: 600 }}>
              ⭐ Trusted Partner — Excellent Payer
            </div>
          </div>
        </Card>
      </div>

      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <h2>Deals & Invoices</h2>
          <Button variant="primary" size="sm">
            <AddIcon fontSize="small" /> New Deal
          </Button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Deal Name</th>
              <th>Value</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((deal) => (
              <tr key={deal.id}>
                <td className={styles.dealName}>{deal.name}</td>
                <td className={styles.dealValue}>${deal.value.toLocaleString()}</td>
                <td>{new Date(deal.date).toLocaleDateString()}</td>
                <td>
                  <span className={`${styles.badge} ${deal.status === 'Active' ? styles.active : styles.completed}`}>
                    {deal.status}
                  </span>
                </td>
                <td>
                  <Button variant="outline" size="sm" style={{ padding: '4px 8px' }}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientDetailPage;
